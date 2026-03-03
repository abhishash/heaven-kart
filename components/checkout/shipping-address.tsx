'use client'

import { useQuery } from '@tanstack/react-query'
import {  methods } from '@/lib/fetch-handler'
import { ADDRESSES } from '@/lib/constants'
import { ScrollArea } from '../ui/scroll-area'
import { AddAddressModal } from '../customer/add-address-modal'


export function ShippingAddress() {

  const { data: session } = useSession();
  const { data, isPending, refetch } = useQuery<{ data: UserAddress[] }>({
    queryKey: ["address"],
    queryFn: () =>
      fetchHandler({
        ...ADDRESSES as {
          endpoint: string;
          method: methods;
        },
        token: session?.user?.accessToken
      }),
  });

  const addresses = data?.data;

  return (
      <div className="w-full mx-auto">
        <AddAddressModal isCheckout={true} refetch={refetch} />
        {/* Saved Addresses Section */}
        <div>
          {
            isPending ? "Fetching Addresss.." :
            <ScrollArea className="h-[410px] pr-4 ">
              <div className=" flex flex-col gap-y-2 ">
                {addresses?.map((addr, index) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    refetch={refetch}
                    isBorder={(addresses.length-1) === index}
                  />
                ))}
              </div>
            </ScrollArea>
          }
        </div>
      </div>
  )
}



import { MapPin, Phone, MapPinCheck } from 'lucide-react'
import { UserAddress } from '@/lib/types'
import { useMutation } from '@tanstack/react-query'
import { fetchHandler } from '@/lib/fetch-handler'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { toast } from 'sonner'
import Spinner from '../ui/spinner'
import { UpdateAddressModal } from '../customer/update-address-modal'

interface AddressCardProps {
  address: UserAddress;
  refetch: () => void;
  isBorder: boolean;
}

function AddressCard({ address, refetch, isBorder }: AddressCardProps) {
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
    <div  className={clsx(" px-4 rounded-lg cursor-pointer p-2 space-y-2 relative ", address.is_default == "1" ? "bg-gray-100" :  " bg-white hover:bg-green-50 transition-all duration-300")}>
      <div className='flex justify-between'>
        <div className="text-lg font-semibold">{address.person}</div>
        <div className="flex items-center gap-2">
          {
            address.is_default == "1" ? <span className='text-xs text-green-700 mt-1'>Default Address</span> :  <button
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
