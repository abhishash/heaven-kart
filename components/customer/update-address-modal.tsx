'use client'

import { useEffect, useState } from 'react'
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
import { Edit } from 'lucide-react'
import { FieldValues } from 'react-hook-form'
import { UserAddress } from '@/lib/types'

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
  refetch: () => void;
  address: UserAddress;
}

type AddressFormValues = {
  id?: number
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

export function UpdateAddressModal({ refetch, address }: AddAddressModalProps) {
  const [open, setOpen] = useState(false)

  const { register, control, reset, handleSubmit, setValue } =
    useForm<AddressFormValues>({
      defaultValues: {
        id: undefined,
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

  const parseCoord = (value: any) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const initialLatitude =
    parseCoord((address as any)?.latitude) ?? parseCoord((address as any)?.lat);
  const initialLongitude =
    parseCoord((address as any)?.longitude) ?? parseCoord((address as any)?.lng);
  const initialAddress = [address.address, address.landmark, address.person]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    if (open && address) {
      reset({
        id: address.id,
        name: address.person ?? "",
        address: address.address ?? "",
        landmark: address.landmark ?? "",
        receiverPerson: address.person ?? "",
        receiverContact: address.contact ?? "",
        latitude:
          String(parseCoord((address as any).latitude) ?? parseCoord((address as any).lat) ?? ""),
        longitude:
          String(parseCoord((address as any).longitude) ?? parseCoord((address as any).lng) ?? ""),
        address_type: address.address_type ?? "Home",
        is_default: address.is_default === "1",
      });
    }
  }, [address, open, reset]);


  const { data: session } = useSession()
  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (payload: FieldValues) =>
      fetchHandler({
        endpoint: "update-address",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      })
  });

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      ...data,
      is_default: data?.is_default ? 1 : 0,
    }

    mutateAsync(payload)?.then((res) => {
      if (res?.status) {
        refetch();
        setOpen(false)
      }
      // toast.error(res?.errors?.email?.[0]);
    }).catch((error) => {
      toast.error("Something Wrong");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild >
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-sm rounded mt-0.5 cursor-pointer hover:bg-gray-100"
        >
          <Edit className='size-4 text-green-700' />
        </button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh]'>
        <DialogContent className="rounded-2xl overflow-hidden max-h-[90vh] w-full h-full max-w-none m-0  p-0">

          {/* Fixed Map */}
          <LocationPicker
            height="40vh"
            initialLatitude={initialLatitude}
            initialLongitude={initialLongitude}
            initialAddress={initialAddress}
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

            <input type="hidden" {...register("id")} />
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
      </DialogContent>

    </Dialog>
  )
}
