import React from 'react'
import { Button } from '@mui/material'

export default function ActionButton(props) {
  
    const { color, children, onClick } = props

    return (
        <Button
            onClick={onClick}
            sx={{
                backgroundColor: color
            }}
        >
            {children}
        </Button>
    )
}

