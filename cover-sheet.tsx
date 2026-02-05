"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CoverSheetProps {
  onAdminAccess: () => void
  onGetStarted: () => void
}

export default function CoverSheet({ onAdminAccess, onGetStarted }: CoverSheetProps) {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")

  const handleAdminAccess = () => {
    if (adminPassword === "admin123") {
      onAdminAccess()
    } else {
      alert("Incorrect password. Please try again.")
    }
  }

  return (
    <div className="max-w-[1000px] mx-auto p-4 print:p-0 bg-blue-100 rounded-lg shadow-lg relative">
      {/* Admin access button (hidden in the corner) */}
      <button
        className="absolute top-0 right-0 m-2 text-blue-300 hover:text-blue-500"
        onClick={() => setShowPasswordPrompt(true)}
      >
        ⚙️
      </button>

      {/* Admin Password prompt */}
      {showPasswordPrompt && (
        <div className="absolute top-0 right-0 m-2 bg-white p-2 rounded shadow-md">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleAdminAccess} className="w-full">
            Access Admin
          </Button>
        </div>
      )}

      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8 bg-blue-200 py-4 rounded-t-lg">
        E-Deck Estimator by S F Johnson Enterprises, LLC
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Block */}
        <Card className="bg-blue-50 border-blue-300 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Painting Estimating Revolution</h2>
            <h3 className="text-xl text-blue-700 mb-6">
              Transform Your Painting Business with Our Cutting-Edge Estimation Tool
            </h3>

            <h4 className="text-lg font-semibold text-blue-800 mb-3 bg-blue-200 p-2 rounded">
              Benefits of Our Estimator
            </h4>
            <ul className="list-disc list-inside space-y-2 text-blue-900">
              <li>Lightning-fast estimates in minutes, not hours</li>
              <li>Comprehensive painting component database</li>
              <li>Automatic calculations for labor and materials</li>
              <li>Customizable pricing and profit margins</li>
              <li>Professional-looking estimate reports</li>
              <li>Cloud-based access from anywhere</li>
              <li>Regular updates with the latest industry pricing</li>
            </ul>

            <div className="mt-8 space-y-4">
              <Button onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                Get Started Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Block */}
        <Card className="bg-blue-50 border-blue-300 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 bg-blue-200 p-2 rounded">Sample Estimate</h2>
            <div className="bg-white p-4 rounded-lg shadow-inner overflow-hidden border border-blue-200">
              <div className="text-sm">
                <h3 className="text-lg font-bold mb-2 text-blue-800">Painting Estimate</h3>
                <p className="mb-2">
                  <strong className="text-blue-700">Contractor:</strong> Your Painting Co.
                </p>
                <p className="mb-2">
                  <strong className="text-blue-700">Date:</strong> 05/15/2025
                </p>
                <table className="w-full border-collapse text-left mb-4">
                  <thead>
                    <tr className="bg-blue-200">
                      <th className="border border-blue-300 px-2 py-1">Item</th>
                      <th className="border border-blue-300 px-2 py-1">Qty</th>
                      <th className="border border-blue-300 px-2 py-1">Rate</th>
                      <th className="border border-blue-300 px-2 py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-blue-300 px-2 py-1">Walls - Paint</td>
                      <td className="border border-blue-300 px-2 py-1">1500 SF</td>
                      <td className="border border-blue-300 px-2 py-1">$0.75</td>
                      <td className="border border-blue-300 px-2 py-1">$1,125.00</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-blue-300 px-2 py-1">Ceilings</td>
                      <td className="border border-blue-300 px-2 py-1">800 SF</td>
                      <td className="border border-blue-300 px-2 py-1">$0.85</td>
                      <td className="border border-blue-300 px-2 py-1">$680.00</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 px-2 py-1">Trim</td>
                      <td className="border border-blue-300 px-2 py-1">200 LF</td>
                      <td className="border border-blue-300 px-2 py-1">$1.25</td>
                      <td className="border border-blue-300 px-2 py-1">$250.00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-between font-bold text-blue-800">
                  <span>Total Labor:</span>
                  <span>$2,055.00</span>
                </div>
                <div className="flex justify-between font-bold mt-2 text-blue-800">
                  <span>Materials:</span>
                  <span>$750.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 bg-blue-200 p-2 rounded text-blue-900">
                  <span>Total Estimate:</span>
                  <span>$2,805.00</span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-200 p-4 rounded">
              <p className="text-blue-800 font-bold mb-2">
                Highlighted Feature: Create total accurate manhours based on painting industry standards
              </p>
              <p className="text-blue-700">
                Our estimator uses up-to-date painting industry standards to calculate precise manhours for each task,
                ensuring your estimates are always accurate and competitive.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center bg-blue-200 py-4 rounded-b-lg">
        <p className="text-blue-800 font-semibold">
          &copy; 2025 E-Deck Estimator by S F Johnson Enterprises, LLC. All rights reserved.
        </p>
        <p className="text-blue-700 mt-2 text-sm">
          Unauthorized use or reproduction of this software is strictly prohibited.
        </p>
      </footer>
    </div>
  )
}

