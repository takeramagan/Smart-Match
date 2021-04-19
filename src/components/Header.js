import { Box, Container } from '@material-ui/core'

export function Header () {
  return (
    <Box
      height={66} style={{
        backgroundColor: 'white'
      }}
    >
      <Container>
        <Box fontSize='24px' py={2}>
          Smart Match
        </Box>
      </Container>
    </Box>
  )
}
