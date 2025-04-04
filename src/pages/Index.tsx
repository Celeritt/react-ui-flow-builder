
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import BackendIntegrationGuide from '../components/BackendIntegrationGuide';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {!activeSection && !activePage && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to Your Data Platform</h1>
                <p className="text-gray-600 mt-2">
                  Select a menu item from the sidebar to navigate through the platform
                </p>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setShowIntegrationGuide(!showIntegrationGuide)}
                >
                  {showIntegrationGuide ? 'Hide' : 'Show'} Backend Integration Guide
                </button>
              </div>
              
              {showIntegrationGuide && <BackendIntegrationGuide />}
            </>
          )}
          
          {(activeSection || activePage) && (
            <ContentArea 
              activeSection={activeSection} 
              activePage={activePage} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
