import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Controls from "../Reusable/controls/Controls";

export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props

  return (
    <Dialog open={openPopup}>
        <DialogTitle>
            <div style={{display:'flex'}}>
                <Typography variant='h6' style={{flexGrow:1}}>
                    {title}
                </Typography>
                    
                <Controls.Button
                color="error"
                text= "X"
                sx={{
                    width:"20px"
                }}
            >

            </Controls.Button>
            </div>
        </DialogTitle>

        <DialogContent dividers>
            {children}
        </DialogContent>
    </Dialog>
  )
}
