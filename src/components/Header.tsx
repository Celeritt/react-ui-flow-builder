
import { Search, Settings, LogOut, Moon, Sun, User, KeyRound } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [selectedLakehouse, setSelectedLakehouse] = useState('production');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would normally call your backend search function
    console.log("Search functionality would connect to backend here");
  };

  const handleLakehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLakehouse(e.target.value);
  };
  
  // Close the user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Select Lakehouse:</span>
          <select 
            value={selectedLakehouse} 
            onChange={handleLakehouseChange}
            className="h-8 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="production">Production</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </form>
        
        <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
          Help
        </button>
        
        <div className="relative" ref={userMenuRef}>
          <button 
            className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center focus:outline-none hover:bg-green-700"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            U
          </button>
          {isUserMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
            >
              <div className="py-1">
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                >
                  {theme === 'dark' ? (
                    <><Sun className="mr-2 h-4 w-4" /> Light Theme</>
                  ) : (
                    <><Moon className="mr-2 h-4 w-4" /> Dark Theme</>
                  )}
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                  <User className="mr-2 h-4 w-4" />
                  <span>User Settings</span>
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>API Access Token</span>
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
