import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#6b6dbe',
    },
    // background: {
    //   default: '#3b3b3b',
    // },
  },
  typography: {
    allVariants: {
      // color: 'white',
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // color: 'white',
        },
      },
    },
  },
});

export default theme;