
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Plus, Search, X, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

interface QueryContentProps {
  activePage: string | null;
}

const QueryContent: React.FC<QueryContentProps> = ({ activePage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState("datalake");

  const handleRedirectToSqlEditor = () => {
    // This would normally navigate to the SQL editor
    // For demo purposes, we're using an alert
    alert("Redirecting to SQL Editor (This will be replaced with actual navigation in production)");
    // Implementation example:
    // window.location.href = 'http://your-domain:port/sql-editor';
  };

  const handleCreateNewSavedQuery = () => {
    // This would normally navigate to the create query page
    // For demo purposes, we're using an alert
    alert("Creating new saved query (This will be replaced with actual functionality in production)");
    // Implementation example:
    // navigate('/query/saved-queries/create');
  };

  const renderSqlEditor = () => {
    // Redirect to external SQL editor
    handleRedirectToSqlEditor();
    return null;
  };

  const renderSavedQueries = () => {
    return (
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Saved Queries</h2>
            <p className="text-gray-600 text-sm">Browse and manage your saved SQL queries</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-9"
                placeholder="Search saved queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <Button onClick={handleCreateNewSavedQuery}>
              <Plus className="mr-2" size={16} />
              New Saved Query
            </Button>
          </div>
        </div>

        <Tabs defaultValue="certified">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="certified">Certified</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
          </TabsList>
          
          <TabsContent value="certified" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-medium mb-2">Monthly Revenue Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    SELECT SUM(revenue) as total_revenue, MONTH(date) as month FROM sales GROUP BY month ORDER BY month
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>By Data Team</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">Certified</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="public" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-medium mb-2">Customer Acquisition Report</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    SELECT count(*) as new_customers, signup_date FROM customers WHERE signup_date {'>'} '2025-01-01' GROUP BY signup_date
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>By Marketing Dept</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Public</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="private" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-medium mb-2">Personal Performance Metrics</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    SELECT * FROM employee_stats WHERE employee_id = 'current_user_id' AND date {'>'} '2025-03-01'
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Created by you</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Private</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderQueryHistory = () => {
    return (
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Query History</DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-9"
                  placeholder="Search history..."
                />
              </div>
              <div>
                <Button variant="outline" size="sm" className="mr-2">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Clear
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="datalake" onValueChange={setHistoryTab}>
              <TabsList className="w-full md:w-auto mb-4">
                <TabsTrigger value="datalake">Datalake Queries</TabsTrigger>
                <TabsTrigger value="adhoc">Adhoc Queries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="datalake">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-mono text-sm">
                            SELECT * FROM customers WHERE signup_date {'>'} '2025-03-01' ORDER BY signup_date DESC LIMIT 100
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">Save</Button>
                          <Button variant="ghost" size="sm">Run Again</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Run at: April 6, 2025 10:23 AM</span>
                        <span>Runtime: 1.2s • Rows: 84</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="adhoc">
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-mono text-sm">
                            SELECT * FROM ad_hoc_table_{i} WHERE created_date {'>'} '2025-04-01'
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">Save</Button>
                          <Button variant="ghost" size="sm">Run Again</Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Run at: April {i + 4}, 2025 09:15 AM</span>
                        <span>Runtime: 0.8s • Rows: 42</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsHistoryOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderQueryOverview = () => {
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Query</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={handleRedirectToSqlEditor}>
            <h3 className="text-xl font-semibold mb-3">SQL Editor</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Run SQL queries directly against your data sources.
            </p>
            <Button variant="outline" className="w-full hover:bg-green-500 hover:text-white transition-colors">
              Open SQL Editor
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePageNavigation('query-saved-queries')}>
            <h3 className="text-xl font-semibold mb-3">Saved Queries</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Access your library of saved SQL queries.
            </p>
            <Button variant="outline" className="w-full hover:bg-green-500 hover:text-white transition-colors">
              View Saved Queries
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePageNavigation('query-history')}>
            <h3 className="text-xl font-semibold mb-3">Query History</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Browse and reuse your recent queries.
            </p>
            <Button variant="outline" className="w-full hover:bg-green-500 hover:text-white transition-colors">
              View History
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Card>
        </div>
        
        <Card className="p-6 bg-green-50 dark:bg-green-900">
          <h3 className="text-xl font-semibold mb-3">Query Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-2">SQL Editor</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Write and execute SQL queries directly against your data sources. Analyze data from multiple connected sources
                with our high-performance query engine.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Saved Queries</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Save frequently used queries for quick access. Share your queries with team members and mark important
                queries as certified for organization-wide use.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Query History</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access your recent query execution history. Reuse previous queries, track performance metrics,
                and save successful queries for future use.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const handlePageNavigation = (pageId: string) => {
    // This would normally set the active page via the sidebar
    if (pageId === 'query-sql-editor') {
      handleRedirectToSqlEditor();
    } else if (pageId === 'query-history') {
      setIsHistoryOpen(true);
    } else if (pageId === 'query-saved-queries') {
      // Navigate to saved queries
      // For demo, we'll just show the saved queries in the current page
    }
  };

  // Render content based on the active page
  if (activePage === 'query-sql-editor') {
    return renderSqlEditor();
  } else if (activePage === 'query-saved-queries') {
    return renderSavedQueries();
  } else if (activePage === 'query-history') {
    return (
      <>
        {renderQueryOverview()}
        {renderQueryHistory()}
      </>
    );
  } else {
    return renderQueryOverview();
  }
};

export default QueryContent;
