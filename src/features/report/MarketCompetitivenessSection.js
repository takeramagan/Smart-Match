import { Box } from '@material-ui/core'
import { PercentageLabel } from '../../components/PercentageLabel'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'

export const RadarChart = ({ report }) => {
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
        { name: 'Experience', max: 100 },
        { name: 'Soft Skill', max: 100 },
        { name: 'Education', max: 100 },
        { name: 'Hard Skill', max: 100 }
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
          name: 'Personal Skillset'
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
  return (
    <Section>
      <Box p={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          Market Competitiveness
        </Box>
        <Box fontSize='18px' fontWeight='500' color='#6A707E'>
          Your overall job level for <b>{report.market_value_result[0].matched_job_title}</b> is
        </Box>
        <Box fontSize='48px' fontWeight='500' color={theme.palette.primary.main}>
          {report.overall_job_level}
        </Box>

        <Box fontSize='16px' fontWeight='500' lineHeight='24px'>
          Your ranked medium level {report.overall_competitiveness}/10 compared to your competitors. Below are your detailed category competitiveness mapping.
        </Box>

        <Box>
          <RadarChart report={report} />
        </Box>
        <Box display='flex' flexWrap='wrap' justifyContent='space-around' p={4}>
          <PercentageLabel name='Experience' value={report.experiences_competitiveness} />
          <PercentageLabel name='Education' value={report.education_competitiveness} />
          <PercentageLabel name='Soft Skill' value={report.soft_skill_competitiveness} />
          <PercentageLabel name='Hard Skill' value={report.hard_skill_competitiveness} />
        </Box>
      </Box>
    </Section>
  )
}
