"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MailingListOption {
  id: string
  title: string
  lastMessage: string
  users: number
  price?: number
}

interface MailingListSelectorProps {
  options: MailingListOption[]
  selectedId: string
  onSelect: (id: string) => void
  onCreate?: () => void
  onUpdate?: (id: string, updatedOption: Partial<MailingListOption>) => void
  onRemove?: (id: string) => void
  loading?: boolean
}

export function MailingListSelector({
  options,
  selectedId,
  onSelect,
  onCreate,
  onUpdate,
  onRemove,
  loading = false,
}: MailingListSelectorProps) {

  const [editingOption, setEditingOption] = useState<MailingListOption | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedLastMessage, setEditedLastMessage] = useState("");
  const [editedUsers, setEditedUsers] = useState(0);
  const [editedPrice, setEditedPrice] = useState(0);

  const handleUpdateOption = () => {
    if (editingOption && onUpdate) {
      onUpdate(editingOption.id, {
        title: editedTitle,
        lastMessage: editedLastMessage,
        users: editedUsers,
        price: editedPrice
      });
      setEditingOption(null);
    }
  };

  useEffect(() => {
    if (editingOption) {
      setEditedTitle(editingOption.title);
      setEditedLastMessage(editingOption.lastMessage);
      setEditedUsers(editingOption.users);
      setEditedPrice(editingOption.price || 0);
    }
  }, [editingOption]);

  return (
    <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Card key={`skeleton-${index}`} className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))
        : options.map((option) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  key={option.id}
                  className={cn(
                    "relative p-4 cursor-pointer transition-all hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    selectedId === option.id && "border-2 border-primary bg-primary/5"
                  )}
                  role="radio"
                  aria-checked={selectedId === option.id}
                  tabIndex={0}
                  onClick={() => onSelect(option.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onSelect(option.id)
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{option.title}</h3>
                    {selectedId === option.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {option.lastMessage}
                  </p>
                  <p className="text-sm font-medium">
                    {option.users.toLocaleString()} users
                  </p>
                  {option.price !== undefined && (
                    <p className="text-sm font-medium mt-2">
                      Price: ${option.price}
                    </p>
                  )}
                  <div 
                    className="absolute bottom-2 right-2 flex space-x-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    {onUpdate && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setEditingOption(option);
                            }}
                          >
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit this option</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {onRemove && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onRemove(option.id);
                            }}
                          >
                            Remove
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove this option</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to select this option</p>
              </TooltipContent>
            </Tooltip>
          ))}
      {!loading && onCreate && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Card
              className="p-4 cursor-pointer transition-all hover:shadow-md flex items-center justify-center"
              onClick={onCreate}
            >
              <Plus className="h-6 w-6 mr-2" />
              <span>Create New</span>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new option</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Dialog open={!!editingOption} onOpenChange={(open) => !open && setEditingOption(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Option</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastMessage" className="text-right">Last Message</Label>
              <Input
                id="lastMessage"
                value={editedLastMessage}
                onChange={(e) => setEditedLastMessage(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="users" className="text-right">Users</Label>
              <Input
                id="users"
                type="number"
                value={editedUsers}
                onChange={(e) => setEditedUsers(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input
                id="price"
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateOption}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </TooltipProvider>
  )
}

