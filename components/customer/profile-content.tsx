'use client'

import React from "react"

import { useState } from 'react'
import { ArrowLeft, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ProfileContent() {
  const [formData, setFormData] = useState({
    name: 'abhishek Kumar',
    email: 'akashmaseysci233@gmail.com',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
  }

  return (
    <div className="flex-1  overflow-y-auto">
      {/* Header */}
      <div className="bg-white sticky top-0 border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button className="text-gray-600 hover:text-foreground">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Profile</h1>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-2xl">
        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Privacy Notice */}
          <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
            We promise not to spam you
          </p>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="px-8 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Submit
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="border-t border-gray-200 my-12"></div>

        {/* Delete Account Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-red-500">Delete Account</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Deleting your account will remove all your orders, wallet amount and
            any active referral
          </p>

          {/* Delete Button */}
          <div className="pt-6">
            <Button
              variant="outline"
              className="px-6 py-2 border-red-500 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors bg-transparent"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
