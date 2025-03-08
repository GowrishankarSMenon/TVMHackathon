import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, CheckCircle, AlertTriangle, Map } from "lucide-react"

export default function PoliceDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Police Dashboard</h1>
      <p className="text-muted-foreground">Monitor and verify reports to combat drug abuse</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">All reports submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verified Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Approved as valid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Marked as invalid</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>View the most recently submitted reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">No reports available</p>
                  <p className="text-sm text-muted-foreground/70">New reports will appear here</p>
                </div>
              </div>

              <Link href="/dashboard/police/reports">
                <Button className="w-full" variant="outline">
                  View All Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hotspot Areas</CardTitle>
            <CardDescription>View areas with high concentration of reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="bg-muted/50 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <Map className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground">Map data unavailable</p>
                  <p className="text-sm text-muted-foreground/70">More data needed to generate hotspots</p>
                </div>
              </div>

              <Link href="/dashboard/police/map">
                <Button className="w-full" variant="outline">
                  View Full Map
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Process</CardTitle>
          <CardDescription>Understanding the report verification workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">1. AI Assessment</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reports are automatically assessed by AI for credibility on a scale of 1-10
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">2. Manual Review</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Officers review the report details and evidence to determine validity
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">3. Verification Decision</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reports are either approved (whitelist) or rejected (blacklist) with rewards assigned
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/dashboard/police/reports">
                <Button>Review Pending Reports</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

