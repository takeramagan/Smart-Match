import { Box } from '@material-ui/core'
import { Section } from './Section'
import ReactECharts from 'echarts-for-react'

const Chart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['51k', '70k', '93k', '100k', '120k', '130k', '150k']
    },
    yAxis: {
      type: 'value'
    },
    // tooltip: {},
    color: ['#49648A', '#E5E5E5'],
    series: [{
      data: [0, 30, 93, 130, 88, 20, 0],
      stack: 'stacked',
      type: 'bar'
    }, {
      data: [151, 170, 193, 230, 188, 166, 34].map(i => i / 3),
      stack: 'stacked',
      type: 'bar'
    }]
  }
  return (
    <Box>
      <ReactECharts
        option={option} style={{ height: '300px', width: '100%' }}
      />
    </Box>
  )
}

export function MarketValueSection () {
  return (
    <Section>
      <Box p={4} mb={4}>

        <Box fontSize='20px' mb={4} fontWeight='500'>
          Market Value
        </Box>
        <Box fontSize='18px' fontWeight='500' color='#6A707E'>
          Your Predicted salary
        </Box>
        <Box fontSize='48px' fontWeight='500' color='#6A707E'>
          $93,000
        </Box>

        <Box fontSize='16px' fontWeight='500' lineHeight='24px' color='#979798'>
          Compared to average pay of $80,000 the same position in Toronto.
        </Box>

        <Box><Chart /> </Box>
      </Box>
    </Section>
  )
}
