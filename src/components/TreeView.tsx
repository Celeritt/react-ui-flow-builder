
import { useState } from "react";
import { ChevronRight, ChevronDown, Database, Server, FileText, Folder, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TreeNode {
  id: string;
  label: string;
  type: 'database' | 'folder' | 'file' | 'table' | 'server' | 'bucket';
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
            { id: "analytics-bucket", label: "analytics-bucket", type: "bucket" },
            { id: "app-data", label: "app-data", type: "bucket" }
          ]
        },
        { 
          id: "gcp", 
          label: "Google Cloud Storage", 
          type: "folder",
          isExpanded: false,
          children: [
            { id: "data-archive", label: "data-archive", type: "bucket" }
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
      case 'bucket':
        return <Folder size={16} className="text-amber-500 shrink-0" />;
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

  const handleCreateTable = (path: string) => {
    // Function to create table from path
    console.log("Creating table from path:", path);
    // Here you would call your backend function to create a table
    // createTableFromPath(path);
  };

  const renderTreeNodes = (nodes: TreeNode[], level = 0, path = "") => {
    return nodes.map(node => {
      const currentPath = path ? `${path}/${node.label}` : node.label;
      
      return (
        <div key={node.id} className="w-full">
          <div 
            className={cn(
              "flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer w-full group",
              { "ml-4": level > 0 }
            )}
          >
            <div 
              className="flex items-center flex-grow"
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

            {/* Add create table button for file nodes */}
            {(node.type === 'file' || node.type === 'bucket') && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateTable(currentPath);
                      }}
                    >
                      <Plus size={14} className="text-green-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create Table from this path</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {node.isExpanded && node.children && (
            <div className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-2">
              {renderTreeNodes(node.children, level + 1, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-2">
      {renderTreeNodes(treeData)}
    </div>
  );
};

export default TreeView;
