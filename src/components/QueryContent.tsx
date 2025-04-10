
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, FileText, History, Database, Search, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

interface QueryContentProps {
  activePage: string | null;
}

const QueryContent: React.FC<QueryContentProps> = ({ activePage }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeHistoryTab, setActiveHistoryTab] = useState("datalake");

  const handleSqlEditor = () => {
    console.log("Opening SQL Editor");
    // This would normally call your backend to open the SQL editor
    // Example: yourOpenSqlEditorFunction();
  };

  const handleSavedQueries = () => {
    console.log("Opening Saved Queries");
    // This would normally call your backend to load saved queries
    // Example: yourLoadSavedQueriesFunction();
  };

  const handleQueryHistory = () => {
    setIsHistoryOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Query</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col" onClick={handleSqlEditor}>
          <div className="flex justify-center mb-4">
            <Code className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl text-center font-semibold mb-3">SQL Editor</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center flex-grow">
            Write and execute SQL queries against your data lake or warehouse.
          </p>
          <Button className="w-full hover:bg-green-600 transition-colors">
            Open SQL Editor
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col" onClick={handleSavedQueries}>
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl text-center font-semibold mb-3">Saved Queries</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center flex-grow">
            Access and manage your library of saved SQL queries.
          </p>
          <Button className="w-full hover:bg-green-600 transition-colors">
            View Saved Queries
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col" onClick={handleQueryHistory}>
          <div className="flex justify-center mb-4">
            <History className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl text-center font-semibold mb-3">Query History</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center flex-grow">
            Browse through your previous query executions.
          </p>
          <Button className="w-full hover:bg-green-600 transition-colors">
            View Query History
          </Button>
        </Card>
      </div>

      <Card className="p-6 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-lg font-semibold mb-3">Query Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <Database size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Cross-Source Queries</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Query data across multiple sources with a single SQL statement.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <Search size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Advanced Filtering</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Powerful filtering capabilities with complex expressions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <PlusCircle size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Query Parameterization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create reusable queries with customizable parameters.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <Code size={16} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">SQL Autocomplete</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intelligent code completion for faster query development.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Query History Dialog */}
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <History className="mr-2 h-5 w-5" />
              Query History
            </DialogTitle>
            <DialogClose />
          </DialogHeader>
          
          <Tabs defaultValue={activeHistoryTab} onValueChange={setActiveHistoryTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="datalake">Data Lake Queries</TabsTrigger>
              <TabsTrigger value="adhoc">Adhoc Queries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="datalake">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-green-600">SELECT * FROM sales.transactions WHERE date &gt; '2024-01-01'</h3>
                      <span className="text-xs text-gray-500">{`${i + 1} hour${i !== 0 ? 's' : ''} ago`}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">bronze_zone</span>
                        <span className="text-xs text-gray-500 ml-3">Rows: 1,245</span>
                        <span className="text-xs text-gray-500 ml-3">Duration: 2.3s</span>
                      </div>
                      <Button variant="outline" size="sm">Run Again</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="adhoc">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-green-600">SELECT department, COUNT(*) FROM employees GROUP BY department</h3>
                      <span className="text-xs text-gray-500">{`${i + 1} day${i !== 0 ? 's' : ''} ago`}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">adhoc</span>
                        <span className="text-xs text-gray-500 ml-3">Rows: 12</span>
                        <span className="text-xs text-gray-500 ml-3">Duration: 0.8s</span>
                      </div>
                      <Button variant="outline" size="sm">Run Again</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QueryContent;
