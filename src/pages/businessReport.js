// import reack hook
import {useCallback, useEffect, useState} from 'react';
// import language related
import i18n from '../i18n/config';
import {Trans, useTranslation} from 'react-i18next';
// import material-ui related
import {
    Box,
    Button,
    Container,
    Grid,
    LinearProgress,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
    Link,
    SwipeableDrawer
} from '@material-ui/core'
import {makeStyles, theme} from '@material-ui/core/styles';
// import custom style setting
import {h, h2, h3} from '../constant/fontsize';
// import custom feature functions
import {linkTrack} from '../untils/linkTrack';
// import layout components
import {Header} from '../components/Header';
import {Sidebar} from '../components/Sidebar';
import {Section} from '../components/Section';
import {HistoryList} from '../components/HistoryList';
// import custom feature components
import {MarketCompetitiveness} from '../features/report/MarketCompetitivenessSection';
import {CourseSection} from '../features/report/CourseSection';
import {LoadingPage} from "../features/report/LoadingWhenUpload";
// import other library
import {useRouter} from 'next/router';
import {useDropzone} from 'react-dropzone';
// import API related
import {useRequest} from '../hooks/useRequest';
import {
    APP_END_POINT_B_AND_C,
    APP_END_POINT_GET_HISTORY_BY_ID,
    APP_END_POINT_GET_HISTORY_IDS,
    FACEBOOK,
    INSTAGRAM,
    LINKEDIN,
    TWITTER,
    X_API_KEY_B_AND_C
} from '../constant/externalURLs';
import {fetchHistory, fetchMarketValue} from '../services/market-value';
// import icons
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import DescriptionIcon from "@material-ui/core/SvgIcon/SvgIcon";

export default function BusinessReport({presetReport}) {
    const {t} = useTranslation();
    const [selectedPathIndex, setSelectedPathIndex] = useState(0);
    const params = useRouter().query;
    const userId = params.hrid;
    const lang = params.lang?.toLowerCase(); //get language
    const jobid = params.jobid;
    const index = params.index;
    const email = params.email;
    const [loading, setLoading] = useState(!!jobid);
    if (presetReport) {
        presetReport.hrCheck = true;
    }
    const [report, setReport] = useState(presetReport);
    const [reportAccuracyRating, setReportAccuracyRate] = useState(0);

    // todo: test only data
    const [viewHistory, setViewHistory] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [errorHistory, setErrorHistory] = useState(null);
    const [historyList, setHistoryList] = useState(null);
    const getHistory = () => {
        setLoadingHistory(true);
        setErrorHistory(false);
        // fetchHistory({id: userId}).then(
        fetchHistory({email: email, url: APP_END_POINT_GET_HISTORY_IDS}).then(
            histories => {
                setHistoryList(histories);
                console.log(historyList);
                setLoadingHistory(false);
            }
        ).catch(setErrorHistory)
    };

    const {requestHandler} = useRequest();
    const getReportFromParams = async () => {
        setLoading(true);
        try {
            const data = new FormData();
            data.append('hrid', userId); //mock data
            data.append('jobid', jobid);
            data.append('dcc', X_API_KEY_B_AND_C);

            const config = {
                method: 'post',
                url: APP_END_POINT_B_AND_C + ('get_all_applications'),
                data: data
            };
            const result = await requestHandler(config);
            console.log("applicant", result.applicants_info_list);
            if (!result.status) {
                console.log("get applicants succcess");
                console.log(result.applicants_info_list);
                const applicant = result.applicants_info_list
                    .sort((a, b) => (b.matching_level - a.matching_level))[index];
                setReport({...applicant.report, id: userId, lang, hrCheck: true});
                console.log('report print', report);
            } else {
                console.log("get applicants error");
            }
        } catch (e) {
            console.log("error get applicants");
        }
        setLoading(false);
    };
    useEffect(() => {
        if (jobid) getReportFromParams().then();
    }, [jobid]);

    if (loading) {
        return (
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
                <Box fontSize='64px' fontWeight='600' color='#49648A'>
                    {t('report.loading')}
                </Box>
                <Box width='600px' m={8}>
                    <LinearProgress/>
                </Box>
            </Box>
        )
    }

    if (!report) {
        // return [
        //     {
        //         source: '/breport',
        //         destination: '/jobmanagement',
        //         permanent: true
        //     },
        // ];
        return (
            <Box textAlign='center'>
                <FileDropzone onSuccess={data => {
                    data.hrCheck = true;
                    setReport(data)
                }}/>
                <Box mb={8}>
                    {/* <Button variant='contained' color='primary' disableElevation onClick={() => setReport(mock)}>
            {t('report.demo')}
          </Button> */}

                    <Button variant='contained' color='primary' disableElevation
                            onClick={() => {
                                setViewHistory(!viewHistory);
                                getHistory()
                            }}
                            style={{marginLeft: 20}}>
                        {viewHistory ? t('report.hideHistory') : t('report.history')}
                    </Button>
                    {/* <Button variant='contained' color='primary' disableElevation
            href='/history'
            style={{marginLeft:20}}>
            View applied jobs
          </Button> */}
                </Box>
                <SwipeableDrawer anchor="right" open={viewHistory} onClose={() => {
                    setViewHistory(false)
                }} onOpen={() => {
                }}>
                    <HistoryList setReport={setReport} loading={loadingHistory} error={errorHistory}
                                 historyList={historyList}/>
                </SwipeableDrawer>
            </Box>
        );
    } else {
    }

    return (
        <>
            <Box display='flex' flexDirection='row'>
                <Container style={{marginTop: 18, position: "relative"}}>
                    <Section>
                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' p={4}
                             mb={5}>
                            <Box>
                                <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                                    {t("b_report.report_title")}
                                </Box>
                                <Box fontSize={h3} lineHeight='21px' color='#373b6c'>
                                    <Trans
                                        i18nKey={"b_careeradvice.evaluation"}
                                        values={{
                                            applicantName: "Bob",
                                            matchPercentage: "80",
                                            jobtitle: report.career_path_info.career_paths.name
                                        }}
                                        components={[<b>defaults</b>]}
                                    />
                                </Box>

                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ArrowBackOutlinedIcon/>}
                                onClick={() => setReport(null)}
                                style={{minWidth: 140, height: 40}}
                            >
                                {t('sidebar.back')}
                            </Button>
                        </Box>
                    </Section>

                    <Grid container spacing={4}>
                        <Grid item md={12} xs={12}>
                            <div id='market_competitiveness'>
                                <MarketCompetitiveness report={report}/>
                            </div>
                        </Grid>

                        <Grid item md={12} lg={12}>
                            <div id='course_section'>
                                <CourseSection report={report} selectedPathIndex={selectedPathIndex}
                                               report_accuracy_rating={reportAccuracyRating}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}


const fetchReport = (files, params) => {
    return fetchMarketValue(files[0], params)
};

function FileDropzone(props) {
    const {onSuccess, onError} = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1
    });
    const params = useRouter().query;
    const userId = params.id;
    const lang = params.lang?.toLowerCase(); //get language
    const email = params.email;

    // add loading ads time in second
    const adsLoadingTime = 3;

    //add selector
    const [area, setArea] = useState('ca');
    const handleAreaChange = (event) => {
        setArea(event.target.value)
    }

    const [position, setPosition] = useState('');
    const handlePositionChange = (event) => {
        setPosition(event.target.value)
    };

    const {t} = useTranslation();
    useEffect(() => {
        if (lang && ['en', 'cn'].includes(lang)) {
            i18n.changeLanguage(lang)
        }
    }, [lang]);
    useEffect(() => {
        if (acceptedFiles.length) {
            setLoading(true);
            fetchReport(acceptedFiles, {
                hrCheck: true, id: userId,
                country_code: area, position, email
            }).then((res) => {
                if (res.error) {
                    setError(res.error);
                } else {
                    // manually reserve 5 second to display ads
                    let timerFunc = setTimeout(() => {
                        setLoading(false);
                        onSuccess({...res, id: userId, countryCode: area.toLowerCase(), lang});
                    }, adsLoadingTime * 1000);
                    console.log("Loading test: ", loading);
                }
            }).catch(setError);
        }
    }, [acceptedFiles]);

    if (error) {
        return (
            <Box
                p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{}}
            >
                <Section>
                    <Box style={{borderRadius: '24px'}} p={8} {...getRootProps({className: 'dropzone'})}>
                        <Box pt={4} style={{color: 'rgba(0, 97, 255, 1)', fontSize: '48px', fontWeight: '500'}}>
                            Sorry
                        </Box>
                        <Box my={2} style={{color: 'rgba(55, 58, 112, 1)'}}>
                            {t("report.error")}
                        </Box>
                        <pre style={{color: '#FE654F', margin: '64px 0'}}>
              Error <br/>{error || error.message}
            </pre>
                        <Box mt={24}>
                            <Button variant='contained' color='secondary' disableElevation
                                    onClick={() => window.location.reload()}>{t("report.error_retry")}</Button>
                        </Box>
                    </Box>
                </Section>
            </Box>
        )
    }

    return (
        <Box p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{}}>
            <Section>
                {!loading && (
                    <Box style={{borderRadius: '24px'}} p={8} {...getRootProps({className: 'dropzone'})}>
                        {/**<======Area and position select start */}
                        <Box pt={2} onClick={e => e.stopPropagation()}>
                            <FormControl style={{width: 100, backgroundColor: 'white', marginRight: 20}}>
                                <InputLabel id="area">Area</InputLabel>
                                <Select
                                    value={area}
                                    onChange={handleAreaChange}
                                >
                                    {/* <MenuItem value='cn'>China</MenuItem> */}
                                    <MenuItem value='ca'>Canada</MenuItem>
                                    <MenuItem value='us'>USA</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {/**<======Area and position select end */}
                        <input {...getInputProps()} />

                        {!loading && (
                            <Box style={{color: 'rgba(0, 97, 255, 1)', fontSize: '24px', fontWeight: '500'}}>
                                {t("report.upload_text")}
                            </Box>
                        )}
                        {!loading && (
                            <Box
                                height={300}
                                width={500}
                                borderRadius='24px'
                                py={6} style={{
                                backgroundColor: isDragActive ? '#F5F6FB' : 'white',
                                borderWidth: '2px',
                                borderColor: isDragActive ? 'rgba(0, 97, 255, 1)' : '#eeeeee',
                                borderStyle: 'dashed',
                                margin: '60px auto 16px'
                            }}
                            >
                                {
                                    isDragActive
                                        ? <p>{t("report.dragable_title")}</p>
                                        : <p>{t("report.drag_title")}</p>
                                }
                                <p style={{color: 'rgba(201, 201, 201, 1)'}}>{t("report.drag_text")}</p>
                                <Box mt={4}>
                                    <DescriptionIcon style={{color: 'rgba(70, 235, 213, 1)', fontSize: 90}}/>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}
                {loading && <LoadingPage
                    title={t("report.analyzing_title")}
                    content={t("report.analyzing_text")}
                    loadingTime={adsLoadingTime}
                />}
            </Section>
        </Box>
    )
}
