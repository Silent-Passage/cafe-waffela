import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ReactNode } from "react";
import Providers from "./providers";

export const metadata = {
  title: "Waffela Admin",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </Providers>
  );
}
