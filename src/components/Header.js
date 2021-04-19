import { Avatar, Box, Container } from '@material-ui/core'

export function Header () {
  return (
    <Box
      height={66} style={{
        backgroundColor: 'white'
      }}
    >
      <Container>
        <Box display='flex' justifyContent='space-between'>
          <Box fontSize='24px' py={2}>
            Smart Match
          </Box>
          <Box fontSize='24px' alignItems='center' display='flex'>
            <Avatar>B</Avatar>
            <Box fontSize='14px' lineHeight='18px' ml={2}>
              <Box color='#6A707E' fontSize='14px'>
                Ben Liang
              </Box>
              <Box color='#90A0B7' fontSize='14px'>
                ben@benscript.com
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
