import { Paper } from '@material-ui/core'

export const Section = ({ children, highlighted, style }) => {
  return (
    <Paper
      elevation={0} style={{
        backgroundColor: highlighted ? '#024CC3' : '#FFFFFF',
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
