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
import { getContract } from "@/utils/contract"
const Map = dynamic(() => import("@/components/map"), { ssr: false })

export default function ReportPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmergency, setIsEmergency] = useState(false)
  const [showEmergencyWarning, setShowEmergencyWarning] = useState(false)
  const [confirmedEmergency, setConfirmedEmergency] = useState(false)

  const [formData, setFormData] = useState({
    peopleInvolved: "",
    drugType: "",
    activityType: "",
    lastSeen: "",
    additionalInfo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitReport = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.submitReport(
        formData.peopleInvolved,
        "drug report ......",
        formData.drugType,
        formData.activityType,
        formData.lastSeen,
        formData.additionalInfo
      );
      await tx.wait();
      alert("Report submitted successfully!");
      setFormData({
        peopleInvolved: "",
        drugType: "",
        activityType: "",
        lastSeen: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

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
          <form onSubmit={submitReport}>
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
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value="drug report ......" readOnly />
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
                <Label htmlFor="lastSeen">When was this last seen?</Label>
                <Input id="lastSeen" name="lastSeen" value={formData.lastSeen} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} />
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
