import SideNav from '@/components/ui/dashboard/sidenav';
// export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="w-full flex-none ">
        <SideNav />
      </div>
      <div className="flex-grow p-3 md:overflow-y-auto md:p-6">{children}</div>
    </div>
  );
}