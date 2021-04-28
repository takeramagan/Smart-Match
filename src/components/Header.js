import { Avatar, Box, Container } from '@material-ui/core'

const Logo = () => {
  return (
    <svg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='35' height='35' rx='17.5' fill='url(#paint0_linear)' />
      <defs>
        <linearGradient id='paint0_linear' x1='-9.38479e-09' y1='19.9728' x2='35.0144' y2='20.0143' gradientUnits='userSpaceOnUse'>
          <stop stop-color='#0363FE' />
          <stop offset='1' stop-color='#5DE7FE' />
        </linearGradient>
      </defs>
    </svg>

  )
}

export function Header () {
  return (
    <Box
      height={66} style={{
        backgroundColor: 'white'
      }}
    >
      <Container>
        <Box display='flex' justifyContent='space-between'>
          <Box fontSize='24px' py={2} fontWeight='600' color='rgba(0, 97, 255, 1)'>
            Smart Match
          </Box>
          <Box fontSize='24px' alignItems='center' display='flex'>
            <Avatar>B</Avatar>
            <Box fontSize='14px' lineHeight='18px' ml={2}>
              <Box color='rgba(55, 58, 112, 1)' fontSize='14px'>
                Ben Liang
              </Box>
              <Box color='rgba(144, 160, 183, 1)' fontSize='14px'>
                ben@benscript.com
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
