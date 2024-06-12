import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

export default function Logout() {    
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Button
        onClick={handleLogout}
        className={`text-foreground transition-colors bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      >
        Logout
      </Button>
    </>
  );
}
