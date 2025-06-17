import React from 'react';
import SidebarNav from '../components/Dashboard/SidebarNav';
import TopHeader from '../components/Dashboard/TopHeader'; 
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import LeadTrackingChart from '../components/Dashboard/LeadTrackingChart';
import DataSummaryCards from '../components/Dashboard/DataSummaryCards';
import { cn } from '@/lib/utils';

const IndexPage: React.FC = () => {
  // For "Leads Tracking Dashboard Clone" and "targetPage: Leads Overview",
  // this state manages the Sales/Leads tabs shown in the reference image.
  const [activeTab, setActiveTab] = React.useState<'Sales' | 'Leads'>('Leads');

  return (
    <div className="grid h-screen grid-cols-[256px_1fr] grid-rows-[64px_1fr] bg-background text-foreground">
      {/* Sidebar */}
      <div className="row-span-2 border-r border-border">
        {/* SidebarNav component handles its own width (w-64), height (h-full) and background (bg-sidebar) */}
        {/* The outer div provides the grid cell and right border. bg-sidebar is handled by SidebarNav. */}
        <SidebarNav />
      </div>

      {/* Header */}
      <header className="col-start-2 row-start-1 border-b border-border bg-card">
        {/* TopHeader component is expected to manage its internal layout (title, create button) 
            and adhere to the h-16 (64px) height. It should handle its own padding (e.g. px-4 py-2).
            The bg-card here provides a background for the header area. */}
        <TopHeader />
      </header>

      {/* Main Content */}
      <main className="col-start-2 row-start-2 overflow-y-auto p-6">
        {/* Tabs for Sales/Leads - specific to this dashboard page based on image */}
        <div className="mb-6 flex border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab('Sales')}
            className={cn(
              "px-4 pb-2 pt-1 text-sm font-medium -mb-px", // -mb-px for border overlap
              activeTab === 'Sales'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
            )}
          >
            Sales
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('Leads')}
            className={cn(
              "ml-4 px-4 pb-2 pt-1 text-sm font-medium -mb-px", // ml-4 for spacing
              activeTab === 'Leads'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
            )}
          >
            Leads
          </button>
        </div>

        {/* Conditional content based on active tab */}
        {activeTab === 'Leads' && (
          <div className="space-y-6">
            <StatsCardGrid />
            <LeadTrackingChart />
            <DataSummaryCards />
          </div>
        )}
        {activeTab === 'Sales' && (
          <div className="flex h-full flex-col items-center justify-center pt-16 text-muted-foreground">
            {/* Placeholder for Sales content */}
            <p className="text-xl font-semibold">Sales Data Overview</p>
            <p className="mt-2 text-sm text-center max-w-md">
              Detailed sales analytics, performance metrics, and revenue reports would be displayed here. 
              This section is currently under development.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default IndexPage;
