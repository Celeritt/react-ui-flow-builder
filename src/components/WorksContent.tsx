import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plus, Hammer, Spanner } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorksContentProps {
  activePage: string | null;
}

const WorksContent: React.FC<WorksContentProps> = ({ activePage }) => {
  const navigate = useNavigate();

  const handleCreateWorkbook = () => {
    // This would normally navigate to the create workbook page
    // For demo purposes, we're using an alert
    alert("Creating new workbook (This will be replaced with actual functionality in production)");
    // Implementation example:
    // navigate('/works/workbooks/create');
    // or call your backend function:
    // createNewWorkbook().then(() => refreshWorkbooks());
  };

  const renderWorkbooks = () => {
    return (
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Workbooks</h2>
          <Button onClick={handleCreateWorkbook}>
            <Plus className="mr-2" size={16} />
            New Workbook
          </Button>
        </div>

        <Tabs defaultValue="recent">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="recent">Recent Workbooks</TabsTrigger>
            <TabsTrigger value="my">My Workbooks</TabsTrigger>
            <TabsTrigger value="favorite">Favorite Workbooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Recent Workbook {i}</h3>
                      <p className="text-sm text-gray-500">Last edited 2 days ago</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    This workbook contains analysis on quarterly sales data for Q1 2025.
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>4 collaborators</span>
                    <span>12 visualizations</span>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              {/* Add backend integration here */}
              {/* Workbooks will be populated from your existing backend function */}
              {/* e.g. getRecentWorkbooks().then(setWorkbooks) */}
            </p>
          </TabsContent>
          
          <TabsContent value="my" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">My Workbook {i}</h3>
                      <p className="text-sm text-gray-500">Created by you</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Personal analysis on marketing campaign performance.
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Owner</span>
                    <span>8 visualizations</span>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              {/* Add backend integration here */}
              {/* Workbooks will be populated from your existing backend function */}
              {/* e.g. getMyWorkbooks().then(setWorkbooks) */}
            </p>
          </TabsContent>
          
          <TabsContent value="favorite" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">Favorite Workbook {i}</h3>
                      <p className="text-sm text-gray-500">Created by Team Analytics</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Company-wide KPI tracking and analytics dashboard.
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Shared</span>
                    <span>15 visualizations</span>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              {/* Add backend integration here */}
              {/* Workbooks will be populated from your existing backend function */}
              {/* e.g. getFavoriteWorkbooks().then(setWorkbooks) */}
            </p>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderScheduledJobs = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Scheduled Jobs</h2>
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">Active Jobs</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Daily Sales Report</td>
                    <td className="px-6 py-4 whitespace-nowrap">Daily at 7:00 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">April 6, 2025 7:00 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button variant="outline" size="sm" className="mr-2">Run Now</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Weekly Inventory Update</td>
                    <td className="px-6 py-4 whitespace-nowrap">Every Monday at 1:00 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">April 1, 2025 1:00 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button variant="outline" size="sm" className="mr-2">Run Now</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Customer Data Sync</td>
                    <td className="px-6 py-4 whitespace-nowrap">Hourly</td>
                    <td className="px-6 py-4 whitespace-nowrap">April 6, 2025 10:00 AM</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Running</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button variant="outline" size="sm">Stop</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <Button>
            <Plus className="mr-2" size={16} />
            Schedule New Job
          </Button>
          
          <p className="text-sm text-gray-500 mt-6 italic">
            {/* Add backend integration here */}
            {/* Jobs will be populated from your existing backend function */}
            {/* e.g. getScheduledJobs().then(setJobs) */}
          </p>
        </Card>
      </div>
    );
  };

  const renderWorksOverview = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome to Works</h2>
        <p className="text-lg text-gray-600 mb-8">
          Your collaborative workspace for data analytics, workbooks, and scheduled jobs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Create Workbook</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Workbooks are collaborative spaces where you can create, share, and analyze data with your team.
            </p>
            <div className="flex justify-center my-6">
              <div className="h-40 w-full max-w-xs bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Hammer size={64} className="text-blue-500 dark:text-blue-300" />
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={handleCreateWorkbook}
            >
              Create New Workbook <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Create a Space</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Spaces provide dedicated environments for team collaboration on specific projects or data sets.
            </p>
            <div className="flex justify-center my-6">
              <div className="h-40 w-full max-w-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg flex items-center justify-center">
                <Spanner size={64} className="text-purple-500 dark:text-purple-300" />
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={() => navigate('/spaces')}
              variant="outline"
            >
              Create New Space <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <Button 
            className="flex-1 py-6" 
            onClick={() => navigate('/works/workbooks')}
          >
            Explore Workbooks
            <ArrowRight className="ml-2" size={16} />
          </Button>
          <Button 
            className="flex-1 py-6" 
            onClick={() => navigate('/works/scheduler')}
            variant="outline"
          >
            Manage Scheduled Jobs
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    );
  };

  // Render content based on the active page
  if (activePage === 'works-workbooks') {
    return renderWorkbooks();
  } else if (activePage === 'works-scheduler') {
    return renderScheduledJobs();
  } else {
    return renderWorksOverview();
  }
};

export default WorksContent;
