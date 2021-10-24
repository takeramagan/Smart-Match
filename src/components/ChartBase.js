import echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { echartTheme } from '../theme';

export const ChartBase = (props) => {
  return (
    <ReactECharts
      {...props}
      theme='dark'
    />
  )
}
