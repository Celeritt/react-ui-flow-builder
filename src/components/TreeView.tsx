
import { useState } from "react";
import { ChevronRight, ChevronDown, Database, Server, FileText, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeNode {
  id: string;
  label: string;
  type: 'database' | 'folder' | 'file' | 'table' | 'server';
  children?: TreeNode[];
  isExpanded?: boolean;
}

const TreeView = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: "hutchdb",
      label: "HutchDB (default)",
      type: "database",
      isExpanded: false,
      children: [
        {
          id: "tables",
          label: "Tables",
          type: "folder",
          isExpanded: false,
          children: [
            { id: "album", label: "Album", type: "table" },
            { id: "artist", label: "Artist", type: "table" },
            { id: "customer", label: "Customer", type: "table" },
            { id: "employee", label: "Employee", type: "table" },
            { id: "genre", label: "Genre", type: "table" },
            { id: "invoiceline", label: "InvoiceLine", type: "table" },
            { id: "mediatype", label: "MediaType", type: "table" },
            { id: "playlist", label: "Playlist", type: "table" },
            { id: "playlisttrack", label: "PlaylistTrack", type: "table" },
            { id: "track", label: "Track", type: "table" }
          ]
        },
        {
          id: "views",
          label: "Views",
          type: "folder",
          isExpanded: false,
          children: [
            { id: "indexes", label: "Indexes", type: "file" },
            { id: "sequences", label: "Sequences", type: "file" },
            { id: "datatypes", label: "Data Types", type: "file" }
          ]
        }
      ]
    },
    {
      id: "postgresql",
      label: "postgres3.localhost:5432",
      type: "server",
      isExpanded: false,
      children: [
        { id: "schemas", label: "Schemas", type: "folder" },
        { id: "tables", label: "Tables", type: "folder" },
        { id: "functions", label: "Functions", type: "folder" }
      ]
    },
    {
      id: "classic",
      label: "Classic",
      type: "database",
      isExpanded: false
    },
    {
      id: "cloud",
      label: "Cloud",
      type: "database",
      isExpanded: false,
      children: [
        { 
          id: "aws", 
          label: "AWS S3", 
          type: "folder",
          isExpanded: false,
          children: [
            { id: "analytics-bucket", label: "analytics-bucket", type: "folder" },
            { id: "app-data", label: "app-data", type: "folder" }
          ]
        },
        { 
          id: "gcp", 
          label: "Google Cloud Storage", 
          type: "folder",
          isExpanded: false,
          children: [
            { id: "data-archive", label: "data-archive", type: "folder" }
          ]
        }
      ]
    },
    {
      id: "embedded",
      label: "Embedded",
      type: "database",
      isExpanded: false
    }
  ]);

  const getNodeIcon = (nodeType: string) => {
    switch (nodeType) {
      case 'database':
        return <Database size={16} className="text-blue-500 shrink-0" />;
      case 'server':
        return <Server size={16} className="text-purple-500 shrink-0" />;
      case 'table':
        return <FileText size={16} className="text-green-500 shrink-0" />;
      case 'file':
        return <FileText size={16} className="text-yellow-500 shrink-0" />;
      case 'folder':
        return <Folder size={16} className="text-gray-500 shrink-0" />;
      default:
        return <FileText size={16} className="text-gray-500 shrink-0" />;
    }
  };

  const toggleNode = (nodeId: string, nodes: TreeNode[]): TreeNode[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, isExpanded: !node.isExpanded };
      }
      
      if (node.children) {
        return {
          ...node,
          children: toggleNode(nodeId, node.children)
        };
      }
      
      return node;
    });
  };

  const handleToggle = (nodeId: string) => {
    setTreeData(toggleNode(nodeId, treeData));
  };

  const renderTreeNodes = (nodes: TreeNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.id} className="w-full">
        <div 
          className={cn(
            "flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer w-full",
            { "ml-4": level > 0 }
          )}
          onClick={() => node.children && node.children.length > 0 && handleToggle(node.id)}
        >
          {node.children && node.children.length > 0 ? (
            <span className="mr-1">
              {node.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          ) : (
            <span className="w-3.5 mr-1"></span>
          )}
          
          <span className="mr-2">{getNodeIcon(node.type)}</span>
          <span className="text-sm truncate">{node.label}</span>
        </div>
        
        {node.isExpanded && node.children && (
          <div className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-2">
            {renderTreeNodes(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="p-2">
      {renderTreeNodes(treeData)}
    </div>
  );
};

export default TreeView;
