import { Box } from '@material-ui/core'
import { useState } from 'react'
import { Section } from '../../components/Section'
import { makeStyles } from '@material-ui/core/styles'
import { formatter } from '../../untils/currency'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    fontWeight: '500',
    zIndex: '10',
    cursor: 'pointer',
    width: '180px',
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
  console.log(name, salary, background, style, noBackgroundColor ? 'inherit' : (selected ? background : '#E0E0E0'))
  const classes = useStyles({ noBackgroundColor, selected, background })
  return (
    <Box
      className={classes.root}
      p={2}
      top={top}
      left={left}
      onClick={onClick}
      style={{
        background: noBackgroundColor ? 'inherit' : (selected ? background : '#E0E0E0')
        // ...style
      }}

    >
      <Box>
        <Box className='title' fontSize='16px' color={noBackgroundColor ? (selected ? '#024CC3' : '#6A707E') : 'inherit'}>
          {name}
        </Box>
        <Box className='salary' fontSize='12px' color='white'>
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
        filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.44))'
      }}
    >
      <Box>
        <Box className='title' fontSize='16px' color='black'>
          {name}
        </Box>
        <Box className='salary' fontSize='12px' color='#6A707E'>
          Avg {formatter.format(salary)}
        </Box>
      </Box>

    </Box>
  )
}

const Aaaaa = ({ selected }) => {
  console.log('selected: ', selected)
  return (
    <svg width='500' height='241' viewBox='0 0 614 241' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M8.55886 219.392L60.003 200.469C97.7589 186.581 126.729 155.665 138.138 117.088V117.088C154.025 63.3643 203.164 26.34 259.186 25.8839L613.377 23' stroke={selected ? 'url(#paint0_linear)' : '#F2F2F2'} stroke-width='45' />
      <defs>
        <linearGradient id='paint0_linear' x1='7.77943' y1='123.665' x2='500' y2='118.727' gradientUnits='userSpaceOnUse'>
          <stop offset='0.114583' stop-color='#F2F1F1' />
          <stop offset='0.401042' stop-color='#46EBD5' />
          <stop offset='0.635417' stop-color='#60EFFF' />
          <stop offset='1' stop-color='#0061FF' />
        </linearGradient>
      </defs>
    </svg>

  )
}

const Aaaab = ({ selected }) => {
  return (
    <svg width='500' height='53' viewBox='0 0 726 53' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M19.9999 50.9863C8.95427 50.9644 0.0178244 41.9922 0.0398119 30.9466L0.0616022 20C0.0835897 8.95429 9.0557 0.0178369 20.1014 0.0398244L362.868 0.722135L705.635 1.40445C716.681 1.42643 725.617 10.3985 725.595 21.4442L725.573 32.3908C725.551 43.4365 716.579 52.373 705.534 52.351L19.9999 50.9863Z' fill={selected ? 'url(#paint0_linear)' : '#F2F2F2'} />
      <defs>
        <linearGradient id='paint0_linear' x1='0.77943' y1='123.665' x2='500' y2='118.727' gradientUnits='userSpaceOnUse'>
          <stop offset='0.114583' stop-color='#F2F1F1' />
          <stop offset='0.141042' stop-color='#46EBD5' />
          <stop offset='0.635417' stop-color='#60EFFF' />
          <stop offset='1' stop-color='#0061FF' />
        </linearGradient>
      </defs>
    </svg>

  )
}

const CareerSinglePath = ({ tops, lefts, careerPath, position, selected, onClick }) => {
  const [type, nextLevel, furtherLevel] = careerPath

  console.log('selected: ', type, nextLevel, furtherLevel)
  return (
    <>
      {/* career path 1 */}
      <CareerBlock
        name={nextLevel.title}
        salary={nextLevel.salary}
        top={tops[position]}
        left={lefts[1]}
        selected={selected}
        onClick={onClick}
        background='linear-gradient(90deg, #46EBD5 10.16%, #60EFFF 92.75%)'
      />
      <CareerBlock
        name={furtherLevel.title}
        salary={furtherLevel.salary}
        top={tops[position]}
        left={[lefts[2]]}
        selected={selected}
        onClick={onClick}
        background='linear-gradient(90.07deg, #1883FF 0.07%, #0E15AD 99.99%)'
      />
      <CareerBlock
        name={type}
        top={tops[position] + 10}
        left={lefts[3]}
        noBackgroundColor
        onClick={onClick}
        selected={selected}
      />

    </>
  )
}

const selectCareerPath = (career) => {
  return [career.projected_career_path[0].type, {
    title: career.matched_job_title,
    salary: career.fulltime.market_avg
  }, {
    title: career.projected_career_path[0].title,
    salary: career.projected_career_path[0].market_avg_salary.fulltime
  }]
}

export function CareerPathwaySection ({ report }) {
  const tops = [10, 150, 290]
  const lefts = [30, 330, 580, 740]
  const [selectedPathIndex, setSelectedPathIndex] = useState(0)
  const { market_value_result } = report
  console.log('selectedPathIndex: ', selectedPathIndex)
  const startCareer = selectCareerPath(market_value_result[0])
  console.log('startCareer: ', startCareer)
  return (
    <Section>
      <Box p={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          Future Career Pathway
        </Box>
        <Box
          p={2} width='100%' height='400px' position='relative'
        >
          <CareerOriginBlock name={startCareer[1].title} salary={startCareer[1].salary} top={150} left={0} selected background='white' />

          {/* career path 1 */}
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={0}
            selected={selectedPathIndex === 0}
            careerPath={selectCareerPath(market_value_result[0])}
            onClick={() => setSelectedPathIndex(0)}
          />
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={1}
            selected={selectedPathIndex === 1}
            careerPath={selectCareerPath(market_value_result[1])}
            onClick={() => setSelectedPathIndex(1)}
          />
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={2}
            selected={selectedPathIndex === 2}
            careerPath={selectCareerPath(market_value_result[2])}
            onClick={() => setSelectedPathIndex(2)}
          />
          <Box top='10px' left='100px' position='absolute' zIndex={2}>
            <Aaaaa selected={selectedPathIndex === 0} />
          </Box>
          <Box top='160px' left='110px' position='absolute' zIndex={3}>
            <Aaaab selected={selectedPathIndex === 1} />
          </Box>
          <Box top='125px' left='100px' position='absolute' zIndex={2} style={{ transform: 'rotateX(180deg)' }}>
            <Aaaaa selected={selectedPathIndex === 2} />
          </Box>
        </Box>
      </Box>

    </Section>
  )
}
