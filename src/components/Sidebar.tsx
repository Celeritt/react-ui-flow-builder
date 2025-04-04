
import { useState } from 'react';
import { ChevronDown, ChevronRight, Database, FileText, Home, Search, Settings } from 'lucide-react';
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
}

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
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
  level = 0 
}) => {
  return (
    <div className="w-full">
      <div 
        className={cn(
          "flex items-center px-3 py-2 rounded-md cursor-pointer text-sm", 
          isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100",
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
        <div className="ml-2 mt-1 border-l-2 border-gray-200">
          {children.map((child) => (
            <div 
              key={child.id}
              className={cn(
                "flex items-center px-3 py-2 ml-4 rounded-md cursor-pointer text-sm",
                id === child.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
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
      id: 'data-dashboard',
      label: 'Data Dashboard',
      icon: <Database size={18} />,
      children: [
        { id: 'data-dashboard-schema', label: 'Schema' }
      ]
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      icon: <Settings size={18} />,
      children: [
        { id: 'collaboration-folders', label: 'Folders' }
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
    <div className="w-64 h-full flex flex-col border-r border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Data Platform</h1>
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
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <Settings size={16} className="mr-2" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
