import { Box, Button } from '@material-ui/core'
import { Section } from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'
import { formatter } from '../../untils/currency'
import { useTranslation } from 'react-i18next'
import { h, h1, h2, h3, h4, h5} from '../../constant/fontsize'
import { useState } from 'react'


const Chart = ({ income }) => {
  const { t } = useTranslation()
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
  const mostLikelyOffers = numbers.filter(n => income.predicted_market_value.high >= n && income.predicted_market_value.low <= n)
  let mostLikelyOffer
  if(mostLikelyOffers.length){ //找到多个
    mostLikelyOffer = mostLikelyOffers[0]
  }else if(income.predicted_market_value.low > numbers[numbers.length - 1]){
    mostLikelyOffer = numbers[numbers.length - 1]
  }else if(income.predicted_market_value.high < numbers[0]){
    mostLikelyOffer = numbers[0]
  }else{ 
  //剩下的情况是 所有的number都是处在 [income.predicted_market_value.low, income.predicted_market_value.high] 区间之外了,
  //选择第一个比 income.predicted_market_value.high大的数字
    for(var i in numbers){
      if(numbers[i] > income.predicted_market_value.high){
        mostLikelyOffer = numbers[i]
        break
      }
    }
  }
  console.log("mostlike2", mostLikelyOffer)

  const option = {
    grid: {
      left: 60
    },
    xAxis: {
      type: 'category',
      data: [t("marketvalue.low"), t("marketvalue.low"), 
            t("marketvalue.mid-low"), t("marketvalue.mid-low"), t("marketvalue.mid-low"), 
            t("marketvalue.avg"), t("marketvalue.avg"), t("marketvalue.avg"), t("marketvalue.avg"), 
            t("marketvalue.mid-high"), t("marketvalue.mid-high"), 
            t("marketvalue.high"), t("marketvalue.high")]
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
      name: t("marketvalue.Offer too low"),
      color: '#E0E0E0',
      barGap: '-100%',
      type: 'bar',
      data: numbers.map(n => n <= income.market_mid_low ? n : undefined)
    }, {
      name: t("marketvalue.Acceptable Offer"),
      color: '#46EBD5',
      barGap: '-100%',
      type: 'bar',
      data: numbers.map(n => n > income.market_mid_low ? n : undefined)
    }, {
      name: t("marketvalue.Most likely Offer"),
      color: '#0061FF',
      type: 'bar',
      data: numbers.map(n => n === mostLikelyOffer ? n : undefined)
    }]
  }
console.log("nums= ", numbers, income.predicted_market_value.low, income.predicted_market_value.high)
  return (
    <Box width='100%'>
      <ReactECharts
        option={option} style={{ height: '300px', width: '100%' }}
      />
    </Box>
  )
}

export function MarketValueSection ({ report }) {
console.log("report ", report)
  const [fulltime, setFulltime] = useState(true)
  const salaryInfo = fulltime ? report.market_value_info.full_time_market_info : report.market_value_info.contract_market_info
  const predictSalary = fulltime ? report.market_value_info.predicted_full_time_salary[0] : report.market_value_info.predicted_contract_salary[0]
  const {low, high} = predictSalary
  const { avg } = salaryInfo
  const market_low = fulltime ? salaryInfo.low : 20
  const market_high = fulltime ? salaryInfo.high : salaryInfo.high*1.2
  // const buttonText = fulltime ? "Fulltime" : "Contract"
  // const income={market_low: salaryInfo.low, market_high: salaryInfo.high, market_mid_low:salaryInfo.mid_Low, predicted_market_value:{high, low}}
  const income={market_low, market_high, market_mid_low:40, predicted_market_value:{high, low}}
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Section>
      <Box p={4} mb={4} position='relative'>

        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('marketvalue.title')}
        </Box>
        <Box position='absolute' right={30} top={30}>
          <Button        
            variant="contained"
            color="primary"
            disabled={fulltime}
            size='small'
            style={{borderRadius:20 }}
            onClick={() => setFulltime(true)}
          >
            Fulltime
          </Button>
          <Button        
            variant="contained"
            color="primary"
            disabled={!fulltime}
            size='small'
            style={{borderRadius:20, marginLeft:10 }}
            onClick={() => setFulltime(false)}
          >
            Contract
          </Button>
        </Box>
        <Box display='flex' justifyContent='space-between'>

          <Box color='#373A70' fontWeight='500' width='195px' textAlign='right'>
            <Box fontSize={h2}>
            {t('marketvalue.predicted salary')}
            </Box>
            <Box my={1}>
              <Box display='inline-block' mr={1} style={{ fontSize: {h5}, width: '30px', textAlign: 'right' }}>{t('marketvalue.from')}</Box>
              <Box display='inline-block' fontSize={h} color={theme.palette.primary.main}>{formatter.format(low)}</Box>
            </Box>
            <Box my={1}>
              <Box display='inline-block' mr={1} style={{ fontSize: {h5}, width: '30px', textAlign: 'right' }}>{t('marketvalue.to')}</Box>
              <Box display='inline-block' fontSize={h} color={theme.palette.primary.main}>{formatter.format(high)}</Box>
            </Box>
          </Box>

          <Box pt={3} fontSize={h3} fontWeight='500' lineHeight='24px' color='#373A70' width='45%'>
            {/* Compared to average pay of {formatter.format(bestMatch.fulltime.market_avg)} the same position in Toronto. */}
            {t('marketvalue.salary average', {average: formatter.format(avg)})}
          </Box>
        </Box>

        <Box width='100%'><Chart income={income} /> </Box>
      </Box>
    </Section>
  )
}
