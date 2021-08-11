import { createTheme } from '@material-ui/core/styles';

const fontfamily = [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    // 'Source Sans Pro',
    // 'sans-serif'
].join(',')

export default createTheme({
    palette: {
        primary: {
            main: '#5d7582',
        },
        // secondary: {
        //   main: green[500],
        // },
    },
    typography: {
        fontFamily: fontfamily
    }, 
})

export const secondaryTheme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        // secondary: {
        //   main: green[500],
        // },
    },
    typography: {
        fontFamily: fontfamily
    }, 
})