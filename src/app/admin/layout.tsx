import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ReactNode } from "react";
import Providers from "./providers";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <Providers>
      <div className="min-h-screen bg-background flex overflow-hidden">
        <aside className="hidden lg:block">
          <AdminSidebar />
        </aside>
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto w-full pb-20">{children}</div>
          </div>
        </main>
      </div>
    </Providers>
  );
}
