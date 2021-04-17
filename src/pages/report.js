import { Box, Container, Grid, Paper } from '@material-ui/core'
import ReactECharts from 'echarts-for-react'

const RadarChart = () => {
  const option = {
    title: {
      text: 'Market Competitiveness'
    },
    tooltip: {},
    legend: {
      // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
      bottom: 10
    },
    radar: {
      radius: '50%',
      splitNumber: 1,
      // shape: 'circle',
      axisLine: {
        show: false
      },
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: 'Experience', max: 10 },
        { name: 'Hard Skill', max: 10 },
        { name: 'Soft Skill', max: 10 },
        { name: 'Education', max: 10 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [8, 9, 8, 9],
          name: 'Job Requirement'
        },
        {
          value: [6, 6, 7, 3],
          name: 'Personal Skillset'
        }
      ]
    }]
  }
  return (
    <Box p={4} height={600}>
      <ReactECharts
        option={option} style={{ height: '400px', width: '100%' }}
      />
    </Box>
  )
}

export default function Home () {
  return (
    <Container style={{ marginTop: 32 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper elevation={0} style={{ borderRadius: 20 }}>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={0} style={{ borderRadius: 20 }}>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={0} style={{ borderRadius: 20 }}>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={0} style={{ borderRadius: 20 }}>
            <Box p={4}>
              <RadarChart />
            </Box>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  )
}
