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
      main: '#49648A'
    },
    secondary: {
      main: '#19857b'
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
