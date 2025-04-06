
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BiCanvasContentProps {
  activePage: string | null;
}

const BiCanvasContent: React.FC<BiCanvasContentProps> = ({ activePage }) => {
  const navigate = useNavigate();

  const navigateTo = (url: string) => {
    // This would normally navigate to the URL
    // For demo purposes, we're using an alert
    console.log(`Navigating to ${url}`);
    // navigate(url); // Uncomment this when integrating with real URLs
    alert(`Navigating to ${url} (This will be replaced with actual navigation in production)`);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4">Welcome to BI Canvas</h2>
        <p className="text-lg text-gray-600 mb-8">
          Create powerful visualizations and interactive dashboards that reflect data across your entire Data Lake.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Viz Blocks</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Viz Blocks are individual visualization components that can be created, customized, 
              and added to dashboards. Create charts, graphs, tables, and more to visualize your data.
            </p>
            <div className="flex justify-center my-6">
              <div className="relative w-full max-w-md h-48 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2 p-4">
                  <div className="h-16 bg-blue-500 rounded-md animate-pulse"></div>
                  <div className="h-16 bg-green-500 rounded-md"></div>
                  <div className="h-16 bg-purple-500 rounded-md"></div>
                  <div className="h-16 bg-yellow-500 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigateTo('/viz-builder')}
            >
              Create Viz Block <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Dashboards</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Arrange your Viz Blocks into interactive dashboards. Share insights with your team, 
              set up automatic refreshes, and create a single view of your data ecosystem.
            </p>
            <div className="flex justify-center my-6">
              <div className="relative w-full max-w-md h-48 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg p-4">
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
                  <div className="col-span-2 bg-blue-500 rounded-md"></div>
                  <div className="bg-green-500 rounded-md"></div>
                  <div className="bg-yellow-500 rounded-md"></div>
                  <div className="bg-red-500 rounded-md"></div>
                  <div className="col-span-2 bg-purple-500 rounded-md"></div>
                  <div className="bg-indigo-500 rounded-md"></div>
                </div>
              </div>
            </div>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigateTo('/dashboards')}
            >
              View Dashboards <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Sample Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Dashboard 1 */}
          <Card className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigateTo('/dashboards/sales')}>
            <h3 className="text-lg font-medium mb-4">Sales Performance Dashboard</h3>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 w-full p-4">
                <div className="h-8 bg-blue-500 rounded-sm"></div>
                <div className="h-8 bg-green-500 rounded-sm"></div>
                <div className="h-8 bg-purple-500 rounded-sm"></div>
                <div className="h-8 bg-yellow-500 rounded-sm"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: April 5, 2025</p>
          </Card>
          
          {/* Sample Dashboard 2 */}
          <Card className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigateTo('/dashboards/marketing')}>
            <h3 className="text-lg font-medium mb-4">Marketing Campaign Insights</h3>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0" style={{clipPath: 'polygon(50% 50%, 100% 0%, 100% 50%)'}}>
                  <div className="w-full h-full bg-blue-500"></div>
                </div>
                <div className="absolute inset-0" style={{clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)'}}>
                  <div className="w-full h-full bg-green-500"></div>
                </div>
                <div className="absolute inset-0" style={{clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)'}}>
                  <div className="w-full h-full bg-purple-500"></div>
                </div>
                <div className="absolute inset-0" style={{clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)'}}>
                  <div className="w-full h-full bg-yellow-500"></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: April 3, 2025</p>
          </Card>
          
          {/* Sample Dashboard 3 */}
          <Card className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigateTo('/dashboards/operations')}>
            <h3 className="text-lg font-medium mb-4">Operations Overview</h3>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <div className="w-full p-4 space-y-2">
                <div className="h-6 bg-blue-500 w-full rounded-sm"></div>
                <div className="h-6 bg-green-500 w-3/4 rounded-sm"></div>
                <div className="h-6 bg-yellow-500 w-1/2 rounded-sm"></div>
                <div className="h-6 bg-red-500 w-1/4 rounded-sm"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: April 4, 2025</p>
          </Card>
          
          {/* Sample Dashboard 4 */}
          <Card className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigateTo('/dashboards/finance')}>
            <h3 className="text-lg font-medium mb-4">Financial Summary</h3>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md grid grid-cols-2 gap-2 p-4">
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  +12%
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-4/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-3/6"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: April 1, 2025</p>
          </Card>
          
          {/* Sample Dashboard 5 */}
          <Card className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigateTo('/dashboards/customers')}>
            <h3 className="text-lg font-medium mb-4">Customer Analytics</h3>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2 w-full p-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500"></div>
                  <div className="h-2 w-10 mt-2 bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-500"></div>
                  <div className="h-2 w-12 mt-2 bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500"></div>
                  <div className="h-2 w-8 mt-2 bg-gray-300"></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: April 2, 2025</p>
          </Card>
          
          {/* Sample Dashboard 6 */}
          <Card className="p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigateTo('/dashboards/inventory')}>
            <h3 className="text-lg font-medium mb-4">Inventory Management</h3>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md p-4">
              <div className="grid grid-cols-4 grid-rows-4 gap-1 h-full">
                <div className="bg-green-500 col-span-1 row-span-1"></div>
                <div className="bg-green-400 col-span-1 row-span-1"></div>
                <div className="bg-yellow-500 col-span-1 row-span-1"></div>
                <div className="bg-red-500 col-span-1 row-span-1"></div>
                
                <div className="bg-green-500 col-span-1 row-span-1"></div>
                <div className="bg-green-400 col-span-1 row-span-1"></div>
                <div className="bg-green-300 col-span-1 row-span-1"></div>
                <div className="bg-yellow-500 col-span-1 row-span-1"></div>
                
                <div className="bg-green-500 col-span-1 row-span-1"></div>
                <div className="bg-yellow-500 col-span-1 row-span-1"></div>
                <div className="bg-yellow-400 col-span-1 row-span-1"></div>
                <div className="bg-red-500 col-span-1 row-span-1"></div>
                
                <div className="bg-yellow-500 col-span-1 row-span-1"></div>
                <div className="bg-yellow-400 col-span-1 row-span-1"></div>
                <div className="bg-red-500 col-span-1 row-span-1"></div>
                <div className="bg-red-400 col-span-1 row-span-1"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: April 6, 2025</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BiCanvasContent;
