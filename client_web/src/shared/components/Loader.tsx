import type React from "react";

export interface LoaderProps {
  content?: string;
}

const Loader: React.FC<LoaderProps> = ({ content = "Cargando..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65 z-50">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-28 h-28 border-4 border-transparent text-primary-600 text-4xl animate-spin flex items-center justify-center border-t-primary-600 rounded-full">
          <div className="w-24 h-24 border-4 border-transparent text-primary-900 text-2xl animate-spin flex items-center justify-center border-t-primary-900 rounded-full"></div>
        </div>
        <p className="text-white text-h6-semibold">{content}</p>
      </div>
    </div>
  );
};

export default Loader;
