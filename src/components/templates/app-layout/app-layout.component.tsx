import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/organisms/navbar/navbar.component";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="border-b border-gray-200"></div>
      <main className="container mx-auto py-4">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
