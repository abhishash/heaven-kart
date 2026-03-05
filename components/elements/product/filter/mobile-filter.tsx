"use client";
import { Button } from '@/components/ui/button'
import { FlaskConical, Sliders } from 'lucide-react'
const MobileFilter = () => {
    return (
        <div className="w-full fixed bottom-3 left-1/2 -translate-x-1/2 flex justify-center sm:hidden">
  <aside className="w-fit rounded-full px-4 flex gap-x-2 py-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    
    {/* Filter Button */}
    <Button
      variant="outline"
      size="sm"
      className="flex rounded-full text-green-700 items-center gap-2"
    >
      <Sliders className="h-4 w-4" />
      <span>Filter</span>
    </Button>

    {/* Sort Button */}
    <Button
      variant="outline"
      size="sm"
      className="flex rounded-full text-green-700 items-center gap-2"
    >
      <FlaskConical className="h-4 w-4" />
      <span>Sort</span>
    </Button>

  </aside>
</div>
    )
}


export default MobileFilter