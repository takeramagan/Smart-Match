import { Box, Link, LinearProgress, Typography, Button, Popover } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { h, h1, h2, h3, h4, h5} from '../constant/fontsize'
import { useState } from 'react'
import { METISIGN_WEBSITE } from '../constant/externalURLs'
import { POPUP_BG_COLOR } from '../constant/color'

const useStyles = makeStyles({
  root: {
    borderRadius: '16px', backgroundColor: 'white', height: '12px'
  },
  bar: {
    // background: "linear-gradient(90deg, #46EBD5 23.47%, #60EFFF 43.32%, #0061FF 66.27%)",
    background: "linear-gradient(90deg, #0061FF 23.47%, #60EFFF 43.32%, #46EBD5 66.27%)",
    borderRadius: '16px'
  },
  popover:{
    borderRadius: '15px',
  }
})

export function LinearProgressWithLabel (props) {
  const classes = useStyles()
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1} style={{ position: "relative" }}>
        <LinearProgress classes={{ root: classes.root, bar: classes.bar }} variant='determinate' color='secondary' {...props} />
        <span
          style={{
            position: "absolute",
            height: "12px",
            width: "12px",
            backgroundColor: "#FFFFFF",
            borderRadius: "50%",
            borderStyle: "solid",
            borderWidth: "3px",
            borderColor: "#0061FF",
            display: "inlineBlock",
            left: `${props.value - 4}%`,
            top: "0px",
          }}
        ></span>
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2'>{`${Math.round(
          props.value
        )}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export function MatchJob ({ job, onClick, metisign }) {
  const { t } = useTranslation()
  const { job_title, job_company, job_link, job_location, job_logo, job_rating, job_summary, job_type, matched_percentage, job_salary, 
    /** 以下几个metisign only */
    job_id, job_open_date, job_status
  } = job


  
  // const logo = job_logo ? job_logo : 'data:image/png;base64,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'
  const logo = job_logo ? job_logo : metisign ? 'metisign.png' :'defaultlogo.svg'
  const rating = job_rating ? job_rating : metisign ? '' : 'Not Disclosed'
  const link = job_link ?? METISIGN_WEBSITE
  const salary = job_salary ?? 'Not Disclosed'
  //add popover
  const classes=useStyles()
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPopOver = Boolean(anchorEl);

  return (
    <div >
    <Box display='flex' alignItems='center' 
      onMouseLeave={handlePopoverClose} 
      onMouseEnter={handlePopoverOpen} 
      justifyContent="center" 
    >
      <Box
        width= {70} height={70} 
        minWidth={70}
        style={{
          backgroundColor: 'white',
          borderRadius:10,
          overflow: 'hidden'
        }} my={1}
      >
        <img id='image0' style={{width:70, height:70}} src= {logo} />

      </Box>
      <Box
        display='flex' flexDirection='column' flexGrow='1' height='85px' m={1}  style={{alignItems:'flex-start', justifyContent:'center'}}
      >
        <Box
            fontSize={h3} my='2px' 
            // maxWidth='380px' 
            style={{
            // whiteSpace: 'nowrap',
            maxHeight: 38,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {job_title}
        </Box>
        <Box
          fontSize={h3} my='2px'
        >
          {t('matching jobs.salary')}{salary}
        </Box>
        <Box width='100%'>
          <LinearProgressWithLabel value={matched_percentage} />
        </Box>
      </Box>
      <Box flexShrink={0}>
        <Button
        
          href={link}
          target="_blank"
          onClick={() => onClick(link)}
          style={{
            color: 'white', fontWeight: '500', border:'1px solid white', borderRadius:15, height: 30,
            width: 68
          }}
        >
          {t('matching jobs.apply')}
        </Button>
      </Box>
    </Box>
    <Popover
    id="popover"
      open={openPopOver}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 78,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      style={{ 
        pointerEvents: 'none', 
      }}
      classes={{paper:classes.popover}}
      disableRestoreFocus
      disableScrollLock
    >
      {/* {Object.entries(job).map(([key, value]) => <Typography key={key}>{key} : {value.toString()}</Typography>)} */}
      {/* <Box p={1} width={370} bgcolor='rgba(96,239,255, 0.4)'>*/}
      <Box p={1} width={370} bgcolor={POPUP_BG_COLOR}>
        {job_company && <Typography>Company: {job_company}</Typography>}
        {rating && <Typography>Rating: {rating}</Typography>}
        {job_id && <Typography>Job id: {job_id}</Typography>       }
        {job_status && <Typography>Status: {job_status}</Typography>       }
        {job_open_date && <Typography>Open date: {job_open_date}</Typography>       }
        {job_location && <Typography>Location: {job_location}</Typography>}
        {job_type && job_type.length > 0 && <Typography>Type: {job_type.join(' ')}</Typography>}
        {job_summary && <Typography>Summary:</Typography>}
        {job_summary && <Typography>{job_summary}</Typography>}
      </Box>
    </Popover>
    </div>
  )
}
