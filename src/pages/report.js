import { Box, Chip, Container, Grid } from '@material-ui/core'
import { MarketCompetitiveness } from '../components/MarketCompetitiveness'
import { Section } from '../components/Section'
import { Header } from '../components/Header'
import { MarketValueSection } from '../components/MarketValueSection'
import { MatchingJobsSection } from '../components/MatchingJobsSection'

export default function Home () {
  return (
    <>
      <Header />

      <Container style={{ marginTop: 18, paddingLeft: 270, position: 'relative' }}>

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

            <MatchingJobsSection />
          </Grid>
          <Grid item xs={6}>
            <MarketCompetitiveness />
          </Grid>

          <Grid item xs={12}>
            <Section>
              <Box p={4}>
                <Box fontSize='20px' mb={2} fontWeight='500'>
                  Future Career Pathway
                </Box>
                <Box p={2} width='100%' height='300px' style={{ backgroundColor: '#ccc' }}>
                  Future Career Pathway Demostration
                </Box>
              </Box>

            </Section>
          </Grid>

          <Grid item xs={12}>
            <Section>
              <Box p={4} mb={4}>
                <Box fontSize='20px' mb={2} fontWeight='500'>
                  How to Improve
                </Box>
                <Box>
                  Here are some suggestion for improvement for Experience. Here are some suggestion for improvement Education. Here are some suggestion for improvement Soft Skill. Here are some suggestion for improvement Hard Skill.
                </Box>
                <Box py={2}>
                  <Chip label='Skill Set 1' style={{ width: 140, marginRight: 18, backgroundColor: '#F8F8F8' }} />
                  <Chip label='Skill Set 2' style={{ width: 140, marginRight: 18, backgroundColor: '#F8F8F8' }} />
                  <Chip label='Skill Set 3' style={{ width: 140, marginRight: 18, backgroundColor: '#F8F8F8' }} />
                </Box>
                <Box pt={2}>
                  <Box fontSize='20px' my={2} fontWeight='500'>
                    Suggested Course
                  </Box>
                  <Box pt={2} display='flex' justifyContent='space-between'>
                    <Box>
                      <Box>
                        <Chip label='Skill Set 1' style={{ width: 140, marginRight: 18, backgroundColor: '#F8F8F8' }} />
                      </Box>
                      <Box my={2} color='#6A707E' fontsize='16px' display='flex' alignItems='center'>
                        <Box width='67px' height='67px' mr={2} style={{ backgroundColor: '#ccc' }} />

                        BrainStation <br /> Front-end Development
                      </Box>
                    </Box>

                    <Box>
                      <Box>
                        <Chip label='Skill Set 1' style={{ width: 140, marginRight: 18, backgroundColor: '#F8F8F8' }} />
                      </Box>
                      <Box my={2} color='#6A707E' fontsize='16px' display='flex' alignItems='center'>
                        <Box width='67px' height='67px' mr={2} style={{ backgroundColor: '#ccc' }} />

                        BrainStation <br /> Front-end Development
                      </Box>
                    </Box>

                    <Box>
                      <Box>
                        <Chip label='Skill Set 1' style={{ width: 140, marginRight: 18, backgroundColor: '#F8F8F8' }} />
                      </Box>
                      <Box my={2} color='#6A707E' fontsize='16px' display='flex' alignItems='center'>
                        <Box width='67px' height='67px' mr={2} style={{ backgroundColor: '#ccc' }} />

                        BrainStation <br /> Front-end Development
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Section>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}
