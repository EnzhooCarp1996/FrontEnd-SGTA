import { User } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="mt-auto p-4 text-center text-sm text-green-300 border-t border-green-700 flex flex-col items-start">
          &copy; {new Date().getFullYear()} SGTA.
          <div className="flex items-center space-x-1 mt-1">
            <User className="w-4 h-4" />
            By <span className="font-bold text-white">Enzo Olmedo</span>
          </div>
        </footer>
    )
}