import { Box, Chip, Link } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Section } from '../../components/Section'
import { h1, h2} from '../../constant/fontsize'

export const CareerAdviceSection = ({ report }) => {
  const { t } = useTranslation()
  return (
    <Section >
      <Box p={4} mb={1}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('careeradvice.title')}
        </Box>
        <Box fontSize={h2} fontWeight='500' color='#6A707E'>
        {t('careeradvice.demo')}
        </Box>
      </Box>
    </Section>
  )
}