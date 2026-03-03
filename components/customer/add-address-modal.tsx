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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Plus } from 'lucide-react'
import { Field, FieldLabel } from '../ui/field'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { fetchHandler } from '@/lib/fetch-handler'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { ScrollArea } from '../ui/scroll-area'

interface Address {
  fullName: string
  phone: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  addressType: string
  isDefault: boolean
}

interface AddAddressModalProps {
  refetch: () => void
  isCheckout?: boolean;
}

export function AddAddressModal({ refetch, isCheckout = false }: AddAddressModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Address>({
    fullName: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressType: 'home',
    isDefault: false,
  })
  const { register, control, handleSubmit } = useForm();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const { data: session } = useSession()
  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (payload: FieldValues) =>
      fetchHandler({
        endpoint: "add-new-address",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      })
  });

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      country: "india",
      state: "uttar pradesh",
      district: "firozabad",
      tehsil: "firozabad",
      block: "narkhi",
      ...data,
      is_default: data?.is_default === "on" ? 1 : 0, // default value
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
      {
        isCheckout ? <DialogTrigger asChild className='!bg-white hover:!bg-white z-10 rounded-lg border border-gray-200 py-4 px-0 my-3 cursor-pointer hover:shadow-sm transition-shadow'>
          <Button variant="default" className='w-full !py-6 flex items-center justify-center text-green-500 font-semibold'>  <span className="flex items-center gap-2">
            <Plus size={20} />
            Add New Address
          </span>
          </Button>
        </DialogTrigger> : <DialogTrigger asChild className='!bg-white hover:!bg-white sticky top-0 z-10 rounded-lg border border-gray-200 py-4 px-0 mb-2 cursor-pointer hover:shadow-sm transition-shadow'>
          <Button variant="default" className='w-full !py-6 flex items-center justify-between text-green-500 font-semibold'>  <span className="flex items-center gap-2">
            <Plus size={20} />
            Add New Address
          </span>
            <ChevronRight size={20} />
          </Button>
        </DialogTrigger>
      }

      <DialogContent className='max-h-[90vh]'>
        <div className="flex flex-col h-full">
          <DialogHeader className='pb-2'>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>
              Enter your address details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-3 max-h-[calc(90vh-100px)]">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              <Field className="flex flex-col gap-y-2">
                <FieldLabel htmlFor="input-full-address" className="font-medium text-xs text-green-700">Full Address</FieldLabel>
                <Textarea
                  id="input-full-address"
                  placeholder="123 Main Street, Apt 4B"
                  {...register("address", {
                    required: "Full address is required",
                  })}
                  onChange={handleInputChange}
                  required
                  rows={1}
                />
              </Field>
              <Field className="flex flex-col gap-y-2">
                <FieldLabel htmlFor="input-landmark" className="font-medium text-xs text-green-700">Landmark</FieldLabel>
                <Input
                  id="input-landmark"
                  {...register("landmark", {
                    required: "Landmark is required",
                  })}
                  placeholder="Faith Areana"
                  required
                />
              </Field>
              <Controller
                name="village"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-y-2">
                    <FieldLabel htmlFor="input-village" className="font-medium text-xs text-green-700">Village/Town/City</FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a village/city/Town" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Field className="flex flex-col gap-y-2">
                <FieldLabel htmlFor="input-receaver-name" className="font-medium text-xs text-green-700">Receiver's Name</FieldLabel>
                <Input
                  id="input-receaver-name"
                  {...register("person", {
                    required: "Receaver is required",
                  })}
                  placeholder="Abhishek Kumar"
                  required
                />
              </Field>
              <Field className="flex flex-col gap-y-2">
                <FieldLabel htmlFor="input-mobile" className="font-medium text-xs text-green-700">Mobile</FieldLabel>
                <Input
                  id="input-mobile"
                  {...register("contact", {
                    required: "Mobile is required",
                  })}
                  placeholder="7906XXXXXX"
                  required
                />
              </Field>
              <Field orientation="horizontal" className="space-y-1" >
                <Checkbox
                  color="primary"
                  {...register("is_default")}
                  className="cursor-pointer"
                />
                <FieldLabel htmlFor="terms-checkbox" className="text-sm bg-linear-to-br text-sm font-bold ml-auto font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-700 from-[7.58%] to-primary to-[98.88%]">
                  Set As a default Address
                </FieldLabel>
              </Field>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  className='!bg-white !text-red-500 !cursor-pointer hover:!text-red-600 !border !border-red-500'
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} variant="default">
                  {isPending ? "Add Address..." : "Add Address"}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </div>

      </DialogContent>
    </Dialog>
  )
}
