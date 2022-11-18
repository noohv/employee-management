import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@mui/material';

export default function ConfirmDialog(props) {
  
  const { confirmDialog, setConfirmDialog } = props
  
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogContent>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button variant='outlined' onClick={() => setConfirmDialog({...confirmDialog, isOpen:false})}>Nē</Button>
        <Button variant='contained' color='error' onClick={confirmDialog.onConfirm}>Jā</Button>
      </DialogActions>

    </Dialog>
  )
}