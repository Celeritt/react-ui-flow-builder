import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/ui/custom-tabs";
import { FileText, Calendar, Clock, Plus, ArrowRight, CheckCircle, XCircle } from "lucide-react";

interface WorksContentProps {
  activePage: string | null;
}

const WorksContent: React.FC<WorksContentProps> = ({ activePage }) => {
  if (activePage === 'works-workbooks') {
    return <WorkbooksContent />;
  } else if (activePage === 'works-spaces') {
    return <SpacesRedirect />;
  } else if (activePage === 'works-scheduler') {
    return <SchedulerContent />;
  }

  return <WorksOverview />;
};

const WorksOverview = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow border-t-4 border-t-green-500">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-500" />
            Create Workbook
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create and manage analytical notebooks with code, visualizations, and markdown documentation.
          </p>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2" size={16} />
            New Workbook
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow border-t-4 border-t-green-500">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-500" />
            Create a Space
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Collaborative environments for teams to organize related dashboards, queries, and workbooks.
          </p>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2" size={16} />
            New Space
          </Button>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <h4 className="font-medium">Sales Analysis Workbook</h4>
                <p className="text-sm text-gray-500">Updated 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-green-600">
              Open <ArrowRight className="ml-1" size={16} />
            </Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium">Daily Data Refresh</h4>
                <p className="text-sm text-gray-500">Completed 6 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View Log <ArrowRight className="ml-1" size={16} />
            </Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-purple-500 mr-3" />
              <div>
                <h4 className="font-medium">Customer Analysis</h4>
                <p className="text-sm text-gray-500">Created yesterday</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-purple-600">
              Open <ArrowRight className="ml-1" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkbooksContent = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Workbooks</h2>
        <Button>
          <Plus className="mr-2" size={16} />
          Create Workbook
        </Button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Workbooks combine code, data, and visualizations in an interactive notebook format.
        Create powerful analytical documents with support for SQL, Python, and R.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
              <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={14} className="mr-1" />
              Updated 2h ago
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Sales Analysis</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Deep dive into regional sales performance with trend analysis.
          </p>
          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
            Open Workbook <ArrowRight size={14} className="ml-1" />
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={14} className="mr-1" />
              Updated yesterday
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Customer Segmentation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Customer clustering and behavioral analysis using ML techniques.
          </p>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            Open Workbook <ArrowRight size={14} className="ml-1" />
          </Button>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
              <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={14} className="mr-1" />
              Updated 3d ago
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Product Metrics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Product performance analytics and growth opportunities.
          </p>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
            Open Workbook <ArrowRight size={14} className="ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
};

const SpacesRedirect = () => {
  return (
    <div className="container mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-6">Spaces</h2>
      <div className="max-w-md mx-auto">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Spaces are collaborative environments where teams can work together on data projects, 
          share insights, and organize related dashboards and queries.
        </p>
        <Button asChild>
          <a href="#/spaces">Go to Spaces</a>
        </Button>
      </div>
    </div>
  );
};

const SchedulerContent = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Scheduled Jobs</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Manage and monitor data jobs that run on a regular schedule.
      </p>
      
      <CustomTabs defaultValue="active" className="w-full">
        <CustomTabsList className="mb-6">
          <CustomTabsTrigger value="active">Active Jobs</CustomTabsTrigger>
          <CustomTabsTrigger value="history">Job History</CustomTabsTrigger>
        </CustomTabsList>
        
        <CustomTabsContent value="active" className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Daily Data Refresh {i+1}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Daily at {((i + 1) * 2) % 24}:00</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {i % 3 !== 0 ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle size={16} className="mr-1" /> Running
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-600">
                      <Clock size={16} className="mr-1" /> Scheduled
                    </span>
                  )}
                  <Button variant="ghost" size="sm" className="ml-4">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </CustomTabsContent>
        
        <CustomTabsContent value="history" className="space-y-4">
          {[...Array(7)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Weekly Aggregation {i+1}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>Ran {i+1} day{i !== 0 ? 's' : ''} ago</span>
                  </div>
                </div>
                <div className="flex items-center">
                  {i % 4 !== 0 ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle size={16} className="mr-1" /> Success
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <XCircle size={16} className="mr-1" /> Failed
                    </span>
                  )}
                  <Button variant="ghost" size="sm" className="ml-4">
                    View Log
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </CustomTabsContent>
      </CustomTabs>
    </div>
  );
};

export default WorksContent;
