import { Box, CircularProgress, Typography } from '@material-ui/core'

export function CircularProgressWithLabel (props) {
  return (
    <Box position='relative' display='inline-flex'>
      <Box position='absolute' top={2} left={2}>
        <CircularProgress variant='determinate' size='56px' value='100' thickness={2} style={{ color: '#C4C4C4' }} />
      </Box>
      <CircularProgress variant='determinate' {...props} thickness={5} style={{ color: '#5D88C2' }} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography component='div' style={{ color: '#5D88C2', fontSize: '14px' }}>{`${Math.round(
          props.value
        )}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export const PercentageLabel = ({ name, value }) => {
  return (
    <Box p={4} textAlign='center'>
      <CircularProgressWithLabel value={value} size='60px' />
      <Box m={1}>
        {name}
      </Box>
    </Box>
  )
}
