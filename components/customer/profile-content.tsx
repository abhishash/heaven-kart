'use client'

import React from "react"

import { useState } from 'react'
import { ChevronLeft, Camera, Trash2, Edit2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useGetCustomerProfileQuery, useUpdateProfileMutation } from "@/redux/services/customer-api"
import { imageBaseUrl } from "@/lib/constants"

export function ProfileContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  })

  const { data, isLoading } = useGetCustomerProfileQuery();
  const [updateProfilem, { isLoading: isSubmitting }] = useUpdateProfileMutation();

  React.useEffect(() => {
    if (data) {
      setFormData({
        name: data?.name || '',
        email: data?.email || '',
        mobile: data?.phone || '',
      });
      // show server image if present
      if (data?.image) {
        setProfilePreviewUrl(`${imageBaseUrl}${data.image}`)
      }
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message?: string }>({
    type: null,
  })
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // store file and make an object URL for preview
    setProfileImageFile(file)
    const url = URL.createObjectURL(file)
    // revoke previous preview if any
    if (profilePreviewUrl) URL.revokeObjectURL(profilePreviewUrl)
    setProfilePreviewUrl(url)
    setRemoveImage(false)
  }

  React.useEffect(() => {
    return () => {
      if (profilePreviewUrl) URL.revokeObjectURL(profilePreviewUrl)
    }
  }, [profilePreviewUrl])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmOpen(true)
  }

  const handleConfirm = async () => {
    setConfirmOpen(false)

    const fd = new FormData()
    fd.append('name', formData.name)
    fd.append('phone', formData.mobile)
    if (profileImageFile) {
      fd.append('image', profileImageFile)
    } else if (removeImage) {
      // signal server to remove existing image
      fd.append('remove_image', '1')
    }

    try {
      await updateProfilem(fd).unwrap()
      setStatus({ type: 'success', message: 'Profile updated successfully' })
    } catch (error) {
      console.error('Failed to update profile', error)
      setStatus({ type: 'error', message: 'Failed to update profile. Please try again.' })
    }

    // clear status after a short delay
    setTimeout(() => setStatus({ type: null }), 4000)
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
              disabled={isLoading}
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
              disabled={true}
              onChange={handleChange}
              className="w-full disabled:cursor-not-allowed cursor-pointer px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Mobile Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              name="mobile"
              disabled={isLoading}
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Profile Image Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                  {profilePreviewUrl ? (
                    <img src={profilePreviewUrl} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>

                <div className="absolute top-1 right-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-white border shadow-sm"
                    aria-label="Change profile image"
                  >
                    <Edit2Icon size={16} />
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo so your account is easy to recognize.
                </p>
                <div className="mt-0.5 -ml-4">
                  <Button type="button" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                    Change Image
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {status.type && (
            <div
              className={
                status.type === 'success'
                  ? 'mt-3 text-sm text-green-700 bg-green-50 p-3 rounded-lg'
                  : 'mt-3 text-sm text-red-700 bg-red-50 p-3 rounded-lg'
              }
            >
              {status.message}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>

        {/* Confirmation Dialog */}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm changes</DialogTitle>
              <DialogDescription>
                Are you sure you want to save changes to your profile?
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                Name: <span className="font-medium">{formData.name || '—'}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Mobile: <span className="font-medium">{formData.mobile || '—'}</span>
              </p>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
