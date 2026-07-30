'use client'

import { MapPin, MessageSquare, Package, Settings, WalletMinimal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { imageBaseUrl } from '@/lib/constants'

const navItems = [
    { href: '/customer/profile', label: 'Profile', icon: <Settings size={20} /> },
    { href: '/customer/orders', label: 'Orders', icon: <Package size={20} /> },
    { href: '/customer/addresses', label: 'Addresses', icon: <MapPin size={20} /> },
    { href: '/customer/support', label: 'Support', icon: <MessageSquare size={20} /> }
]

export function Sidebar() {
    const pathname = usePathname()
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' })
        await signOut({ callbackUrl: '/login' })
    }

    const { data: session } = useSession()

    return (
        <div className="w-full">
            <aside className="hidden flex-col rounded-[24px] border border-gray-200 bg-white p-3 shadow-sm sm:p-6 lg:flex">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                        {session?.user?.image ? (
                            <img src={`${imageBaseUrl}${session?.user?.image}`} alt="preview" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-lg font-medium text-gray-700">
                                {session?.user?.name ? session?.user?.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                        )}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-foreground">{session?.user?.name}</h2>
                        <p className="text-sm text-gray-500">{session?.user?.phone}</p>
                    </div>
                </div>

                <div className="mb-4 rounded-2xl border border-gray-200 bg-linear-to-r from-green-700 to-primary p-4 sm:mb-8">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <WalletMinimal className="h-6 w-10 text-white" />
                            <span className="font-semibold text-white">Heaven Kart Cash & Gift Card</span>
                        </div>
                        <span className="text-white">&gt;</span>
                    </div>
                    <div className="mb-4">
                        <p className="mb-1 text-xs text-white">Available Coins</p>
                        <p className="text-lg font-semibold text-white">₹0</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            active={item.href === pathname}
                            href={item.href}
                        />
                    ))}
                </nav>

                <div className="mt-6 space-y-4">
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="h-10 w-full cursor-pointer rounded-lg border-red-500 bg-white text-red-500 hover:bg-green-50 hover:text-red-600"
                    >
                        Log Out
                    </Button>
                    <div className="text-center text-lg font-light text-gray-400">HeavenKart</div>
                </div>
            </aside>

            <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-2 py-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
                <div className="mx-auto flex max-w-md items-center justify-between gap-1">
                    {navItems.map((item) => (
                        <MobileNavItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            active={item.href === pathname}
                            href={item.href}
                        />
                    ))}
                </div>
            </nav>
        </div>
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
            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-colors ${active
                ? 'bg-linear-to-r from-green-700 to-primary font-medium text-white'
                : 'text-gray-600 hover:bg-green-50'
                }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    )
}

function MobileNavItem({ icon, label, href, active = false }: {
    icon: ReactNode;
    label: string;
    active?: boolean;
    href: string
}) {
    return (
        <Link
            href={href}
            className={`flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors ${active
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <div className="mb-1">{icon}</div>
            <span>{label}</span>
        </Link>
    )
}
