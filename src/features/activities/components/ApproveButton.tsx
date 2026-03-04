import { Button } from "@/components/ui"
import { useApproveActivity } from "../hooks/useActivities"


interface Props{
    id:number
}

export const ApproveButton = ({id}:Props) => {
    const { mutate: approveActivity,isPending } = useApproveActivity()
    return (
        <Button 
            onClick={() => approveActivity(id)}
            disabled={isPending}
            size={"xs"}
        >
            {isPending ? "Aprobando..." : "Aprobar"}
        </Button>
    )
}
