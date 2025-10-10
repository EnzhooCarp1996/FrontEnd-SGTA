import { PaintBucket } from "lucide-react"

export const LogoDelSistema = () => {
    return (
        <div className="flex items-center justify-between p-6 border-b border-green-700">
            <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-2 rounded-lg">
                    <PaintBucket className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h1 className="text-white font-bold text-lg">SGTA</h1>
                    <p className="text-green-300 text-sm">
                        Sistema de Gestión de Taller Automotriz
                    </p>
                </div>
            </div>
        </div>
    )
}