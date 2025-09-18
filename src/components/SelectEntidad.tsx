import { Filter } from "lucide-react";
import React from "react";

interface Option<T> {
    value: T;
    label: string;
}

interface SelectEntidadProps<T> {
    value: T;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option<T>[];
    name: string;
    id?: string;
}

export const SelectEntidad = <T extends string>({ value, onChange, options, id, name }: SelectEntidadProps<T>) => {
    return (
        <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
                id={id || name}
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};





