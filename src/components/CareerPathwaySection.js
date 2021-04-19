import { Box } from '@material-ui/core'
import { useState } from 'react'
import { Section } from './Section'
import { makeStyles } from '@material-ui/core/styles'

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
    transition: 'all 0.6s ease',
    backgroundColor: ({ noBackgroundColor, selected }) => noBackgroundColor ? 'inherit' : (selected ? '#C4D3E7' : '#F8F8F8'),
    '&:hover': {
      backgroundColor: ({ noBackgroundColor }) => noBackgroundColor ? 'inherit' : '#49648A',
      color: 'white',
      '& .salary': {
        color: '#ccc'
      }
      // border: '2px solid #49648A'
    }

  }

})

const CareerBlock = ({ name, salary, top, left, selected, noBackgroundColor, onClick }) => {
  const classes = useStyles({ noBackgroundColor, selected })
  return (
    <Box
      className={classes.root}
      p={2}
      top={top}
      left={left}
      onClick={onClick}
    >
      <Box>
        <Box className='title' fontSize='16px' color={noBackgroundColor ? (selected ? '#192A3E' : '#6A707E') : 'inherit'}>
          {name}
        </Box>
        <Box className='salary' fontSize='12px' color='#6A707E'>
          {salary}
        </Box>
      </Box>

    </Box>
  )
}

const CareerSinglePath = ({ tops, lefts, careerPath, position, selected, onClick }) => {
  const [type, nextLevel, furtherLevel] = careerPath

  const color = selected ? '#C2CFE0' : '#EBEFF2'
  return (
    <>
      {/* career path 1 */}
      <CareerBlock name={nextLevel.title} salary={nextLevel.salary} top={tops[position]} left={lefts[1]} selected={selected} onClick={onClick} />
      <CareerBlock name={furtherLevel.title} salary={furtherLevel.salary} top={tops[position]} left={[lefts[2]]} selected={selected} onClick={onClick} />
      <CareerBlock name={type} top={tops[position]} left={lefts[3]} noBackgroundColor onClick={onClick} selected={selected} />
      <Box
        width='600px'
        height='150px'
        borderTop={position === 0 || position === 1 ? `35px solid ${color}` : 'inherit'}
        borderBottom={position === 2 ? `35px solid ${color}` : 'inherit'}
        borderLeft={position !== 1 ? `35px solid ${color}` : 'inherit'}
        position='absolute'
        top={`${position === 2 ? tops[1] + 20 : tops[position] + 20}px`}
        left='120px'
        zIndex='0'
        borderRadius='50px'
        style={{
          transition: 'all 0.3s ease'

        }}
      />
    </>
  )
}

export function CareerPathwaySection () {
  const tops = [10, 120, 230]
  const lefts = [30, 330, 580, 780]
  const [selectedPathIndex, setSelectedPathIndex] = useState(2)
  return (
    <Section>
      <Box p={4}>
        <Box fontSize='20px' mb={6} fontWeight='500'>
          Future Career Pathway
        </Box>
        <Box
          p={2} width='100%' height='350px' position='relative'
        >
          <CareerBlock name='Front end dev' salary='Avg 90k CAD' top={tops[1]} left={lefts[0]} selected />

          {/* career path 1 */}
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={0}
            selected={selectedPathIndex === 0}
            careerPath={['Technical', { title: 'Full stack', salary: 'Avg 110K CAD' }, { title: 'SR Full stack', salary: 'Avg 130K CAD' }]}
            onClick={() => setSelectedPathIndex(0)}
          />
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={1}
            selected={selectedPathIndex === 1}
            careerPath={['Managerial', { title: 'Project Manager', salary: 'Avg 110K CAD' }, { title: 'CTO', salary: 'Avg 130K CAD' }]}
            onClick={() => setSelectedPathIndex(1)}
          />
          <CareerSinglePath
            tops={tops}
            lefts={lefts}
            position={2}
            selected={selectedPathIndex === 2}
            careerPath={['Technical', { title: 'Lead front-end', salary: 'Avg 110K CAD' }, { title: 'Director Engineer', salary: 'Avg 130K CAD' }]}
            onClick={() => setSelectedPathIndex(2)}
          />

          {/* career path 2 */}
          {/* <CareerBlock name='Project Manager' salary='Avg 90k CAD' top={tops[1]} left={lefts[1]} />
          <CareerBlock name='CTO' salary='Avg 90k CAD' top={tops[1]} left={[lefts[2]]} />
          <CareerBlock name='Managerial' top={tops[1]} left={lefts[3]} noBackgroundColor />
          <Box width='550px' height='150px' borderBottom='35px solid #EBEFF2' position='absolute' top='30px' left='120px' zIndex='0' borderRadius='50px' /> */}

          {/* career path 3 */}
          {/* <CareerBlock name='Lead front-end' salary='Avg 130k CAD' top={tops[2]} left={lefts[1]} selected />
          <CareerBlock name='Director Engineer' salary='Avg 130k CAD' top={tops[2]} left={[lefts[2]]} selected />
          <CareerBlock name='Technical' top={tops[2]} left={lefts[3]} noBackgroundColor />
          <Box width='550px' height='150px' borderBottom='35px solid #C4D3E7' borderLeft='35px solid #C4D3E7' position='absolute' top='140px' left='120px' zIndex='0' borderRadius='50px' /> */}

        </Box>
      </Box>

    </Section>
  )
}
