import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle, FileText } from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to SafeSpot</h1>
      <p className="text-muted-foreground">Help create a safer community by reporting drug abuse cases anonymously</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reports Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Start reporting to make a difference</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Reports verified by police</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reward Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0.00</div>
            <p className="text-xs text-muted-foreground mt-1">Crypto earned from verified reports</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Report a New Case</CardTitle>
            <CardDescription>Submit a new report about drug abuse in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">All reports are completely anonymous</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Provide accurate information for better verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Earn rewards for valid, verified reports</span>
                </div>
              </div>

              <Link href="/dashboard/user/report">
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Understanding the SafeSpot reporting process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Submit a Report</h3>
                  <p className="text-sm text-muted-foreground">Fill out the report form with accurate details</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium">AI Validation</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI system validates the credibility of your report
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Police Verification</h3>
                  <p className="text-sm text-muted-foreground">Law enforcement officials verify your report</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Earn Rewards</h3>
                  <p className="text-sm text-muted-foreground">Receive cryptocurrency rewards for valid reports</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

