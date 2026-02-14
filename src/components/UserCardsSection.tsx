import { Calendar, Check, DollarSign, Ticket, type LucideProps } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


interface Resumen {
    title: string;
    value: string;
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface ResumenMensual {
    horas_acumuladas: number | null;
    total_acumulado: number | null;
    horas_aprobadas: number | null;
}

export const UserCardsSection = ({ resumen }: { resumen: ResumenMensual }) => {

    const resumenes: Resumen[] = [
        {
            title: "Horas registradas",
            value: resumen.horas_acumuladas?.toString() + "h",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Calendar,
        },
        {
            title: "Actividades aprobadas",
            value: resumen.horas_aprobadas?.toString() + "",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Check
        },
        {
            title: "Monto Acumulado",
            value: "$" + resumen.total_acumulado?.toString() + " CLP",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: DollarSign
        },
        {
            title: "Orden de compra",
            value: "123456789",
            description: "Del mes de " + new Date().toLocaleString('default', { month: 'long' }),
            icon: Ticket
        }

    ]

    return (
        <div className="grid grid-cols-1 gap-4 px-12 md:grid-cols-2 lg:grid-cols-4">
            {resumenes.map((resumen, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardDescription>{resumen.title}</CardDescription>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {resumen.value}
                        </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {resumen.description} <resumen.icon className="size-4" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
