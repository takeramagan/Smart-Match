import { Box, Button } from '@material-ui/core'
import { Section } from '../../components/Section'
import { MatchJob } from '../../components/MatchJob'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next'
import { h, h1, h2, h3, h4, h5} from '../../constant/fontsize'


export function MatchingJobsSection ({ report }) {
  const [seeMore, setSeeMore] = useState(false)
  const jobs = seeMore ? report.recommended_jobs : report.recommended_jobs.slice(0, 3)
  const { t } = useTranslation()
  return (
    <Section highlighted>

      <Box p={4}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='white'>
          {t('matching jobs.title')}
        </Box>

        <Box fontSize={h3}>
          {t('matching jobs.text')}
        </Box>

        {jobs.map(job => <MatchJob job={job} />)}
        {!seeMore && (
          <Box textAlign='center'>
            <Button fullWidth style={{ color: 'white' }} onClick={() => setSeeMore(true)}>
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

    </Section>
  )
}
