
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

// Define TypeScript interfaces for our data structure
interface Node {
  id: string;
  name: string;
  type: 'database' | 'bucket' | 'folder' | 'file' | 'schema' | 'region' | 'table';
  children?: Node[];
}

interface OrganogramNode extends Node {}

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
        .then((fetchedData) => {
          // Check if we need to transform the data format
          let validatedData;
          if (fetchedData.enterpriseDataViewer) {
            // Format from the example - transform it
            validatedData = transformToOrganogramFormat(fetchedData.enterpriseDataViewer);
          } else {
            // Direct organogram format
            validatedData = validateOrganogramData(fetchedData);
          }
          setData(validatedData);
          setCurrentView(validatedData);
        })
        .catch(error => console.error("Error loading organogram data:", error));
    } else if (initialData) {
      const validatedData = validateOrganogramData(initialData);
      setCurrentView(validatedData);
    } else {
      // Default data
      const defaultData: OrganogramNode[] = getDefaultData();
      setData(defaultData);
      setCurrentView(defaultData);
    }
  }, [jsonPath, initialData]);

  // Transform data from example format to our organogram format
  const transformToOrganogramFormat = (node: any): OrganogramNode[] => {
    const transform = (inputNode: any, idPrefix = ''): OrganogramNode => {
      const id = `${idPrefix}${inputNode.name.replace(/\s+/g, '-').toLowerCase()}`;
      
      // Determine type based on any available information
      let type: OrganogramNode['type'] = 'folder';
      if (inputNode.type) {
        if (inputNode.type === 'file') type = 'file';
        else if (inputNode.type === 'schema') type = 'schema';
      } else if (inputNode.name.includes('DB') || inputNode.name.includes('Database')) {
        type = 'database';
      } else if (!inputNode.children || inputNode.children.length === 0) {
        type = 'file';
      }
      
      const result: OrganogramNode = {
        id,
        name: inputNode.name,
        type
      };
      
      if (inputNode.children && inputNode.children.length > 0) {
        result.children = inputNode.children.map((child: any, index: number) => 
          transform(child, `${id}-${index}-`)
        );
      }
      
      return result;
    };
    
    // Wrap in an array if it's a single root node
    const rootNode = transform(node);
    return [rootNode];
  };

  // Function to validate and fix the type property in the organogram data
  const validateOrganogramData = (data: any[]): OrganogramNode[] => {
    // Helper function to validate a single node
    const validateNode = (node: any): OrganogramNode => {
      // Ensure the type is one of the allowed values or default to 'folder'
      let validatedType: OrganogramNode['type'] = 'folder';
      
      if (['database', 'bucket', 'folder', 'file', 'schema', 'region', 'table'].includes(node.type)) {
        validatedType = node.type as OrganogramNode['type'];
      } else if (node.type === 'table') {
        validatedType = 'database'; // Map similar types to allowed ones
      }
      
      // Create a validated node
      const validatedNode: OrganogramNode = {
        id: node.id || `node-${Math.random().toString(36).substring(2, 9)}`,
        name: node.name || 'Unnamed',
        type: validatedType
      };
      
      // Recursively validate children if they exist
      if (node.children && Array.isArray(node.children) && node.children.length > 0) {
        validatedNode.children = node.children.map((child: any) => validateNode(child));
      }
      
      return validatedNode;
    };
    
    // Validate the entire data array
    return Array.isArray(data) ? data.map(node => validateNode(node)) : [];
  };

  // Get default hierarchical data
  const getDefaultData = (): OrganogramNode[] => {
    return [
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
    alert(`Table creation initiated from path: ${fullPath}`);
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
      if (file.type !== 'application/json') {
        alert("Please upload a valid JSON file.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          
          // Check format and process appropriately
          let processedData;
          if (jsonData.enterpriseDataViewer) {
            // Format from the example
            processedData = transformToOrganogramFormat(jsonData.enterpriseDataViewer);
          } else {
            // Direct organogram format
            processedData = validateOrganogramData(jsonData);
          }
          
          setData(processedData);
          setCurrentView(processedData);
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
      case 'table':
        return <FileText className="h-10 w-10 text-purple-500" />;
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
