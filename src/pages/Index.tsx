
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ContentArea from '../components/ContentArea';
import HomePage from '../components/HomePage';
import DatahubContent from '../components/DatahubContent';
import WorksContent from '../components/WorksContent';
import SpacesContent from '../components/SpacesContent';
import QueryContent from '../components/QueryContent';
import BiCanvasContent from '../components/BiCanvasContent';

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
          
          {activeSection === 'datahub' && (
            <DatahubContent 
              activePage={activePage} 
            />
          )}
          
          {activeSection === 'works' && (
            <WorksContent 
              activePage={activePage} 
            />
          )}
          
          {activeSection === 'spaces' && (
            <SpacesContent />
          )}
          
          {activeSection === 'query' && (
            <QueryContent 
              activePage={activePage} 
            />
          )}
          
          {activeSection === 'bi-canvas' && (
            <BiCanvasContent 
              activePage={activePage} 
            />
          )}
          
          {activeSection && !['home', 'datahub', 'works', 'query', 'bi-canvas', 'spaces'].includes(activeSection) && (
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
