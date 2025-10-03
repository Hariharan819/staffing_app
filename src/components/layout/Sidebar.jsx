import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Archive,
  MessageSquare,
  UserCheck,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Briefcase, label: 'Live Jobs', path: '/live-jobs' },
    { icon: Users, label: 'Candidates', path: '/candidates' },
    { icon: Archive, label: 'Archived Jobs', path: '/archived-jobs' },
    { icon: MessageSquare, label: 'New responses', path: '/new-responses' },
    { icon: UserCheck, label: 'Selected candidates', path: '/selected-candidates' },
    { icon: FileText, label: 'Submitted candidates', path: '/submitted-candidates' },
    { icon: Archive, label: 'Archived Responses', path: '/archived-responses' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          {/* <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold bg-purple-600 px-3  py-2 rounded-xl text-lg">iP</span>
          </div> */}
          {!isCollapsed && (
            <span className="ml-3 text-xl font-bold text-purple-800">ipartner</span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5  rounded-lg cursor-pointer bg-purple-600  transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5  h-5 text-white" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                  isActive(item.path) ? 'text-white' : 'text-gray-500'
                }`} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full px-3 py-2.5 text-red-600 cursor-pointer hover:bg-red-50 rounded-lg transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span className="font-medium ">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;