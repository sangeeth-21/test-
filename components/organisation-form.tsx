'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Define organization type
type Organization = {
  id: string;
  name: string;
  mailid: string;
  "profile-url": string;
};

export function OrganizationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showOrgSelection, setShowOrgSelection] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Failed to verify user session");
        }

        const data = await response.json();
        setOrganizations(Object.values(data.data || {}));
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching organizations");
      }
    };

    fetchOrganizations();
  }, [router]);

  const handleOrganizationSelect = async (org: Organization) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("/api/auth/select-organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          id: org.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login to organization");
      }

      const data = await response.json();
      localStorage.setItem('selectedOrganizationId', org.id);
      localStorage.setItem('organizationMessage', data.message);

      // Redirect to the home page after successful organization selection
      router.push('/');
    } catch (err: any) {
      setError(err.message || "An error occurred while logging in to the organization");
    }
  };

  if (showOrgSelection) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-normal mb-6">Choose an organization</h1>
        </div>
        
        <div className="space-y-4">
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => handleOrganizationSelect(org)}
              className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 rounded-md transition-colors duration-200 border border-transparent hover:border-gray-200 text-sm"
            >
              <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={org["profile-url"]}
                  alt={org.name}
                  layout="fill"
                  objectFit="cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=40&width=40";
                  }}
                />
              </div>
              <div className="flex-grow text-left">
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-gray-500">{org.mailid}</div>
              </div>
            </button>
          ))}
          
          <div className="pt-4 text-center">
            <button
              onClick={() => router.push('/create-organization')}
              className="w-full p-4 flex items-center justify-center space-x-4 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex-grow text-left">
                <div className="font-medium">Create new organization</div>
              </div>
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    );
  }

  return null;  // No need to display anything when redirected directly
}
