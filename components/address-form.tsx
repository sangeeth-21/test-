import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"

const countries = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  // Add more countries as needed
]

const states = {
  in: [
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "kerala", label: "Kerala" },
    { value: "delhi", label: "Delhi" },
    { value: "karnataka", label: "Karnataka" },
    { value: "maharashtra", label: "Maharashtra" },
    // Add more Indian states
  ],
  us: [
    { value: "ny", label: "New York" },
    { value: "ca", label: "California" },
    { value: "tx", label: "Texas" },
    { value: "fl", label: "Florida" },
    // Add more US states
  ],
  // Add states for other countries
}

export function AddressForm({ onPincodeValidityChange }: { onPincodeValidityChange?: (isValid: boolean) => void }) {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [availableStates, setAvailableStates] = useState<{ value: string; label: string }[]>([])
  const [selectedState, setSelectedState] = useState("")
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [isPincodeTouched, setIsPincodeTouched] = useState(false);

  useEffect(() => {
    onPincodeValidityChange?.(isPincodeValid);
  }, [isPincodeValid, onPincodeValidityChange]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Enter event address" required />
        <p className="text-sm text-gray-500 mt-1">
          Please provide the address where the event will take place. This information will be displayed to attendees.
        </p>
      </div>
      <div>
        <Label htmlFor="googleMapsLink">Google Maps Link (optional)</Label>
        <Input id="googleMapsLink" placeholder="Enter Google Maps link" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={(value) => {
            setSelectedCountry(value)
            setAvailableStates(states[value as keyof typeof states] || [])
          }}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select disabled={!selectedCountry}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {availableStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Enter city" required />
        </div>
        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Enter 6-digit pincode"
            required
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
            onBlur={(e) => {
              const isValid = e.target.value.length === 6;
              setIsPincodeValid(isValid);
              setIsPincodeTouched(true);
              onPincodeValidityChange?.(isValid);
            }}
          />
          {isPincodeTouched && !isPincodeValid && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid 6-digit pincode.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

