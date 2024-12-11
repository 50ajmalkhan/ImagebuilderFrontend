import React from 'react';
import { Paper, Typography, Box, Switch, FormControlLabel, Button } from '@mui/material';
import { Bell, Shield, Download } from 'lucide-react';

const UserSettings = () => {
  return (
    <Paper elevation={0} className="border border-gray-100 rounded-xl p-6">
      <Typography variant="h6" className="mb-4">Settings</Typography>
      <Box className="space-y-4">
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Email Notifications"
          className="w-full"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Auto-download Generated Content"
          className="w-full"
        />
        <FormControlLabel
          control={<Switch />}
          label="Two-Factor Authentication"
          className="w-full"
        />
      </Box>
      <Box className="mt-6 space-y-3">
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Download />}
          className="justify-start"
        >
          Download My Data
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<Shield />}
          className="justify-start"
        >
          Privacy Settings
        </Button>
      </Box>
    </Paper>
  );
};

export default UserSettings;