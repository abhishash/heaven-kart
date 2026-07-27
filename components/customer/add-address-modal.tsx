'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Home,
  Building2,
  Store,
  MapPinned,
} from "lucide-react";

import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Plus } from 'lucide-react'
import { Field, FieldLabel } from '../ui/field'
import { Controller, useForm } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { fetchHandler } from '@/lib/fetch-handler'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { ScrollArea } from '../ui/scroll-area'
import LocationPicker from '../map/LocationPicker'

interface AddAddressModalProps {
  refetch: () => void
  isCheckout?: boolean
}

type AddressFormValues = {
  name: string
  address: string
  landmark: string
  receiverPerson: string
  receiverContact: string
  latitude: string
  longitude: string
  address_type: string
  is_default?: boolean
}

export function AddAddressModal({ refetch, isCheckout = false }: AddAddressModalProps) {
  const [open, setOpen] = useState(false)
  const { register, control, handleSubmit, setValue } =
    useForm<AddressFormValues>({
      defaultValues: {
        name: "",
        address: "",
        landmark: "",
        receiverPerson: "",
        receiverContact: "",
        latitude: "",
        longitude: "",
        address_type: "Home",
        is_default: false,
      },
    });

  const { data: session } = useSession()
  const { mutateAsync } = useMutation({
    mutationFn: (payload: AddressFormValues) =>
      fetchHandler({
        endpoint: "add-new-address",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      }),
  })

  const onSubmit = async (data: AddressFormValues) => {
    try {
      const payload = {
        ...data,
      }

      const res = await mutateAsync(payload)

      if (res?.status) {
        refetch()
        setOpen(false)
        toast.success("Address added successfully")
      } else {
        toast.error(res?.message ?? "Unable to add address")
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <>

      <Dialog open={open} onOpenChange={setOpen}>
        {isCheckout ? (
          <DialogTrigger
            asChild
            className="!bg-white hover:!bg-white z-10 rounded-lg border border-gray-200 py-4 px-0 my-3 cursor-pointer hover:shadow-sm transition-shadow"
          >
            <Button
              variant="default"
              className="w-full !py-6 flex items-center justify-center text-green-500 font-semibold"
            >
              <span className="flex items-center gap-2">
                <Plus size={20} />
                Add New Address
              </span>
            </Button>
          </DialogTrigger>
        ) : (
          <DialogTrigger
            asChild
            className="!bg-white hover:!bg-white sticky top-0 z-10 rounded-lg border border-gray-200 py-4 px-0 mb-2 cursor-pointer hover:shadow-sm transition-shadow"
          >
            <Button
              variant="default"
              className="w-full !py-6 flex items-center justify-between text-green-500 font-semibold"
            >
              <span className="flex items-center gap-2">
                <Plus size={20} />
                Add New Address
              </span>

              <ChevronRight size={20} />
            </Button>
          </DialogTrigger>
        )}

        <DialogContent className="rounded-2xl overflow-hidden max-h-[90vh] w-full h-full max-w-none m-0  p-0">

          {/* Fixed Map */}
          <LocationPicker
            height="40vh"
            onLocationChange={(lat, lng, address) => {
              setValue("address", address ?? "");
              setValue("latitude", String(lat));
              setValue("longitude", String(lng));
            }}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 px-6 pb-6 overflow-auto"
          >

            <input type="hidden" {...register("latitude")} />
            <input type="hidden" {...register("longitude")} />

            {/* Full Name */}

            <Field className="flex flex-col gap-y-1">

              <FieldLabel className="text-xs font-semibold text-green-700">
                Full Name
              </FieldLabel>

              <Input
                placeholder="John Doe"
                {...register("name", {
                  required: true,
                })}
              />

            </Field>

            {/* Address */}

            <Field className="flex flex-col gap-y-1">

              <FieldLabel className="text-xs font-semibold text-green-700">
                Address
              </FieldLabel>

              <Textarea
                rows={2}
                placeholder="Enter complete address"
                {...register("address", {
                  required: true,
                })}
              />

            </Field>

            {/* Landmark */}

            <Field className="flex flex-col gap-y-1">

              <FieldLabel className="text-xs font-semibold text-green-700">
                Landmark
              </FieldLabel>

              <Input
                placeholder="Temple, School, etc."
                {...register("landmark", {
                  required: true,
                })}
              />

            </Field>

            {/* Address Type */}

            <Controller
              name="address_type"
              control={control}
              render={({ field }) => (
                <Field className="space-y-1">

                  <FieldLabel className="text-xs font-semibold text-green-700">
                    Address Type
                  </FieldLabel>

                  <div className="grid grid-cols-3 gap-3">

                    {[
                      {
                        value: "Home",
                        label: "Home",
                        icon: Home,
                      },
                      {
                        value: "Work",
                        label: "Office",
                        icon: Building2,
                      },
                      {
                        value: "Other",
                        label: "Other",
                        icon: MapPinned,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => field.onChange(item.value)}
                          className={`rounded-xl border p-3 transition-all ${field.value === item.value
                            ? "border-green-600 bg-green-50 text-green-600 shadow"
                            : "border-gray-200 hover:border-green-300"
                            }`}
                        >
                          <div className="flex justify-center items-center gap-2">

                            <Icon className="h-5 w-5" />

                            <span className="text-xs font-semibold">
                              {item.label}
                            </span>

                          </div>
                        </button>
                      );
                    })}
                  </div>

                </Field>
              )}
            />

            {/* Receiver */}

            <Field className="flex flex-col gap-y-2">

              <FieldLabel className="text-xs font-semibold text-green-700">
                Receiver's Name
              </FieldLabel>

              <Input
                placeholder="Abhishek Kumar"
                {...register("receiverPerson", {
                  required: true,
                })}
              />

            </Field>

            {/* Mobile */}

            <Field className="flex flex-col gap-y-2">

              <FieldLabel className="text-xs font-semibold text-green-700">
                Mobile Number
              </FieldLabel>

              <Input
                placeholder="7906XXXXXX"
                {...register("receiverContact", {
                  required: true,
                })}
              />

            </Field>

            {/* Default Address */}

            <div className="rounded-md border bg-green-50 px-2 py-2">

              <Field
                orientation="horizontal"
                className="items-center"
              >
                <Checkbox
                  id="is-default"
                  {...register("is_default")}
                  className='cursor-pointer'
                />

                <FieldLabel
                  htmlFor="is-default"
                  className="text-sm font-medium"
                >
                  Make this my default delivery address
                </FieldLabel>

              </Field>

            </div>

          </form>
          {/* Sticky Footer */}

          <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">

            <Button
              type="button"
              variant="outline"
              // disabled={isLoading}
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit(onSubmit)}
              // disabled={isLoading}
              className="cursor-pointer"
            >
              Save Address
              {/* {isLoading ? "Saving..." : "Save Address"} */}
            </Button>

          </div>
        </DialogContent>
      </Dialog >
    </>
  )
}
