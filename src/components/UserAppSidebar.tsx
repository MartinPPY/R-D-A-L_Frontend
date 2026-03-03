import { LogOut } from "lucide-react";
import { Sidebar, SidebarContent, /*SidebarFooter,*/ SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/authService";
//import { UserSidebarFooter } from "./UserSidebarFooter"

interface Menu {
    title: string;
    icon: React.ReactNode
}

export const UserAppSidebar = ({menu,title}: {menu: Menu[], title: string}) => {

    const navigate = useNavigate()

    const handleLogout = async()=>{
        await logout()
        navigate("/login")
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <span className="text-2xl font-bold" > {title} </span>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>

                    <SidebarMenu>

                        {
                            menu.map((m, index) => (
                                <SidebarMenuItem className="" key={index}>
                                    <SidebarMenuButton className="hover:bg-gray-100 font-medium flex gap-2" >
                                        {m.title}
                                        {m.icon}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }

                        <SidebarMenuItem>
                            <SidebarMenuButton className="hover:bg-gray-100 font-medium" onClick={handleLogout}>
                                <LogOut />
                                Cerrar Sesion
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>


            {/* 
            <SidebarFooter>
                <UserSidebarFooter />
            </SidebarFooter>
            */}
        </Sidebar>
    )
}
