"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Plus, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Complaint {
  _id: string;
  event: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed" | "rejected";
  priority: "low-priority" | "medium-priority" | "high-priority";
  type: string;
  imageLinks: string[];
  tasks: {
    title: string;
    description: string;
    taskStatus: string;
    _id: string;
  }[];
  createdByUser: string;
  createdAt: string;
  updatedAt: string;
}

// Function to decode JWT token
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export default function ComplaintsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          router.push('/login');
          return;
        }

        // Decode JWT to get user ID
        const decoded = decodeJWT(token);
        if (!decoded || !decoded._id) {
          throw new Error("Invalid token payload");
        }
        
        setCurrentUserId(decoded._id);
      } catch (error) {
        console.error("Error parsing token:", error);
        router.push('/login');
      }
    };

    fetchCurrentUser();
  }, [router]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        if (!currentUserId) return;

        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('https://dev.api.prolepses.com/v1/support/ticket/find/all', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }

        const data: Complaint[] = await response.json();
        // Filter complaints to only show those created by the current user
        const userComplaints = data.filter(complaint => complaint.createdByUser === currentUserId);
        setComplaints(userComplaints);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load complaints",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchComplaints();
    }
  }, [currentUserId, router, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not-started":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Not Started</span>;
      case "in-progress":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In Progress</span>;
      case "completed":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>;
      case "rejected":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low-priority":
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Low</span>;
      case "medium-priority":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Medium</span>;
      case "high-priority":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-bold">My Support Tickets</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No tickets found</h3>
          <p className="text-muted-foreground mt-2">
            You haven't submitted any support tickets yet.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/complaint/create">
              <Plus className="mr-2 h-4 w-4" />
              Create your first ticket
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="hidden sm:table-cell">Event ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <>
                    <TableRow key={complaint._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium hidden sm:table-cell">
                        {complaint.event}
                      </TableCell>
                      <TableCell className="font-medium sm:font-normal">
                        {complaint.title}
                      </TableCell>
                      <TableCell className="capitalize hidden md:table-cell">
                        {complaint.type}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {getStatusBadge(complaint.status)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getPriorityBadge(complaint.priority)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatDate(complaint.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleRow(complaint._id)}
                          className="flex items-center gap-1"
                        >
                          {expandedRow === complaint._id ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              <span className="hidden sm:inline">Hide</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              <span className="hidden sm:inline">View</span>
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedRow === complaint._id && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={7} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium mb-2">Details</h3>
                              <p className="text-sm text-gray-600 mb-4">
                                {complaint.description}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-xs text-gray-500">Event ID</p>
                                  <p className="text-sm">{complaint.event}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Type</p>
                                  <p className="text-sm capitalize">{complaint.type}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Status</p>
                                  <p className="text-sm">{getStatusBadge(complaint.status)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Priority</p>
                                  <p className="text-sm">{getPriorityBadge(complaint.priority)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Created</p>
                                  <p className="text-sm">{formatDate(complaint.createdAt)}</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium mb-2">Tasks</h3>
                              {complaint.tasks.length > 0 ? (
                                <div className="space-y-2">
                                  {complaint.tasks.map((task) => (
                                    <div key={task._id} className="border rounded p-2">
                                      <h4 className="font-medium">{task.title}</h4>
                                      <p className="text-sm text-gray-600">{task.description}</p>
                                      <p className="text-xs mt-1">
                                        Status: {task.taskStatus}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">No tasks</p>
                              )}
                              {complaint.imageLinks.length > 0 && (
                                <>
                                  <h3 className="font-medium mt-4 mb-2">Attachments</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {complaint.imageLinks.map((image, index) => (
                                      <a
                                        key={index}
                                        href={image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                      >
                                        <img
                                          src={image}
                                          alt={`Attachment ${index + 1}`}
                                          className="h-16 w-16 object-cover rounded border"
                                        />
                                      </a>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}