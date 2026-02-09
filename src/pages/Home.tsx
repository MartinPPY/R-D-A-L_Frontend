import { UserCardsSection } from "@/components/UserCardsSection"
import { UserFormSection } from "@/components/UserFormSection"
import { UserLayout } from "@/layouts/UserLayout"

export const Home = () => {
  return (
    <UserLayout>
      <div className="flex flex-col gap-20">
        <UserCardsSection />
        <UserFormSection />
      </div>
    </UserLayout>
  )
}
