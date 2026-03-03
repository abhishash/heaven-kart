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
            <div className=" max-w-7xl flex overflow-hidden mx-auto mt-28 mb-14 border border-border rounded-2xl bg-background">
                <Sidebar />
                {children}
            </div>
        </main>
    )
}

export default CustomerLayout;