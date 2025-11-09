import { useLocation, useNavigate } from "react-router-dom";
import { allMenuItems } from "../../../helpers/menuItems";

interface NavProps {
    role: string;
    onAlternar: () => void;
}

export const Nav: React.FC<NavProps> = ({ role, onAlternar }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems =
        role === "Admin"
            ? allMenuItems.filter((item) => item.id === "usuarios")
            : allMenuItems.filter((item) => item.id !== "usuarios");

    return (
        <nav className="mt-6">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.includes(item.id);

                return (
                    <button
                        key={item.id}
                        onClick={() => {
                            navigate(`/${item.id}`);
                            if (window.innerWidth < 1024) onAlternar();
                        }}
                        className={`w-full flex items-center space-x-3 px-6 py-4 text-left 
                                transition-all duration-200 hover:bg-green-700 ${isActive ?
                                "bg-green-700 border-r-4 border-green-400" : ""}`}
                    >
                        <Icon className={`w-5 h-5 ${isActive ? "text-green-300" : "text-green-400"}`} />
                        <span className={`font-medium ${isActive ? "text-white" : "text-green-200"}`} >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

