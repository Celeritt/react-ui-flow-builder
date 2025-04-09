
import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/ui/custom-tabs";
import { FileText, Layout, LineChart, ArrowRight, PlusCircle, BarChart2, FolderTree } from 'lucide-react';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const messageRef = useRef<HTMLDivElement>(null);
  
  const recentWorks = [
    { id: 1, title: "2025-04-05 9:09am", type: "SQL Worksheet", viewed: "45 minutes ago", updated: "47 minutes ago" },
    { id: 2, title: "[Template] Load data from cloud storage", type: "SQL Worksheet", viewed: "9 hours ago", updated: "10 hours ago" },
    { id: 3, title: "Classification 2025-04-04 9:08pm", type: "SQL Worksheet", viewed: "12 hours ago", updated: "12 hours ago" },
    { id: 4, title: "2025-04-04 7:54pm", type: "SQL Worksheet", viewed: "14 hours ago", updated: "14 hours ago" }
  ];
  
  const favoriteWorks = [
    { id: 1, title: "Sales Dashboard", type: "Dashboard", viewed: "2 days ago", updated: "1 week ago" },
    { id: 2, title: "Customer Analysis", type: "SQL Worksheet", viewed: "3 days ago", updated: "5 days ago" },
    { id: 3, title: "Monthly Reports", type: "Workbook", viewed: "1 week ago", updated: "1 month ago" }
  ];

  // Add scrolling effect for Quick Facts
  useEffect(() => {
    const scrollMessage = () => {
      if (messageRef.current) {
        const container = messageRef.current;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
    };
    
    const scrollInterval = setInterval(scrollMessage, 50);
    return () => clearInterval(scrollInterval);
  }, []);
  
  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8 mb-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Hutch Lakehouse</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu metus at nisi tempus dignissim. 
          Proin facilisis nisi vitae velit consequat, a sodales dui dapibus. Nullam vitae sapien id magna 
          hendrerit hendrerit a et diam.
        </p>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Sed imperdiet diam ut ligula molestie, in varius risus feugiat. Nam et lobortis risus. Cras sed 
          vestibulum lectus, quis accumsan nisi. Sed tempus leo vitae justo dapibus, ac condimentum metus gravida.
        </p>
      </div>
      
      {/* Quick Facts Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Quick Facts</h2>
        <div 
          ref={messageRef} 
          className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-3 overflow-hidden whitespace-nowrap"
        >
          <div className="inline-block min-w-full">
            <p className="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, quibusdam, voluptates, quos voluptatum quod quas voluptas quae quia doloribus quidem.
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick Links Section */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <Card className="p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/50">
          <div className="flex flex-col h-full">
            <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="text-green-600 dark:text-green-400" size={20} />
              <PlusCircle className="text-green-600 dark:text-green-400 absolute -right-1 -bottom-1" size={16} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Workbooks</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Create a new workbook</p>
            <div className="mt-auto">
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm inline-flex items-center">
                New <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/50">
          <div className="flex flex-col h-full">
            <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Layout className="text-green-600 dark:text-green-400" size={20} />
              <PlusCircle className="text-green-600 dark:text-green-400 absolute -right-1 -bottom-1" size={16} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Spaces</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Create new collaborative space</p>
            <div className="mt-auto">
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm inline-flex items-center">
                New <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/50">
          <div className="flex flex-col h-full">
            <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <LineChart className="text-green-600 dark:text-green-400" size={20} />
              <PlusCircle className="text-green-600 dark:text-green-400 absolute -right-1 -bottom-1" size={16} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Query Editor</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Create a new query</p>
            <div className="mt-auto">
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm inline-flex items-center">
                New <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/50">
          <div className="flex flex-col h-full">
            <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative">
              <BarChart2 className="text-green-600 dark:text-green-400" size={20} />
              <PlusCircle className="text-green-600 dark:text-green-400 absolute -right-1 -bottom-1" size={16} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">BI Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Create a new dashboard</p>
            <div className="mt-auto">
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm inline-flex items-center">
                New <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 hover:shadow-md transition-shadow border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/50">
          <div className="flex flex-col h-full">
            <div className="bg-green-100 dark:bg-green-800/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 relative">
              <FolderTree className="text-green-600 dark:text-green-400" size={20} />
              <PlusCircle className="text-green-600 dark:text-green-400 absolute -right-1 -bottom-1" size={16} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Lakehouse Objects</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Create lakehouse objects</p>
            <div className="mt-auto">
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm inline-flex items-center">
                New <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent/Favorite Works Section */}
      <div className="mb-8">
        <CustomTabs defaultValue="recent" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pick up where you left</h2>
            <CustomTabsList>
              <CustomTabsTrigger value="recent">Recent Works</CustomTabsTrigger>
              <CustomTabsTrigger value="favorites">Favorites</CustomTabsTrigger>
            </CustomTabsList>
          </div>
          
          <CustomTabsContent value="recent">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Viewed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentWorks.map((work) => (
                    <tr key={work.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{work.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">{work.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {work.viewed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {work.updated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CustomTabsContent>
          
          <CustomTabsContent value="favorites">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Viewed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {favoriteWorks.map((work) => (
                    <tr key={work.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{work.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-300">{work.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {work.viewed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {work.updated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CustomTabsContent>
        </CustomTabs>
      </div>
    </div>
  );
};

export default HomePage;
