import { useState, useEffect } from "react";
import { Database, Folder, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrganogramNode {
  id: string;
  name: string;
  type: 'database' | 'bucket' | 'folder' | 'file' | 'schema' | 'region' | 'server';
  children?: OrganogramNode[];
}

interface DataOrganogramProps {
  initialData?: OrganogramNode[];
  jsonPath?: string;
}

const DataOrganogram: React.FC<DataOrganogramProps> = ({ initialData, jsonPath }) => {
  const [data, setData] = useState<OrganogramNode[]>(initialData || []);
  const [currentPath, setCurrentPath] = useState<OrganogramNode[]>([]);
  const [currentView, setCurrentView] = useState<OrganogramNode[]>([]);

  useEffect(() => {
    if (jsonPath) {
      // Load data from JSON file
      fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
          // Ensure data has the correct type properties
          const typedData = ensureCorrectTypes(data);
          setData(Array.isArray(typedData) ? typedData : [typedData]);
          setCurrentView(Array.isArray(typedData) ? typedData : [typedData]);
        })
        .catch(error => console.error("Error loading organogram data:", error));
    } else if (initialData) {
      setCurrentView(initialData);
    } else {
      // Default data structure if no data is provided
      const defaultData: OrganogramNode[] = [
        {
          id: "hutchlake",
          name: "HutchLake",
          type: "database",
          children: [
            {
              id: "sqlserver",
              name: "SQL Server",
              type: "database",
              children: [
                { id: "northwind", name: "Northwind", type: "database" },
                { id: "adventureworks", name: "AdventureWorks", type: "database" }
              ]
            },
            {
              id: "postgres",
              name: "PostgreSQL",
              type: "database",
              children: [
                { id: "analytics", name: "Analytics", type: "database" },
                { id: "operational", name: "Operational", type: "database" }
              ]
            },
            {
              id: "snowflake",
              name: "Snowflake",
              type: "database",
              children: [
                { id: "datawarehouse", name: "Data Warehouse", type: "database" },
                { id: "datamart", name: "Data Mart", type: "database" }
              ]
            },
            {
              id: "s3",
              name: "S3",
              type: "bucket",
              children: [
                {
                  id: "finance",
                  name: "Finance",
                  type: "bucket",
                  children: [
                    {
                      id: "africa",
                      name: "Africa",
                      type: "region",
                      children: [
                        {
                          id: "procurement",
                          name: "Procurement",
                          type: "folder",
                          children: Array(10).fill(0).map((_, i) => (
                            { id: `file${i+1}`, name: `finance_africa_data_part${i+1}.parquet`, type: "file" }
                          ))
                        }
                      ]
                    },
                    {
                      id: "sa",
                      name: "SA",
                      type: "region",
                      children: [
                        { id: "reports", name: "Reports", type: "folder" }
                      ]
                    }
                  ]
                },
                {
                  id: "sales",
                  name: "Sales",
                  type: "bucket"
                },
                {
                  id: "hr",
                  name: "HR",
                  type: "bucket"
                }
              ]
            },
            {
              id: "adls",
              name: "ADLS",
              type: "bucket"
            },
            {
              id: "gcs",
              name: "GCS",
              type: "bucket"
            }
          ]
        }
      ];
      
      setData(defaultData);
      setCurrentView(defaultData);
    }
  }, [jsonPath, initialData]);

  // Helper function to ensure all nodes have correct type values
  const ensureCorrectTypes = (node: any): OrganogramNode | OrganogramNode[] => {
    if (Array.isArray(node)) {
      return node.map(item => ensureCorrectTypes(item)) as OrganogramNode[];
    }
    
    // Assign a valid type if the current one isn't valid
    const validType = (node.type === 'database' || 
                       node.type === 'bucket' || 
                       node.type === 'folder' || 
                       node.type === 'file' || 
                       node.type === 'schema' || 
                       node.type === 'region' || 
                       node.type === 'server') ? node.type : 'folder';
    
    const processedNode: OrganogramNode = {
      id: node.id || `node-${Math.random().toString(36).substr(2, 9)}`,
      name: node.name,
      type: validType
    };
    
    if (node.children && node.children.length > 0) {
      processedNode.children = node.children.map((child: any) => ensureCorrectTypes(child)) as OrganogramNode[];
    }
    
    return processedNode;
  };

  const handleNodeClick = (node: OrganogramNode) => {
    if (node.children && node.children.length > 0) {
      setCurrentPath([...currentPath, node]);
      setCurrentView(node.children);
    }
  };

  const handleCreateTable = (node: OrganogramNode) => {
    // Function to create table from path
    const fullPath = [...currentPath.map(p => p.name), node.name].join('/');
    console.log("Creating table from path:", fullPath);
    // Here you would call your backend function to create a table from this path
    // createTableFromPath(fullPath, node);
  };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      
      if (newPath.length === 0) {
        setCurrentView(data);
      } else {
        const parentNode = newPath[newPath.length - 1];
        setCurrentView(parentNode.children || []);
      }
      
      setCurrentPath(newPath);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          setData(jsonData);
          setCurrentView(jsonData);
          setCurrentPath([]);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON format. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <Database className="h-10 w-10 text-blue-500" />;
      case 'bucket':
        return <Folder className="h-10 w-10 text-amber-500" />;
      case 'folder':
        return <Folder className="h-10 w-10 text-gray-500" />;
      case 'file':
        return <FileText className="h-10 w-10 text-yellow-500" />;
      case 'region':
        return <Folder className="h-10 w-10 text-green-500" />;
      case 'server':
        return <Database className="h-10 w-10 text-purple-500" />;
      case 'schema':
        return <FileText className="h-10 w-10 text-indigo-500" />;
      default:
        return <Folder className="h-10 w-10" />;
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-4 overflow-x-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setCurrentPath([]);
            setCurrentView(data);
          }} 
          className="flex-shrink-0"
        >
          Root
        </Button>
        
        {currentPath.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                const newPath = currentPath.slice(0, index + 1);
                setCurrentPath(newPath);
                const targetNode = newPath[newPath.length - 1];
                setCurrentView(targetNode.children || []);
              }}
              className="flex-shrink-0"
            >
              {item.name}
            </Button>
          </div>
        ))}
      </div>

      {/* File upload area */}
      <div className="mb-4 p-2 border border-dashed rounded-md">
        <p className="text-sm mb-2">Upload custom JSON organogram structure:</p>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileUpload} 
          className="text-sm"
        />
      </div>

      {/* Back button */}
      {currentPath.length > 0 && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackClick} 
          className="mb-4"
        >
          ← Back
        </Button>
      )}

      {/* Node grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentView.map(node => (
          <Card 
            key={node.id} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer relative group"
            onClick={() => handleNodeClick(node)}
          >
            <div className="flex flex-col items-center text-center">
              {getNodeIcon(node.type)}
              <h4 className="font-medium mt-2">{node.name}</h4>
              <p className="text-xs text-gray-500 capitalize">{node.type}</p>
            </div>

            {/* Show create table button for files and folders */}
            {['file', 'folder', 'bucket'].includes(node.type) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateTable(node);
                      }}
                    >
                      <Plus size={16} className="text-green-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create Table from this path</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataOrganogram;
