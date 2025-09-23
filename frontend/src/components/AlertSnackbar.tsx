import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AlertSnackbarProps {
  open: boolean;
  message: string;
  code: number;
  onClose: () => void;
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ open, message, code, onClose }) => {

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
      <Alert onClose={onClose} title={code.toString()} severity="error" sx={{ width: '100%' }}>
        {message} 
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
