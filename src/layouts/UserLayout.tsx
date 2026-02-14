import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserAppSidebar } from "@/components/UserAppSidebar"
import type { ReactNode } from "react"

interface Menu{
    title:string;
    icon:React.ReactNode;
}

export const UserLayout = ({ children,menus,title }: {children: ReactNode,menus:Menu[],title:string}) => {

    return (
        <SidebarProvider>
            <UserAppSidebar menu={menus} title={title}/>
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>


    )
}
