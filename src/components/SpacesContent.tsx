
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, Globe, Lock, Calendar } from "lucide-react";
import { useState } from "react";

const SpacesContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateSpace = () => {
    // This would normally create a new space
    // For demo purposes, we're using an alert
    alert("Creating new space (This will be replaced with actual functionality in production)");
    // Implementation example:
    // createNewSpace().then(() => refreshSpaces());
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Spaces</h2>
          <p className="text-gray-600 text-sm">Collaborate on data projects with your team</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-9"
              placeholder="Search spaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleCreateSpace}>
            <Plus className="mr-2" size={16} />
            New Space
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-spaces">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="my-spaces">My Spaces</TabsTrigger>
          <TabsTrigger value="public-spaces">All Public Spaces</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-spaces" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Marketing Analytics</h3>
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                    {i % 2 === 0 ? <Users size={16} /> : <Lock size={16} />}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Collaborative space for marketing team to analyze campaign performance and customer insights.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center text-xs text-white">+3</div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Updated 2 days ago</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>6 workbooks</span>
                    <span>12 dashboards</span>
                    <span>18 visualizations</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            {/* Add backend integration here */}
            {/* Spaces will be populated from your existing backend function */}
            {/* e.g. getMySpaces().then(setSpaces) */}
          </p>
        </TabsContent>
        
        <TabsContent value="public-spaces" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Corporate KPIs</h3>
                  <div className="p-2 bg-green-100 text-green-600 rounded-full">
                    <Globe size={16} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Company-wide space for tracking key performance indicators across all departments.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-xs text-white">+8</div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Updated daily</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>15 workbooks</span>
                    <span>8 dashboards</span>
                    <span>42 visualizations</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            {/* Add backend integration here */}
            {/* Spaces will be populated from your existing backend function */}
            {/* e.g. getPublicSpaces().then(setSpaces) */}
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpacesContent;
