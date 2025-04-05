
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import BackendIntegrationGuide from '../components/BackendIntegrationGuide';
import HomePage from '../components/HomePage';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-0">
          {!activeSection && !activePage && (
            <HomePage />
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
