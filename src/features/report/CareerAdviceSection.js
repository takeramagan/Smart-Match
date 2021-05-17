import { Box, Chip, Link } from '@material-ui/core'
import { Section } from '../../components/Section'

export const CareerAdviceSection = ({ report }) => {

  return (
    <Section>
      <Box p={4} mb={1}>
        <Box fontSize='20px' mb={2} fontWeight='500' color='#024CC3'>
          Career Advice
        </Box>
        <Box fontSize='18px' fontWeight='500' color='#6A707E'>
          Good good study, day day up
        </Box>
      </Box>
    </Section>
  )
}