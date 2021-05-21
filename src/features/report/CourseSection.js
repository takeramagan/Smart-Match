import { Box, Chip, Link } from '@material-ui/core'
import { Section } from '../../components/Section'
import { useTranslation } from 'react-i18next'

const EducationSection = ({ report }) => {
  const { t } = useTranslation()
  if (!report.education_levels_needed_to_improve.length) {
    return null
  }

  return (
    <Box>
      <Box fontSize='20px' my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        {t('course.education')}
      </Box>
      <Box pb={2}>
        {report.education_levels_needed_to_improve.map((item) => {
          return (
            <Chip
              key={item}
              label={item} style={{
                marginRight: 18,
                backgroundColor: '#ffffff',
                filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                margin: '8px 4px'
              }}
            />
          )
        })}
      </Box>
    </Box>
  )
}

const SoftSkillSection = ({ report }) => {
  const { t } = useTranslation()

  if (!report.soft_skills_needed_to_improve.length) {
    return null
  }

  return (
    <Box width='45%'>
      <Box fontSize='20px' my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        {t('course.softskill')}
      </Box>
      <Box py={2}>
        {report.soft_skills_needed_to_improve.map((item) => {
          return (
            <Chip
              key={item}
              label={item} style={{
                marginRight: 18,
                backgroundColor: '#ffffff',
                filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                margin: '8px 4px'
              }}
            />
          )
        })}
      </Box>
    </Box>
  )
}

const HardSkillSection = ({ report }) => {
  const { t } = useTranslation()

  if (!report.hard_skills_needed_to_improve.length) {
    return null
  }

  return (
    <Box width='45%'>
      <Box fontSize='20px' my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        {t('course.hardskill')}
      </Box>
      <Box py={2}>
        {report.hard_skills_needed_to_improve.map((item) => {
          return (
            <Chip
              key={item}
              label={item} style={{
                marginRight: 18,
                backgroundColor: '#ffffff',
                filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                margin: '8px 4px'
              }}
            />
          )
        })}
      </Box>

    </Box>
  )
}

const SuggestedCourse = () => {
  const { t } = useTranslation()

  return (
    <Box pt={2} display='flex' justifyContent='space-between'>
      <Box width='45%'>
        <Box fontSize='20px' my={2} fontWeight='500' color='rgba(174, 174, 174, 1)'>
        {t('suggest.title')}
        </Box>
        <Box ml={2} display='flex' justifyContent='space-between'>
          <Box color='#6A707E' fontsize='16px' display='flex' alignItems='center'>
            <Box
              width='67px' height='67px' mr={2} style={{
                backgroundColor: '#ccc'
              }}
            >
              <img width='67px' height='67px' src='https://pbs.twimg.com/profile_images/1146505592879669248/VXrkf_GO_400x400.jpg' />
            </Box>

            <Link target='_blank' rel='noreferrer' href='https://brainstation.io/course/online/data-science'>{t('suggest.brain station')} <br /> {t('suggest.data science')}</Link>
          </Box>
        </Box>
      </Box>
      <Box width='45%'>
        <Box fontSize='20px' my={2} fontWeight='500' color='rgba(174, 174, 174, 1)'>
        {t('suggest.title')}
        </Box>
        <Box ml={2} display='flex' justifyContent='space-between'>
          <Box color='#6A707E' fontsize='16px' display='flex' alignItems='center'>
            <Box
              width='67px' height='67px' mr={2} style={{
                backgroundColor: '#ccc'
              }}
            >
              <img width='67px' height='67px' src='https://ik.imagekit.io/himalayas/general_assembly_logo_AxBQAGHdD.jpeg' />
            </Box>

            <Link target='_blank' rel='noreferrer' href='https://generalassemb.ly/education/front-end-web-development/toronto'>{t('suggest.general assembly')} <br />{t('suggest.front end')}</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export function CourseSection ({ report }) {
  const { t } = useTranslation()

  return (
    <Section>
      <Box p={4} mb={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          {t("course.title")}
        </Box>
        <EducationSection report={report} />
        <Box display='flex' justifyContent='space-between'>
          <SoftSkillSection report={report} />
          <HardSkillSection report={report} />
        </Box>
        <SuggestedCourse />
      </Box>

    </Section>
  )
}
