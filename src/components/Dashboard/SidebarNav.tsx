import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutGrid,
  Users,
  UserCircle,
  FileText,
  FileDigit,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon, // Renamed to avoid conflict with potential Settings component
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', href: '#', icon: LayoutGrid, isActive: true },
  { name: 'Leads', href: '#', icon: Users },
  { name: 'Customers', href: '#', icon: UserCircle },
  { name: 'Proposals', href: '#', icon: FileText },
  { name: 'Invoices', href: '#', icon: FileDigit },
  { name: 'Items', href: '#', icon: ShoppingCart },
  { name: 'Mail', href: '#', icon: Mail },
  { name: 'Shoebox', href: '#', icon: Archive },
  { name: 'Calendar', href: '#', icon: CalendarDays },
];

const utilityNavItems: NavItem[] = [
  { name: 'Help', href: '#', icon: HelpCircle },
  { name: 'Settings', href: '#', icon: SettingsIcon },
  // The image shows 'Help' twice at the bottom, assuming one is generic help, another settings, and a third specific help if needed.
  // For simplicity, sticking to two distinct utility items as per common patterns.
];

const SidebarNav: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

  return (
    <nav className="flex flex-col h-full bg-sidebar text-sidebar-foreground w-64">
      <div className="p-4 mb-4">
        {/* Placeholder for Logo and company name if it were part of this component */}
        {/* <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-full" />
          <span className="font-semibold text-lg">Company</span>
        </div> */}
      </div>
      <div className="flex-grow p-4 space-y-1">
        {mainNavItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            onClick={() => setActiveItem(item.name)}
            className={cn(
              'w-full justify-start text-sm font-medium',
              item.name === activeItem
                ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            asChild
          >
            <a href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </a>
          </Button>
        ))}
      </div>
      <div className="p-4 mt-auto space-y-1 border-t border-border">
        {utilityNavItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            className="w-full justify-start text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
            asChild
          >
            <a href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </a>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default SidebarNav;
