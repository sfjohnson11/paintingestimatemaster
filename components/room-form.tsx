"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export interface Room {
  id: string
  name: string
  length: number
  width: number
  height: number
  doors: number
  windows: number
  coats: number
  paintType: string
  includeCeiling: boolean
  includeBaseboards: boolean
}

const defaultRoom: Omit<Room, "id"> = {
  name: "",
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

interface RoomFormProps {
  rooms: Room[]
  onRoomsChange: (rooms: Room[]) => void
}

export function RoomForm({ rooms, onRoomsChange }: RoomFormProps) {
  const addRoom = () => {
    const newRoom: Room = {
      ...defaultRoom,
      id: crypto.randomUUID(),
      name: `Room ${rooms.length + 1}`,
    }
    onRoomsChange([...rooms, newRoom])
  }

  const updateRoom = (id: string, field: keyof Room, value: string | number | boolean) => {
    onRoomsChange(
      rooms.map((room) => (room.id === id ? { ...room, [field]: value } : room))
    )
  }

  const removeRoom = (id: string) => {
    onRoomsChange(rooms.filter((room) => room.id !== id))
  }

  return (
    <div className="space-y-6">
      {rooms.map((room, index) => (
        <div
          key={room.id}
          className="rounded-lg border border-border bg-card p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <Input
              value={room.name}
              onChange={(e) => updateRoom(room.id, "name", e.target.value)}
              className="text-lg font-semibold border-none bg-transparent p-0 h-auto focus-visible:ring-0 max-w-[200px]"
              placeholder={`Room ${index + 1}`}
            />
            {rooms.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRoom(room.id)}
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${room.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`length-${room.id}`}>Length (ft)</Label>
              <Input
                id={`length-${room.id}`}
                type="number"
                min={0}
                value={room.length || ""}
                onChange={(e) =>
                  updateRoom(room.id, "length", parseFloat(e.target.value) || 0)
                }
                placeholder="12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`width-${room.id}`}>Width (ft)</Label>
              <Input
                id={`width-${room.id}`}
                type="number"
                min={0}
                value={room.width || ""}
                onChange={(e) =>
                  updateRoom(room.id, "width", parseFloat(e.target.value) || 0)
                }
                placeholder="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`height-${room.id}`}>Height (ft)</Label>
              <Input
                id={`height-${room.id}`}
                type="number"
                min={0}
                value={room.height || ""}
                onChange={(e) =>
                  updateRoom(room.id, "height", parseFloat(e.target.value) || 0)
                }
                placeholder="8"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor={`doors-${room.id}`}>Doors</Label>
              <Input
                id={`doors-${room.id}`}
                type="number"
                min={0}
                value={room.doors}
                onChange={(e) =>
                  updateRoom(room.id, "doors", parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`windows-${room.id}`}>Windows</Label>
              <Input
                id={`windows-${room.id}`}
                type="number"
                min={0}
                value={room.windows}
                onChange={(e) =>
                  updateRoom(room.id, "windows", parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`coats-${room.id}`}>Coats</Label>
              <Select
                value={String(room.coats)}
                onValueChange={(value) =>
                  updateRoom(room.id, "coats", parseInt(value))
                }
              >
                <SelectTrigger id={`coats-${room.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Coat</SelectItem>
                  <SelectItem value="2">2 Coats</SelectItem>
                  <SelectItem value="3">3 Coats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`paint-${room.id}`}>Paint Type</Label>
              <Select
                value={room.paintType}
                onValueChange={(value) =>
                  updateRoom(room.id, "paintType", value)
                }
              >
                <SelectTrigger id={`paint-${room.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="eco">Eco-Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`ceiling-${room.id}`}
                checked={room.includeCeiling}
                onCheckedChange={(checked) =>
                  updateRoom(room.id, "includeCeiling", !!checked)
                }
              />
              <Label htmlFor={`ceiling-${room.id}`} className="cursor-pointer">
                Include Ceiling
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`baseboards-${room.id}`}
                checked={room.includeBaseboards}
                onCheckedChange={(checked) =>
                  updateRoom(room.id, "includeBaseboards", !!checked)
                }
              />
              <Label
                htmlFor={`baseboards-${room.id}`}
                className="cursor-pointer"
              >
                Include Baseboards
              </Label>
            </div>
          </div>
        </div>
      ))}

      <Button onClick={addRoom} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Room
      </Button>
    </div>
  )
}
