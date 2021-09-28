import { Box, Button, Divider } from '@material-ui/core'
import { Section } from '../../components/Section'
import { MatchJob } from '../../components/MatchJob'
import { useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next'
import { h, h1, h2, h3, h4, h5 } from '../../constant/fontsize'
import Carousel from 'react-material-ui-carousel'
import { linkTrack } from '../../untils/linkTrack'


export function MatchingJobsSection({ report }) {
  const { t } = useTranslation()
  // const [seeWebsiteMore, setSeeWebsiteMore] = useState(true)
  // const [seeRecruiterMore, setSeeRecruiterMore] = useState(false)

  // const recruiterJobs = report.job_matching_info.result.slice(0, 6) 
  const recruiterJobsPerPage = 3
  const recruiterJobs = report.job_matching_results.metisign_job_matching_info

  const NumOfRecruiterPage = recruiterJobs?.length ? Math.floor(recruiterJobs.length / recruiterJobsPerPage) : 0
  const recruiterPages = []
  for (let i = 0; i < NumOfRecruiterPage; i++) {
    recruiterPages.push(recruiterJobs.slice(i * recruiterJobsPerPage, (i + 1) * recruiterJobsPerPage))
  }

  // const websiteJobs = report.job_matching_info.result
  const websiteJobs = report.job_matching_results.job_matching_info
  const websiteJobsPerPage = 5
  const NumOfWebsitePage = websiteJobs?.length ? Math.floor(websiteJobs.length / websiteJobsPerPage) : 0
  const websitePages = []
  for (let i = 0; i < NumOfWebsitePage; i++) {
    websitePages.push(websiteJobs.slice(i * websiteJobsPerPage, (i + 1) * websiteJobsPerPage))
  }

  const onApply = (url) => {
    linkTrack(report.id, url)
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
        <Divider style={{ backgroundColor: 'white' }} />
        <Box fontSize={h3} mt={2}>
          {t('matching jobs.website')}
          <Carousel
            animation='slide'
            interval={10000}
            navButtonsAlwaysInvisible
          >
            {websitePages.map((jobList, index) =>
              <div key={index}>{
                jobList.map((job, i) => <MatchJob key={i} job={job} onClick={onApply} />)
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
        <Divider style={{ backgroundColor: 'white' }} />
        <Box fontSize={h3} mt={2} mb={2}>
          {t('matching jobs.recruiter')}
          <Carousel
            animation='slide'
            interval={10000}
            navButtonsAlwaysInvisible
          >
            {recruiterPages.map((jobList, index) =>
              <div key={index}>{
                jobList.map((job, i) => <MatchJob key={i} job={job} onClick={onApply} metisign />)
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
      </Box>
    </Section>
  )
}
