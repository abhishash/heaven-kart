'use client'

import { Home, Briefcase, MapPin, Trash2, Edit2, Phone, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserAddress } from '@/lib/types'
import { useMutation } from '@tanstack/react-query'
import { fetchHandler } from '@/lib/fetch-handler'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'

interface AddressCardProps {
  address: UserAddress
  onEdit?: () => void
  refetch: () => void
}

export function AddressCard({ address, onEdit, refetch }: AddressCardProps) {
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
        // setIsOtp(true);
        // toast.success("OTP has been send your registered email");
        return;
      }
      // toast.error(res?.errors?.email?.[0]);
    }).catch((error) => {
      // toast.error("Something Wrong");
    });
  }

  const { mutateAsync: setDefaultAddress } = useMutation({
    mutationFn: (payload: { id: number }) =>
      fetchHandler({
        endpoint: "change-address",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      })
  });

  const handleChangeDefaultAddress = (addreesId: number) => {
    setDefaultAddress({ id: addreesId });
  }


  return (
    <div onClick={() => handleChangeDefaultAddress(address.id)} className={clsx("border-0 cursor-pointer border-b-2 border-dotted p-2 space-y-2 relative ", address.is_default == "1" ? "bg-green-50" : "bg-white")}>
      <div className='flex justify-between'>
        <div className="text-lg font-semibold">{address.person}</div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className=" text-sm rounded mt-0.5 hover:bg-gray-100"
          >
            <Edit className='size-4 text-green-700' />
          </button>
          {address?.is_default == "0" && (
            <button
              onClick={() => onDelete(address?.id)}
              disabled={isDeleteing}
              className="  text-sm  rounded hover:bg-red-50"
            >
              {
                isDeleteing ? "Deleting..." : <Trash2 className='size-4 text-red-500' />
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
  )
}
