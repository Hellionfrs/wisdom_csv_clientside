import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFile } from "@/context/FileContext";

const DataTable: React.FC = () => {
  const { fileData, setFileData } = useFile();
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newData = [...fileData];
    newData[rowIndex][colIndex] = value;
    setFileData(newData);
  };

  const isRowComplete = (row: any[]) => {
    return row.every((cell) => cell !== null && cell !== "");
  };

  const handleRowSubmit = (rowIndex: number) => {
    const row = fileData[rowIndex];
    // Lógica para enviar la fila al backend
    console.log("Enviar fila al backend:", row);
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            {fileData[0]?.map((_, colIndex) => (
              <th key={colIndex} className="border p-2">
                Columna {colIndex + 1}
              </th>
            ))}
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fileData.slice(1).map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={isRowComplete(row) ? "bg-green-100" : "bg-red-100"}
            >
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {editIndex === rowIndex ? (
                    <input
                      value={cell}
                      onChange={(e) =>
                        handleInputChange(
                          rowIndex + 1,
                          colIndex,
                          e.target.value
                        )
                      }
                      className="border p-1"
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
              <td className="border p-2">
                {editIndex === rowIndex ? (
                  <Button onClick={() => setEditIndex(null)} className="p-1">
                    Guardar
                  </Button>
                ) : (
                  <Button
                    onClick={() => setEditIndex(rowIndex)}
                    className="p-1"
                  >
                    Editar
                  </Button>
                )}
                <Button
                  onClick={() => handleRowSubmit(rowIndex + 1)}
                  className="p-1 ml-2"
                >
                  Enviar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
