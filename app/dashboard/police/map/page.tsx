"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function MapPage() {
  const [radiusFilter, setRadiusFilter] = useState(25)
  const [showVerified, setShowVerified] = useState(true)
  const [showPending, setShowPending] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw a placeholder hotspot map
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw map background (simple grid)
    ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
    ctx.lineWidth = 1

    // Draw grid lines
    const gridSize = 20
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw placeholder text
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.font = "16px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("No hotspot data available", canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = "14px sans-serif"
    ctx.fillText("Reports data will generate hotspots on this map", canvas.width / 2, canvas.height / 2 + 15)

    // Draw compass
    const compassRadius = 30
    const compassX = canvas.width - compassRadius - 20
    const compassY = canvas.height - compassRadius - 20

    // Draw compass circle
    ctx.beginPath()
    ctx.arc(compassX, compassY, compassRadius, 0, 2 * Math.PI)
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fill()
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
    ctx.stroke()

    // Draw N indicator
    ctx.fillStyle = "#000"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("N", compassX, compassY - compassRadius + 14)

    // Draw S indicator
    ctx.fillText("S", compassX, compassY + compassRadius - 4)

    // Draw E indicator
    ctx.fillText("E", compassX + compassRadius - 8, compassY + 5)

    // Draw W indicator
    ctx.fillText("W", compassX - compassRadius + 8, compassY + 5)

    // Draw scale bar
    const scaleBarLength = 100
    const scaleBarHeight = 6
    const scaleBarX = 20
    const scaleBarY = canvas.height - 30

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(scaleBarX, scaleBarY, scaleBarLength, scaleBarHeight)

    // Scale bar text
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`0`, scaleBarX, scaleBarY + 20)
    ctx.fillText(`${radiusFilter} km`, scaleBarX + scaleBarLength, scaleBarY + 20)
  }, [radiusFilter, showVerified, showPending])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hotspot Map</h1>
        <p className="text-muted-foreground">Visualize areas with high concentration of drug abuse reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="h-[calc(100vh-16rem)]">
            <CardContent className="p-0 h-full">
              <canvas ref={canvasRef} className="w-full h-full rounded-md" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Map Filters</CardTitle>
              <CardDescription>Adjust filters to customize the map view</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Radius (km)</Label>
                <Slider
                  defaultValue={[25]}
                  min={1}
                  max={50}
                  step={1}
                  value={[radiusFilter]}
                  onValueChange={(value) => setRadiusFilter(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1km</span>
                  <span>{radiusFilter}km</span>
                  <span>50km</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Report Status</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={showVerified}
                    onCheckedChange={(checked) => setShowVerified(checked as boolean)}
                  />
                  <label
                    htmlFor="verified"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Verified Reports
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pending"
                    checked={showPending}
                    onCheckedChange={(checked) => setShowPending(checked as boolean)}
                  />
                  <label
                    htmlFor="pending"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pending Reports
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
              <CardDescription>Map symbols and colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                <span className="text-sm">High Concentration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Medium Concentration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
                <span className="text-sm">Low Concentration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-dashed border-blue-500 rounded-full"></div>
                <span className="text-sm">Selected Radius</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

