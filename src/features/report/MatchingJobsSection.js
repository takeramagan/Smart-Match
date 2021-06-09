import { Box, Button, Divider } from '@material-ui/core'
import { Section } from '../../components/Section'
import { MatchJob } from '../../components/MatchJob'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next'
import { h, h1, h2, h3, h4, h5} from '../../constant/fontsize'


export function MatchingJobsSection ({ report }) {
  const [seeWebsiteMore, setSeeWebsiteMore] = useState(false)
  const websiteJobs = seeWebsiteMore ? report.recommended_jobs : report.recommended_jobs.slice(0, 3)
  const [seeRecruiterMore, setSeeRecruiterMore] = useState(false)
  const recruiterJobs = seeRecruiterMore ? report.recommended_jobs : report.recommended_jobs.slice(0, 3)
  const { t } = useTranslation()
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
          {t('matching jobs.website')}
          {websiteJobs.map((job, index) => <MatchJob key={index} job={job} />)}
          {!seeWebsiteMore && (
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
          )}
        </Box>
        <Divider style={{backgroundColor:'white'}}/>
        <Box fontSize={h3} mt={1}>
          {t('matching jobs.recruiter')}
          {recruiterJobs.map((job, index) => <MatchJob key={index} job={job} />)}
          {!seeRecruiterMore && (
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
          )}
        </Box>
      </Box>

    </Section>
  )
}
