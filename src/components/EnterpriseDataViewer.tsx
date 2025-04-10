
import React, { useState, useEffect } from 'react';
import { EnterpriseData, DataNode } from '../types/enterpriseData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, Database, Map } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const EnterpriseDataViewer: React.FC = () => {
  const [data, setData] = useState<EnterpriseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('organogram');

  // Handle JSON file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    
    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const jsonData = JSON.parse(content) as EnterpriseData;
          setData(jsonData);
          toast({
            title: "File uploaded successfully",
            description: `Loaded ${file.name} with ${jsonData.enterpriseDataViewer.children?.length || 0} root nodes`,
          });
        } catch (error) {
          console.error('Error parsing JSON:', error);
          toast({
            title: "Invalid JSON file",
            description: "The file couldn't be parsed. Please check the format.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid JSON file.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Render organogram view
  const renderOrganogram = (node: DataNode): JSX.Element => {
    return (
      <div className="flex flex-col mb-2">
        <div className="flex items-center gap-2 px-2 py-1 rounded bg-secondary/50 hover:bg-secondary">
          <span className="font-medium text-sm">{node.name}</span>
          {node.type === 'file' && (
            <Button 
              variant="outline" 
              size="icon" 
              className="h-5 w-5 rounded-full"
              title="Create Table from this path"
            >
              <span className="sr-only">Create table</span>
              +
            </Button>
          )}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="pl-4 mt-1 border-l-2 border-gray-200 dark:border-gray-700">
            {node.children.map((child, index) => (
              <div key={index} className="mt-1">
                {renderOrganogram(child)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render map view
  const renderMapView = () => {
    if (!data || !data.mapView) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.mapView.worldMap.map((city, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-lg font-semibold mb-2">{city.city}</h3>
            <div className="space-y-2">
              {city.regions.map((region, idx) => (
                <div key={idx} className="pl-2 border-l-2 border-primary">
                  <h4 className="font-medium">{region.name}</h4>
                  <div className="pl-3 space-y-1">
                    {region.data.map((db, dbIdx) => (
                      <div key={dbIdx}>
                        <div className="flex items-center gap-1 font-medium text-sm">
                          <Database size={14} />
                          {db.database}
                        </div>
                        <ul className="pl-5 text-sm text-muted-foreground">
                          {db.tables.map((table, tableIdx) => (
                            <li key={tableIdx}>{table}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Enterprise Data Viewer</h1>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            id="json-upload"
            className="max-w-xs sr-only"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('json-upload')?.click()}
            disabled={loading}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload JSON
          </Button>
        </div>
      </div>

      <Tabs defaultValue="organogram" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="organogram">
            <Database className="mr-2 h-4 w-4" />
            Organogram View
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map className="mr-2 h-4 w-4" />
            Map View
          </TabsTrigger>
        </TabsList>
        
        {loading ? (
          <div className="flex items-center justify-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <Database size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium mb-1">No Data Available</h3>
            <p className="text-sm text-muted-foreground">
              Upload a JSON file to visualize your enterprise data structure
            </p>
          </div>
        ) : (
          <>
            <TabsContent value="organogram" className="mt-0">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Organogram View</h2>
                <div className="bg-background p-4 rounded-md border">
                  {renderOrganogram(data.enterpriseDataViewer)}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">Map View</h2>
                {renderMapView()}
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default EnterpriseDataViewer;
