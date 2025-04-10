
import React from 'react';
import TreeView from './TreeView';
import EnterpriseDataViewer from './EnterpriseDataViewer';

interface DatahubContentProps {
  activePage: string | null;
}

const DatahubContent: React.FC<DatahubContentProps> = ({ activePage }) => {
  // Determine if we should show the tree view
  const shouldShowTreeView = true; // Always show the tree view in the DatahubContent

  const renderContent = () => {
    switch (activePage) {
      case 'datahub-enterprise-data-viewer':
        return <EnterpriseDataViewer />;
      case 'datahub-data-mart':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data Mart (Golden Layer)</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access curated, business-ready data sets in the Golden Layer.
            </p>
          </div>
        );
      case 'datahub-data-lineage':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Data Lineage</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Trace the origin and transformation journey of your data.
            </p>
          </div>
        );
      case 'datahub-hutchml':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">HutchML</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Machine learning tools and models for your data analysis.
            </p>
          </div>
        );
      case 'datahub-connected-sources':
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Connected Data Sources</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all your connected data sources in one place.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Datahub</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select a section from the sidebar to view specific content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <h3 className="text-lg font-semibold">Enterprise Data Viewer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  View and explore your enterprise data structure
                </p>
              </div>
              <div className="p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <h3 className="text-lg font-semibold">Data Mart (Golden Layer)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Access curated, business-ready data sets
                </p>
              </div>
              <div className="p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <h3 className="text-lg font-semibold">Data Lineage</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Trace the origin and transformation journey of your data
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-1">
      {shouldShowTreeView && (
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <TreeView />
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default DatahubContent;
