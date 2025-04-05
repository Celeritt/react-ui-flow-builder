
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import HomePage from '../components/HomePage';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>('home');
  const [activePage, setActivePage] = useState<string | null>(null);
  
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
          {(!activeSection || activeSection === 'home') && (
            <HomePage />
          )}
          
          {activeSection && activeSection !== 'home' && (
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
