import { Phone } from "lucide-react"


export const Contacto = ({ contacto }: { contacto: string }) => {
    return (
        <>
            <Phone className="w-4 h-4" />
            <span>{contacto}</span>
        </>
    )

}