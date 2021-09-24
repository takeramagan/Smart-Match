import { Box, CircularProgress, Typography, Popover, makeStyles } from '@material-ui/core'
import { h4 } from '../constant/fontsize'
import { useState } from 'react'
import { POPUP_BG_COLOR } from '../constant/color'

const useStyles = makeStyles({
  popover: {
    borderRadius: '15px',
  }
})

export function CircularProgressWithLabel(props) {
  return (
    <Box position='relative' display='inline-flex'>
      <Box position='absolute' top={2} left={2}>
        <CircularProgress variant='determinate' size='46px' value={100} thickness={2} style={{ color: '#C4C4C4' }} />
      </Box>
      <CircularProgress variant='determinate' {...props} thickness={5} style={{ color: '#0061FF' }} />
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
        <Typography component='div' style={{ color: '#0061FF', fontSize: h4 }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export const PercentageLabel = ({ name, value, text }) => {
  //add popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    if (text) setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopOver = Boolean(anchorEl);
  const classes = useStyles()
  return (
    <Box p={1}
      textAlign='center'
      onMouseLeave={handlePopoverClose}
      onMouseEnter={handlePopoverOpen}
    >
      <CircularProgressWithLabel size='50px' value={Number(value)} />
      <Box m={0} color='#0061FF'>
        {name}
      </Box>
      <Popover
        id="popover"
        open={openPopOver}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        style={{
          pointerEvents: 'none',
        }}
        classes={{ paper: classes.popover }}
        disableRestoreFocus
        disableScrollLock
      >
        {/* {Object.entries(job).map(([key, value]) => <Typography key={key}>{key} : {value.toString()}</Typography>)} */}
        <Box p={1} width={300} minHeight={50} bgcolor={POPUP_BG_COLOR}>
          {text && <Typography>{name}: {text}</Typography>}
        </Box>
      </Popover>
    </Box>
  )
}
