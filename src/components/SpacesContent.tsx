
import { Button } from "@/components/ui/button";
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/ui/custom-tabs";
import { Card } from "@/components/ui/card";
import { Calendar, FileText, Users, BarChart3, Globe } from "lucide-react";

const SpacesContent = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Spaces</h2>
      
      <CustomTabs defaultValue="my-spaces" className="w-full">
        <CustomTabsList>
          <CustomTabsTrigger value="my-spaces">My Spaces</CustomTabsTrigger>
          <CustomTabsTrigger value="public-spaces">Public Spaces</CustomTabsTrigger>
        </CustomTabsList>
        
        <CustomTabsContent value="my-spaces" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Sales Analytics Space</h3>
              <p className="text-sm text-gray-500 mb-4">Collaborative space for sales data analysis</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">8 members</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Updated 2d ago</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Marketing Campaign Space</h3>
              <p className="text-sm text-gray-500 mb-4">Campaign analysis and planning space</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">12 members</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Updated 5h ago</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Draft</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Finance Reports Space</h3>
              <p className="text-sm text-gray-500 mb-4">Financial analysis and reporting</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">5 members</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Updated 1w ago</span>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button>
              Create New Space
            </Button>
          </div>
        </CustomTabsContent>
        
        <CustomTabsContent value="public-spaces" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Public</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Company Metrics</h3>
              <p className="text-sm text-gray-500 mb-4">Company-wide KPIs and metrics</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">All employees</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Updated daily</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-red-500" />
                </div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Public</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Product Analytics</h3>
              <p className="text-sm text-gray-500 mb-4">Product usage and performance</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Product team</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Updated weekly</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="flex space-x-1">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Public</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Engineering Metrics</h3>
              <p className="text-sm text-gray-500 mb-4">Engineering performance and indicators</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Engineering team</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Updated 3d ago</span>
                </div>
              </div>
            </Card>
          </div>
        </CustomTabsContent>
      </CustomTabs>
    </div>
  );
};

export default SpacesContent;
