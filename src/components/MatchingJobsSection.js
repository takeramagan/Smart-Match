import { Box } from '@material-ui/core'
import { Section } from './Section'
import { MatchJob } from './MatchJob'

export function MatchingJobsSection () {
  return (
    <Section highlighted>

      <Box p={4}>
        <Box fontSize='20px' mb={2} fontWeight='500'>
          Matching Jobs
        </Box>

        <Box>
          Here are some potential matching jobs that you can apply right away. The percentage shows how much you meet the job requirements. Apply from top.
        </Box>

        <MatchJob />
        <MatchJob />
        <MatchJob />

      </Box>

    </Section>
  )
}
