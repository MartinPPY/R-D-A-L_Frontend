import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserAppSidebar } from "@/components/UserAppSidebar"
import type { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export const UserLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <UserAppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>


    )
}
