import { Header } from "@/components/customer/header";
import { Sidebar } from "@/components/customer/sidebar";
import { ReactNode } from "react";

const CustomerLayout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <main>
            <Header />
            <div className="max-w-7xl px-2 sm:px-0 flex gap-x-4 overflow-hidden mx-auto mt-28 mb-14 bg-background">
                <Sidebar />
                <div className="flex-1 border border-border rounded-2xl border-gray-200 bg-gray-50 p-6 max-h-[682px] overflow-hidden">
                {children}
                </div>
            </div>
        </main>
    )
}

export default CustomerLayout;