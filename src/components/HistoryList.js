import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Box, Button, Container, Grid, LinearProgress } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HistoryIcon from '@material-ui/icons/History';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  list: {
    width: 250,
    borderRadius:20,
    marginTop:20
  },
  fullList: {
    width: 'auto',
  },
});


export const HistoryList = (props) =>{
  const classes = useStyles();
  // const { historyList } = props
  const historyList  = [{resume:'100', url:"https://www.prolighting.com/specsheets/dsw-302-xx.pdf"},{resume:'100', url:"https://www.prolighting.com/specsheets/dsw-302-xx.pdf"}]
  const { t } = useTranslation()

  return (
    <Box m={2} style={{width:300}}>
      <Box fontSize={20} display='flex' alignItems="center" mb={1}>
        <HistoryIcon fontSize="large"/>
        <Box ml={1}>
          {t('report.history_title')}
        </Box>
      </Box>
      <Divider mb={1}/>
      <Box mt={1}>
        {
          historyList?.length ?       
          <List>
            {historyList.map(history => (
              <Box display='flex' alignItems="center" >
                <ListItemText>{history.resume}</ListItemText>
                <Button           
                  href={history.url}
                  target="_blank"
                ><CloudDownloadIcon/></Button>

              </Box>
            ))}
          </List>
          : 
          <Box>Empty history</Box>
        }
      </Box>
    </Box>
  )
}