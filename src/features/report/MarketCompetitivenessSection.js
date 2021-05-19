import { Box } from '@material-ui/core'
import { PercentageLabel } from '../../components/PercentageLabel'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation, Trans } from 'react-i18next'

export const RadarChart = ({ report }) => {
  const { t } = useTranslation()
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
          fontSize: 14
        }
      },
      indicator: [
        { name: t('radarchart.Format'), max: 100 },
        { name: t('radarchart.Language'), max: 100 },
        { name: t('radarchart.Match Level'), max: 100 },
        { name: t('radarchart.Grammar'), max: 100 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      symbol: 'none',
      type: 'radar',
      areaStyle: {},
      data: [
        {
          value: [report.experiences_competitiveness, report.soft_skill_competitiveness, report.education_competitiveness, report.hard_skill_competitiveness],
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
  return (
    <Section>
      <Box p={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          {t('radarchart.title')}
        </Box>
        <Box fontSize='18px' fontWeight='500' color='#6A707E'>
          {/* You seem to be a good fit for <b>{report.market_value_result[0].matched_job_title}</b> at */}
          <Trans
            i18nKey="radarchart.fit job"
            values={{ jobtitle: report.market_value_result[0].matched_job_title}}
            components={[<b>defaults</b>]}
          />
        </Box>
        <Box fontSize='48px' fontWeight='500' color={theme.palette.primary.main}>
          {report.overall_job_level}
        </Box>

        <Box fontSize='16px' fontWeight='500' lineHeight='24px'>
          {/* You are ranked {report.overall_job_level.toLowerCase()} level {report.overall_competitiveness}/10 compared to your competitors. Below are your detailed category of your resume analysis. */}
          {t('radarchart.rank', {joblevel: report.overall_job_level.toLowerCase(), competitiveness: report.overall_competitiveness})}
        </Box>

        <Box>
          <RadarChart report={report} />
        </Box>
        <Box display='flex' flexWrap='wrap' justifyContent='space-around' p={4}>
          <PercentageLabel name={t('radarchart.Format')} value={report.experiences_competitiveness} />
          <PercentageLabel name= {t('radarchart.Language')} value={report.education_competitiveness} />
          <PercentageLabel name= {t('radarchart.Match Level')} value={report.soft_skill_competitiveness} />
          <PercentageLabel name= {t('radarchart.Grammar')} value={report.hard_skill_competitiveness} />
        </Box>
      </Box>
    </Section>
  )
}
