import { Box, Button } from '@material-ui/core'
import { Section } from '../../components/Section'
import { MatchJob } from '../../components/MatchJob'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export function MatchingJobsSection ({ report }) {
  const [seeMore, setSeeMore] = useState(false)
  const jobs = seeMore ? report.recommended_jobs : report.recommended_jobs.slice(0, 3)
  return (
    <Section highlighted>

      <Box p={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='white'>

          Matching Jobs

        </Box>

        <Box>
          Here are some potential matching jobs that you can apply right away. The percentage shows how much you meet the job requirements. Apply from top.
        </Box>

        {jobs.map(job => <MatchJob job={job} />)}
        {!seeMore && (
          <Box textAlign='center'>
            <Button fullWidth style={{ color: 'white' }} onClick={() => setSeeMore(true)}>
              <Box lineHeight='14px'>
                <ExpandMoreIcon />
                <Box>
                  View More
                </Box>
              </Box>
            </Button>
          </Box>
        )}
      </Box>

    </Section>
  )
}
