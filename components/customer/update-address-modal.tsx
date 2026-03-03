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
import { ChevronRight, Edit, Plus } from 'lucide-react'
import { Field, FieldLabel } from '../ui/field'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { fetchHandler } from '@/lib/fetch-handler'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { UserAddress } from '@/lib/types'
import { ScrollArea } from '../ui/scroll-area'

interface AddAddressModalProps {
  refetch: () => void;
  address : UserAddress;
}

export function UpdateAddressModal({ refetch, address }: AddAddressModalProps) {
  const [open, setOpen] = useState(false)

  const { register, control, reset, handleSubmit } = useForm();

   // 👇 THIS IS THE FIX
  useEffect(() => {
    if (address) {
      reset(address);
    }
  }, [address, reset]);
  

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
  <div className="flex flex-col h-full">

    {/* Header (fixed) */}
    <DialogHeader className='pb-2'>
      <DialogTitle>Edit Address</DialogTitle>
      <DialogDescription>
        Edit your address details below. All fields marked with * are required.
      </DialogDescription>
    </DialogHeader>

    {/* Scrollable Form */}
    <ScrollArea className="flex-1 pr-3 max-h-[calc(90vh-100px)]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
        {/* your entire form fields here */}
        

          <Field className="flex flex-col gap-y-2">
            <FieldLabel htmlFor="input-full-address" className="font-medium text-xs text-green-700">Full Address</FieldLabel>
            <Textarea
              id="input-full-address"
              placeholder="123 Main Street, Apt 4B"
              {...register("address", {
                required: "Full address is required",
              })}
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
            <Controller
  name="is_default"
  control={control}
  render={({ field }) => (
    <Checkbox
      checked={field.value === 1}
      onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
    />
  )}
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
            <Button type="submit" disabled={isPending} className='cursor-pointer' variant="default">
              {isPending ? "Add Address..." : "Submit"}
            </Button>
          </div>
        </form>

     
    </ScrollArea>
  </div>
</DialogContent>
    
    </Dialog>
  )
}
