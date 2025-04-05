
import { Search, Settings, LogOut, Moon, Sun, User, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [selectedLakehouse, setSelectedLakehouse] = useState('production');
  
  return (
    <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Data Platform</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Select Lakehouse:</span>
          <Select value={selectedLakehouse} onValueChange={setSelectedLakehouse}>
            <SelectTrigger className="w-36 h-8 text-sm">
              <SelectValue placeholder="Select Lakehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md text-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
          Help
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center">
              U
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer">
              {theme === 'dark' ? (
                <><Sun className="mr-2 h-4 w-4" /> Light Theme</>
              ) : (
                <><Moon className="mr-2 h-4 w-4" /> Dark Theme</>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>User Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <KeyRound className="mr-2 h-4 w-4" />
              <span>API Access Token</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
