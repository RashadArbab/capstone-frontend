import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import { useState, forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
  });
const Notification = (notification) => {
    const {vertical, horizontal, message, severity} = notification.props
    const [open, setOpen] = useState(notification.props.open);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      return (
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal}}
            open={open}
            key={vertical + horizontal}
            onClose={handleClose}
          >
            <Alert severity={severity} onClose={handleClose}>{message}</Alert>
            </Snackbar>
        </Box>
      );
}
export default Notification