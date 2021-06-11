import { Box, Button, Divider } from '@material-ui/core'
import { Section } from '../../components/Section'
import { MatchJob } from '../../components/MatchJob'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next'
import { h, h1, h2, h3, h4, h5} from '../../constant/fontsize'
import Carousel from 'react-material-ui-carousel'


export function MatchingJobsSection ({ report }) {
  const { t } = useTranslation()
  // const [seeWebsiteMore, setSeeWebsiteMore] = useState(true)
  // const [seeRecruiterMore, setSeeRecruiterMore] = useState(false)

  const recruiterJobs = report.recommended_jobs 
  const recruiterJobsPerPage = 3
  const NumOfRecruiterPage = Math.ceil(recruiterJobs.length / recruiterJobsPerPage)
  const recruiterPages = []
  for(let i=0; i<NumOfRecruiterPage; i++){
    recruiterPages.push(recruiterJobs.slice(i*recruiterJobsPerPage, (i+1)*recruiterJobsPerPage))
  }

  const websiteJobs = report.recommended_jobs
  const websiteJobsPerPage = 5
  const NumOfWebsitePage = Math.ceil(websiteJobs.length / websiteJobsPerPage)
  const websitePages = []
  for(let i=0; i<NumOfWebsitePage; i++){
    websitePages.push(websiteJobs.slice(i*websiteJobsPerPage, (i+1)*websiteJobsPerPage))
  }

  return (
    <Section highlighted>

      <Box p={4}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='white'>
          {t('matching jobs.title')}
        </Box>

        <Box fontSize={h3} mb={2}>
          {t('matching jobs.text')}
        </Box>
        <Divider style={{backgroundColor:'white'}}/>
        <Box fontSize={h3} mt={1} mb={2}>
        {t('matching jobs.recruiter')}
          <Carousel animation='slide'>
            {recruiterPages.map((jobList, index) => 
            <div key={index}>{
              jobList.map((job, i) => <MatchJob key={i} job={job} />)
              }
            </div>)}
          </Carousel>
          {/* {!seeRecruiterMore && (
            <Box textAlign='center'>
              <Button fullWidth style={{ color: 'white' }} onClick={() => setSeeRecruiterMore(true)}>
                <Box lineHeight='14px'>
                  <ExpandMoreIcon />
                  <Box fontSize={h3}>
                    {t('matching jobs.View More')}
                  </Box>
                </Box>
              </Button>
            </Box>
          )} */}
        </Box>
        <Divider style={{backgroundColor:'white'}}/>
        <Box fontSize={h3} mt={1}>
          {t('matching jobs.website')}  
          <Carousel animation='slide'>
            {websitePages.map((jobList, index) => 
            <div key={index}>{
              jobList.map((job, i) => <MatchJob key={i} job={job} />)
              }
            </div>)}
          </Carousel>
          {/* {!seeWebsiteMore && (
            <Box textAlign='center'>
              <Button fullWidth style={{ color: 'white' }} onClick={() => setSeeWebsiteMore(true)}>
                <Box lineHeight='14px'>
                  <ExpandMoreIcon />
                  <Box fontSize={h3}>
                    {t('matching jobs.View More')}
                  </Box>
                </Box>
              </Button>
            </Box>
          )} */}
        </Box>
      </Box>

    </Section>
  )
}
