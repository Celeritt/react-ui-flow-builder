
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Database, FileX2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Database size={80} className="text-gray-300 dark:text-gray-600" />
            <FileX2 size={40} className="text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4 text-green-600 dark:text-green-400">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Data Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Oops! It seems your query returned 0 rows. The data you're looking for might have been moved, deleted, or never existed.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-500 mb-8 italic">
          "SELECT * FROM pages WHERE route = '{location.pathname}';<br />
          -- 0 rows returned in 0.03s"
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center justify-center">
            <Home size={16} className="mr-2" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
