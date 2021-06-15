import { Box, Link, Typography, Button } from '@material-ui/core'
import { useState } from 'react'
import { Section } from '../../components/Section'
import { makeStyles } from '@material-ui/core/styles'
import { formatter } from '../../untils/currency'
import { useTranslation } from 'react-i18next'
import { h1, h2, h3, h4, h5} from '../../constant/fontsize'
import { DK_LINK } from '../../constant/externalURLs'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '500',
    zIndex: '10',
    cursor: 'pointer',
    height: '80px',
    position: 'absolute',
    color: 'white',
    // transition: 'all 0.6s ease',
    // background: ({ noBackgroundColor, selected, background }) => noBackgroundColor ? 'inherit' : (selected ? background : '#E0E0E0'),
    '&:hover': {
      backgroundColor: ({ noBackgroundColor }) => noBackgroundColor ? 'inherit' : '#49648A',
      color: 'white'
      // '& .salary': {
      //   color: '#ccc'
      // }
      // border: '2px solid #49648A'
    }

  }

})

const CareerBlock = ({ name, salary, top, left, selected, noBackgroundColor, onClick, style, background }) => {
  const classes = useStyles({ noBackgroundColor, selected, background })
  return (
    <Box
      className={classes.root}
      p={2}
      top={top}
      left={left}
      onClick={onClick}
      style={{
        background: noBackgroundColor ? 'white' : (selected ? background : '#E0E0E0'),
        borderRadius: noBackgroundColor ? '0' : '20px',
        width: noBackgroundColor ? '100px' : '180px'

        // ...style
      }}

    >
      <Box>
        <Box className='title' fontSize={h4} color={noBackgroundColor ? (selected ? '#024CC3' : '#6A707E') : 'inherit'}>
          {name}
        </Box>
        <Box className='salary' fontSize={h5} color='white'>
          Avg {formatter.format(salary)}
        </Box>
      </Box>

    </Box>
  )
}

const CareerOriginBlock = ({ name, salary, top, left, selected, noBackgroundColor, onClick }) => {
  const classes = useStyles({ noBackgroundColor, selected })
  return (
    <Box
      className={classes.root}
      p={2}
      top={top}
      left={left}
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.44))',
        width: '180px',
        borderRadius: '20px'
      }}
    >
      <Box>
        <Box className='title' fontSize={h3} color='black'>
          {name}
        </Box>
        <Box className='salary' fontSize={h5} color='#6A707E'>
          {formatter.format(salary)}
        </Box>
      </Box>

    </Box>
  )
}

const Aaaaa = ({ selected }) => {
  return (
    <svg width='380' height='241' viewBox='0 0 614 241' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M8.55886 219.392L60.003 200.469C97.7589 186.581 126.729 155.665 138.138 117.088V117.088C154.025 63.3643 203.164 26.34 259.186 25.8839L613.377 23' stroke={selected ? 'url(#paint0_linear)' : '#F2F2F2'} strokeWidth='45' />
      <defs>
        <linearGradient id='paint0_linear' x1='7.77943' y1='123.665' x2='500' y2='118.727' gradientUnits='userSpaceOnUse'>
          <stop offset='0.114583' stopColor='#F2F1F1' />
          <stop offset='0.401042' stopColor='#46EBD5' />
          <stop offset='0.635417' stopColor='#60EFFF' />
          <stop offset='1' stopColor='#0061FF' />
        </linearGradient>
      </defs>
    </svg>

  )
}

const Aaaab = ({ selected }) => {
  return (
    <svg width='380' height='53' viewBox='0 0 726 53' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M19.9999 50.9863C8.95427 50.9644 0.0178244 41.9922 0.0398119 30.9466L0.0616022 20C0.0835897 8.95429 9.0557 0.0178369 20.1014 0.0398244L362.868 0.722135L705.635 1.40445C716.681 1.42643 725.617 10.3985 725.595 21.4442L725.573 32.3908C725.551 43.4365 716.579 52.373 705.534 52.351L19.9999 50.9863Z' fill={selected ? 'url(#paint0_linear)' : '#F2F2F2'} />
      <defs>
        <linearGradient id='paint0_linear' x1='0.77943' y1='123.665' x2='500' y2='118.727' gradientUnits='userSpaceOnUse'>
          <stop offset='0.114583' stopColor='#F2F1F1' />
          <stop offset='0.141042' stopColor='#46EBD5' />
          <stop offset='0.635417' stopColor='#60EFFF' />
          <stop offset='1' stopColor='#0061FF' />
        </linearGradient>
      </defs>
    </svg>

  )
}

const CareerSinglePath = ({ tops, lefts, careerPath, position, selected, onClick }) => {
  const [type, nextLevel, furtherLevel] = careerPath
  // const type='type'
  // const nextLevel={salary:1000, title:'nextLevel'}
  // const furtherLevel={salary:1000, title:""}
  const offset = furtherLevel?.title ? 100 : -50 //修改中间的block的位置

  return (
    <>
      {/* career path 1 */}
      {nextLevel.title && (
        <CareerBlock
          name={nextLevel.title}
          salary={nextLevel.salary}
          top={tops[position]}
          left={lefts[1]-offset}
          selected={selected}
          onClick={onClick}
          background='linear-gradient(90deg, #46EBD5 10.16%, #60EFFF 92.75%)'
        />
      )}
      {furtherLevel.title && (
        <CareerBlock
          name={furtherLevel.title}
          salary={furtherLevel.salary}
          top={tops[position]}
          left={nextLevel.title ? lefts[2] - offset: 300}
          selected={selected}
          onClick={onClick}
          background='linear-gradient(90.07deg, #1883FF 0.07%, #0E15AD 99.99%)'
        />
      )}
      {/* <CareerBlock
        name={type}
        top={tops[position] + 10}
        left={lefts[3]-250}
        noBackgroundColor
        onClick={onClick}
        selected={selected}
      /> */}

    </>
  )
}

const selectCareerPath = (career) => {
  const next0 = career.projected_career_path[0] || {}
  const next1 = career.projected_career_path[1] || { market_avg_salary: {} }
  if (!career.projected_career_path[1]) {
    return [next0.type, {
    }, {
      title: next0.title,
      salary: next0.market_avg_salary.fulltime
    }]
  } else {
    return [next0.type, {
      title: next0.title,
      salary: next0.market_avg_salary.fulltime
    }, {
      title: next1.title,
      salary: next1.market_avg_salary.fulltime
    }]
  }
}

export function CareerPathwaySection ({ report, selectedPathIndex, setSelectedPathIndex }) {
  const tops = [10, 290, 146]
  const lefts = [30, 330, 580, 765]
  // const [selectedPathIndex, setSelectedPathIndex] = useState(0)
const careerPath = report.career_path_info.career_paths
  // const curJobTitle = report.market_value_info.matched_job_title
  const curJobTitle = careerPath.name
  const curFulltimeSalary = report.market_value_info.full_time_market_info
const paths = careerPath.path
console.log('paths', paths)
const market_value_result = paths.map(path=> {
  const curLevel = {title:path.name, market_avg_salary:{fulltime:path.salary.market_avg_salary_fulltime}}
  const level2 = path.next_level //第2个job Block存在
  const nextLevel = level2 ?  {title:level2.name, market_avg_salary:{fulltime:level2.salary.market_avg_salary_fulltime}}: null
  const projected_career_path = level2 ? [curLevel, nextLevel] : [curLevel]
  return {projected_career_path}
})
console.log("result", market_value_result)
// const market_value_result = [
//   {projected_career_path:[{type:'1', title:'hello', market_avg_salary:{fulltime:100}}]},
//   // {projected_career_path:[{type:'1', title:'hello', market_avg_salary:{fulltime:100}}]},

//   // {projected_career_path:[{type:'1', title:'hello', market_avg_salary:{fulltime:100}}]},

// ]
  const { t } = useTranslation()
  return (
    <Section>
      <Box p={4}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t("career_pathway.title")}
        </Box>
        <Box
          p={2} width='100%' height='400px' position='relative'
        >
          {/* <CareerOriginBlock name={market_value_result[0].matched_job_title} salary={market_value_result[0].fulltime.market_avg} top={150} left={0} /> */}
          <CareerOriginBlock name={curJobTitle} salary={curFulltimeSalary.avg} top={150} left={0} />

          {/* career path 1 */}
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={0}
            selected={selectedPathIndex === 0}
            careerPath={selectCareerPath(market_value_result[0])}
            onClick={() => setSelectedPathIndex(0)}
          />
          {market_value_result[2] && (
            <CareerSinglePath
              tops={tops}
              lefts={lefts}
              position={2}
              selected={selectedPathIndex === 2}
              careerPath={selectCareerPath(market_value_result[2])}
              onClick={() => setSelectedPathIndex(2)}
            />
          )}
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={1}
            selected={selectedPathIndex === 1}
            careerPath={selectCareerPath(market_value_result[1])}
            onClick={() => setSelectedPathIndex(1)}
          />
          <Box top='-10px' left='100px' position='absolute' zIndex={2}>
            <Aaaaa selected={selectedPathIndex === 0} />
          </Box>
          {market_value_result[2] && (
            <Box top='160px' left='110px' position='absolute' zIndex={3}>
              <Aaaab selected={selectedPathIndex === 2} />
            </Box>
          )}
          <Box top='145px' left='100px' position='absolute' zIndex={2} style={{ transform: 'rotateX(180deg)' }}>
            <Aaaaa selected={selectedPathIndex === 1} />
          </Box>
        </Box>

        {/* <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Typography color='primary' style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
            {t('career_pathway.contact')}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AccountCircleIcon />}
              href={DK_LINK}
              target='_blank'
              color='primary'
              size='large'
              style={{borderRadius:20, width:150 }}
            >
              {t('contact.click me')}
            </Button>
          </Box>
        </Box> */}
      </Box>

    </Section>
  )
}
