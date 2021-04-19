import { Box } from '@material-ui/core'
import { PercentageLabel } from '../../components/PercentageLabel'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'

export const RadarChart = () => {
  const option = {
    title: {
    },
    color: ['#C4D3E7'],
    tooltip: {},
    legend: {
      // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
      bottom: 10
    },
    radar: {
      radius: '60%',
      splitNumber: 1,
      // shape: 'circle',
      axisLine: {
        show: false
      },
      splitArea: {
        areaStyle: {
          color: ['#F8F8F8']
          // shadowColor: 'rgba(0, 0, 0, 0.03)',
          // shadowBlur: 10
        }
      },
      name: {
        textStyle: {
          color: '#6A707E',
          fontSize: 14
        }
      },
      indicator: [
        { name: 'Experience', max: 10 },
        { name: 'Soft Skill', max: 10 },
        { name: 'Education', max: 10 },
        { name: 'Hard Skill', max: 10 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      symbol: 'none',
      type: 'radar',
      areaStyle: {},
      // areaStyle: {normal: {}},
      data: [
        // {
        //   value: [10, 10, 10, 10],
        //   name: 'Job Requirement',
        //   slient: true

        // },
        {
          value: [6, 6, 7, 3],
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

export const MarketCompetitiveness = () => {
  return (
    <Section>
      <Box p={4}>
        <Box fontSize='20px' mb={4} fontWeight='500'>
          Market Competitiveness
        </Box>
        <Box fontSize='18px' fontWeight='500' color='#6A707E'>
          Your overall job level for front-end is
        </Box>
        <Box fontSize='48px' fontWeight='500' color='#6A707E'>
          Intermediate
        </Box>

        <Box fontSize='16px' fontWeight='500' lineHeight='24px' color='#979798'>
          Your ranked medium level  8/10 compared to your competitors. Below are your detailed category competitiveness mapping.
        </Box>

        <Box>
          <RadarChart />
        </Box>
        <Box display='flex' flexWrap='wrap' justifyContent='space-around' p={4}>
          <PercentageLabel name='Experience' value='80' />
          <PercentageLabel name='Education' value='80' />
          <PercentageLabel name='Soft Skill' value='80' />
          <PercentageLabel name='Hard Skill' value='80' />
        </Box>
      </Box>
    </Section>
  )
}
