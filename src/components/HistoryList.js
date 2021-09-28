import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {Box, Button, Container, Grid, LinearProgress} from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HistoryIcon from '@material-ui/icons/History';
// import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {useTranslation} from 'react-i18next'
import {fetchHistory} from '../services/market-value';
import {APP_END_POINT_GET_HISTORY_BY_ID} from '../constant/externalURLs';
import {useRouter} from 'next/router';

const useStyles = makeStyles({
    list: {
        width: 250,
        borderRadius: 20,
        marginTop: 20
    },
    fullList: {
        width: 'auto',
    },
});

const HistoryDisplay = ({dataList, setReport, loading, error}) => {
    const params = useRouter().query;
    const userId = params.id;
    const email = params.email;
    const lang = params.lang?.toLowerCase(); //get language
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [errorFetching, setErrorFetching] = useState(null);

    if (error) return <Box style={{color: 'red'}}>{error.toString()}<br/>please try again</Box>;
    if (loading) return <Box>Loading</Box>;
    if (!dataList || !dataList.length) return <Box>Empty history</Box>;

    const fetchHistoryByID = (report_id, countryCode) => {
        setLoadingHistory(true);
        setErrorFetching(null);
        fetchHistory({email: email, url: APP_END_POINT_GET_HISTORY_BY_ID, report_id})
            .then(report => {
                console.log(report);
                const newReport = {
                    ...report[0].report_data,
                    id: userId, countryCode: countryCode.toLowerCase(),
                    lang, report_accuracy_rating: report[0].report_accuracy_rating,
                    comments: report[0].comments
                };
                console.log('check report: ', newReport);
                setReport(newReport);
            })
            .catch(setErrorFetching);
        setLoadingHistory(false)
    }

    return (
        <List>
            {loadingHistory && <ListItemText>Loading...</ListItemText>}
            {errorFetching &&
            <ListItemText style={{color: "red"}}>Could not get report at this time, please retry later!</ListItemText>}
            {dataList.map((history, index) => (
                <Box display='flex' alignItems="center" key={index}>
                    <ListItemText>{history.report_time.split('.')[0].split('T').join(' ')}{history.country_code === 'ca' ? ' Canada' : ' USA'}</ListItemText>
                    <Button
                        // href={history.url}
                        // target="_blank"
                        // onClick={() => setReport(dataList[index].report_data)}
                        onClick={() => fetchHistoryByID(history.resume_hash, history.country_code)}
                    ><VisibilityIcon/></Button>

                </Box>
            ))}
        </List>
    )
}

export const HistoryList = ({setReport, loading, error, historyList}) => {
    const {t} = useTranslation();
    // useEffect(()=>{
    //   loadingHistory(true)
    //   fetchHistory({id}).then(
    //       histories => {
    //         setHistoryList(histories)
    //         loadingHistory(false)
    //       }
    //   ).catch(setError)
    // }, [])

    return (
        <Box m={2} style={{width: 300}}>
            <Box fontSize={20} display='flex' alignItems="center" mb={1}>
                <HistoryIcon fontSize="large"/>
                <Box ml={1}>
                    {t('report.history_title')}
                </Box>
            </Box>
            <Divider mb={1}/>
            <Box mt={1}>
                <HistoryDisplay dataList={historyList} setReport={setReport}
                                loading={loading} error={error}/>
            </Box>
        </Box>
    )
}
