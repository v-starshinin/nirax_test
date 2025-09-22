// src/AlertSnackbar.tsx
import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ open, message, onClose }) => {

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); 

      return () => clearTimeout(timer); 
    }
  }, [open, onClose]);

  return (
    <Snackbar open={open} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
