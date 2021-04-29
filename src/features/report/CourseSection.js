import { Box, Chip, Link } from '@material-ui/core'
import { Section } from '../../components/Section'

const EducationSection = ({ report }) => {
  if (!report.education_levels_needed_to_improve.length) {
    return null
  }

  return (
    <Box>
      <Box fontSize='20px' my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        Education
      </Box>
      <Box py={2}>
        {report.education_levels_needed_to_improve.map((item) => {
          return (
            <Chip
              key={item}
              label={item} style={{
                marginRight: 18,
                backgroundColor: '#ffffff',
                filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                margin: '16px 8px'
              }}
            />
          )
        })}
      </Box>
    </Box>
  )
}

const SoftSkillSection = ({ report }) => {
  if (!report.soft_skills_needed_to_improve.length) {
    return null
  }

  return (
    <Box width='45%'>
      <Box fontSize='20px' my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        Soft Skill
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
      <Box pt={2}>
        <Box fontSize='20px' my={2} fontWeight='500' color='rgba(174, 174, 174, 1)'>
          Suggested Course
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

            <Link href='#'>BrainStation <br /> Front-end Development</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const HardSkillSection = ({ report }) => {
  if (!report.hard_skills_needed_to_improve.length) {
    return null
  }

  return (
    <Box width='45%'>
      <Box fontSize='20px' my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        Hard Skill
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
      <Box pt={2}>
        <Box fontSize='20px' my={2} fontWeight='500' color='rgba(174, 174, 174, 1)'>
          Suggested Course
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

            <Link href='#'>General Assembly <br />Front-end Development</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export function CourseSection ({ report }) {
  return (
    <Section>
      <Box p={4} mb={4}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          How to Improve
        </Box>
        <EducationSection report={report} />
        <Box display='flex' justifyContent='space-between'>
          <SoftSkillSection report={report} />
          <HardSkillSection report={report} />
        </Box>
      </Box>

    </Section>
  )
}
