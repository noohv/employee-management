import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Controls from "../Reusable/controls/Controls";
import CloseIcon from '@mui/icons-material/Close';

export default function Popup({ title, children, openPopup, setOpenPopup, setCurrentId }) {
  return (
    <Dialog open={openPopup}>
        <DialogTitle>
            <div style={{display:'flex'}}>
                <Typography variant='h6' style={{flexGrow:1}}>
                    {title}
                </Typography>
                    
                <Controls.ActionButton
                    color="#90EE90"
                    sx={{
                        width:"20px",
                    }}
                    onClick = {() => {
                        setOpenPopup(false)
                        setCurrentId(null)
                    }}
                >
                    <CloseIcon />
                </Controls.ActionButton>
            </div>
        </DialogTitle>

        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}
