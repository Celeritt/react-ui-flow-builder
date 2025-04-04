
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BackendIntegrationGuide = () => {
  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Connecting to Your Backend</CardTitle>
        <CardDescription>
          Guide for integrating this UI with your existing backend functions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Direct Function Calls</h3>
          <p className="text-gray-700">
            Since your backend doesn't primarily use APIs, you can import backend functions directly and call them 
            from your React components or custom hooks.
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm">
{`// In your component or custom hook
import { yourBackendFunction } from '../path/to/backend';

function handleAction() {
  const result = yourBackendFunction(params);
  // Update UI with result
}`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Component Event Handlers</h3>
          <p className="text-gray-700">
            Connect UI element events (clicks, form submissions) to your backend functions:
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm">
{`const handleButtonClick = () => {
  // Import your backend function
  import { processData } from '../backend/dataProcessing';
  
  // Call it directly
  const result = processData(params);
  
  // Update UI state
  setData(result);
}`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Custom Hook Approach</h3>
          <p className="text-gray-700">
            Using the provided <code>useBackendIntegration</code> hook:
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm">
{`// In your component
import { useBackendIntegration } from '@/hooks/useBackendIntegration';

function YourComponent() {
  const { data, isLoading, error } = useBackendIntegration({
    pageId: 'your-page-id',
    params: { key: 'value' }
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render your data */}</div>;
}`}
          </pre>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-md font-medium text-blue-800">Next Steps</h4>
          <ol className="list-decimal list-inside mt-2 text-blue-700 space-y-1">
            <li>Identify the backend functions needed for each page/component</li>
            <li>Import those functions into your React components</li>
            <li>Connect UI events to those functions</li>
            <li>Update your UI state based on function results</li>
            <li>Consider adding error handling and loading states</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackendIntegrationGuide;
