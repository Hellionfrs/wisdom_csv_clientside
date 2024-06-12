import { useFile } from "@/context/FileContext";
import { useState } from "react";
import Papa from "papaparse";
import { Input } from "../ui/input";
const FileUpload: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { setFileData } = useFile();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("No file selected");
      return;
    }

    Papa.parse(file, {
      header: false,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(results.errors[0].code);
        } else {
          setFileData(results.data as any[][]);
          setError(null);
        }
      },
    });
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="border p-2"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
