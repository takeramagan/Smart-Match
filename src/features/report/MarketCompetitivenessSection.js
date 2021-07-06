import { Box, Grid, Button, Typography, makeStyles, Link } from '@material-ui/core'
import { PercentageLabel } from '../../components/PercentageLabel'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation, Trans } from 'react-i18next'
import { h1, h2, h3, h4, h5} from '../../constant/fontsize'
import { DK_SERVICE } from '../../constant/externalURLs'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { linkTrack } from '../../untils/linkTrack'

const useStyles = makeStyles({
  ai: {
    width: '100px',
    height: '100px',
    '&:hover': {
      transition: 'all 0.6s ease',
      transform: 'rotate(360deg) scale(1.5)',
      cursor: 'pointer',
    }
  },
  clicktext: {
    '&:hover':{
      transition: 'all',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    }
  }
})

export const RadarChart = ({ report }) => {
  const { t } = useTranslation()
  // const format = 70
  // const language = 80
  // const matchLevel = 90
  // const grammer = 100
  const { format, language, matching : matchLevel, logic } = report.resume_marking_info
  const option = {
    title: {
    },
    color: ['rgba(96,239,255, 0.4)'],
    tooltip: {},
    legend: {
      bottom: 10
    },
    radar: {
      radius: '60%',
      splitNumber: 1,
      axisLine: {
        show: false
      },
      splitArea: {
        areaStyle: {
          color: ['#F8F8F8']
        }
      },
      name: {
        textStyle: {
          color: '#6A707E',
          fontSize: 12
        }
      },
      indicator: [
        { name: t('radarchart.Format'), max: 100 },
        { name: t('radarchart.Language'), max: 100 },
        { name: t('radarchart.Match Level'), max: 100 },
        { name: t('radarchart.Logic'), max: 100 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      symbol: 'none',
      type: 'radar',
      areaStyle: {},
      data: [
        {
          value: [format, language, matchLevel, logic],
          name: t('radarchart.Resume Analysis')
        }
      ]
    }]
  }
  return (
    <Box height={400}>
      <ReactECharts
        option={option} style={{ height: '400px', width: '100%' }}
      />
    </Box>
  )
}

export const MarketCompetitiveness = ({ report }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const jobtitle = report.market_value_info.matched_job_title
  // const overall_level = 3
  const jobLevel = 'Senior'
  const competitiveness = 9
  // const format = 70
  // const language = 80
  // const matchLevel = 90
  // const grammer = 100
  const { format, language, matching : matchLevel, logic } = report.resume_marking_info
  const classes = useStyles()
  return (
    <Section>
      <Box p={4}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('radarchart.title')}
        </Box>
        <Box fontSize={h2} fontWeight='500' color='#6A707E'>
          {/* You seem to be a good fit for <b>{report.market_value_result[0].matched_job_title}</b> at */}
          <Trans
            i18nKey="radarchart.fit job"
            values={{ jobtitle: jobtitle}}
            components={[<b>defaults</b>]}
          />
        </Box>
        {/* <Box fontSize='36px' fontWeight='500' color={theme.palette.primary.main}>
          {jobLevel}
        </Box> */}

        <Box fontSize={h3} fontWeight='500' lineHeight='24px' mb={-3}>
          {/* You are ranked {report.overall_job_level.toLowerCase()} level {report.overall_competitiveness}/10 compared to your competitors. Below are your detailed category of your resume analysis. */}
          {/* {t('radarchart.rank', {joblevel: jobLevel.toLowerCase(), competitiveness: competitiveness})} */}
          {t('radarchart.text')}
        </Box>
        <Grid container >
          <Grid item xs={8}>
            <RadarChart report={report} />
          </Grid>

          <Grid item xs={4}>
            <Box display='flex' flexDirection="column" mt={4}>
              <PercentageLabel name={t('radarchart.Format')} value={format} />
              <PercentageLabel name= {t('radarchart.Language')} value={language} />
              <PercentageLabel name= {t('radarchart.Match Level')} value={matchLevel} />
              <PercentageLabel name= {t('radarchart.Logic')} value={logic} />
            </Box>
          </Grid>
        </Grid>
        {/* <Box>
          <RadarChart report={report} />
        </Box>
        <Box display='flex' flexDirection="row" justifyContent='space-around' p={4}>
          <PercentageLabel name={t('radarchart.Format')} value={report.experiences_competitiveness} />
          <PercentageLabel name= {t('radarchart.Language')} value={report.education_competitiveness} />
          <PercentageLabel name= {t('radarchart.Match Level')} value={report.soft_skill_competitiveness} />
          <PercentageLabel name= {t('radarchart.Grammar')} value={report.hard_skill_competitiveness} />
        </Box> */}
 
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' mt={-2} mb={-3}>
          <a href={DK_SERVICE} target="_blank" style={{textDecoration:'none'}} onClick={() => linkTrack(report.id, DK_SERVICE)}>
            <Typography color='primary' className={classes.clicktext} style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
              {t('radarchart.contact')}
            </Typography>
          </a>
          {/* <Box display='flex' alignItems='center'>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AccountCircleIcon />}
              href={DK_LINK}
              target='_blank'
              color='primary'
              size='small'
              style={{borderRadius:20, width:105 }}
              onClick={() => {linkTrack(report.id, DK_LINK)}}
            >
              {t('contact.click me')}
            </Button>
          </Box> */}
            <Link
              href={DK_SERVICE}
              target='_blank'
              onClick={() => {linkTrack(report.id, DK_SERVICE)}}
            >
              <img src='ai.svg' width={80} height={100} className={classes.ai}/>
            </Link>
        </Box>
      </Box>
    </Section>
  )
}
