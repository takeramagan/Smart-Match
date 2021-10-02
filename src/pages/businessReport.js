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
import {BusinessMarketCompetitiveness} from '../features/report/MarketCompetitivenessSection';
import {BusinessCourseSection, CourseSection} from '../features/report/CourseSection';
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
    const [report, setReport] = useState(() => {
        if (!presetReport) {
            // use dummy report
            return ({
                "job_title": "Test job title",
                "applicant_name": "Owen",
                "matched_percentage": "96",
                "resume_evaluation": {
                    "skills": {
                        "reason": "This candidate has most of the required skills.",
                        "marking": "96"
                    },
                    "industry": {
                        "reason": "This candidate matches the industry perfectly.",
                        "marking": "100"
                    },
                    "education_experience": {
                        "reason": "The qualifications of this candidate's education background exceeds the requirements of this job.",
                        "marking": "70"
                    },
                    "work_experience": {
                        "reason": "This candidate is senior.",
                        "marking": "95"
                    }
                }
            });
        }
        return presetReport
    });
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
                                            applicantName: report.applicant_name,
                                            matchPercentage: report.matched_percentage,
                                            jobtitle: report.job_title
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
                                <BusinessMarketCompetitiveness report={report}/>
                            </div>
                        </Grid>

                        <Grid item md={12} lg={12}>
                            <div id='course_section'>
                                <BusinessCourseSection report={report}
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