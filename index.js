
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Scan, Star, MessageSquare, Info, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Face Recognition",
    url: createPageUrl("FaceRecognition"),
    icon: Scan,
    gradient: "from-purple-500 to-pink-500"
  },
  // Removed "Celebrity ID" item
  {
    title: "Live Chat",
    url: createPageUrl("Chat"),
    icon: MessageSquare,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "About",
    url: createPageUrl("About"),
    icon: Info,
    gradient: "from-slate-500 to-gray-500"
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#0A0A0F]">
        <style>{`
          :root {
            --sidebar-background: #13131A;
            --sidebar-foreground: #E5E5E7;
            --sidebar-border: #1F1F28;
            --primary: #6366F1;
            --primary-foreground: #FFFFFF;
          }
          
          @keyframes glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          .glow-effect {
            animation: glow 3s ease-in-out infinite;
          }
        `}</style>
        
        <Sidebar className="border-r border-[#1F1F28] bg-[#13131A]">
          <SidebarHeader className="border-b border-[#1F1F28] p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 glow-effect" />
                <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl text-white">AI Vision</h2>
                <p className="text-xs text-gray-400">Recognition Suite</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`relative overflow-hidden transition-all duration-300 rounded-xl ${
                            isActive ? 'bg-[#1F1F28]' : 'hover:bg-[#1A1A22]'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            {isActive && (
                              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10`} />
                            )}
                            <div className={`relative p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${!isActive && 'opacity-70'}`}>
                              <item.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className={`relative font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-[#13131A] border-b border-[#1F1F28] px-6 py-4 md:hidden sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-white hover:bg-[#1F1F28] p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold text-white">AI Vision</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
