import { useEffect, useState } from 'react';

import { Box} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ReactECharts from 'echarts-for-react';

import { useTranslation } from 'react-i18next';

import { Section } from '../../components/Section';
import { MenuButton } from '../../components/CommonReusable/MenuButton';

import { h, h1, h2, h3, h4, h5 } from '../../constant/fontsize';

import { formatter } from '../../untils/currency';


const Chart = ({ income }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  // const numbers = Object.values(income)
  //   .filter(Number.isInteger)
  //   .concat(Object.values(income.predicted_market_value))
  //   .sort(function (a, b) {
  //     return a - b
  //   })

  const getNumbers = () => {
    const result = []
    const NumOfColumns = 4
    try {
      let n = parseInt(income.market_low); //莫名出现数字解析成字符串...
      const high = parseInt(income.market_high);
      const low = parseInt(income.market_low);
      const increment = Math.round((high - low) / NumOfColumns);

      for (let i = 0; i <= NumOfColumns; i++) {
        result.push(n);
        n = n + increment;
      }
      return result;
    } catch (e) {
      console.log('Unexpected error, ', e);
      return [];
    }
  }

  const numbers = getNumbers();
  const mostLikelyOffers = numbers.filter(n => income.predicted_market_value.high >= n && income.predicted_market_value.low <= n);
  let mostLikelyOffer;
  if (mostLikelyOffers.length) { //找到多个
    mostLikelyOffer = mostLikelyOffers[0]
  } else if (income.predicted_market_value.low > numbers[numbers.length - 1]) {
    mostLikelyOffer = numbers[numbers.length - 1]
  } else if (income.predicted_market_value.high < numbers[0]) {
    mostLikelyOffer = numbers[0]
  } else {
    //剩下的情况是 所有的number都是处在 [income.predicted_market_value.low, income.predicted_market_value.high] 区间之外了,
    //选择第一个比 income.predicted_market_value.high大的数字
    for (var i in numbers) {
      if (numbers[i] > income.predicted_market_value.high) {
        mostLikelyOffer = numbers[i]
        break
      }
    }
  }

  const option = {
    grid: {
      left: 60
    },
    xAxis: {
      type: 'category',
      data: [t("marketvalue.low"), //t("marketvalue.low"), 
      t("marketvalue.mid-low"), //t("marketvalue.mid-low"), t("marketvalue.mid-low"), 
      t("marketvalue.avg"), //t("marketvalue.avg"), t("marketvalue.avg"), t("marketvalue.avg"), 
      t("marketvalue.mid-high"), //t("marketvalue.mid-high"), 
      t("marketvalue.high"), //t("marketvalue.high")
      ]
    },
    yAxis: {
      type: 'value'
    },
    legend: { bottom: 0, selectedMode: false },
    tooltip: {
      show: true,
      trigger: 'item',
      // axisPointer: { // Use axis to trigger tooltip
      //   type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      // }
    },
    color: [theme.palette.primary.main, '#E5E5E5'],
    series: [{
      // name: t("marketvalue.Offer too low"),
      color: '#E0E0E0',
      barGap: '-100%',
      barWidth: '50%',
      type: 'bar',
      data: numbers.map(n => n <= income.market_mid_low ? n : undefined),
    }, {
      // name: t("marketvalue.Acceptable Offer"),
      color: 'rgba(96,239,255, 0.4)',
      barGap: '-100%',
      barWidth: '50%',
      type: 'bar',
      data: numbers.map(n => n > income.market_mid_low ? n : undefined)
    }, {
      // name: t("marketvalue.Most likely Offer"),
      color: '#0061FF',
      barGap: '-100%',
      barWidth: '50%',
      type: 'bar',
      data: numbers.map(n => n === mostLikelyOffer ? n : undefined),
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params) => {
          //  return (params.name + '  ' + '<b>' + params.data.toLocaleString() +'</b>' +'<br/>'+
          //            "Your are here" + '<br/>' + 'Beat ' + ' 50%'
          //  );
          return (params.name + '  ' + '<b>' + params.data.toLocaleString() + '</b>' + '<br/>' + "Your are here"
          );
        },
      },
      // label: {
      //   show: true,
      //   position: "top",
      //   // rotate: 90,
      //   // align: "middle",
      //   // verticalAlign: "middle",
      //   fontSize: 12,
      //   //formatter: '{@pop2035} millions', //pop value as strin
      //   // formatter: 'You are here<br />Beaten 50%',
      //   backgroundColor: 'blue',
      //   padding: [4, 10],
      //   borderRadius: 3,
      //   borderWidth: 1,
      //   // borderColor: 'rgba(0,0,0,0.5)',
      //   color:'white',
      //   margin: 50,
      //   formatter: function (params) {
      //      return ("Your are here");
      //   }
      // }
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

export function MarketValueSection({ report }) {
  // console.log("report ", report)
  const [fulltime, setFulltime] = useState(true)

  const salaryInfo = fulltime ? report.market_value_info.full_time_market_info : report.market_value_info.contract_market_info
  const predictSalary = fulltime ? report.market_value_info.predicted_full_time_salary : report.market_value_info.predicted_contract_salary
  const { low, high } = predictSalary
  const { avg } = salaryInfo
  const market_low = fulltime ? salaryInfo.low : Math.floor(0.8 * salaryInfo.low)
  const market_high = fulltime ? salaryInfo.high : salaryInfo.high
  const market_mid_low = fulltime ? salaryInfo.mid_Low : salaryInfo.mid_low
  const ranking = fulltime ? report.market_value_info.ranking?.full_time : report.market_value_info.ranking?.contract
  // const buttonText = fulltime ? "Fulltime" : "Contract"
  // const income={market_low: salaryInfo.low, market_high: salaryInfo.high, market_mid_low:salaryInfo.mid_Low, predicted_market_value:{high, low}}
  const income = { market_low, market_high, market_mid_low, predicted_market_value: { high, low } }

  const theme = useTheme()
  const area = report.lang === 'cn' ? (report.countryCode === 'us' ? '美国' : '加拿大') : (report.countryCode === 'us' ? 'USA' : 'Canada')
  const { t } = useTranslation()

  // function retrived response from child component "MenuButton" and set full-time /part-time status
  const [employeeSelectedType, setEmployeeSelectedType] = useState(0);

  useEffect(()=>{
    if (employeeSelectedType===0){
      setFulltime(true);
    }
    else if (employeeSelectedType===1){
      setFulltime(false);
    }
    // console.log("received from parent: ", employeeSelectedType);
  }, [employeeSelectedType]);

  return (
    <Section>
      <Box p={4} mb={4} position='relative'>

        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('marketvalue.title')}
        </Box>
        <Box position='absolute' right={30} top={30}>

          <MenuButton setSelected={setEmployeeSelectedType} options={["Fulltime", "Contract"]}/>

          {/* <Button
            variant="contained"
            color="primary"
            disabled={!fulltime}
            size='small'
            style={{ borderRadius: 20 }}
            onClick={() => setFulltime(false)}
          >
            Fulltime
          </Button>

          <Button
            variant="contained"
            color="primary"
            disabled={fulltime}
            size='small'
            style={{ borderRadius: 20, marginLeft: 10 }}
            onClick={() => setFulltime(true)}
          >
            Contract
          </Button> */}
        </Box>
        <Box display='flex' justifyContent='space-between'>

          <Box color='#373A70' fontWeight='500' width='195px' textAlign='right'>
            <Box fontSize={h2}>
              {t('marketvalue.predicted salary')}
            </Box>
            <Box my={1}>
              <Box display='inline-block' mr={1} style={{ fontSize: { h5 }, width: '30px', textAlign: 'right' }}>{t('marketvalue.from')}</Box>
              <Box display='inline-block' fontSize={h} color={theme.palette.primary.main}>{formatter(report.countryCode).format(low)}</Box>
              {!fulltime && <Box display='inline-block' mr={1} style={{ fontSize: { h5 } }}>{t('marketvalue.per hour')}</Box>}
            </Box>
            <Box my={1}>
              <Box display='inline-block' mr={1} style={{ fontSize: { h5 }, width: '30px', textAlign: 'right' }}>{t('marketvalue.to')}</Box>
              <Box display='inline-block' fontSize={h} color={theme.palette.primary.main}>{formatter(report.countryCode).format(high)}</Box>
              {!fulltime && <Box display='inline-block' mr={1} style={{ fontSize: { h5 } }}>{t('marketvalue.per hour')}</Box>}
            </Box>
          </Box>

          <Box pt={3} fontSize={h3} fontWeight='500' lineHeight='24px' color='#373A70' width='45%'>
            {/* Compared to average pay of {formatter.format(bestMatch.fulltime.market_avg)} the same position in Toronto. */}
            {t('marketvalue.salary average', { average: formatter(report.countryCode).format(avg), area: area })}
          </Box>
        </Box>

        <Box width='100%' mt={-4} mb={-8}><Chart income={income} /></Box>
        <Box pt={3} fontSize={h3} fontWeight='500' lineHeight='24px' color='#373A70'>
          {t('marketvalue.ranking', { ranking: ranking })}
        </Box>
      </Box>
    </Section>
  )
}
