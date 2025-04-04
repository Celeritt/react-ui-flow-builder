
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">Data Platform</h1>
      </div>
      
      <div className="flex items-center relative w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search..." 
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex items-center">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          Help
        </button>
        <div className="ml-4 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          U
        </div>
      </div>
    </div>
  );
};

export default Header;
