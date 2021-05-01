import { Box, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import ViewColumnOutlinedIcon from '@material-ui/icons/ViewColumnOutlined'
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined'
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import { Section } from './Section'
import { useRouter } from 'next/router'

export function Sidebar ({ onReset }) {
  const router = useRouter()
  return (
    <Section>
      <Box
        p={2}
        fontsize='16px'
        fontWeight='500'
        lineHeight='24px'
        color='rgba(51, 77, 110, 1)'
        borderRadius='inherit'
        style={{
          backgroundColor: 'white'
        }}
      >
        <List component='nav' aria-label='main mailbox folders'>
          <ListItem button>
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Homepage' onClick={() => router.push('/')} />

          </ListItem>
          <ListItem button style={{ color: 'rgba(0, 97, 255, 1)' }}>
            <ListItemIcon>
              <ViewAgendaOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Report Page' />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Contacts' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChatBubbleOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Chat' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ViewColumnOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Deals' />
          </ListItem> */}

          <Box mt={24}>
            <ListItem button onClick={() => onReset()}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='back' />
            </ListItem>
            {/* <ListItem button>
              <ListItemIcon>
                <MoreHorizOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem> */}
          </Box>
        </List>
      </Box>
    </Section>
  )
}
