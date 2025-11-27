import { Outlet } from "react-router-dom";
import Navbar from "@/components/organisms/navbar/navbar.component";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="border-b border-gray-200"></div>
      <main className="container mx-auto py-10">
        <Outlet />
      </main>
    </div>
  );
}
