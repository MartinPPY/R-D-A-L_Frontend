import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { UserSidebarFooter } from "./UserSidebarFooter"

interface Menu {
    title: string;
    icon: React.ReactNode
}

export const UserAppSidebar = ({menu,title}: {menu: Menu[], title: string}) => {
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

                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>


            <SidebarFooter>
                <UserSidebarFooter />
            </SidebarFooter>
        </Sidebar>
    )
}
