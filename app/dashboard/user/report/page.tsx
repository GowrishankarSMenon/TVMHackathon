"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map"), { ssr: false })

export default function ReportPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmergency, setIsEmergency] = useState(false)
  const [showEmergencyWarning, setShowEmergencyWarning] = useState(false)
  const [confirmedEmergency, setConfirmedEmergency] = useState(false)

  const [formData, setFormData] = useState({
    location: "",
    latitude: null as number | null,
    longitude: null as number | null,
    peopleInvolved: "",
    drugType: "",
    activityType: "",
    frequency: "",
    lastSeen: "",
    evidence: null as File | null,
    additionalInfo: "",
    immediateDanger: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, evidence: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: isEmergency ? "Emergency Report Submitted" : "Report Submitted",
        description: isEmergency
          ? "Authorities will be alerted immediately. Thank you for taking action."
          : "Your report has been successfully submitted for review.",
      })

      router.push("/dashboard/user")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`space-y-6 ${isEmergency ? "bg-red-100 p-6 rounded-md" : ""}`}>
      <div>
        <h1 className="text-3xl font-bold">{isEmergency ? "Emergency Report" : "Report Drug Activity"}</h1>
        <p className="text-muted-foreground">
          {isEmergency ? "Your report will be prioritized for immediate review." : "Help make your community safer by reporting drug-related activities anonymously."}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Switch checked={isEmergency} onCheckedChange={(checked) => {
          setIsEmergency(checked)
          setShowEmergencyWarning(checked)
          setConfirmedEmergency(false)
        }} />
        <span className="text-sm font-medium">Mark as Emergency</span>
      </div>

      {showEmergencyWarning && !confirmedEmergency && (
        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Emergency Report Warning</CardTitle>
            <CardDescription>
              Emergency reports are flagged as high priority. False emergency reports may result in your account being restricted.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex space-x-4">
            <Button onClick={() => setConfirmedEmergency(true)} className="bg-red-600 hover:bg-red-700">Yes, this is urgent</Button>
            <Button variant="outline" onClick={() => setIsEmergency(false)}>No, submit a regular report</Button>
          </CardFooter>
        </Card>
      )}

      {(!isEmergency || confirmedEmergency) && (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{isEmergency ? "Emergency Report Details" : "Case Details"}</CardTitle>
              <CardDescription>
                {isEmergency ? "Please provide critical details immediately." : "Provide as much information as possible."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Map onSelectLocation={handleLocationSelect} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="peopleInvolved">People Involved</Label>
                <Input id="peopleInvolved" name="peopleInvolved" value={formData.peopleInvolved} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="drugType">Type of Drug</Label>
                <Input id="drugType" name="drugType" value={formData.drugType} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityType">Type of Activity</Label>
                <Input id="activityType" name="activityType" value={formData.activityType} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">How often does it happen?</Label>
                <Input id="frequency" name="frequency" value={formData.frequency} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastSeen">When was this last seen?</Label>
                <Input id="lastSeen" name="lastSeen" value={formData.lastSeen} onChange={handleInputChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className={isEmergency ? "bg-red-600 hover:bg-red-700" : ""} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}
