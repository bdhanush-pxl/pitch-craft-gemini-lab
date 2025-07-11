
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import CreatePage from '@/components/dashboard/CreatePage';
import LibraryPage from '@/components/dashboard/LibraryPage';
import RehearsalPage from '@/components/dashboard/RehearsalPage';

const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/create" replace />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/rehearsal" element={<RehearsalPage />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
