'use client'

import { Home, Briefcase, MapPin, Trash2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AddressCardProps {
  type: 'home' | 'work' | 'other'
  title: string
  address: string
  onEdit?: () => void
  onDelete?: () => void
}

export function AddressCard({ type, title, address, onEdit, onDelete }: AddressCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'home':
        return <Home size={24} className="text-gray-600" />
      case 'work':
        return <Briefcase size={24} className="text-gray-600" />
      default:
        return <MapPin size={24} className="text-gray-600" />
    }
  }

  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-3">
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-gray-500 break-words">{address}</p>
      </div>

      <div className="flex-shrink-0 flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          onClick={onEdit}
        >
          <Edit2 size={18} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-gray-600 hover:text-red-500 hover:bg-red-50"
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  )
}
