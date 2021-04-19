import { Box, Container, Grid, LinearProgress } from '@material-ui/core'
import { MarketCompetitiveness } from '../components/MarketCompetitiveness'
import { Header } from '../components/Header'
import { MarketValueSection } from '../components/MarketValueSection'
import { MatchingJobsSection } from '../components/MatchingJobsSection'
import { Sidebar } from '../components/Sidebar'
import { CareerPathwaySection } from '../components/CareerPathwaySection'
import { CourseSection } from '../components/CourseSection'
import { useEffect, useState } from 'react'

export default function Home () {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (loading) {
    return (
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
        <Box fontSize='64px' fontWeight='600' color='#49648A'>
          Loading the demo report
        </Box>
        <Box width='600px' m={8}>
          <LinearProgress />
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Header />
      <Container style={{ marginTop: 18, paddingLeft: 270, position: 'relative' }}>
        <Box position='absolute' width='250px' height='700px' left={0} top={0}>
          <Sidebar />
        </Box>

        <Box my={3}>
          <Box fontSize='26px' fontWeight='500' lineHeight='42px'>
            Report Page
          </Box>
          <Box fontSize='14px' lineHeight='21px' color='#90A0B7'>
            Your current job market position based on your resume
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <MarketValueSection />
            <MatchingJobsSection />
          </Grid>

          <Grid item xs={6}>
            <MarketCompetitiveness />
          </Grid>

          <Grid item xs={12}>
            <CareerPathwaySection />
          </Grid>

          <Grid item xs={12}>
            <CourseSection />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
