import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#0061FF'
    },
    secondary: {
      main: '#C4D3E7'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#F8F8F8'
    }
  }
})

export default theme
