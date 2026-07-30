import { Header } from "@/components/customer/header";
import { Sidebar } from "@/components/customer/sidebar";
import { ReactNode } from "react";

const CustomerLayout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <main className="container mx-auto px-4 lg:px-12 bg-linear-to-b from-slate-50 via-white to-slate-100">
            <Header />
            <div className="mt-32 mb-6 sm:mb-12 sm:mt-24 max-h-[90vh] flex flex-col gap-4 px-2 pb-20 sm:px-4 sm:pb-2 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                    <div className="lg:w-80 lg:shrink-0">
                        <Sidebar />
                    </div>

                    <div className="flex-1 overflow-hidden rounded-[24px] border border-gray-200 bg-linear-to-br from-gray-50 to-white p-4 shadow-sm sm:p-6 lg:overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CustomerLayout;