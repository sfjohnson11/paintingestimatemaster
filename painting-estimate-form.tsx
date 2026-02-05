"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Plus, Trash2 } from "lucide-react"
import CoverSheet from "./cover-sheet"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import PhotoUpload from "@/components/photo-upload"

export default function PaintingEstimateForm() {
  const [showCoverSheet, setShowCoverSheet] = useState(true)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [formData, setFormData] = useState({
    contractor: "",
    date: new Date().toLocaleDateString("en-US"),
    taxRate: "0",
    overheadRate: "0",
    profitRate: "0",
    laborRate: "37.3",
    items: [
      {
        id: "walls-new",
        name: "Walls - Paint - New",
        qty: "0",
        manhours: 0.009,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "walls-existing",
        name: "Walls - Paint - Existing",
        qty: "0",
        manhours: 0.009,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "ceilings-new",
        name: "Ceilings - Paint - New",
        qty: "0",
        manhours: 0.011,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "ceilings-existing",
        name: "Ceilings - Paint - Existing",
        qty: "0",
        manhours: 0.011,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "doors-new",
        name: "Doors - All sides - New",
        qty: "0",
        manhours: 1.5,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "doors-existing",
        name: "Doors - All sides - Existing",
        qty: "0",
        manhours: 1.5,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "door-frames-new",
        name: "Door Frames (LF) - Inside & Outside - New",
        qty: "0",
        manhours: 0.15,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "door-frames-existing",
        name: "Door Frames (LF) - Inside & Outside - Ex",
        qty: "0",
        manhours: 0.15,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      { id: "trim-new", name: "Other trim - New", qty: "0", manhours: 0.15, totalManhours: "0", totalLaborCost: "0" },
      {
        id: "trim-existing",
        name: "Other trim - Existing",
        qty: "0",
        manhours: 0.15,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "siding-smooth-new",
        name: "Siding (smooth) New",
        qty: "0",
        manhours: 0.012,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "siding-smooth-existing",
        name: "Siding (smooth) Existing",
        qty: "0",
        manhours: 0.012,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "siding-rough-new",
        name: "Siding (rough or shingle) New",
        qty: "0",
        manhours: 0.015,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "siding-rough-existing",
        name: "Siding (rough or shingle) Existing",
        qty: "0",
        manhours: 0.015,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      { id: "shutters-new", name: "Shutters - New", qty: "0", manhours: 0.06, totalManhours: "0", totalLaborCost: "0" },
      {
        id: "shutters-existing",
        name: "Shutters - Existing",
        qty: "0",
        manhours: 0.06,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      { id: "stucco-new", name: "Stucco - New", qty: "0", manhours: 0.009, totalManhours: "0", totalLaborCost: "0" },
      {
        id: "stucco-existing",
        name: "Stucco - Existing",
        qty: "0",
        manhours: 0.009,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "windows-new",
        name: "Windows, including mullions (1) - New",
        qty: "0",
        manhours: 0.045,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "windows-existing",
        name: "Windows, including mullions (1) - Existing",
        qty: "0",
        manhours: 0.045,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "baseboards-new",
        name: "Baseboards - New",
        qty: "0",
        manhours: 0.024,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "baseboards-existing",
        name: "Baseboards - Existing",
        qty: "0",
        manhours: 0.024,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "cabinets-new",
        name: "Bookcase/cabinets - New",
        qty: "0",
        manhours: 0.033,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "cabinets-existing",
        name: "Bookcase/cabinets - Existing",
        qty: "0",
        manhours: 0.033,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "oiling-sizing",
        name: "Oiling and sizing",
        qty: "0",
        manhours: 0.007,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "sealer-coat",
        name: "Sealer Coat (one coat)",
        qty: "0",
        manhours: 0.007,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "paint-brick",
        name: "Paint Brick or Masonry",
        qty: "0",
        manhours: 0.018,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "paint-concrete",
        name: "Paint Concrete",
        qty: "0",
        manhours: 0.015,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      {
        id: "paint-concrete-steps",
        name: "Paint Concrete Steps - 3 Coats",
        qty: "0",
        manhours: 0.026,
        totalManhours: "0",
        totalLaborCost: "0",
      },
    ],
    additionalItems: [
      {
        id: "light-sanding",
        name: "Light Sanding",
        qty: "0",
        manhours: 0.003,
        totalManhours: "0",
        totalLaborCost: "0",
      },
      { id: "filling", name: "Filling", qty: "0", manhours: 0.007, totalManhours: "0", totalLaborCost: "0" },
      { id: "staining", name: "Staining", qty: "0", manhours: 0.018, totalManhours: "0", totalLaborCost: "0" },
      { id: "shellacking", name: "Shellacking", qty: "0", manhours: 0.018, totalManhours: "0", totalLaborCost: "0" },
      { id: "varnishing", name: "Varnishing", qty: "0", manhours: 0.018, totalManhours: "0", totalLaborCost: "0" },
      { id: "waxing", name: "Waxing, machine", qty: "0", manhours: 0.018, totalManhours: "0", totalLaborCost: "0" },
      {
        id: "polishing",
        name: "Polishing, machine",
        qty: "0",
        manhours: 0.024,
        totalManhours: "0",
        totalLaborCost: "0",
      },
    ],
    materials: [
      { id: "primer", name: "Primer", qty: "0", unitCost: "45.05", total: 0 },
      { id: "paint-walls", name: "Paint - Walls", qty: "0", unitCost: "35.1", total: 0 },
      { id: "paint-door-area", name: "Paint - Door Area", qty: "0", unitCost: "36.15", total: 0 },
      { id: "paint-door-frames", name: "Paint - Door Frames", qty: "0", unitCost: "36.15", total: 0 },
      { id: "paint-other1", name: "Paint - Other", qty: "0", unitCost: "36.15", total: 0 },
      { id: "paint-other2", name: "Paint - Other", qty: "0", unitCost: "36.15", total: 0 },
      { id: "stain", name: "Stain", qty: "0", unitCost: "36.15", total: 0 },
      { id: "varnish", name: "Varnish", qty: "0", unitCost: "36.15", total: 0 },
      { id: "oil", name: "Oil", qty: "0", unitCost: "36.15", total: 0 },
      { id: "misc1", name: "Misc. 1", qty: "0", unitCost: "0", total: 0 },
      { id: "misc2", name: "Misc. 2", qty: "0", unitCost: "0", total: 0 },
      { id: "protection-lift", name: "Protection & Lift", qty: "0", unitCost: "350", total: 0 },
    ],
    planDate: "",
    exclusions: "All not indicated above including all ceiling prep.",
  })

  const [totals, setTotals] = useState({
    totalManhours: 0,
    totalLabor: 0,
    totalMaterials: 0,
    totalAdditionalCosts: 0,
    bidSubtotal: 0,
    overhead: 0,
    profit: 0,
    preTaxTotal: 0,
    tax: 0,
    bidTotal: 0,
  })

  const [chartData, setChartData] = useState({
    costs: [],
    laborHours: [],
    materials: [],
  })
  const [paintingItemsData, setPaintingItemsData] = useState([])

  const [photos, setPhotos] = useState<string[]>([])

  const handleItemChange = (index, field, value, itemType = "items") => {
    const updatedFormData = { ...formData }
    const numericValue = value === "" ? "0" : value.replace(/[^\d.]/g, "")

    if (itemType === "materials") {
      updatedFormData[itemType][index][field] = numericValue
      const item = updatedFormData[itemType][index]
      item.total = Number.parseFloat(item.qty) * Number.parseFloat(item.unitCost)
    } else {
      updatedFormData[itemType][index][field] = numericValue
      const item = updatedFormData[itemType][index]
      item.totalManhours = Number.parseFloat(item.qty) * item.manhours
      item.totalLaborCost = item.totalManhours * Number.parseFloat(formData.laborRate)
    }

    setFormData(updatedFormData)
  }

  // Update general form fields
  const handleFormChange = (field, value) => {
    let updatedValue = value

    // For numeric fields, allow empty string or valid numbers with decimals
    if (["laborRate", "taxRate", "overheadRate", "profitRate"].includes(field)) {
      updatedValue = value === "" ? "0" : value.replace(/[^\d.]/g, "")
      // Ensure only one decimal point
      const decimalCount = (updatedValue.match(/\./g) || []).length
      if (decimalCount > 1) {
        updatedValue = updatedValue.replace(/\.(?=.*\.)/g, "")
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedValue,
    }))

    // If labor rate changes, update all labor costs
    if (field === "laborRate") {
      const numericValue = Number.parseFloat(updatedValue) || 0
      updateLaborCosts(numericValue)
    }
  }

  // Function to update all labor costs
  const updateLaborCosts = (newLaborRate) => {
    setFormData((prevData) => {
      const updatedItems = prevData.items.map((item) => ({
        ...item,
        totalLaborCost: item.totalManhours * newLaborRate,
      }))
      const updatedAdditionalItems = prevData.additionalItems.map((item) => ({
        ...item,
        totalLaborCost: item.totalManhours * newLaborRate,
      }))
      return {
        ...prevData,
        items: updatedItems,
        additionalItems: updatedAdditionalItems,
      }
    })
  }

  // Effect to recalculate labor costs when labor rate changes
  useEffect(() => {
    updateLaborCosts(Number.parseFloat(formData.laborRate) || 0)
  }, [formData.laborRate])

  // Calculate all totals
  useEffect(() => {
    let totalManhours = 0
    let totalLabor = 0
    let totalMaterials = 0

    // Calculate labor totals for items and additional items
    formData.items.concat(formData.additionalItems).forEach((item) => {
      totalManhours += Number.parseFloat(item.totalManhours) || 0
      totalLabor += Number.parseFloat(item.totalLaborCost) || 0
    })

    // Calculate material costs
    formData.materials.forEach((item) => {
      totalMaterials += Number.parseFloat(item.total) || 0
    })

    const bidSubtotal = totalLabor + totalMaterials
    const overhead = bidSubtotal * (Number.parseFloat(formData.overheadRate) / 100)
    const profit = bidSubtotal * (Number.parseFloat(formData.profitRate) / 100)
    const preTaxTotal = bidSubtotal + overhead + profit
    const tax = totalMaterials * (Number.parseFloat(formData.taxRate) / 100)
    const bidTotal = preTaxTotal + tax

    setTotals({
      totalManhours,
      totalLabor,
      totalMaterials,
      bidSubtotal,
      overhead,
      profit,
      preTaxTotal,
      tax,
      bidTotal,
    })
  }, [formData])

  // Update chart data when totals change
  useEffect(() => {
    const allLaborItems = [...formData.items, ...formData.additionalItems]
    setChartData({
      costs: [
        { name: "Labor", value: totals.totalLabor },
        { name: "Materials", value: totals.totalMaterials },
      ],
      laborHours: allLaborItems
        .map((item) => ({
          name: item.name.split(" ").slice(0, 2).join(" "),
          value: item.totalManhours,
        }))
        .filter((item) => item.value > 0),
      materials: formData.materials
        .map((item) => ({
          name: item.name,
          value: item.total,
        }))
        .filter((item) => item.value > 0),
    })
    const paintingItemsComparison = allLaborItems
      .filter((item) => item.qty > 0)
      .map((item) => ({
        name: item.name.split(" ").slice(0, 3).join(" "),
        laborHours: item.totalManhours,
        laborCost: item.totalLaborCost,
      }))
      .sort((a, b) => b.laborHours - a.laborHours)
      .slice(0, 10) // Show top 10 items

    setPaintingItemsData(paintingItemsComparison)
  }, [totals, formData])

  const handlePhotoChange = (newPhotos: string[]) => {
    setPhotos(newPhotos)
  }

  const addCustomItem = (itemType: "items" | "additionalItems" | "materials") => {
    const newItem = {
      id: `custom-${Date.now()}`,
      name: "Custom Item",
      qty: "0",
      manhours: itemType === "materials" ? undefined : 0,
      unitCost: itemType === "materials" ? "0" : undefined,
      totalManhours: itemType === "materials" ? undefined : "0",
      totalLaborCost: itemType === "materials" ? undefined : "0",
      total: itemType === "materials" ? 0 : undefined,
    }

    setFormData((prevData) => ({
      ...prevData,
      [itemType]: [...prevData[itemType], newItem],
    }))
  }

  const removeItem = (index: number, itemType: "items" | "additionalItems" | "materials") => {
    setFormData((prevData) => ({
      ...prevData,
      [itemType]: prevData[itemType].filter((_, i) => i !== index),
    }))
  }

  // Handle printing
  const handlePrint = () => {
    window.print()
  }

  const handleAdminAccess = () => {
    setIsAdminMode(true)
    setShowCoverSheet(false)
    console.log("Admin access granted") // Add this line for debugging
  }

  const handleGetStarted = () => {
    setShowCoverSheet(false)
  }

  // Helper function to safely format numbers
  const safeToFixed = (value, decimalPlaces = 2) => {
    return typeof value === "number" ? value.toFixed(decimalPlaces) : "0.00"
  }

  return (
    <div className="max-w-[1000px] mx-auto p-4 print:p-0">
      {showCoverSheet ? (
        <CoverSheet onAdminAccess={handleAdminAccess} onGetStarted={handleGetStarted} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 print:hidden">
            <h1 className="text-2xl font-bold mb-2 md:mb-0">Painting Estimate</h1>
            <div className="space-y-2 md:space-y-0 md:space-x-4">
              <Button
                onClick={() => {
                  setShowCoverSheet(true)
                  setIsAdminMode(false)
                }}
                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white"
              >
                Back to Cover Sheet
              </Button>
              <Button
                onClick={handlePrint}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Printer className="h-4 w-4" />
                Print Form
              </Button>
            </div>
          </div>

          <Card className="mb-6 print:shadow-none bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              {isAdminMode && (
                <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded">
                  <p className="text-yellow-800">Admin Mode Active</p>
                </div>
              )}

              {/* Form content */}
              <div className="flex justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-4">Painting Estimate</h2>
                  <div className="flex gap-4 mb-2">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium mb-1">Contractor:</label>
                      <Input
                        value={formData.contractor}
                        onChange={(e) => handleFormChange("contractor", e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium mb-1">Date:</label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleFormChange("date", e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-1">Labor Rate:</label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={formData.laborRate === "0" ? "" : formData.laborRate}
                      onChange={(e) => handleFormChange("laborRate", e.target.value)}
                      className="w-1/2"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Painting Labor</h2>
                <div className="grid grid-cols-7 gap-4 mb-2 font-semibold">
                  <div className="col-span-2">Item</div>
                  <div>Quantity</div>
                  <div>Man-hour Unit</div>
                  <div>Total Man-hours</div>
                  <div>Total Labor Cost</div>
                  <div>Actions</div>
                </div>
                {formData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-7 gap-4 mb-4">
                    <div className="col-span-2">
                      <Input
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value, "items")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={item.qty === "0" ? "" : item.qty}
                        onChange={(e) => handleItemChange(index, "qty", e.target.value, "items")}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center">{safeToFixed(item.manhours, 3)}</div>
                    <div className="flex items-center">{safeToFixed(item.totalManhours)}</div>
                    <div className="flex items-center">${safeToFixed(item.totalLaborCost)}</div>
                    <div>
                      <Button onClick={() => removeItem(index, "items")} className="p-2 bg-red-500 text-white rounded">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => addCustomItem("items")}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus size={16} className="mr-2" /> Add Custom Item
                </Button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Additional Items</h2>
                <div className="grid grid-cols-7 gap-4 mb-2 font-semibold">
                  <div className="col-span-2">Item</div>
                  <div>Quantity</div>
                  <div>Man-hour Unit</div>
                  <div>Total Man-hours</div>
                  <div>Total Labor Cost</div>
                  <div>Actions</div>
                </div>
                {formData.additionalItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-7 gap-4 mb-4">
                    <div className="col-span-2">
                      <Input
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value, "additionalItems")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={item.qty === "0" ? "" : item.qty}
                        onChange={(e) => handleItemChange(index, "qty", e.target.value, "additionalItems")}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center">{safeToFixed(item.manhours, 3)}</div>
                    <div className="flex items-center">{safeToFixed(item.totalManhours)}</div>
                    <div className="flex items-center">${safeToFixed(item.totalLaborCost)}</div>
                    <div>
                      <Button
                        onClick={() => removeItem(index, "additionalItems")}
                        className="p-2 bg-red-500 text-white rounded"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => addCustomItem("additionalItems")}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus size={16} className="mr-2" /> Add Custom Item
                </Button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Materials</h2>
                <div className="grid grid-cols-6 gap-4 mb-2 font-semibold">
                  <div className="col-span-2">Item</div>
                  <div>Quantity</div>
                  <div>Unit Cost</div>
                  <div>Total</div>
                  <div>Actions</div>
                </div>
                {formData.materials.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-6 gap-4 mb-4">
                    <div className="col-span-2">
                      <Input
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value, "materials")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={item.qty === "0" ? "" : item.qty}
                        onChange={(e) => handleItemChange(index, "qty", e.target.value, "materials")}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={item.unitCost === "0" ? "" : item.unitCost}
                        onChange={(e) => handleItemChange(index, "unitCost", e.target.value, "materials")}
                        className="w-full"
                      />
                    </div>
                    <div className="text-right">${safeToFixed(item.total)}</div>
                    <div>
                      <Button
                        onClick={() => removeItem(index, "materials")}
                        className="p-2 bg-red-500 text-white rounded"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => addCustomItem("materials")}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus size={16} className="mr-2" /> Add Custom Item
                </Button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Project Photos</h2>
                <PhotoUpload onPhotosChange={handlePhotoChange} />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Rates</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Labor Rate:</label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={formData.laborRate === "0" ? "" : formData.laborRate}
                      onChange={(e) => handleFormChange("laborRate", e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tax Rate (%):</label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={formData.taxRate === "0" ? "" : formData.taxRate}
                      onChange={(e) => handleFormChange("taxRate", e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Overhead Rate (%):</label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={formData.overheadRate === "0" ? "" : formData.overheadRate}
                      onChange={(e) => handleFormChange("overheadRate", e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Profit Rate (%):</label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={formData.profitRate === "0" ? "" : formData.profitRate}
                      onChange={(e) => handleFormChange("profitRate", e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Totals</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Manhours:</label>
                    <span className="text-right">{safeToFixed(totals.totalManhours)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Labor:</label>
                    <span className="text-right">${safeToFixed(totals.totalLabor)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Materials:</label>
                    <span className="text-right">${safeToFixed(totals.totalMaterials)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Total Additional Costs:</label>
                    <span className="text-right">${safeToFixed(totals.totalAdditionalCosts)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bid Subtotal:</label>
                    <span className="text-right">${safeToFixed(totals.bidSubtotal)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Overhead:</label>
                    <span className="text-right">${safeToFixed(totals.overhead)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Profit:</label>
                    <span className="text-right">${safeToFixed(totals.profit)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pre-Tax Total:</label>
                    <span className="text-right">${safeToFixed(totals.preTaxTotal)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tax:</label>
                    <span className="text-right">${safeToFixed(totals.tax)}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bid Total:</label>
                    <span className="text-right">${safeToFixed(totals.bidTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Data Visualization</h2>
                <div className="grid grid-cols-1 gap-6">
                  <Card className="col-span-1">
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">Painting Items Comparison</h3>
                      <ChartContainer
                        config={{
                          laborHours: {
                            label: "Labor Hours",
                            color: "hsl(var(--chart-1))",
                          },
                          laborCost: {
                            label: "Labor Cost ($)",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[400px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={paintingItemsData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={150} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="laborHours" stackId="a" fill="var(--color-laborHours)" name="Labor Hours" />
                            <Bar dataKey="laborCost" stackId="a" fill="var(--color-laborCost)" name="Labor Cost ($)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Amount ($)",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.costs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">Labor Hours Distribution</h3>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Hours",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.laborHours} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card className="col-span-1">
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-2">Materials Cost Distribution</h3>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Cost ($)",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.materials} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium mb-1">Plan Date:</label>
                <Input
                  type="date"
                  value={formData.planDate}
                  onChange={(e) => handleFormChange("planDate", e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Exclusions:</label>
                <textarea
                  value={formData.exclusions}
                  onChange={(e) => handleFormChange("exclusions", e.target.value)}
                  className="w-full h-24 resize-y"
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
