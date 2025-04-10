
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Database, Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  lastModified?: string;
  children?: FileItem[];
  expanded?: boolean;
}

interface LakeToggleProps {
  initialTab?: string;
}

const LakeToggle: React.FC<LakeToggleProps> = ({ initialTab = "bronze" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sample data for each lake zone
  const bronzeData: FileItem[] = [
    {
      name: 'raw_sales_data',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'sales_2024-04-01.parquet', type: 'file', size: '456 MB', lastModified: '2024-04-01' },
        { name: 'sales_2024-04-02.parquet', type: 'file', size: '478 MB', lastModified: '2024-04-02' },
        { name: 'sales_2024-04-03.parquet', type: 'file', size: '502 MB', lastModified: '2024-04-03' }
      ]
    },
    {
      name: 'raw_customer_data',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'customers_2024-04.parquet', type: 'file', size: '1.2 GB', lastModified: '2024-04-01' }
      ]
    }
  ];

  const silverData: FileItem[] = [
    {
      name: 'clean_sales',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'sales_clean_2024-04.parquet', type: 'file', size: '1.4 GB', lastModified: '2024-04-03' }
      ]
    },
    {
      name: 'enriched_customers',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'customers_enriched_2024-04.parquet', type: 'file', size: '1.5 GB', lastModified: '2024-04-02' }
      ]
    }
  ];

  const goldData: FileItem[] = [
    {
      name: 'sales_aggregated',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'sales_by_region_2024-04.parquet', type: 'file', size: '240 MB', lastModified: '2024-04-03' },
        { name: 'sales_by_product_2024-04.parquet', type: 'file', size: '180 MB', lastModified: '2024-04-03' }
      ]
    },
    {
      name: 'analytics_ready',
      type: 'folder',
      expanded: false,
      children: [
        { name: 'customer_360_2024-04.parquet', type: 'file', size: '750 MB', lastModified: '2024-04-03' }
      ]
    }
  ];

  const [bronzeFiles, setBronzeFiles] = useState<FileItem[]>(bronzeData);
  const [silverFiles, setSilverFiles] = useState<FileItem[]>(silverData);
  const [goldFiles, setGoldFiles] = useState<FileItem[]>(goldData);

  const toggleFolder = (files: FileItem[], folderName: string): FileItem[] => {
    return files.map(file => {
      if (file.name === folderName && file.type === 'folder') {
        return { ...file, expanded: !file.expanded };
      }
      return file;
    });
  };

  const handleBronzeFolderToggle = (folderName: string) => {
    setBronzeFiles(toggleFolder(bronzeFiles, folderName));
  };

  const handleSilverFolderToggle = (folderName: string) => {
    setSilverFiles(toggleFolder(silverFiles, folderName));
  };

  const handleGoldFolderToggle = (folderName: string) => {
    setGoldFiles(toggleFolder(goldFiles, folderName));
  };

  const renderFileItem = (
    file: FileItem, 
    level: number = 0, 
    onToggle: (name: string) => void
  ) => {
    return (
      <div key={file.name} className="w-full">
        <div 
          className={cn(
            "flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded",
            { "cursor-pointer": file.type === "folder" }
          )}
          onClick={() => file.type === "folder" && onToggle(file.name)}
        >
          <div className="flex items-center flex-1">
            <div className="mr-2">
              {file.type === "folder" ? (
                file.expanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )
              ) : (
                <span className="w-4"></span>
              )}
            </div>
            
            <div className="mr-2">
              {file.type === "folder" ? (
                <Folder className="h-5 w-5 text-amber-500" />
              ) : (
                <FileText className="h-5 w-5 text-blue-500" />
              )}
            </div>
            
            <span className="text-sm font-medium">{file.name}</span>
          </div>
          
          {file.type === "file" && (
            <>
              <span className="text-xs text-gray-500 mr-4">{file.size}</span>
              <span className="text-xs text-gray-500">{file.lastModified}</span>
            </>
          )}
        </div>
        
        {file.type === "folder" && file.expanded && file.children && (
          <div className="ml-8 border-l border-gray-200 dark:border-gray-700 pl-2">
            {file.children.map(child => renderFileItem(child, level + 1, onToggle))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="bronze">Bronze Lake</TabsTrigger>
          <TabsTrigger value="silver">Silver Lake</TabsTrigger>
          <TabsTrigger value="gold">Gold Lake (Data Mart)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bronze" className="mt-4">
          <Card className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Bronze Lake - Raw Data Zone</h3>
              <Button variant="outline" size="sm">Upload Data</Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b">
                <div className="grid grid-cols-6">
                  <div className="col-span-3 text-sm font-medium">Name</div>
                  <div className="col-span-1 text-sm font-medium">Size</div>
                  <div className="col-span-2 text-sm font-medium">Last Modified</div>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {bronzeFiles.map(file => renderFileItem(file, 0, handleBronzeFolderToggle))}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="silver" className="mt-4">
          <Card className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Silver Lake - Cleaned Data Zone</h3>
              <Button variant="outline" size="sm">Process Data</Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b">
                <div className="grid grid-cols-6">
                  <div className="col-span-3 text-sm font-medium">Name</div>
                  <div className="col-span-1 text-sm font-medium">Size</div>
                  <div className="col-span-2 text-sm font-medium">Last Modified</div>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {silverFiles.map(file => renderFileItem(file, 0, handleSilverFolderToggle))}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="gold" className="mt-4">
          <Card className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Gold Lake - Analytics Ready Data</h3>
              <Button variant="outline" size="sm">Create View</Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b">
                <div className="grid grid-cols-6">
                  <div className="col-span-3 text-sm font-medium">Name</div>
                  <div className="col-span-1 text-sm font-medium">Size</div>
                  <div className="col-span-2 text-sm font-medium">Last Modified</div>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {goldFiles.map(file => renderFileItem(file, 0, handleGoldFolderToggle))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LakeToggle;
