import { useActivities } from "../hooks/useActivities"
import { ActivityTable } from "./ActivityTable"

export const Activity = () => {

    const {data} = useActivities()

    return (
        <>
            {/* Vista de desktop */}
            <div className="px-12 hidden lg:block">
                <ActivityTable activities={data || []} />
            </div>

            {/* Vista de mobile */}
            <div className="px-12 block lg:hidden">

            </div>
        </>
    )
}
