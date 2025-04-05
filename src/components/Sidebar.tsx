
import { useState } from 'react';
import { ChevronDown, ChevronRight, Database, FileText, Home, Search, Settings, User, Layers, Server, Book, Clipboard, Bell, Key } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  activePage: string | null;
  setActivePage: (page: string | null) => void;
}

interface MenuItemProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  isActive?: boolean;
  isExpanded?: boolean;
  onClick: () => void;
  onChildClick?: (childId: string) => void;
  level?: number;
  isAdmin?: boolean;
  currentUserIsAdmin?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  isAdmin?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  id, 
  label, 
  icon, 
  children, 
  isActive = false, 
  isExpanded = false, 
  onClick, 
  onChildClick,
  level = 0,
  isAdmin = false,
  currentUserIsAdmin = false
}) => {
  // Don't render admin items if user is not an admin
  if (isAdmin && !currentUserIsAdmin) return null;
  
  return (
    <div className="w-full">
      <div 
        className={cn(
          "flex items-center px-3 py-2 rounded-md cursor-pointer text-sm", 
          isActive ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "hover:bg-gray-100 dark:hover:bg-gray-800",
          level > 0 && "ml-4"
        )}
        onClick={onClick}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span className="flex-1">{label}</span>
        {children && children.length > 0 && (
          <span className="ml-auto">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </div>
      
      {isExpanded && children && children.length > 0 && (
        <div className="ml-2 mt-1 border-l-2 border-gray-200 dark:border-gray-700">
          {children.map((child) => (
            <div 
              key={child.id}
              className={cn(
                "flex items-center px-3 py-2 ml-4 rounded-md cursor-pointer text-sm",
                activePage === child.id ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              onClick={() => onChildClick && onChildClick(child.id)}
            >
              {child.icon && <span className="mr-2">{child.icon}</span>}
              <span>{child.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  activePage, 
  setActivePage 
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  // For demonstration, you would connect this to your auth system
  const currentUserIsAdmin = true;

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={18} />,
      children: [
        { id: 'home-dashboard', label: 'Dashboard' },
        { id: 'home-projects', label: 'Projects' },
        { id: 'home-scheduler', label: 'Scheduler' },
        { id: 'home-workflows', label: 'Workflows' }
      ]
    },
    {
      id: 'datahub',
      label: 'Datahub',
      icon: <Database size={18} />,
      children: [
        { id: 'datahub-connectors', label: 'Connectors' },
        { id: 'datahub-upload', label: 'Upload' },
        { id: 'datahub-datapool', label: 'Data Pool' },
        { id: 'datahub-external', label: 'External' }
      ]
    },
    {
      id: 'bi-canvas',
      label: 'BI Canvas',
      icon: <FileText size={18} />,
      children: [
        { id: 'bi-canvas-vizualizer', label: 'Add Vizualizer' },
        { id: 'bi-canvas-dashboards', label: 'Dashboards' }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FileText size={18} />,
      children: [
        { id: 'projects-scheduler', label: 'Scheduler' }
      ]
    },
    {
      id: 'query',
      label: 'Query',
      icon: <Search size={18} />,
      children: [
        { id: 'query-sql-lab', label: 'SQL Lab' },
        { id: 'query-workbooks', label: 'Workbooks' }
      ]
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: <Settings size={18} />,
      isAdmin: true,
      children: [
        { id: 'admin-users-roles', label: 'Users & Roles', icon: <User size={16} /> },
        { id: 'admin-lakehouse', label: 'Lakehouse Environment', icon: <Layers size={16} /> },
        { id: 'admin-sql-engine', label: 'SQL Engine', icon: <Server size={16} /> },
        { id: 'admin-catalog', label: 'Catalog', icon: <Book size={16} /> },
        { id: 'admin-task-manager', label: 'Task Manager', icon: <Clipboard size={16} /> },
        { id: 'admin-task-status', label: 'Task Status', icon: <Clipboard size={16} /> },
        { id: 'admin-announcement', label: 'Announcement', icon: <Bell size={16} /> },
        { id: 'admin-api-token', label: 'API Access Token Manager', icon: <Key size={16} /> },
      ]
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setExpandedSections(prev => ({ 
      ...prev, 
      [sectionId]: !prev[sectionId] 
    }));
    
    if (activeSection !== sectionId) {
      setActiveSection(sectionId);
      setActivePage(null);
    }
  };

  const handlePageClick = (sectionId: string, pageId: string) => {
    setActiveSection(sectionId);
    setActivePage(pageId);
  };

  return (
    <div className="w-64 h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Data Platform</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            children={item.children}
            isActive={activeSection === item.id}
            isExpanded={expandedSections[item.id]}
            onClick={() => handleSectionClick(item.id)}
            onChildClick={(childId) => handlePageClick(item.id, childId)}
            isAdmin={item.isAdmin}
            currentUserIsAdmin={currentUserIsAdmin}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Settings size={16} className="mr-2" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
