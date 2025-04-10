
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database, FileQuestion, Home, RefreshCw } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
      <div className="max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Database className="h-24 w-24 text-gray-300 dark:text-gray-600" />
            <FileQuestion 
              className="absolute bottom-0 right-0 h-12 w-12 text-blue-500 bg-white dark:bg-gray-800 rounded-full p-1" 
            />
          </div>
        </div>
        
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          404 - Data Not Found
        </h1>
        
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Oops! We couldn't find the data you were looking for. It seems our query returned zero rows.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="mb-2">Tech joke:</p>
          <p className="italic">
            "I went to find my data in the cloud but all I got was 404 precipitation not found."
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
