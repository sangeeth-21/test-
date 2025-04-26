'use client'

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { Organizer } from '@/types/organizer'

interface OrganizerTableProps {
  organizers: Organizer[]
  onSelectOrganizers: (selectedIds: string[]) => void
}

export function OrganizerTable({ organizers, onSelectOrganizers }: OrganizerTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGender, setSelectedGender] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([])

  const filteredOrganizers = organizers.filter(organizer => {
    const matchesSearch = organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         organizer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGender = selectedGender === 'all' || organizer.gender === selectedGender
    return matchesSearch && matchesGender
  })

  const totalPages = Math.ceil(filteredOrganizers.length / rowsPerPage)
  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const displayedOrganizers = filteredOrganizers.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = displayedOrganizers.map(org => org.id)
      setSelectedOrganizers(newSelected)
      onSelectOrganizers(newSelected)
    } else {
      setSelectedOrganizers([])
      onSelectOrganizers([])
    }
  }

  const handleSelectOrganizer = (id: string, checked: boolean) => {
    const newSelected = checked
      ? [...selectedOrganizers, id]
      : selectedOrganizers.filter(orgId => orgId !== id)
    setSelectedOrganizers(newSelected)
    onSelectOrganizers(newSelected)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Input
          placeholder="Search name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedGender} onValueChange={setSelectedGender}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedOrganizers.length === displayedOrganizers.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>COUNTRY</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>COMPANY</TableHead>
              <TableHead>GENDER</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedOrganizers.map((organizer) => (
              <TableRow key={organizer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrganizers.includes(organizer.id)}
                    onCheckedChange={(checked) => handleSelectOrganizer(organizer.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>{organizer.name}</TableCell>
                <TableCell>{organizer.country}</TableCell>
                <TableCell>{organizer.email}</TableCell>
                <TableCell>{organizer.company}</TableCell>
                <TableCell>{organizer.gender}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredOrganizers.length)} of {filteredOrganizers.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Rows per page</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <ChevronFirst className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              <ChevronLast className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

