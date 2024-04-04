import {createTheme} from "@mui/material";

const theme = createTheme(({
  palette: {
    primary: {
      main: '#DCF42C',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
              boxShadow: 'none',
              padding: '14px 20px',
            },
        },
    }
  }
}))

export default theme