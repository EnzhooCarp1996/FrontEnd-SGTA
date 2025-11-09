
interface CardItemProps {
    children: React.ReactNode;
    className?: string;
}

export const CardItem: React.FC<CardItemProps> = ({ children, className = "" }) => {
    return (
        <div className={`flex items-center space-x-2 text-sm ${className}`}>
            {children}
        </div>
    );
};
