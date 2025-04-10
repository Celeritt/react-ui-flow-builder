
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Database, Folder, FileText, Server } from "lucide-react";

interface Region {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  resources?: {
    databases?: string[];
    tables?: string[];
    buckets?: string[];
  };
}

const WorldMapViewer = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  
  const regions: Region[] = [
    { 
      id: "sa", 
      name: "South Africa", 
      type: "On-Prem & GCP", 
      lat: -30.5595, 
      lng: 22.9375,
      resources: {
        databases: ["Customer_DB", "Products_DB", "Analytics_DB"],
        tables: ["customers", "orders", "products", "sales_metrics"],
        buckets: ["analytics-data", "raw-data"]
      }
    },
    { 
      id: "usa", 
      name: "USA", 
      type: "AWS", 
      lat: 37.0902, 
      lng: -95.7129,
      resources: {
        databases: ["Finance_DB", "Marketing_DB"],
        tables: ["revenue", "campaigns", "leads"],
        buckets: ["marketing-assets", "finance-reports"]
      }
    },
    { 
      id: "germany", 
      name: "Germany", 
      type: "GCP", 
      lat: 51.1657, 
      lng: 10.4515,
      resources: {
        databases: ["European_Sales_DB"],
        tables: ["eu_customers", "eu_compliance", "gdpr_logs"],
        buckets: ["compliance-docs", "eu-analytics"]
      }
    }
  ];

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {regions.map(region => (
          <Card 
            key={region.id} 
            className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${selectedRegion?.id === region.id ? 'border-green-500 border-2' : ''}`}
            onClick={() => handleRegionClick(region)}
          >
            <Database className="h-8 w-8 text-blue-500 mb-2" />
            <h4 className="font-medium">Region: {region.name}</h4>
            <p className="text-sm text-gray-500">{region.type}</p>
          </Card>
        ))}
      </div>

      {selectedRegion && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">Region: {selectedRegion.name}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Map Location</h5>
                {/* Map placeholder - in a real implementation, this would be an actual map */}
                <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500">Interactive Map View</p>
                    <p className="text-xs text-gray-400">
                      Coordinates: {selectedRegion.lat.toFixed(4)}, {selectedRegion.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded">
              <h5 className="text-sm font-medium mb-2">Available Resources</h5>
              
              {selectedRegion.resources?.databases && (
                <div className="mb-3">
                  <div className="flex items-center mb-1">
                    <Database className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">Databases</span>
                  </div>
                  <ul className="pl-6 text-xs space-y-1">
                    {selectedRegion.resources.databases.map(db => (
                      <li key={db} className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                        {db}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedRegion.resources?.tables && (
                <div className="mb-3">
                  <div className="flex items-center mb-1">
                    <FileText className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm font-medium">Tables</span>
                  </div>
                  <ul className="pl-6 text-xs space-y-1">
                    {selectedRegion.resources.tables.map(table => (
                      <li key={table} className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                        {table}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedRegion.resources?.buckets && (
                <div>
                  <div className="flex items-center mb-1">
                    <Folder className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm font-medium">Storage Buckets</span>
                  </div>
                  <ul className="pl-6 text-xs space-y-1">
                    {selectedRegion.resources.buckets.map(bucket => (
                      <li key={bucket} className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                        {bucket}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {!selectedRegion && (
        <Card className="p-4">
          <div className="text-center p-6">
            <p className="text-gray-500">Select a region to view details</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WorldMapViewer;
