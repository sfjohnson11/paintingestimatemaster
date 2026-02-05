"use client"

import type { Room } from "@/components/room-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const DOOR_AREA = 21 // sq ft
const WINDOW_AREA = 15 // sq ft
const PAINT_COVERAGE = 350 // sq ft per gallon
const BASEBOARD_LINEAR_FT_COST = 1.5
const LABOR_RATE_PER_SQFT = 1.75

const PAINT_PRICES: Record<string, number> = {
  standard: 35,
  premium: 55,
  eco: 48,
}

interface RoomEstimate {
  name: string
  wallArea: number
  ceilingArea: number
  baseboardLinearFt: number
  totalPaintableArea: number
  gallonsNeeded: number
  paintCost: number
  laborCost: number
  baseboardCost: number
  roomTotal: number
}

function calculateRoomEstimate(room: Room): RoomEstimate {
  const perimeter = 2 * (room.length + room.width)
  const grossWallArea = perimeter * room.height
  const doorArea = room.doors * DOOR_AREA
  const windowArea = room.windows * WINDOW_AREA
  const netWallArea = Math.max(0, grossWallArea - doorArea - windowArea)

  const ceilingArea = room.includeCeiling ? room.length * room.width : 0
  const baseboardLinearFt = room.includeBaseboards
    ? perimeter - room.doors * 3
    : 0

  const totalPaintableArea = (netWallArea + ceilingArea) * room.coats
  const gallonsNeeded = Math.ceil(totalPaintableArea / PAINT_COVERAGE)
  const paintPrice = PAINT_PRICES[room.paintType] ?? PAINT_PRICES.standard
  const paintCost = gallonsNeeded * paintPrice
  const laborCost = totalPaintableArea * LABOR_RATE_PER_SQFT
  const baseboardCost = baseboardLinearFt * BASEBOARD_LINEAR_FT_COST

  return {
    name: room.name,
    wallArea: netWallArea,
    ceilingArea,
    baseboardLinearFt,
    totalPaintableArea,
    gallonsNeeded,
    paintCost,
    laborCost,
    baseboardCost,
    roomTotal: paintCost + laborCost + baseboardCost,
  }
}

interface EstimateSummaryProps {
  rooms: Room[]
  laborRate: number
}

export function EstimateSummary({ rooms, laborRate }: EstimateSummaryProps) {
  const estimates = rooms.map(calculateRoomEstimate)
  const totalPaintCost = estimates.reduce((sum, e) => sum + e.paintCost, 0)
  const totalLaborCost = estimates.reduce((sum, e) => sum + e.laborCost, 0)
  const totalBaseboardCost = estimates.reduce(
    (sum, e) => sum + e.baseboardCost,
    0
  )
  const grandTotal = totalPaintCost + totalLaborCost + totalBaseboardCost
  const totalGallons = estimates.reduce((sum, e) => sum + e.gallonsNeeded, 0)
  const totalSqFt = estimates.reduce((sum, e) => sum + e.totalPaintableArea, 0)

  const hasData = rooms.some((r) => r.length > 0 && r.width > 0)

  if (!hasData) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Estimate Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Enter room dimensions to see your estimate.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {estimates.map((est) => (
        <Card key={est.name} className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">
              {est.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wall area</span>
              <span className="text-foreground">
                {est.wallArea.toFixed(0)} sq ft
              </span>
            </div>
            {est.ceilingArea > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ceiling area</span>
                <span className="text-foreground">
                  {est.ceilingArea.toFixed(0)} sq ft
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gallons needed</span>
              <span className="text-foreground">{est.gallonsNeeded}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Paint</span>
              <span className="text-foreground">
                ${est.paintCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Labor</span>
              <span className="text-foreground">
                ${est.laborCost.toFixed(2)}
              </span>
            </div>
            {est.baseboardCost > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Baseboards</span>
                <span className="text-foreground">
                  ${est.baseboardCost.toFixed(2)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span className="text-foreground">Room Total</span>
              <span className="text-primary">
                ${est.roomTotal.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-primary bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-foreground">Project Total</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total paintable area</span>
            <span className="text-foreground">
              {totalSqFt.toFixed(0)} sq ft
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Total gallons required
            </span>
            <span className="text-foreground">{totalGallons}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Materials</span>
            <span className="text-foreground">
              ${totalPaintCost.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Labor</span>
            <span className="text-foreground">
              ${totalLaborCost.toFixed(2)}
            </span>
          </div>
          {totalBaseboardCost > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Baseboards</span>
              <span className="text-foreground">
                ${totalBaseboardCost.toFixed(2)}
              </span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Grand Total</span>
            <span className="text-primary">${grandTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
