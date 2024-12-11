import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wand2 } from 'lucide-react';

const menuItems = [
  { 
    icon: <LayoutDashboard className="w-5 h-5" />, 
    text: 'Dashboard', 
    path: '/dashboard',
    description: 'Overview and analytics'
  },
  { 
    icon: <Wand2 className="w-5 h-5" />, 
    text: 'Create', 
    path: '/generate',
    description: 'Generate new content'
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper 
      elevation={0} 
      className="h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-gradient-to-b from-gray-50 to-white border-r border-gray-100"
    >
      <List className="p-3 space-y-2">
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            button
            onClick={() => navigate(item.path)}
            className={`rounded-xl transition-all duration-200 ${
              location.pathname === item.path 
                ? 'bg-blue-50 shadow-sm' 
                : 'hover:bg-gray-50'
            }`}
          >
            <ListItemIcon className={`min-w-[40px] ${
              location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              secondary={item.description}
              primaryTypographyProps={{
                className: `font-medium ${location.pathname === item.path ? 'text-blue-600' : ''}`
              }}
              secondaryTypographyProps={{
                className: 'text-xs'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;