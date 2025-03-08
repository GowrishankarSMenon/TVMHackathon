"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, MapPin, Calendar, Star, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  // This would normally fetch the report details from an API
  const reportId = params.id

  // Mock data for the example
  const mockReport = {
    id: reportId,
    status: "pending",
    aiScore: 7,
    date: "2023-06-15",
    userName: "Anonymous User",
    location: "123 Main Street, City Center",
    details:
      "Observed suspicious activity involving the sale of drugs near the playground. The individual was wearing a black jacket and blue jeans.",
    hasMedia: true,
  }

  const handleVerify = async () => {
    setIsVerifying(true)

    try {
      // Simulate API call to verify report
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Report Verified",
        description: "The report has been verified and added to the whitelist.",
      })

      router.push("/dashboard/police/reports")
    } catch (error) {
      console.error("Error verifying report:", error)
      toast({
        title: "Verification Failed",
        description: "There was an error verifying this report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleReject = async () => {
    setIsRejecting(true)

    try {
      // Simulate API call to reject report
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Report Rejected",
        description: "The report has been rejected and added to the blacklist.",
      })

      router.push("/dashboard/police/reports")
    } catch (error) {
      console.error("Error rejecting report:", error)
      toast({
        title: "Rejection Failed",
        description: "There was an error rejecting this report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/police/reports">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Report Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Report #{reportId}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    Submitted on {mockReport.date}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    mockReport.status === "verified"
                      ? "default"
                      : mockReport.status === "rejected"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {mockReport.status === "verified"
                    ? "Verified"
                    : mockReport.status === "rejected"
                      ? "Rejected"
                      : "Pending Review"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Location</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>{mockReport.location}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">AI Credibility Score</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{mockReport.aiScore}/10</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Details</h3>
                <p>{mockReport.details}</p>
              </div>

              {mockReport.hasMedia && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Media Evidence</h3>
                  <div className="bg-muted/50 aspect-video rounded-md flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification</CardTitle>
              <CardDescription>Verify or reject this report based on credibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">AI Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Credibility Score:</span>
                    <span className="font-medium">{mockReport.aiScore}/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${mockReport.aiScore * 10}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {mockReport.aiScore >= 7
                      ? "High credibility based on historical data"
                      : mockReport.aiScore >= 4
                        ? "Medium credibility, further review recommended"
                        : "Low credibility, careful verification needed"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={handleVerify} className="w-full" disabled={isVerifying || isRejecting}>
                {isVerifying ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Report (Whitelist)
                  </>
                )}
              </Button>

              <Button onClick={handleReject} variant="outline" className="w-full" disabled={isVerifying || isRejecting}>
                {isRejecting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Rejecting...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Report (Blacklist)
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

