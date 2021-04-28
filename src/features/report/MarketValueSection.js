import { Box } from '@material-ui/core'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'
import { formatter } from '../../untils/currency'

const Chart = ({ income }) => {
  const theme = useTheme()
  // const numbers = Object.values(income)
  //   .filter(Number.isInteger)
  //   .concat(Object.values(income.predicted_market_value))
  //   .sort(function (a, b) {
  //     return a - b
  //   })

  const getNumbers = () => {
    const result = []
    let n = income.market_low
    const increment = Math.round((income.market_high - income.market_low) / 13)
    while (n < income.market_high) {
      result.push(n)
      n = n + increment
    }
    return result
  }
  const numbers = getNumbers()

  console.log('income: ', numbers)
  const option = {
    grid: {
      left: 60
    },
    xAxis: {
      type: 'category',
      data: ['low', 'low', 'mid-low', 'mid-low', 'mid-low', 'avg', 'avg', 'avg', 'avg', 'mid-high', 'mid-high', 'high', 'high']
    },
    yAxis: {
      type: 'value'
    },
    legend: { bottom: 0 },
    tooltip: {
      trigger: 'item',
      axisPointer: { // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    color: [theme.palette.primary.main, '#E5E5E5'],
    series: [{
      name: 'Offer too low',
      color: '#E0E0E0',
      barGap: '-100%',
      type: 'bar',
      data: numbers.map(n => n <= income.market_mid_low ? n : undefined)
    }, {
      name: 'Acceptable Offer',
      color: '#46EBD5',
      barGap: '-100%',
      type: 'bar',
      data: numbers.map(n => n > income.market_mid_low ? n : undefined)
    }, {
      name: 'Most likely Offer',
      color: '#0061FF',
      type: 'bar',
      data: numbers.map(n => income.predicted_market_value.high >= n && income.predicted_market_value.low <= n ? n : undefined)
    }]
  }
  return (
    <Box width='100%'>
      <ReactECharts
        option={option} style={{ height: '300px', width: '100%' }}
      />
    </Box>
  )
}

export function MarketValueSection ({ report }) {
  const bestMatch = report.market_value_result[0]
  const theme = useTheme()
  return (
    <Section>
      <Box p={4} mb={4}>

        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          Market Value
        </Box>
        <Box display='flex' justifyContent='space-between'>

          <Box color='#373A70' fontWeight='500' width='195px' textAlign='right'>
            <Box fontSize='18px'>
              Your Predicted salary
            </Box>
            <Box my={1}>
              <Box display='inline-block' mr={1} style={{ fontSize: '12px', width: '30px', textAlign: 'right' }}>From</Box>
              <Box display='inline-block' fontSize='24px' color={theme.palette.primary.main}>{formatter.format(bestMatch.fulltime.predicted_market_value.low)}</Box>
            </Box>
            <Box my={1}>
              <Box display='inline-block' mr={1} style={{ fontSize: '12px', width: '30px', textAlign: 'right' }}>To</Box>
              <Box display='inline-block' fontSize='24px' color={theme.palette.primary.main}>{formatter.format(bestMatch.fulltime.predicted_market_value.high)}</Box>
            </Box>
          </Box>

          <Box pt={3} fontSize='16px' fontWeight='500' lineHeight='24px' color='#373A70' width='45%'>
            Compared to average pay of {formatter.format(bestMatch.fulltime.market_avg)} the same position in Toronto.
          </Box>
        </Box>

        <Box width='100%'><Chart income={bestMatch.fulltime} /> </Box>
      </Box>
    </Section>
  )
}
