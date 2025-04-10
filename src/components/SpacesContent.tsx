
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Plus, ArrowRight, Search, Clock, Star, Folder } from "lucide-react";

const SpacesContent = () => {
  const [activeTab, setActiveTab] = useState("my-spaces");

  const mySpaces = [
    { id: 1, name: "Sales Analytics", description: "Space for sales analytics dashboards and reports", members: 5, lastUpdated: "2 days ago" },
    { id: 2, name: "Marketing Team", description: "Collaborative space for marketing analytics and campaigns", members: 8, lastUpdated: "5 hours ago" },
    { id: 3, name: "Executive Dashboard", description: "Key metrics and KPIs for executive team", members: 3, lastUpdated: "Yesterday" },
    { id: 4, name: "Product Development", description: "Product usage metrics and development insights", members: 12, lastUpdated: "1 week ago" }
  ];

  const publicSpaces = [
    { id: 5, name: "Company Overview", description: "General company metrics and dashboards", members: 45, lastUpdated: "1 day ago" },
    { id: 6, name: "Data Documentation", description: "Central repository for data definitions and documentation", members: 32, lastUpdated: "3 days ago" },
    { id: 7, name: "Training Resources", description: "Shared space for data training and learning materials", members: 28, lastUpdated: "2 weeks ago" },
    { id: 8, name: "System Metrics", description: "Platform performance and monitoring dashboards", members: 15, lastUpdated: "4 days ago" }
  ];

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Spaces</h1>
        <Button>
          <Plus size={16} className="mr-2" />
          Create Space
        </Button>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Spaces are collaborative environments where teams can work together on data projects, 
        share insights, and organize related dashboards and queries.
      </p>

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search spaces..." 
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="my-spaces" className="flex items-center">
            <User size={16} className="mr-2" />
            My Spaces
          </TabsTrigger>
          <TabsTrigger value="public-spaces" className="flex items-center">
            <Users size={16} className="mr-2" />
            Public Spaces
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-spaces" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySpaces.map(space => (
              <Card key={space.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                      <Folder className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {space.lastUpdated}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{space.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users size={14} className="mr-1" />
                      {space.members} members
                    </div>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0">
                      Open Space <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="public-spaces" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicSpaces.map(space => (
              <Card key={space.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                      <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {space.lastUpdated}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{space.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{space.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <Users size={14} className="mr-1" />
                      {space.members} members
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                      Open Space <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpacesContent;
