import { Header } from "@/components/customer/header";
import { Sidebar } from "@/components/customer/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

const CustomerLayout = ({ children }: {
    children: ReactNode
}) => {
    return (
        <main>
            <Header />
                <div className="flex max-w-7xl max-h-[calc(100vh-160px)] overflow-auto mx-auto mt-28 border border-gray-300 rounded-2xl bg-background">
                    <Sidebar />
                    {children}
                </div>
          
        </main>
    )
}

export default CustomerLayout;