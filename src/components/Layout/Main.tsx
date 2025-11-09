import { PresupuestoView } from "../Presupuestos/PresupuestoView"
import { Navigate, Route, Routes } from "react-router-dom"
import { VehiculoView } from "../Vehiculos/VehiculoView"
import { UsuarioView } from "../Usuarios/UsuarioView"
import { ClienteView } from "../Clientes/ClienteView"

interface MainProps {
    role: string;
}

export const Main: React.FC<MainProps> = ({ role }) => {
    return (
        <main className="flex-1 overflow-auto">
            <div className="p-6">
                <Routes>
                    {role === "Admin" ? (
                        <>
                            <Route path="/usuarios" element={<UsuarioView />} />
                            <Route path="*" element={<Navigate to="/usuarios" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/clientes" element={<ClienteView />} />
                            <Route path="/vehiculos" element={<VehiculoView />} />
                            <Route path="/presupuestos" element={<PresupuestoView />} />
                            <Route path="*" element={<Navigate to="/clientes" />} />
                        </>
                    )}
                </Routes>
            </div>
        </main>
    )
}