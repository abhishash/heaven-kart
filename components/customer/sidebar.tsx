'use client'

import { Heart, MapPin, MessageSquare, Package, Settings, LogOut, WalletCardsIcon, WalletMinimal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactElement, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-96 bg-white border-r border-gray-200 flex flex-col p-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">A</span>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">Abhishek Kumar</h2>
                    <p className="text-sm text-gray-500">7906948573</p>
                </div>
            </div>

            {/* Zepto Cash Card */}
            <div className="bg-linear-to-r to-green-200 from-green-400 rounded-lg p-4 mb-8 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <WalletMinimal className='w-10 h-6 ' />
                        <span className="font-semibold text-foreground">Zepto Cash & Gift Card</span>
                    </div>
                    <span className="text-gray-400">&gt;</span>
                </div>
                <div className="mb-4">
                    <p className="text-xs text-black mb-1">Available Coins</p>
                    <p className="text-lg font-semibold text-foreground">₹0</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-2">
                <NavItem icon={<Settings size={20} />} label="Profile" active={"/customer/profile" === pathname} href="/customer/profile" />
                <NavItem icon={<Package size={20} />} label="Orders" active={"/customer/orders" === pathname} href="/customer/orders" />
                <NavItem icon={<Heart size={20} />} label="Wishlist" active={"/customer/wishlist" === pathname} href="/customer/wishlist" />
                <NavItem icon={<MapPin size={20} />} label="Addresses" active={"/customer/addresses" === pathname} href="/customer/addresses" />
                <NavItem icon={<MessageSquare size={20} />} label="Customer Support" active={"/customer/support" === pathname} href="/customer/support" />
            </nav>

            {/* Footer */}
            <div className="space-y-4">
                <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-500 hover:bg-green-50 rounded-lg h-10 bg-transparent"
                >
                    Log Out
                </Button>
                <div className="text-center text-gray-400 text-lg font-light">HeavenKart</div>
            </div>
        </aside>
    )
}

function NavItem({ icon, label, href, active = false }: {
    icon: ReactNode;
    label: string;
    active?: boolean;
    href: string
}) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition-colors ${active
                ? 'bg-linear-to-r from-primary to-secondary text-black font-medium'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}
