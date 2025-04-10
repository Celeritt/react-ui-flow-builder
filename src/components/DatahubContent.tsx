
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Upload, ArrowUpDown, FileUp, Database, Server, Search, Folder, FileText, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import TreeView from "./TreeView";
import { cn } from "@/lib/utils";
import DataOrganogram from "./DataOrganogram";
import WorldMapViewer from "./WorldMapViewer";

interface DatahubContentProps {
  activePage: string | null;
}

const DatahubContent: React.FC<DatahubContentProps> = ({ activePage }) => {
  const [activeTab, setActiveTab] = useState("lake");
  const [treeViewVisible, setTreeViewVisible] = useState(true);
  
  const handleAwsLogin = () => {
    window.open("https://aws.amazon.com/console/", "_blank");
  };

  const handleGcsLogin = () => {
    window.open("https://console.cloud.google.com/", "_blank");
  };

  const handleAzureLogin = () => {
    window.open("https://portal.azure.com/", "_blank");
  };
  
  const toggleTreeView = () => {
    setTreeViewVisible(!treeViewVisible);
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
        
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Welcome to Datahub</h3>
          <p className="mb-4">
            Datahub is your comprehensive view into all of your data sources, whether on-premises or in the cloud. 
            Our Giraffe Engine seamlessly integrates with your existing data infrastructure, allowing you to access, 
            manage, and analyze all your data from one central location.
          </p>
          <p className="mb-6">
            With Hutch's Datahub, your data becomes instantly available in your runtime environment without 
            complex ETL processes or data movement, providing real-time access to your most valuable asset - your data.
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
              <h4 className="font-medium">Connected Sources</h4>
              <p className="text-2xl font-bold mt-2">7</p>
              <p className="text-sm text-gray-500">data sources</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button>
              Browse Lake
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("upload")}>
              <Upload className="mr-2" size={16} />
              Upload to Lake
            </Button>
          </div>
        </Card>
      </div>
    );
  };
  
  const renderEnterpriseDataViewer = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Enterprise Data Viewer</h2>
        
        <Tabs defaultValue="lake-viewer" className="w-full">
          <TabsList>
            <TabsTrigger value="lake-viewer">Data Lake Viewer</TabsTrigger>
            <TabsTrigger value="hutchmap">HutchMap Atlas Viewer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lake-viewer" className="space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Data Lake Browser</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Refresh</Button>
                  <Button size="sm">Export</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <Folder className="h-8 w-8 text-amber-500 mb-2" />
                  <h4 className="font-medium">Bronze Zone</h4>
                  <p className="text-sm text-gray-500">Raw data landing</p>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <Folder className="h-8 w-8 text-gray-400 mb-2" />
                  <h4 className="font-medium">Silver Zone</h4>
                  <p className="text-sm text-gray-500">Refined data</p>
                </Card>
                
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <Folder className="h-8 w-8 text-yellow-400 mb-2" />
                  <h4 className="font-medium">Gold Zone</h4>
                  <p className="text-sm text-gray-500">Analytics-ready data</p>
                </Card>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Bronze Zone / raw_sales_data / 2024-04</h4>
                  <div>
                    <Button variant="ghost" size="sm">
                      <Search size={16} className="mr-1" /> Search
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <span>sales_2024-04-01.parquet</span>
                    <span className="ml-auto text-xs text-gray-500">248.5 MB</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <span>sales_2024-04-02.parquet</span>
                    <span className="ml-auto text-xs text-gray-500">256.2 MB</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <span>sales_2024-04-03.parquet</span>
                    <span className="ml-auto text-xs text-gray-500">251.8 MB</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-4">Data Organogram</h3>
              <DataOrganogram jsonPath="/data-organogram.json" />
            </Card>
          </TabsContent>
          
          <TabsContent value="hutchmap" className="space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">HutchMap Atlas Viewer</h3>
                <div>
                  <Button size="sm">
                    <Search size={16} className="mr-1" /> Search
                  </Button>
                </div>
              </div>

              <WorldMapViewer />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderDataMart = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Data Mart (Golden Layer)</h2>
        
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">The Modern Golden Layer</h3>
          <p className="mb-6">
            Hutch's Data Mart concept replaces traditional data warehouses with a more flexible and 
            responsive approach. Our modern golden layer enables easy sharing between teams while 
            maintaining governance and quality control. Data Marts organize your trusted datasets 
            for business users and analytics applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold text-green-600">Materialized Datasets</h4>
              <p className="text-sm text-gray-600 mt-2">
                Physically stored, high-performance datasets optimized for frequently used queries.
              </p>
              <div className="mt-4 text-xs bg-gray-100 p-2 rounded">
                <div className="font-medium">Example:</div>
                <code>materialize_view('daily_sales_summary')</code>
              </div>
            </Card>
            
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold text-blue-600">Physical Datasets</h4>
              <p className="text-sm text-gray-600 mt-2">
                Stored copies of data with specific transformations already applied.
              </p>
              <div className="mt-4 text-xs bg-gray-100 p-2 rounded">
                <div className="font-medium">Example:</div>
                <code>create_table('customer_profiles')</code>
              </div>
            </Card>
            
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold text-purple-600">Virtual Datasets</h4>
              <p className="text-sm text-gray-600 mt-2">
                On-demand views that transform data at query time without storage overhead.
              </p>
              <div className="mt-4 text-xs bg-gray-100 p-2 rounded">
                <div className="font-medium">Example:</div>
                <code>create_view('product_inventory_current')</code>
              </div>
            </Card>
          </div>
          
          <div className="mt-8">
            <h4 className="font-semibold mb-3">Optional Object Lake Backup</h4>
            <p className="text-sm text-gray-600 mb-4">
              Automatically backup your critical datasets to object storage for disaster recovery.
            </p>
            <Button variant="outline" size="sm">Configure Backup</Button>
          </div>
        </Card>
      </div>
    );
  };
  
  const renderDataLineage = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Data Lineage</h2>
        
        <Card className="p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">End-to-End Data Lineage</h3>
            <Button size="sm">Export</Button>
          </div>
          
          <p className="mb-6">
            Track the origin, movement, and transformation of your data throughout your entire data ecosystem.
            Select any table from the tree view to see its complete lineage graph.
          </p>
          
          <div className="border rounded-md p-4 mb-6">
            <h4 className="font-medium mb-3">Selected Dataset: sales_aggregated_daily</h4>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Data lineage visualization</p>
                <p className="text-xs text-gray-400">(Diagram would show the complete path from source to final dataset)</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Upstream Dependencies</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>raw_sales_data (Bronze Zone)</span>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>product_catalog (Silver Zone)</span>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>store_locations (Silver Zone)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Downstream Consumers</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>sales_dashboard (BI Canvas)</span>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>executive_summary (Data Mart)</span>
                </li>
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span>regional_performance_ml (HutchML)</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  
  const renderHutchML = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">HutchML</h2>
        
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Machine Learning Platform</h3>
          
          <p className="mb-6">
            HutchML integrates seamlessly with your data ecosystem, allowing you to build, train, 
            and deploy machine learning models directly against your data without complex ETL processes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-semibold text-blue-600 mb-2">Model Registry</h4>
              <p className="text-sm text-gray-600 mb-4">
                Centrally manage, version, and deploy your ML models with full governance.
              </p>
              <Button variant="outline" size="sm">Browse Models</Button>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-semibold text-purple-600 mb-2">Predictions as Views</h4>
              <p className="text-sm text-gray-600 mb-4">
                Access ML predictions through SQL views for seamless integration with analytics.
              </p>
              <Button variant="outline" size="sm">Browse Prediction Views</Button>
            </Card>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Feature Store</h4>
            <p className="text-sm text-gray-600 mb-4">
              Reusable, versioned feature definitions for consistent training and inference.
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Feature Name</th>
                    <th className="text-left pb-2">Type</th>
                    <th className="text-left pb-2">Description</th>
                    <th className="text-left pb-2">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">customer_lifetime_value</td>
                    <td>Numerical</td>
                    <td>Predicted customer value over time</td>
                    <td>2024-04-06</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">product_affinity_score</td>
                    <td>Array[Float]</td>
                    <td>Product recommendation scores</td>
                    <td>2024-04-05</td>
                  </tr>
                  <tr>
                    <td className="py-2">churn_risk_factors</td>
                    <td>Object</td>
                    <td>Customer churn prediction factors</td>
                    <td>2024-04-01</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  
  const renderConnectedSources = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Connected Data Sources</h2>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Data Source Connections</h3>
            <Button size="sm">
              + Add Connection
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold flex items-center">
                <Database className="h-5 w-5 text-blue-500 mr-2" />
                Postgres Group
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 text-gray-500 mr-2" />
                    <span>HutchDB (default)</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 text-gray-500 mr-2" />
                    <span>postgres3.localhost:5432</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-xs">View Connection Details</Button>
            </Card>
            
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold flex items-center">
                <Database className="h-5 w-5 text-purple-500 mr-2" />
                MSSQL Group
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 text-gray-500 mr-2" />
                    <span>mssql.enterprise.local</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 text-gray-500 mr-2" />
                    <span>analytics-db.azure</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-xs">View Connection Details</Button>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                APIs
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span>SalesForce API</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Marketing API</span>
                  </div>
                  <span className="text-yellow-500 text-xs">Authentication Error</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-xs">View Connection Details</Button>
            </Card>
            
            <Card className="p-4 shadow-md">
              <h4 className="font-semibold flex items-center">
                <Folder className="h-5 w-5 text-amber-500 mr-2" />
                Object Stores
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Folder className="h-4 w-4 text-gray-500 mr-2" />
                    <span>analytics-bucket.s3</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Folder className="h-4 w-4 text-gray-500 mr-2" />
                    <span>data-archive.gcs</span>
                  </div>
                  <span className="text-green-500 text-xs">Connected</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-xs">View Connection Details</Button>
            </Card>
          </div>
        </Card>
      </div>
    );
  };

  const renderContent = () => {
    if (activePage === 'datahub-upload') {
      return renderLakeUpload();
    } else if (activePage === 'datahub-enterprise-data-viewer') {
      return renderEnterpriseDataViewer();
    } else if (activePage === 'datahub-data-mart') {
      return renderDataMart();
    } else if (activePage === 'datahub-data-lineage') {
      return renderDataLineage();
    } else if (activePage === 'datahub-hutchml') {
      return renderHutchML();
    } else if (activePage === 'datahub-connected-sources') {
      return renderConnectedSources();
    } else {
      return renderDatahubMain();
    }
  };

  const shouldShowTreeView = activePage?.startsWith('datahub-') || activePage === null;

  return (
    <div className="flex flex-1">
      {shouldShowTreeView && treeViewVisible && (
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-sm">LakeView Tree</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTreeView} 
              className="h-6 w-6 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
          <div className="p-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded"
              />
              <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <TreeView />
        </div>
      )}
      
      <div className="flex-1 overflow-auto p-6">
        {shouldShowTreeView && !treeViewVisible && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTreeView}
            className="mb-4"
          >
            <ChevronRight size={16} className="mr-2" />
            Show Tree View
          </Button>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default DatahubContent;
