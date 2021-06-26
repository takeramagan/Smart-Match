import { Box, Chip, Link, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Section } from '../../components/Section'
import { h1, h2} from '../../constant/fontsize'
import i18n from '../../i18n/config'

export const CareerAdviceSection = ({ report }) => {
  const { t } = useTranslation()
  // const isChinese = (i18n.language.toLowerCase() === 'cn') //current language is Chinese
  const career_advice = report.lang === 'cn' ? report.career_path_info.zhs : report.career_path_info.eng
  // const {career_advice, evaluation} = report.career_path_info

  return (
    <Section >
      <Box p={4} mb={1}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('careeradvice.title')}
        </Box>
        <Box fontSize={h2} fontWeight='500' color='#6A707E'>
        {/* {t('careeradvice.demo')} */}
          {/* <Typography color='primary'>{evaluation}</Typography> */}
        {career_advice}
        </Box>
            
      </Box>
    </Section>
  )
}