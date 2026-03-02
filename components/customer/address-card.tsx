'use client'

import { Home, Briefcase, MapPin, Trash2, Edit2, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserAddress } from '@/lib/types'

interface AddressCardProps {

  address: UserAddress
  onEdit?: () => void
  onDelete?: () => void
}

export function AddressCard({  address, onEdit, onDelete } : AddressCardProps ) {
  

  return (
    // <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-3">
    //   <div className="flex-shrink-0 mt-1">
    //     {getIcon()}
    //   </div>
      
    //   <div className="flex-1 min-w-0">
    //     <h3 className="font-semibold text-foreground mb-1">{title}</h3>
    //     <p className="text-sm text-gray-500 break-words">{address}</p>
    //   </div>

    //   <div className="flex-shrink-0 flex gap-2">
    //     <Button
    //       size="icon"
    //       variant="ghost"
    //       className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
    //       onClick={onEdit}
    //     >
    //       <Edit2 size={18} />
    //     </Button>
    //     <Button
    //       size="icon"
    //       variant="ghost"
    //       className="h-8 w-8 text-gray-600 hover:text-red-500 hover:bg-red-50"
    //       onClick={onDelete}
    //     >
    //       <Trash2 size={18} />
    //     </Button>
    //   </div>
    // </div>
    <div className="border rounded-lg p-4 shadow-sm space-y-2 relative bg-white">
      {address.isDefault && (
        <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          Default
        </span>
      )}

      <div className="text-lg font-semibold">{address.personName}</div>

      <div className="text-sm text-gray-600 flex items-center gap-1">
        <Phone size={14} />
        {address.contact}
      </div>

      <div className="text-sm text-gray-700 flex items-start gap-1">
        <MapPin size={14} className="mt-0.5" />
        <div>
          {address.village}, {address.block}, {address.tehsil},<br />
          {address.district}, {address.state}, {address.country} - {address.pincode}
        </div>
      </div>

      <p className="text-sm text-gray-500">{address.address}</p>

      <div className="flex gap-2 mt-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
