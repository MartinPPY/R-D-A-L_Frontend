import { UserCardsSection } from "@/components/UserCardsSection"
import { UserFormSection } from "@/components/UserFormSection"
import { UserTable } from "@/components/UserTable"
import { UserLayout } from "@/layouts/UserLayout"

export const Home = () => {
  return (
    <UserLayout>
      <div className="flex flex-col gap-20 p-4">
        <UserCardsSection />
        <UserFormSection />
        <UserTable />
      </div>
    </UserLayout>
  )
}
