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
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="bg-white sticky top-0 border-b border-slate-200 px-4 py-4 shadow-sm z-10">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Account</p>
            <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-2xl px-4 py-5 sm:px-6 sm:py-6">
        <div className="space-y-6">
          <section className=" border border-slate-200 bg-white p-5 shadow-sm rounded-[28px] sm:p-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="relative">
                <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-100 shadow-sm">
                  {profilePreviewUrl ? (
                    <img src={profilePreviewUrl} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-600">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white text-slate-700 shadow-sm"
                  aria-label="Change profile image"
                >
                  <Edit2Icon size={16} />
                </button>
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Your profile</p>
                <h2 className="text-lg font-semibold text-slate-900">Keep your details up to date</h2>
                <p className="text-sm leading-6 text-slate-600">
                  Update your name, mobile number, and profile picture so your account feels personal and secure.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => fileInputRef.current?.click()}>
                    Change photo
                  </Button>
                  <span className="text-sm text-slate-500">Best image size: 1080×1080</span>
                </div>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  disabled={isLoading}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled={true}
                  onChange={handleChange}
                  className="w-full cursor-not-allowed rounded-2xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-500 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  name="mobile"
                  disabled={isLoading}
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-500">
                Upload a clear photo so your account is easy to recognize. You can update this anytime.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </div>

            {status.type && (
              <div
                className={
                  status.type === 'success'
                    ? 'rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700'
                    : 'rounded-2xl bg-rose-50 p-4 text-sm text-rose-700'
                }
              >
                {status.message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" className="w-full sm:w-auto" type="button" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button className="w-full sm:w-auto" type="submit" disabled={isLoading || isSubmitting}>
                Save profile
              </Button>
            </div>
          </form>
        </div>

        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm changes</DialogTitle>
              <DialogDescription>
                Are you sure you want to save changes to your profile?
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 space-y-2 text-sm text-slate-700">
              <p>
                Name: <span className="font-semibold">{formData.name || '—'}</span>
              </p>
              <p>
                Mobile: <span className="font-semibold">{formData.mobile || '—'}</span>
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
