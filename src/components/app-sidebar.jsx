import { Calendar, Home, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // Import useSidebar hook
} from "@/components/ui/sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar(); // Ambil state sidebar
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Fungsi untuk handle logout
  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari AuthContext
    navigate("/"); // Redirect ke halaman utama
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-start justify-start">
        {state === "collapsed" ? (
          <img
            src="/icon.png"
            alt="Icon"
            className="h-10 w-auto object-contain mt-8 mb-4"
          />
        ) : (
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain mt-8 mb-4 ml-6"
          />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sesuaikan tampilan tombol logout berdasarkan state sidebar */}
      <SidebarFooter>
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full gap-2 ${
              state === "collapsed" ? "justify-center" : "justify-start"
            }`} // Conditional alignment
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span className="text-sm">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
