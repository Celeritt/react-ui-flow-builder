
import { cn } from "@/lib/utils";
import DatahubContent from "./DatahubContent";
import BiCanvasContent from "./BiCanvasContent";
import WorksContent from "./WorksContent";
import QueryContent from "./QueryContent";
import { useState } from "react";

interface ContentAreaProps {
  activeSection: string | null;
  activePage: string | null;
}

interface ContentMapping {
  [key: string]: {
    [key: string]: {
      title: string;
      description: string;
    }
  }
}

const contentMapping: ContentMapping = {
  home: {
    'home-dashboard': {
      title: 'Dashboard',
      description: 'View your key metrics and recent activities'
    },
    'home-projects': {
      title: 'Projects',
      description: 'Manage your data projects'
    },
    'home-scheduler': {
      title: 'Scheduler',
      description: 'Schedule and manage recurring tasks'
    },
    'home-workflows': {
      title: 'Workflows',
      description: 'Create and manage your workflows'
    }
  },
  works: {
    'works-scheduler': {
      title: 'Scheduled Jobs',
      description: 'Schedule project tasks'
    },
    'works-workbooks': {
      title: 'Workbooks',
      description: 'Manage your workbooks'
    }
  },
  query: {
    'query-sql-editor': {
      title: 'SQL Editor',
      description: 'Run SQL queries on your data'
    },
    'query-saved-queries': {
      title: 'Saved Queries',
      description: 'View and manage saved queries'
    },
    'query-history': {
      title: 'Query History',
      description: 'View your query history'
    }
  },
  'bi-canvas': {
    'bi-canvas-vizualizer': {
      title: 'Add Viz Block',
      description: 'Create new data visualizations'
    },
    'bi-canvas-dashboards': {
      title: 'Dashboards',
      description: 'View and manage BI dashboards'
    }
  },
  admin: {
    'admin-users-roles': {
      title: 'Users & Roles',
      description: 'Manage users and their roles'
    },
    'admin-lakehouse': {
      title: 'Lakehouse Environment',
      description: 'Configure lakehouse environment settings'
    },
    'admin-sql-engine': {
      title: 'SQL Engine',
      description: 'Configure SQL engine settings'
    },
    'admin-catalog': {
      title: 'Catalog',
      description: 'Manage data catalog'
    },
    'admin-task-manager': {
      title: 'Task Manager',
      description: 'Manage data processing tasks'
    },
    'admin-task-status': {
      title: 'Task Status',
      description: 'View status of running tasks'
    },
    'admin-announcement': {
      title: 'Announcement',
      description: 'Manage platform announcements'
    },
    'admin-api-token': {
      title: 'API Access Token Manager',
      description: 'Manage API access tokens'
    }
  }
};

const ContentArea: React.FC<ContentAreaProps> = ({ activeSection, activePage }) => {
  const getContent = () => {
    // If user is on the home section or no section is selected, show the HomePage
    if (!activeSection) {
      return null;
    }

    // Handle special case for Datahub section
    if (activeSection === 'datahub') {
      return <DatahubContent activePage={activePage} />;
    }

    // Handle special case for BI Canvas section
    if (activeSection === 'bi-canvas') {
      return <BiCanvasContent activePage={activePage} />;
    }

    // Handle special case for Works section
    if (activeSection === 'works') {
      return <WorksContent activePage={activePage} />;
    }

    // Handle special case for Query section
    if (activeSection === 'query') {
      return <QueryContent activePage={activePage} />;
    }

    // Handle other sections
    if (!activePage) {
      return (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">{activeSection}</h2>
          <p className="text-gray-500 mt-2">Select a sub-item from the menu</p>
        </div>
      );
    }

    const content = contentMapping[activeSection]?.[activePage];
    
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{content?.title || activePage}</h2>
        <p className="text-gray-500 mt-2">{content?.description || "Content for this page"}</p>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-md font-medium text-gray-700">Backend Integration Note:</h3>
          <p className="text-gray-600 mt-2">
            This is where you would connect to your backend functions. Instead of API calls, you can 
            directly call your existing backend functions from here when users interact with the UI.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-3 text-sm overflow-x-auto">
{`// Example of integrating with your backend
function loadData() {
  // Instead of API call:
  // const data = await api.get('/endpoint');
  
  // Call your backend function directly:
  // import { yourBackendFunction } from '../path/to/backend';
  // const data = yourBackendFunction(params);
  
  // Then update the UI state with the result
}`}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      {getContent()}
    </div>
  );
};

export default ContentArea;
