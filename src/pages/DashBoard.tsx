import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Logout from "@/components/Dashboard/Logout";

const DashboardPage: React.FC = () => {
  const { username } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col border rounded-2xl">
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
    </div>
  );
};

export default DashboardPage;
