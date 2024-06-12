import React from "react";
import { Button } from "@/components/ui/button";
import { useFile } from "@/context/FileContext";

const SubmitAllButton: React.FC = () => {
  const { fileData } = useFile();

  const handleSubmitAll = () => {
    const completeRows = fileData
      .slice(1)
      .filter((row) => row.every((cell) => cell !== null && cell !== ""));

    // Lógica para enviar todas las filas completas al backend
    console.log("Enviar todas las filas completas:", completeRows);
  };

  return (
    <div className="p-4">
      <Button
        onClick={handleSubmitAll}
        className="w-full p-2 bg-green-500 text-white"
      >
        Enviar Todas las Filas Completas
      </Button>
    </div>
  );
};

export default SubmitAllButton;
