import { Box, Link, LinearProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    borderRadius: '16px', backgroundColor: 'white', height: '12px'
  },
  bar: {
    background: 'linear-gradient(90deg, #46EBD5 23.47%, #60EFFF 43.32%, #0061FF 66.27%)',
    borderRadius: '16px'
  }
})

export function LinearProgressWithLabel (props) {
  const classes = useStyles()
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress classes={{ root: classes.root, bar: classes.bar }} variant='determinate' color='secondary' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='white'>{`${Math.round(
          props.value
        )}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export function MatchJob ({ job }) {
  return (
    <Box display='flex'>

      <Box
        width='88px' height='88px' style={{
          backgroundColor: 'black'
        }} my={2}
      >
        <img id='image0' width='88px' height='88px' src='data:image/png;base64,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' />

      </Box>
      <Box
        flexGrow='1' height='88px' style={{
          backgroundColor: '#black'
        }} m={2}
      >
        {/* <Box fontSize='12px'>
          {Mozilla Waterloo Remote}
        </Box> */}
        <Box
          fontSize='16px' my='2px' width='230px' style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {job.job_title}
        </Box>
        <Box
          fontSize='16px' my='2px'
        >
          {job.full_time.salary_range}
        </Box>
        <Box>
          <LinearProgressWithLabel value={job.matched_percentage} />
        </Box>
      </Box>
      <Box width='68px' height='88px' my={2} fontsize='16px' display='flex' justifyContent='center' alignItems='center'>
        <Link
          href={job.job_link} style={{
            color: 'white', fontWeight: '500'

          }}
        >
          Apply
        </Link>
      </Box>
    </Box>
  )
}
