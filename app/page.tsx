"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RoomForm, type Room } from "@/components/room-form"
import { EstimateSummary } from "@/components/estimate-summary"

const initialRoom: Room = {
  id: crypto.randomUUID(),
  name: "Room 1",
  length: 0,
  width: 0,
  height: 8,
  doors: 1,
  windows: 1,
  coats: 2,
  paintType: "standard",
  includeCeiling: false,
  includeBaseboards: false,
}

export default function Page() {
  const [rooms, setRooms] = useState<Room[]>([initialRoom])
  const [laborRate] = useState(1.75)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <section className="lg:col-span-3 space-y-4" aria-label="Room details">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Room Details
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add rooms and enter their dimensions to calculate your painting
                estimate.
              </p>
            </div>
            <RoomForm rooms={rooms} onRoomsChange={setRooms} />
          </section>

          <aside className="lg:col-span-2 space-y-4" aria-label="Estimate summary">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Estimate
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Cost breakdown for your project.
              </p>
            </div>
            <div className="lg:sticky lg:top-8">
              <EstimateSummary rooms={rooms} laborRate={laborRate} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
