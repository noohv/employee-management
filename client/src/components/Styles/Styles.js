import { createTheme } from "@mui/material";

const Colors = {
    white: "#fff",
    black: "#000",
    primary: "#02c39a",
    secondary: "#05668d"
}

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },

        secondary: {
            main: Colors.secondary
        }
    },

    shape: {
        borderRadius: 0
    },
});

export default theme;