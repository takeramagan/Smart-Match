import { Box } from '@material-ui/core'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'

const Chart = ({ income }) => {
  const theme = useTheme()
  const option = {
    grid: {
      left: 60
    },
    xAxis: {
      type: 'category',
      data: ['low', '', '', 'avg', '', '', 'high']
    },
    yAxis: {
      type: 'value'
    },
    legend: {},
    toptip: {},
    color: [theme.palette.primary.main, '#E5E5E5'],
    series: [{
      name: 'Most likely Offer',
      color: '#0061FF',
      type: 'bar',
      data: [
        180000,
        190000,
        2100000,
        1110000
      ]
    }, {
      name: 'Most likely Offer',
      color: '#46EBD5',
      barGap: '-100%',
      type: 'bar',
      data: [
        1180000,
        1190000,
        1100000,
        1110000
      ]
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
            <Box>
              <Box display='inline-block' mr={1} style={{ fontSize: '12px', width: '30px', textAlign: 'right' }}>From</Box>
              <Box display='inline-block' fontSize='36px' color={theme.palette.primary.main}>{bestMatch.fulltime.predicted_market_value.low}</Box>

            </Box>
            <Box fontSize='36px'>
              <Box display='inline-block' mr={1} style={{ fontSize: '12px', width: '30px', textAlign: 'right' }}>To</Box>
              <Box display='inline-block' fontSize='36px' color={theme.palette.primary.main}>{bestMatch.fulltime.predicted_market_value.high}</Box>

            </Box>
          </Box>

          <Box pt={5} fontSize='16px' fontWeight='500' lineHeight='24px' color='#373A70' width='50%'>
            Compared to average pay of {bestMatch.fulltime.market_avg} the same position in Toronto.
          </Box>
        </Box>

        <Box width='100%'><Chart income={bestMatch.fulltime} /> </Box>
      </Box>
    </Section>
  )
}
