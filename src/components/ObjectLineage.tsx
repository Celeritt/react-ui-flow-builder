
import React from 'react';
import { Database, Server, Folder, FileText, ArrowRight } from 'lucide-react';

interface LineageNode {
  id: string;
  name: string;
  type: 'database' | 'server' | 'folder' | 'file';
  children?: LineageNode[];
}

const ObjectLineage: React.FC = () => {
  // Sample lineage data based on the image provided
  const lineageData: LineageNode = {
    id: 'hutchlake',
    name: 'HutchLake',
    type: 'database',
    children: [
      {
        id: 's3',
        name: 'S3',
        type: 'folder',
        children: [
          {
            id: 's3-1',
            name: 'RS-1',
            type: 'file',
            children: [
              { id: 'result-1', name: 'RESULT_OF_TRAN_OUT_BASE1_R-1', type: 'file' }
            ]
          },
          {
            id: 's3-2',
            name: 'RS-2',
            type: 'file',
            children: [
              { id: 'result-2', name: 'RESULT_OF_TRAN_OUT_BASE2_R-1', type: 'file' }
            ]
          }
        ]
      },
      {
        id: 'mysql',
        name: 'MySQL',
        type: 'server',
        children: [
          {
            id: 'table-core',
            name: 'Table: core',
            type: 'file',
            children: [
              {
                id: 'company-created',
                name: 'COMPANY_ID, CREATED_AT_MIN, CREATED_AT_MAX',
                type: 'file'
              }
            ]
          }
        ]
      },
      {
        id: 'sqlserver',
        name: 'SQL Server',
        type: 'server',
        children: [
          {
            id: 'rs-2',
            name: 'RS-2',
            type: 'file',
            children: [
              {
                id: 'company-created-rs2',
                name: 'COMPANY_ID, CREATED_AT_MIN, CREATED_AT_MAX',
                type: 'file',
                children: [
                  { id: 'result-in-1', name: 'RESULT_OF_TRAN_IN_BASE1_R-1', type: 'file' }
                ]
              }
            ]
          },
          {
            id: 'rs-3',
            name: 'RS-3',
            type: 'file',
            children: [
              {
                id: 'company-first',
                name: 'COMPANY_ID, FIRST_IN_AMT, FIRST_OUT_AMT',
                type: 'file',
                children: [
                  { id: 'result-in-2', name: 'RESULT_OF_TRAN_IN_BASE2_R-1', type: 'file' }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  const renderNode = (node: LineageNode, level: number = 0, isLast: boolean = true, path: string[] = []): JSX.Element => {
    const currentPath = [...path, node.name];
    
    const getIcon = () => {
      switch (node.type) {
        case 'database':
          return <Database className="h-5 w-5 text-blue-500 mr-2" />;
        case 'server':
          return <Server className="h-5 w-5 text-purple-500 mr-2" />;
        case 'folder':
          return <Folder className="h-5 w-5 text-amber-500 mr-2" />;
        case 'file':
          return <FileText className="h-5 w-5 text-green-500 mr-2" />;
        default:
          return <FileText className="h-5 w-5 text-gray-500 mr-2" />;
      }
    };

    return (
      <div key={node.id} className="relative">
        <div className={`flex items-center p-2 ${level > 0 ? 'ml-6' : ''}`}>
          {getIcon()}
          <span className="text-sm font-medium">{node.name}</span>
        </div>
        
        {node.children && node.children.length > 0 && (
          <div className="border-l-2 border-gray-200 ml-2.5 pl-4">
            {node.children.map((child, index) => 
              renderNode(child, level + 1, index === node.children!.length - 1, currentPath)
            )}
          </div>
        )}
        
        {node.children && node.children.length > 0 && !isLast && (
          <div className="absolute left-2.5 top-7 h-full border-l-2 border-gray-200 z-10"></div>
        )}
      </div>
    );
  };

  const renderLineageGraph = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm overflow-auto">
        <div className="flex flex-col">
          {renderNode(lineageData)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Data Object Lineage</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        This diagram shows the lineage of data objects across different storage systems, 
        starting from HutchLake as the root node.
      </p>
      {renderLineageGraph()}
    </div>
  );
};

export default ObjectLineage;
