import React from 'react';
import { Button as Btn } from "@mui/material";

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    return (
        <Btn
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
        >
            {text}
        </Btn>
    )
}