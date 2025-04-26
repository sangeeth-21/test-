"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const searchBarRef = useRef<HTMLDivElement>(null)

  // Mock suggestions (replace with actual data in a real application)
  const allSuggestions = [
    'Tech Expo 2025', 'Music Festival', 'Startup Pitch Night',
    'AI Bootcamp', 'Networking Gala', 'Healthcare Conference',
    'Food Truck Festival', 'Art Workshop', 'Comedy Night'
  ]

  useEffect(() => {
    const filteredSuggestions = allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    )
    setSuggestions(filteredSuggestions)
  }, [inputValue])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={searchBarRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search events..."
          className="pl-10 pr-24 h-10 flex-grow bg-white border-gray-200 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {/*<Button
          variant="ghost"
          size="icon"
          className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900"
          onClick={() => setIsFilterOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>*/}
        <Button
          variant="default"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 text-sm"
          onClick={() => {
            // TODO: Implement server request logic here
            console.log('Sending search request to server:', inputValue);
          }}
        >
          Search
        </Button>
      </div>
      {inputValue && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setInputValue(suggestion)
                setSuggestions([])
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {isFilterOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[90%] max-w-4xl rounded-md shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Search Filters</h2>
              <button
                className="text-gray-500 hover:text-gray-900"
                onClick={() => setIsFilterOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="hover:bg-gray-100 rounded-lg p-2">
                <h3 className="font-medium text-sm mb-1">Event Type</h3>
                <ul className="text-sm space-y-1">
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Conference</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Workshop</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Meetup</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Festival</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Webinar</button></li>
                </ul>
              </div>
              <div className="hover:bg-gray-100 rounded-lg p-2">
                <h3 className="font-medium text-sm mb-1">Location</h3>
                <ul className="text-sm space-y-1">
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">New York</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">San Francisco</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Los Angeles</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Chicago</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Virtual</button></li>
                </ul>
              </div>
              <div className="hover:bg-gray-100 rounded-lg p-2">
                <h3 className="font-medium text-sm mb-1">Date Range</h3>
                <ul className="text-sm space-y-1">
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Today</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">This Week</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">This Month</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Next 3 Months</button></li>
                </ul>
              </div>
              <div className="hover:bg-gray-100 rounded-lg p-2">
                <h3 className="font-medium text-sm mb-1">Price</h3>
                <ul className="text-sm space-y-1">
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Free</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Under $50</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">$50-$100</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Over $100</button></li>
                </ul>
              </div>
              <div className="hover:bg-gray-100 rounded-lg p-2">
                <h3 className="font-medium text-sm mb-1">Sort By</h3>
                <ul className="text-sm space-y-1">
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Popularity</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Date</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Price</button></li>
                  <li><button className="hover:bg-gray-200 rounded-lg px-2 py-1">Location</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
