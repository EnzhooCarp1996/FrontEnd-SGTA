
interface TarjetaSpanProps {
    children: React.ReactNode;
}

export const TarjetaSpan = ({ children }: TarjetaSpanProps) => {
    return (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
            {children}
        </div>
    );
};
