import { Paper } from '@material-ui/core'
import { SECTION_BLUE } from '../constant/color'

export const Section =  ({ children, highlighted, style }) => {
  return (
    <Paper
      elevation={0} style={{
        // backgroundColor: highlighted ? '#024CC3' : '#FFFFFF',
        // backgroundColor: highlighted ? '#0066CC' : '#FFFFFF',
        backgroundColor: highlighted ? SECTION_BLUE : '#FFFFFF',
        color: highlighted ? '#FFFFFF' : 'inherit',
        boxShadow: '6px 0px 18px rgba(217, 217, 217, 0.16)',
        borderRadius: 25,
        ...style
      }}
    >
      {children}
    </Paper>
  )
}
