// features/activities/hooks/useActivities.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activityService } from "../services/activity.service";
import { toast } from "sonner";

// Hook para obtener datos
export const useActivities = () => {
    return useQuery({
        queryKey: ["activities"],
        queryFn: activityService.getActivitiesByMonth,
    });
};

// Hook para la acción de aprobar
export const useApproveActivity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: activityService.aprobarActividad,
        onSuccess: () => {
            toast.success("Actividad aprobada");
            // Invalida la cache para refrescar la lista automáticamente
            queryClient.invalidateQueries({ queryKey: ["activities"] });
        },
        onError: () => toast.error("Error al aprobar la actividad")
    });
};