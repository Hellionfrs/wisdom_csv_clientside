import React from "react";
// import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Logout from "@/components/Dashboard/Logout";
import FileUpload from "@/components/Dashboard/FileUpload";
import DataTable from "@/components/Dashboard/DataTable";
import SubmitAllButton from "@/components/Dashboard/SubmitAllButton";

const DashboardPage: React.FC = () => {
  // const { username } = useAuth();

  return (
    <section className="flex min-h-screen w-full flex-col rounded-lg shadow-md border-2 border-gray-600">
      <header className="sticky top-0 flex h-16 items-center gap-8 justify-between border-b bg-background px-4 md:px-6">
        <nav className="flex items-center gap-4 md:gap-8">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            Upload
          </Link>
          <Link
            to="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Abaco
          </Link>
        </nav>

        <Logout />
      </header>
      <main className="flex flex-col gap-4 mt-4">
        <FileUpload />
        <DataTable />
        <SubmitAllButton />
      </main>
    </section>
  );
};

export default DashboardPage;
