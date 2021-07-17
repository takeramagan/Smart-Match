import { Box, Grid, Button, Typography, makeStyles, Link } from '@material-ui/core'
import { PercentageLabel } from '../../components/PercentageLabel'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation, Trans } from 'react-i18next'
import { h1, h2, h3, h4, h5} from '../../constant/fontsize'
import { DK_RESUME } from '../../constant/externalURLs'
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
      name: t('radarchart.Resume Analysis'),
      symbol: 'none',
      type: 'radar',
      areaStyle: {},
      data: [
        {
          value: [format, language, matchLevel, logic],
          // name: t('radarchart.Resume Analysis')
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

  const jobLevel = 'Senior'
  const competitiveness = 9

  const { format, language, matching : matchLevel, logic, 
    format_to_improve,  language_to_improve, logic_to_improve, profession_match_to_improve} = report.resume_marking_info
  let format_improve = report.lang === 'cn' ? format_to_improve?.zhs : format_to_improve?.eng
  format_improve = format < 100 ? format_improve[0] : t('radarchart.Format 100')
  let lang_improve = report.lang === 'cn' ? language_to_improve?.zhs : language_to_improve?.eng
  lang_improve = language < 100  ? lang_improve[0] : t('radarchart.Language 100')
  let profession_improve = report.lang === 'cn' ? profession_match_to_improve?.zhs : profession_match_to_improve?.eng
  profession_improve = matchLevel < 100 ? profession_improve[0] : t('radarchart.Match 100')
  let logic_improve = report.lang === 'cn' ? logic_to_improve?.zhs : logic_to_improve?.eng
  logic_improve = logic < 100 ? logic_improve[0] : t('radarchart.Logic 100')
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
              <PercentageLabel name={t('radarchart.Format')} value={format} text={format_improve}/>
              <PercentageLabel name= {t('radarchart.Logic')} value={logic} text={logic_improve}/>
              <PercentageLabel name= {t('radarchart.Match Level')} value={matchLevel} text={profession_improve}/>
              <PercentageLabel name= {t('radarchart.Language')} value={language} text={lang_improve}/>
            </Box>
          </Grid>
        </Grid>
 
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' mt={-2} mb={-3}>
          {/* <a href={DK_RESUME} target="_blank" style={{textDecoration:'none'}} onClick={() => linkTrack(report.id, DK_RESUME)}>
            <Typography color='primary' className={classes.clicktext} style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
              <Trans
                i18nKey="radarchart.contact"
                components={[<b style={{color: 'red'}}>defaults</b>]}
              />
            </Typography>
          </a> */}
            <Typography color='primary' style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
              {/* <a href={DK_RESUME} target="_blank" style={{color:'#0061FF'}} onClick={() => linkTrack(report.id, DK_RESUME)}>
                {t("radarchart.Click here")}
              </a> */}
              <Button href={DK_RESUME} 
                variant='contained' 
                color='primary' 
                target="_blank"
                style={{borderRadius:15, marginRight:10, height:30}}
                onClick={() => linkTrack(report.id, DK_RESUME)}
              >
                  {t("radarchart.Click here")}
              </Button>
              <Trans
                i18nKey="radarchart.contact"
                components={[<b >defaults</b>]}
              />
            </Typography>
            <Link
              href={DK_RESUME}
              target='_blank'
              onClick={() => {linkTrack(report.id, DK_RESUME)}}
            >
              <img src='ai.svg' width={80} height={100} className={classes.ai}/>
            </Link>
        </Box>
      </Box>
    </Section>
  )
}
