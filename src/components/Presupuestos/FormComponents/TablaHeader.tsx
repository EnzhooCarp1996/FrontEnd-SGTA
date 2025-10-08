interface TablaHeaderProps {
    columns: string[];
}

export const TablaHeader: React.FC<TablaHeaderProps> = ({ columns }) => (
    <thead>
        <tr className="bg-gray-300">
            {columns.map((col) => (
                <th key={col} className="border border-gray-600 px-2 py-1">{col}</th>
            ))}
        </tr>
    </thead>
);
