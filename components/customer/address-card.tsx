'use client'

import { Home, Briefcase, MapPin, Trash2, Edit2, Phone, Edit, MapPinCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserAddress } from '@/lib/types'
import { useMutation } from '@tanstack/react-query'
import { fetchHandler } from '@/lib/fetch-handler'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { toast } from 'sonner'
import Spinner from '../ui/spinner'
import { UpdateAddressModal } from './update-address-modal'

interface AddressCardProps {
  address: UserAddress;
  refetch: () => void;
  isBorder: boolean;
}

export function AddressCard({ address, refetch, isBorder }: AddressCardProps) {
  const { data: session } = useSession();
  const { mutateAsync, isPending: isDeleteing } = useMutation({
    mutationFn: (payload: { id: number }) =>
      fetchHandler({
        endpoint: "delete-address",
        method: "DELETE",
        data: payload,
        token: session?.user?.accessToken,
      })
  });

  const onDelete = (addressId: number) => {
    const payload = {
      id: addressId
    }
    mutateAsync(payload)?.then((res) => {
      if (res?.status) {
        refetch();
      }
    }).catch((error) => {
      toast.error("Something Wrong");
    });
  }

  const { mutateAsync: setDefaultAddress, isPending : isSetDefaultAddress } = useMutation({
    mutationFn: (payload: { address_id: number }) =>
      fetchHandler({
        endpoint: "change-address",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      })
  });

  const handleChangeDefaultAddress = (addreesId: number) => {
    setDefaultAddress({ address_id: addreesId })?.then((res) => {
      if (res?.status) {
        refetch();
      }
    }).catch((error) => {
      toast.error("Something Wrong");
    });
  }


  return (
    <>
    <div  className={clsx(" px-4 rounded-lg cursor-pointer p-2 space-y-2 relative ", address.is_default == "1" ? "bg-green-50" :  " bg-white hover:bg-green-50 transition-all duration-300")}>
      <div className='flex justify-between'>
        <div className="text-lg font-semibold">{address.person}</div>
        <div className="flex gap-2">
          {
            address.is_default == "1" ? null :  <button
          onClick={() => handleChangeDefaultAddress(address.id)}
          disabled={isSetDefaultAddress}
            className="text-sm rounded mt-0.5 cursor-pointer hover:bg-gray-100"
          >
            {
              isSetDefaultAddress ? <Spinner /> :  <MapPinCheck className='size-4 text-green-700' />
            }
            
          </button>
          }
          
          <UpdateAddressModal refetch={refetch} address={address} />
          {address?.is_default == "0" && (
            <button
               onClick={(e) => {
                e.stopPropagation();   
                onDelete(address?.id);
              }}
              disabled={isDeleteing}
              className="text-sm cursor-pointer rounded hover:bg-red-50"
            >
              {
                isDeleteing ? <Spinner /> : <Trash2 className='size-4 text-red-500' />
              }
            </button>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-1">
        <Phone size={14} />
        {address?.contact}
      </div>
      <div className="text-sm text-gray-700 flex items-start gap-1">
        <MapPin size={14} className="mt-0.5" />
        <p>
          {address.landmark}, {address.village},
        </p>
      </div>
      <p className="text-sm text-gray-500">{address.address}</p>
    </div>
    { isBorder ? null : 
    <div className='border-0 border-b-2 mx-2 border-dotted' />
    }
    </>
  )
}
