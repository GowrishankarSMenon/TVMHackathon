"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Search, FileText } from "lucide-react"
import { ethers, utils } from "ethers"
import { getContract } from "@/utils/contract" // Move import here

type Report = {
  id: string;
  name: string;
  description: string;
  drugType: string;
  activityType: string;
  lastSeen: string;
  status: "pending" | "verified" | "rejected";
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [aiScoreRange, setAiScoreRange] = useState([1, 10]);
  const [radiusFilter, setRadiusFilter] = useState(25);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const contract = await getContract();
        if (!contract) return;

        const reportsData = await contract.getAllReports();
        console.log("Fetched Reports:", reportsData); // Debugging
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);
  const handlePay = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await getContract();
      if (!contract) return;

  
      const tx = await contract.receiveEther({
        value: ethers.parseEther("1"),
      });
  
      await tx.wait();
      console.log("Transaction successful:", tx.hash);
    } catch (error) {
      console.error("Error sending ETH:", error);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Review and verify submitted reports</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
          <CardDescription>Use the filters below to narrow down the reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">AI Score Range (1-10)</label>
              <Slider
                defaultValue={[1, 10]}
                min={1}
                max={10}
                step={1}
                value={aiScoreRange}
                onValueChange={setAiScoreRange}
                className="my-5"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{aiScoreRange[0]}</span>
                <span>{aiScoreRange[1]}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Location Radius (km)</label>
              <Slider
                defaultValue={[25]}
                min={1}
                max={50}
                step={1}
                value={[radiusFilter]}
                onValueChange={(value) => setRadiusFilter(value[0])}
                className="my-5"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1km</span>
                <span>{radiusFilter}km</span>
                <span>50km</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reported Cases</CardTitle>
          <CardDescription>All reports that match your filter criteria</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-1">No Reports Found</h3>
              <p className="text-muted-foreground">There are no reports matching your filter criteria</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Drug Type</TableHead>
                      <TableHead>Activity Type</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell>{report.drugType}</TableCell>
                        <TableCell>{report.activityType}</TableCell>
                        <TableCell>{report.lastSeen}</TableCell>
                        <TableCell
                          className={`capitalize ${
                            report.status === "verified"
                              ? "text-green-500"
                              : report.status === "rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {report.status}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={handlePay}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                          >
                            Pay
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}