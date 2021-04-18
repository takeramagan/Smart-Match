import { Box, Container, Grid } from '@material-ui/core'
import { MarketCompetitiveness } from '../components/MarketCompetitiveness'
import { Section } from '../components/Section'
import { Header } from '../components/Header'
import { MarketValueSection } from '../components/MarketValueSection'

export default function Home () {
  return (
    <>
      <Header />

      <Container style={{ marginTop: 18, paddingLeft: 300, position: 'relative' }}>

        <Box
          position='absolute' width='250px' left={0}
          top={0}
        >
          <Section>
            <Box p={4}>
              One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
            </Box>
          </Section>
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

            <Section highlighted>

              <Box p={4}>
                <Box fontSize='20px' mb={2} fontWeight='500'>
                  Matching Jobs
                </Box>

                <Box>
                  Here are some potential matching jobs that you can apply right away. The percentage shows how much you meet the job requirements. Apply from top.
                </Box>

                <Box display='flex'>

                  <Box width='88px' height='88px' style={{ backgroundColor: 'black' }} my={2}>
                    logo
                  </Box>
                  <Box flexGrow='1' height='88px' style={{ backgroundColor: 'black' }} m={2}>
                    logo
                  </Box>
                  <Box width='88px' height='88px' style={{ backgroundColor: 'black' }} my={2}>
                    logo
                  </Box>
                </Box>

              </Box>

            </Section>
          </Grid>
          <Grid item xs={6}>
            <MarketCompetitiveness />
          </Grid>

          <Grid item xs={6} />

          <Grid item xs={12}>
            <Section>
              <Box p={4}>
                One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
              </Box>
              <Box p={4}>
                One cannot separate lines from taming bacons. Unfortunately, that is wrong; on the contrary, a rise is a system's taurus. A kenneth is a continent's reading. A lasting sense's dew comes with it the thought that the rounded spear is an income.
              </Box>
            </Section>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}
