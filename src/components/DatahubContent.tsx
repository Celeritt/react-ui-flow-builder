import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Cloud, Upload, FileText, BarChart } from 'lucide-react';

interface DatahubContentProps {
  activePage: string | null;
}

const DatahubContent: React.FC<DatahubContentProps> = ({ activePage }) => {
  const [selectedUploadType, setSelectedUploadType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('hutchdb');

  const handleAwsLogin = () => {
    window.open('https://signin.aws.amazon.com/console', '_blank');
  };

  const handleAzureLogin = () => {
    window.open('https://portal.azure.com/', '_blank');
  };

  const handleGcpLogin = () => {
    window.open('https://console.cloud.google.com/', '_blank');
  };

  const renderUploadSection = () => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Upload to Lake</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload data to your data lake from various sources.
        </p>
        
        <Tabs defaultValue="sql" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="sql">SQL Database</TabsTrigger>
            <TabsTrigger value="s3">AWS S3</TabsTrigger>
            <TabsTrigger value="azure">Azure Storage</TabsTrigger>
            <TabsTrigger value="gcp">Google Cloud</TabsTrigger>
            <TabsTrigger value="query">Query History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sql">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('csv-sql')}>
                <div className="flex items-center mb-2">
                  <Upload className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload CSV to SQL Database</h3>
                </div>
                <p className="text-sm text-gray-500">Import CSV data into a SQL table</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('excel-sql')}>
                <div className="flex items-center mb-2">
                  <FileText className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Excel to SQL Database</h3>
                </div>
                <p className="text-sm text-gray-500">Import Excel data into a SQL table</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('parquet-sql')}>
                <div className="flex items-center mb-2">
                  <BarChart className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Parquet to SQL Database</h3>
                </div>
                <p className="text-sm text-gray-500">Import Parquet files into a SQL table</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="s3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('csv-s3')}>
                <div className="flex items-center mb-2">
                  <Upload className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload CSV to S3</h3>
                </div>
                <p className="text-sm text-gray-500">Upload CSV data to an S3 bucket</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('excel-s3')}>
                <div className="flex items-center mb-2">
                  <FileText className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Excel to S3</h3>
                </div>
                <p className="text-sm text-gray-500">Upload Excel files to an S3 bucket</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('parquet-s3')}>
                <div className="flex items-center mb-2">
                  <BarChart className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Parquet to S3</h3>
                </div>
                <p className="text-sm text-gray-500">Upload Parquet files to an S3 bucket</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="azure">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('csv-azure')}>
                <div className="flex items-center mb-2">
                  <Upload className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload CSV to Azure</h3>
                </div>
                <p className="text-sm text-gray-500">Upload CSV data to Azure storage</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('excel-azure')}>
                <div className="flex items-center mb-2">
                  <FileText className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Excel to Azure</h3>
                </div>
                <p className="text-sm text-gray-500">Upload Excel files to Azure storage</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('parquet-azure')}>
                <div className="flex items-center mb-2">
                  <BarChart className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Parquet to Azure</h3>
                </div>
                <p className="text-sm text-gray-500">Upload Parquet files to Azure storage</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="gcp">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('csv-gcp')}>
                <div className="flex items-center mb-2">
                  <Upload className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload CSV to GCS</h3>
                </div>
                <p className="text-sm text-gray-500">Upload CSV data to Google Cloud Storage</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('excel-gcp')}>
                <div className="flex items-center mb-2">
                  <FileText className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Excel to GCS</h3>
                </div>
                <p className="text-sm text-gray-500">Upload Excel files to Google Cloud Storage</p>
              </Card>
              <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow" onClick={() => setSelectedUploadType('parquet-gcp')}>
                <div className="flex items-center mb-2">
                  <BarChart className="text-green-600 mr-2" size={18} />
                  <h3 className="font-medium">Upload Parquet to GCS</h3>
                </div>
                <p className="text-sm text-gray-500">Upload Parquet files to Google Cloud Storage</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="query">
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
              <h3 className="font-medium text-lg mb-4">Upload through Query History</h3>
              <p className="mb-4">Select from your recent query results to upload to your data lake.</p>
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-md overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rows</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-4 py-2">SELECT * FROM customers</td>
                    <td className="px-4 py-2">2025-04-05</td>
                    <td className="px-4 py-2">5,432</td>
                    <td className="px-4 py-2">
                      <button className="text-sm text-green-600 hover:text-green-800">Upload</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">SELECT * FROM sales WHERE date &gt; '2025-03-01'</td>
                    <td className="px-4 py-2">2025-04-04</td>
                    <td className="px-4 py-2">2,154</td>
                    <td className="px-4 py-2">
                      <button className="text-sm text-green-600 hover:text-green-800">Upload</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedUploadType && (
          <div className="mt-6 p-4 border rounded-md">
            <h3 className="font-medium text-lg mb-4">Upload {selectedUploadType.split('-')[0].toUpperCase()} to {selectedUploadType.split('-')[1].toUpperCase()}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select file</label>
                <input type="file" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Destination</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter destination path/table" />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setSelectedUploadType(null)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDatahubContent = () => {
    if (activePage === 'datahub-upload') {
      return renderUploadSection();
    }
    
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Datahub</h2>
        <p className="text-lg text-gray-600 mb-6">
          Connect to and manage your data sources across cloud providers.
        </p>
        
        <Tabs defaultValue="hutchdb" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="hutchdb">HutchDB</TabsTrigger>
            <TabsTrigger value="s3">AWS S3</TabsTrigger>
            <TabsTrigger value="azure">Azure Blob/ADLS</TabsTrigger>
            <TabsTrigger value="gcp">Google Cloud Storage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hutchdb">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">HutchDB</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse and access internal data sources without requiring authentication.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="flex items-center mb-2">
                    <Database className="text-green-600 mr-2" size={18} />
                    <h3 className="font-medium">Sales Data</h3>
                  </div>
                  <p className="text-sm text-gray-500">Production sales database</p>
                </Card>
                <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="flex items-center mb-2">
                    <Database className="text-green-600 mr-2" size={18} />
                    <h3 className="font-medium">Customer Data</h3>
                  </div>
                  <p className="text-sm text-gray-500">Customer relationship management</p>
                </Card>
                <Card className="p-4 hover:shadow-md cursor-pointer transition-shadow">
                  <div className="flex items-center mb-2">
                    <Database className="text-green-600 mr-2" size={18} />
                    <h3 className="font-medium">Product Catalog</h3>
                  </div>
                  <p className="text-sm text-gray-500">Product information and inventory</p>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="s3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">AWS S3</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect to your AWS S3 buckets. Authentication required.
              </p>
              <Card className="p-6 border border-gray-300 dark:border-gray-600">
                <h3 className="text-lg font-medium mb-4">AWS Authentication</h3>
                <p className="mb-4">Please authenticate using your AWS IAM credentials with appropriate S3 permissions.</p>
                <div className="flex gap-4">
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    onClick={handleAwsLogin}
                  >
                    Sign in with AWS IAM
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Use AWS SSO
                  </button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="azure">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Azure Blob/ADLS</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect to your Azure Blob Storage or Azure Data Lake Storage. Authentication required.
              </p>
              <Card className="p-6 border border-gray-300 dark:border-gray-600">
                <h3 className="text-lg font-medium mb-4">Azure Authentication</h3>
                <p className="mb-4">Please authenticate using your Azure AD credentials with appropriate storage permissions.</p>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  onClick={handleAzureLogin}
                >
                  Sign in with Azure
                </button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="gcp">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Google Cloud Storage</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect to your Google Cloud Storage buckets. Authentication required.
              </p>
              <Card className="p-6 border border-gray-300 dark:border-gray-600">
                <h3 className="text-lg font-medium mb-4">Google Cloud Authentication</h3>
                <p className="mb-4">Please authenticate using your Google Cloud credentials with appropriate storage permissions.</p>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  onClick={handleGcpLogin}
                >
                  Sign in with Google Cloud
                </button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="p-6">
      {renderDatahubContent()}
    </div>
  );
};

export default DatahubContent;
