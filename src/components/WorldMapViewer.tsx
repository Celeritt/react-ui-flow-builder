
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Database, Folder, FileText, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Database {
  database: string;
  tables: string[];
}

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
  data?: Database[];
}

interface City {
  city: string;
  regions: Region[];
}

interface MapData {
  worldMap?: City[];
}

interface WorldMapViewerProps {
  jsonPath?: string;
}

const WorldMapViewer: React.FC<WorldMapViewerProps> = ({ jsonPath }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [regions, setRegions] = useState<Region[]>([
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
  ]);
  
  const [mapData, setMapData] = useState<MapData | null>(null);

  useEffect(() => {
    if (jsonPath) {
      // Load data from JSON file
      fetch(jsonPath)
        .then(response => response.json())
        .then((fetchedData) => {
          // Check if we need to transform the data format
          if (fetchedData.mapView) {
            setMapData(fetchedData.mapView);
            
            // Create regions from mapView data if available
            if (fetchedData.mapView.worldMap) {
              const transformedRegions = transformCitiesToRegions(fetchedData.mapView.worldMap);
              setRegions(transformedRegions);
            }
          } 
        })
        .catch(error => console.error("Error loading map data:", error));
    }
  }, [jsonPath]);

  const transformCitiesToRegions = (cities: City[]): Region[] => {
    return cities.flatMap((city, cityIndex) => {
      return city.regions.map((region, regionIndex) => {
        // Generate some fake coordinates for demonstration purposes
        const baseLat = 20 + cityIndex * 15;
        const baseLng = -100 + cityIndex * 40;
        const offsetLat = regionIndex * 3;
        const offsetLng = regionIndex * 5;
        
        return {
          id: `${city.city.toLowerCase()}-${region.name.toLowerCase()}`,
          name: `${city.city} - ${region.name}`,
          type: region.data?.length ? `${region.data.length} Databases` : "Region",
          lat: baseLat + offsetLat,
          lng: baseLng + offsetLng,
          data: region.data
        };
      });
    });
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
          if (jsonData.mapView) {
            setMapData(jsonData.mapView);
            
            // Create regions from mapView data if available
            if (jsonData.mapView.worldMap) {
              const transformedRegions = transformCitiesToRegions(jsonData.mapView.worldMap);
              setRegions(transformedRegions);
            }
          } else {
            alert("The JSON file does not contain valid map view data.");
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON format. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="w-full">
      {/* File upload area */}
      <div className="mb-4 p-2 border border-dashed rounded-md">
        <p className="text-sm mb-2">Upload custom JSON map structure:</p>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileUpload} 
          className="text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {regions.map(region => (
          <Card 
            key={region.id} 
            className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${selectedRegion?.id === region.id ? 'border-green-500 border-2' : ''}`}
            onClick={() => handleRegionClick(region)}
          >
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium">Region: {region.name}</h4>
                <p className="text-sm text-gray-500">{region.type}</p>
              </div>
            </div>
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
              
              {/* Display resources from region.resources format */}
              {selectedRegion.resources && (
                <>
                  {selectedRegion.resources.databases && (
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
                  
                  {selectedRegion.resources.tables && (
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
                  
                  {selectedRegion.resources.buckets && (
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
                </>
              )}
              
              {/* Display resources from region.data format */}
              {selectedRegion.data && (
                <div>
                  {selectedRegion.data.map((dbData, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex items-center mb-1">
                        <Database className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">{dbData.database}</span>
                      </div>
                      <ul className="pl-6 text-xs space-y-1">
                        {dbData.tables.map((table, tableIndex) => (
                          <li key={tableIndex} className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                            {table}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setSelectedRegion(null)}>
              Close Details
            </Button>
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
