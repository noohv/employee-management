import React from 'react';
import { Dialog, DialogActions, DialogContent, Typography, Button } from '@mui/material';

export default function ConfirmDialog({ confirmDialog, setConfirmDialog }) {
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
      <DialogActions sx={{justifyContent: 'center', mb: 2}}>
        <Button variant='outlined' color='gray' onClick={() => setConfirmDialog({...confirmDialog, isOpen:false})}>Nē</Button>
        <Button variant='contained' color='error' onClick={confirmDialog.onConfirm}>Jā</Button>
      </DialogActions>
    </Dialog>
  )
}