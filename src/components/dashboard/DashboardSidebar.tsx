
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mic, Plus, Library, Timer, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const navigationItems = [{
  title: 'Create',
  url: '/dashboard/create',
  icon: Plus
}, {
  title: 'Library',
  url: '/dashboard/library',
  icon: Library
}, {
  title: 'Rehearsal',
  url: '/dashboard/rehearsal',
  icon: Timer
}];

export function DashboardSidebar() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-green-400 rounded-lg flex items-center justify-center shadow-lg border border-primary/20">
              <Mic className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-md"></div>
          </div>
          <span className="font-bold font-poppins text-xl">PitchCraft</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`
                    }>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
