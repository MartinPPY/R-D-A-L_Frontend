import { CirclePlus, Clock, Home } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { UserSidebarFooter } from "./UserSidebarFooter"

export const UserAppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <span className="text-2xl font-bold" > R-D-A-L </span>
            </SidebarHeader>

            <SidebarContent>

                <SidebarGroup>

                    <SidebarMenu>

                        <SidebarMenuItem className="">
                            <SidebarMenuButton className="hover:bg-gray-100 font-medium flex gap-2" >
                                Inicio
                                <Home />
                            </SidebarMenuButton>

                        </SidebarMenuItem>

                        <SidebarMenuItem >
                            <SidebarMenuButton className="hover:bg-gray-100 font-medium flex gap-2" >
                                Registrar una actividad <CirclePlus />
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem >
                            <SidebarMenuButton className="hover:bg-gray-100 font-medium flex gap-2" >
                                Ver mis horas de trabajo <Clock />
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>


            <SidebarFooter>
                <UserSidebarFooter/>
            </SidebarFooter>
        </Sidebar>
    )
}
