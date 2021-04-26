import { Box } from '@material-ui/core'
import { Section } from '../../components/Section'
import { MatchJob } from '../../components/MatchJob'

export function MatchingJobsSection ({ report }) {
  return (
    <Section highlighted>

      <Box p={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='white'>

          Matching Jobs

        </Box>

        <Box>
          Here are some potential matching jobs that you can apply right away. The percentage shows how much you meet the job requirements. Apply from top.
        </Box>

        {report.recommended_jobs.map(job => <MatchJob job={job} />)}

      </Box>

    </Section>
  )
}
