import React from "react";

interface GridDosColumnasProps {
  children: React.ReactNode;
}

export const GridColumnas: React.FC<GridDosColumnasProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
};