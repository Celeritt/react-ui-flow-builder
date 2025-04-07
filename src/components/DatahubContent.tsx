
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Upload, ArrowUpDown, FileUp, Database, Server } from "lucide-react";
import { useState } from "react";

interface DatahubContentProps {
  activePage: string | null;
}

const DatahubContent: React.FC<DatahubContentProps> = ({ activePage }) => {
  const [activeTab, setActiveTab] = useState("lake");
  
  const handleAwsLogin = () => {
    window.open("https://aws.amazon.com/console/", "_blank");
  };

  const handleGcsLogin = () => {
    window.open("https://console.cloud.google.com/", "_blank");
  };

  const handleAzureLogin = () => {
    window.open("https://portal.azure.com/", "_blank");
  };

  const renderLakeUpload = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Upload to Data Lake</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAwsLogin}>
            <div className="flex justify-center mb-4">
              <Database className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl text-center font-semibold mb-3">AWS S3</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Connect and upload data to Amazon S3 buckets.
            </p>
            <Button className="w-full">
              Login with AWS
              <ArrowUpDown className="ml-2" size={16} />
            </Button>
          </Card>
          
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleGcsLogin}>
            <div className="flex justify-center mb-4">
              <Database className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl text-center font-semibold mb-3">Google Cloud Storage</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Connect and upload data to Google Cloud Storage.
            </p>
            <Button className="w-full">
              Login with GCS
              <ArrowUpDown className="ml-2" size={16} />
            </Button>
          </Card>
          
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAzureLogin}>
            <div className="flex justify-center mb-4">
              <Database className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-xl text-center font-semibold mb-3">Azure Data Lake</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              Connect and upload data to Microsoft Azure Data Lake.
            </p>
            <Button className="w-full">
              Login with Azure
              <ArrowUpDown className="ml-2" size={16} />
            </Button>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Upload Local Files</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <FileUp className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Drag and drop files here, or click to select files
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Supported formats: CSV, JSON, Parquet, Avro (max 10GB)
              </p>
              <Button className="mt-4">
                <Upload className="mr-2" size={16} />
                Select Files
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderDatahubMain = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Datahub</h2>
        
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="lake">Data Lake</TabsTrigger>
            <TabsTrigger value="warehouse">Data Warehouse</TabsTrigger>
            <TabsTrigger value="catalog">Data Catalog</TabsTrigger>
            <TabsTrigger value="lineage">Data Lineage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lake" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data Lake Overview</h3>
              <p className="mb-4">
                Your data lake stores raw data in its native format. Browse and manage your data lake contents here.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md">
                  <h4 className="font-medium">Storage Usage</h4>
                  <p className="text-2xl font-bold mt-2">1.24 TB</p>
                  <p className="text-sm text-gray-500">of 5TB allocated</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md">
                  <h4 className="font-medium">Files</h4>
                  <p className="text-2xl font-bold mt-2">24,651</p>
                  <p className="text-sm text-gray-500">across all buckets</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-md">
                  <h4 className="font-medium">Last Updated</h4>
                  <p className="text-2xl font-bold mt-2">2 hours ago</p>
                  <p className="text-sm text-gray-500">by data pipeline</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button variant="outline">Browse Lake</Button>
                <Button onClick={() => setActiveTab("upload")}>
                  <Upload className="mr-2" size={16} />
                  Upload to Lake
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="warehouse" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data Warehouse</h3>
              <p className="mb-4">
                Your data warehouse contains structured, processed data ready for analytics.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium">Schemas</h4>
                  <p className="text-2xl font-bold mt-2">12</p>
                  <p className="text-sm text-gray-500">production schemas</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-medium">Tables</h4>
                  <p className="text-2xl font-bold mt-2">342</p>
                  <p className="text-sm text-gray-500">total tables</p>
                </div>
              </div>
              
              <Button>
                <Server className="mr-2" size={16} />
                Manage Warehouse
              </Button>
            </Card>
          </TabsContent>
          
          <TabsContent value="catalog" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data Catalog</h3>
              <p className="mb-4">
                Browse and search the data catalog to discover available datasets.
              </p>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search the data catalog..."
                  className="w-full p-2 pl-10 border border-gray-300 rounded"
                />
                <div className="absolute left-3 top-2.5">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Popular Datasets</h4>
              <ul className="space-y-2 mb-6">
                <li className="bg-gray-50 dark:bg-gray-800 p-3 rounded">sales_transactions</li>
                <li className="bg-gray-50 dark:bg-gray-800 p-3 rounded">customer_profiles</li>
                <li className="bg-gray-50 dark:bg-gray-800 p-3 rounded">product_inventory</li>
                <li className="bg-gray-50 dark:bg-gray-800 p-3 rounded">marketing_campaigns</li>
              </ul>
              
              <Button>Browse Full Catalog</Button>
            </Card>
          </TabsContent>
          
          <TabsContent value="lineage" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Data Lineage</h3>
              <p className="mb-4">
                Explore the origin and transformation journey of your data assets.
              </p>
              
              <div className="h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-md mb-6">
                <p className="text-gray-500">Data lineage visualization will appear here</p>
              </div>
              
              <Button>View Full Lineage Graph</Button>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            {renderLakeUpload()}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Render content based on the active page
  if (activePage === 'datahub-upload') {
    return renderLakeUpload();
  } else {
    return renderDatahubMain();
  }
};

export default DatahubContent;
