import React from 'react';
import {RegisterPage} from "./pages/register/Register.page";
import {ThemeProvider} from "@mui/material";
import './index.css';
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RegisterPage />
    </ThemeProvider>
  );
}

export default App;
