import { Box, Chip, Link, Typography } from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'
import { Section } from '../../components/Section'
import { h1, h2} from '../../constant/fontsize'
import i18n from '../../i18n/config'
import careerMapping from '../../constant/careerMapping.json'

export const CareerAdviceSection = ({ report }) => {
  const { t } = useTranslation()
  // const isChinese = (i18n.language.toLowerCase() === 'cn') //current language is Chinese
  // const career_advice = report.lang === 'cn' ? report.career_path_info.career_advice.zhs : report.career_path_info.career_advice.eng
  // const {career_advice, evaluation} = report.career_path_info
  const jobtitle =  report.career_path_info.career_paths.name
  const suggested_job = careerMapping[jobtitle]
  const changeCareer = (jobtitle != suggested_job)

  const skills_needed = report.career_path_info.career_paths.skills_needed ?? "好好学习"
  const suggested_job_skills = report.career_path_info.career_paths.suggested_job_needed_string ?? "更加好好学习"
  const color = "#0099cc"
  return (
    <Section >
      <Box p={4} mb={1}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('careeradvice.title')}
        </Box>
        <Box fontSize={h2} fontWeight='500' color='#6A707E'>
        {/* {t('careeradvice.demo')} */}
          {/* <Typography color='primary'>{evaluation}</Typography> */}
        {/* {career_advice} */}
        {changeCareer ? 
          <Trans
            i18nKey="careeradvice.change direction"
            values={{ matched_job: jobtitle, suggested_job: suggested_job, suggested_job_skills: suggested_job_skills}}
            components={[<b style={{color:color}}>defaults</b>]}
          /> :
          <Trans
          i18nKey="careeradvice.improve"
          values={{ matched_job: jobtitle, skills_needed: skills_needed}}
          components={[<b style={{color:color}}>defaults</b>]}
        />
          }

        </Box>
            
      </Box>
    </Section>
  )
}