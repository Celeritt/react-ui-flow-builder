
import { useEffect, useState } from 'react';

interface BackendIntegrationOptions {
  pageId: string;
  params?: Record<string, any>;
}

export function useBackendIntegration<T>({ pageId, params }: BackendIntegrationOptions) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // This is where you would integrate with your backend
        // Instead of making an API call, you would import and call your backend function directly
        
        // Example:
        // import { getDataForPage } from '../backend/functions';
        // const result = await getDataForPage(pageId, params);
        
        // For now, we'll just simulate a successful response after a delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate data based on the pageId
        const mockData = {
          'home-dashboard': { items: [{ id: 1, name: 'Dashboard Item 1' }, { id: 2, name: 'Dashboard Item 2' }] },
          'bi-canvas-dashboards': { charts: [{ id: 1, title: 'Sales Performance' }, { id: 2, title: 'User Growth' }] },
          'query-sql-lab': { queries: [{ id: 1, name: 'Recent Query 1' }, { id: 2, name: 'Recent Query 2' }] },
        };
        
        setData((mockData as any)[pageId] || { message: 'No data available for this page' });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pageId) {
      fetchData();
    }
  }, [pageId, JSON.stringify(params)]);

  return { data, isLoading, error };
}
