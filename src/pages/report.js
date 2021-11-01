// import reack hook
import { useContext, useEffect, useState } from 'react';
// import language related
import i18n from '../i18n/config';
import { Trans, useTranslation } from 'react-i18next';
// import material-ui related
import {
    Box,
    Button,
    Container,
    Grid,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
    Link,
    SwipeableDrawer
} from '@material-ui/core'
import { makeStyles, theme } from '@material-ui/core/styles';
// import custom style setting
import { h, h2, h3 } from '../constant/fontsize';
// import custom feature functions
import { linkTrack } from '../untils/linkTrack';
// import layout components
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Section } from '../components/Section';
import { HistoryList } from '../components/HistoryList';
// import custom feature components
import { MarketCompetitiveness } from '../features/report/MarketCompetitivenessSection';
import { MarketValueSection } from '../features/report/MarketValueSection';
import { MatchingJobsSection } from '../features/report/MatchingJobsSection';
import { CareerPathwaySection } from '../features/report/CareerPathwaySection';
import { CourseSection } from '../features/report/CourseSection';
import { LoadingPage } from "../features/report/LoadingWhenUpload";
import { PromoDialog } from "../features/pricingPage/promoDialog";
// import other library
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
// import API related
import { useRequest } from '../hooks/useRequest';
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
import { fetchHistory, fetchMarketValue } from '../services/market-value';
// import icons
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import DescriptionIcon from '@material-ui/icons/Description'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import custom context API
import AppGlobalContext from "../globalContext";
// import global variable wrapper using context API
import { ContextWrapper } from "../globalContext";

import html2canvas from "html2canvas";
import { FacebookShareOnBt } from '../components/FacebookShareOnBt';
import SocialMediaButtons, { TwitterShareBt } from "../components/SocialMediaButtons";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: '40px',
        height: '40px',
        borderRadius: '20px',
        color: 'black'
    },
    sidebar: {
        // width:'185px',
        // minWidth:'185px',
        [theme.breakpoints.down('sm')]: {
            width: '0px',
            minWidth: '0px',
            visibility: 'hidden'
        },
    },
    navibtn_container: {
        [theme.breakpoints.down('sm')]: {
            width: '0px',
            visibility: 'hidden'
        },
    }
}))

function FileDropzone(props) {
    const { onSuccess, onError } = props
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1
    });
    const params = useRouter().query;
    const userId = params.id;
    const lang = params.lang?.toLowerCase(); //get language
    const email = params.email;

    // add loading ads time in second
    const adsLoadingTime = 3;

    //add selector
    const [area, setArea] = useState('ca')
    const handleAreaChange = (event) => {
        setArea(event.target.value)
    }

    const [position, setPosition] = useState('')
    const handlePositionChange = (event) => {
        setPosition(event.target.value)
    }

    const { t } = useTranslation()
    useEffect(() => {
        if (lang && ['en', 'cn'].includes(lang)) {
            i18n.changeLanguage(lang)
        }
    }, [lang])
    useEffect(() => {
        console.log('Input file from user: ', acceptedFiles);
        if (acceptedFiles.length) {
            setLoading(true);
            fetchReport(acceptedFiles, { id: userId, country_code: area, position, email }).then((res) => {
                if (res.status === 'Error') {
                    console.log('Error: ', res);
                    setError(res.error);
                } else {
                    console.log('Fetched report from file: ', res);
                    // manually reserve 5 second to display ads
                    setTimeout(() => {
                        setLoading(false);
                        onSuccess({ ...res, id: userId, countryCode: area.toLowerCase(), lang });
                    }, adsLoadingTime * 1000);
                    console.log("Loading test: ", loading);
                }
            }).catch(setError)
        }
    }, [acceptedFiles])

    if (error) {
        return (
            <Box p={4} mb={4} borderRadius='24px' width={800} margin='10px auto 16px'>
                <Section>
                    <Box style={{ borderRadius: '24px' }} p={8} {...getRootProps({ className: 'dropzone' })}>
                        <Box pt={4} style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '48px', fontWeight: '500' }}>
                            Sorry
                        </Box>
                        <Box my={2} style={{ color: 'rgba(55, 58, 112, 1)' }}>
                            {t("report.error")}
                        </Box>
                        <pre style={{ color: '#FE654F', margin: '64px 0' }}>
                            Error <br />{error || error.message}
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
                    <Box style={{ borderRadius: '24px' }} p={8} {...getRootProps({ className: 'dropzone' })}>
                        {/**<======Area and position select start */}
                        <Box pt={2} onClick={e => e.stopPropagation()}>
                            <FormControl style={{ width: 100, backgroundColor: 'white', marginRight: 20 }}>
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
                            <div>
                                <Box style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '24px', fontWeight: '500' }}>
                                    {t("report.upload_text")}
                                </Box>
                                <p style={{
                                    fontSize: "18px",
                                    margin: "auto",
                                    textAlign: "center",
                                    color: "#C80A0A"
                                }}>{t("report.protected_statement")}</p>
                            </div>
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
                                    margin: '60px auto 16px',
                                    position: "relative"
                                }}
                            >
                                {
                                    isDragActive
                                        ? <p>{t("report.dragable_title")}</p>
                                        : <p>{t("report.drag_title")}</p>
                                }
                                <p style={{ color: 'rgba(201, 201, 201, 1)' }}>{t("report.drag_text")}</p>
                                <Box mt={4}>
                                    <DescriptionIcon style={{ color: 'rgba(70, 235, 213, 1)', fontSize: 90 }} />
                                </Box>
                                {/* <p style={{
                                    fontSize: "18px",
                                    position: "absolute",
                                    bottom: "8px",
                                    margin: "auto",
                                    left: "0",
                                    right: "0",
                                    textAlign: "center",
                                    color: "#C80A0A"
                                }}>{t("report.protected_statement")}</p> */}
                            </Box>
                        )}
                    </Box>
                )}
                {loading && (error === null) && <LoadingPage
                    title={t("report.analyzing_title")}
                    content={t("report.analyzing_text")}
                    loadingTime={adsLoadingTime}
                />}
            </Section>
        </Box>
    )
}

const fetchReport = (files, params) => {
    return fetchMarketValue(files[0], params)
}

// const NaviButtons = () => {
//     const {t} = useTranslation()
//     return (
//         <>
//             <Link href='#career_advice'>{t('careeradvice.title')}</Link>
//             <Link href='#market_value'>{t('marketvalue.title')}</Link>
//             <Link href='#market_competitiveness'>{t('radarchart.title')}</Link>
//             <Link href='#match_jobs'>{t('matching jobs.title')}</Link>
//             <Link href='#career_pathway'>{t("career_pathway.title")}</Link>
//             <Link href='#course_section'>{t("course.title")}</Link>
//         </>
//     )
// }
//
// const SocialMedia = ({onTrack}) => {
//     const {t} = useTranslation()
//     const classes = useStyles()
//     const onClick = (url) => {
//         onTrack(url)
//     }
//     return (
//         <Box mt={1} style={{flexDirection: "column", display: "flex", alignItems: "center"}}>
//             <Typography color='primary' style={{fontSize: h2, fontWeight: '500', marginRight: 20}}>
//                 {t('careeradvice.contact')}
//             </Typography>
//
//             <div>
//                 <a href={FACEBOOK} target='_blank' onClick={() => onClick(FACEBOOK)}>
//                     <FacebookIcon className={classes.icon}/>
//                 </a>
//                 <a href={TWITTER} target='_blank' onClick={() => onClick(TWITTER)}>
//                     <TwitterIcon className={classes.icon}/>
//                 </a>
//                 <a href={INSTAGRAM} target='_blank' onClick={() => onClick(INSTAGRAM)}>
//                     <InstagramIcon className={classes.icon}/>
//                 </a>
//                 <a href={LINKEDIN} target='_blank' onClick={() => onClick(LINKEDIN)}>
//                     <LinkedInIcon className={classes.icon}/>
//                 </a>
//             </div>
//         </Box>
//
//     )
// }
//
// const mock = {
//     market_value_result: [{
//         matched_job_title: 'Data Scientist',
//         hard_skills_needed_to_improve: ['java', 'project management', 'azure', 'spark', 'r', 'c/c++', 'tableau', 'data engineering'],
//         hard_skill_competitiveness: 88,
//         contract: {
//             market_high: 150,
//             market_low: 42,
//             market_avg: 132,
//             market_mid_low: 85,
//             market_mid_high: 142,
//             predicted_market_value: {high: 135, low: 128}
//         },
//         fulltime: {
//             market_high: 170000,
//             market_low: 60000,
//             market_avg: 149600,
//             market_mid_low: 100000,
//             market_mid_high: 160000,
//             predicted_market_value: {high: 150000, low: 140000}
//         },
//         projected_career_path: [{
//             title: 'Senior Data Scientist',
//             market_avg_salary: {fulltime: 153000, contract: 135},
//             type: 'Technical'
//         }]
//     }, {
//         matched_job_title: 'Software Engineer',
//         hard_skills_needed_to_improve: ['angular', 'java', 'nosql', 'matlab', 'azure', 'aws', 'c/c++', '.net', 'c++', 'linux', 'react', 'kubernetes', 'c#', 'scala', 'javascript'],
//         hard_skill_competitiveness: 81,
//         contract: {
//             market_high: 100,
//             market_low: 30,
//             market_avg: 81,
//             market_mid_low: 54,
//             market_mid_high: 91,
//             predicted_market_value: {high: 83, low: 78}
//         },
//         fulltime: {
//             market_high: 175000,
//             market_low: 56000,
//             market_avg: 141750,
//             market_mid_low: 93000,
//             market_mid_high: 157500,
//             predicted_market_value: {high: 140000, low: 130000}
//         },
//         projected_career_path: [{
//             title: 'Senior Software Engineer',
//             market_avg_salary: {fulltime: 157000, contract: 90},
//             type: 'Technical'
//         }]
//     }, {
//         matched_job_title: 'Data Engineer',
//         hard_skills_needed_to_improve: ['data engineering', 'spark', 'aws'],
//         hard_skill_competitiveness: 94,
//         contract: {
//             market_high: 150,
//             market_low: 40,
//             market_avg: 141,
//             market_mid_low: 88,
//             market_mid_high: 147,
//             predicted_market_value: {high: 145, low: 136}
//         },
//         fulltime: {
//             market_high: 150000,
//             market_low: 58000,
//             market_avg: 141000,
//             market_mid_low: 94000,
//             market_mid_high: 145000,
//             predicted_market_value: {high: 140000, low: 130000}
//         },
//         projected_career_path: [{
//             title: 'Senior Data Engineer',
//             market_avg_salary: {fulltime: 135000, contract: 135},
//             type: 'Technical'
//         }]
//     }],
//     recommended_jobs: [{
//         job_title: 'Major Projects Data Scientist',
//         job_link: 'https://ca.indeed.com/rc/clk?jk=24159a27f99d1fc4&fccid=f1582c464db8553b&vjs=3',
//         full_time: {salary_range: 'Not Disclosed'},
//         matched_percentage: 93
//     }, {
//         job_title: 'Software Engineer Intern (Machine Learning Platform Team - Spring/Summer 2021)',
//         job_link: 'https://ca.indeed.com/rc/clk?jk=ab19da37a974a116&fccid=b8ce556031512ca3&vjs=3',
//         full_time: {salary_range: 'Not Disclosed'},
//         matched_percentage: 92
//     }, {
//         job_title: 'Intermediate Machine Learning Engineer',
//         job_link: 'https://ca.indeed.com/rc/clk?jk=14941f7276e243c4&fccid=4512634d9e7338a8&vjs=3',
//         full_time: {salary_range: 'Not Disclosed'},
//         matched_percentage: 90
//     }, {
//         job_title: 'Senior Data Scientist/Manager',
//         job_link: 'https://ca.indeed.com/rc/clk?jk=f3689c6e47361dfd&fccid=799362a2faa3b40a&vjs=3',
//         full_time: {salary_range: 'Not Disclosed'},
//         matched_percentage: 88
//     }, {
//         job_title: 'Data Architect, Technology Solutions',
//         job_link: 'https://ca.indeed.com/rc/clk?jk=994396db9dbf862b&fccid=b8ee7f714bcca05b&vjs=3',
//         full_time: {salary_range: 'Not Disclosed'},
//         matched_percentage: 88
//     }],
//     overall_competitiveness: 8,
//     overall_job_level: 'Senior',
//     experiences_competitiveness: 100,
//     education_competitiveness: 100,
//     soft_skill_competitiveness: 33,
//     soft_skills_needed_to_improve: ['creative', 'communication', 'problem solving', 'time management', 'resourceful', 'adaptive'],
//     hard_skill_competitiveness: 88,
//     hard_skills_needed_to_improve: ['java', 'project management', 'azure', 'spark', 'r', 'c/c++', 'tableau', 'data engineering'],
//     education_levels_needed_to_improve: []
// }

const generateReportImg = () => {
    let img = null;
    if (typeof window !== "undefined") {
        // import("jspdf").then(module => {
        //     jsPDF = module.default;
        // });
        window.scrollTo(0, 0);
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                img = canvas.toDataURL('image/png', 0.3);
            });
    } else {
        alert('Sorry, export function does not support for your current environment, we are upgrading the function!');
    }
    return img;
};

export default function Home() {
    const { t } = useTranslation();
    const [viewHistory, setViewHistory] = useState(false);
    const [selectedPathIndex, setSelectedPathIndex] = useState(0);
    const [historyList, setHistoryList] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [errorHistory, setErrorHistory] = useState(null);
    // const naviWindth = report?.lang === 'cn' ? 90: 185
    // const naviMinWindth = report?.lang === 'cn' ? 90: 185

    const classes = useStyles();
    // set AppMode to business or client
    const { setAppMode } = useContext(AppGlobalContext);

    const params = useRouter().query;
    const HRuserId = params.hrid;
    const HYLevel = params.hylevel;
    const lang = params.lang?.toLowerCase(); //get language
    const jobid = params.jobid;
    const index = params.index;
    const email = params.email;
    // add loading ads time in second
    const adsLoadingTime = 3;
    const [loading, setLoading] = useState(!!jobid);
    const [report, setReport] = useState(null);

    // check if hrid ever changes, if hrid exist, set app mode to business, default is client
    useEffect(() => {
        if (HYLevel === "3") {
            console.log("Hr level detected, change to business mode: ", HYLevel);
            setAppMode("business");
        }
    }, [HYLevel]);


    const scrollToSection = () => {
        if (document && document.getElementById("career_pathway")) {
            document.getElementById('career_pathway')
                .scrollIntoView();
        }
    };
    useEffect(() => {
        scrollToSection();
    }, [selectedPathIndex]);

    // const countryCode = params.countrycode ?? 'ca'
    // console.log('reportid', report_id)
    console.log("HRID, Jobid, idx, member level: ", params.hrid, params.jobid, index, params.hylevel);
    const { requestHandler } = useRequest();
    const getReportFromParams = async () => {
        setLoading(true);
        try {
            const data = new FormData();
            data.append('hrid', HRuserId); //mock data
            data.append('jobid', jobid);
            data.append('dcc', X_API_KEY_B_AND_C);
            const config = {
                method: 'post',
                url: APP_END_POINT_B_AND_C + ('get_all_applications'),
                data: data
            };
            const result = await requestHandler(config);
            console.log("applicant", result.applicants_info_list);
            if (!result.status) { //这里返回值 没有status code... T_T
                // if(result.status === 'success') {
                console.log("get applicants succcess");
                console.log(result.applicants_info_list);
                setTimeout(() => {
                    setLoading(false);
                    const applicant = result.applicants_info_list.sort((a, b) => (b.matching_level - a.matching_level))[index];
                    setReport({ ...applicant.report, id: HRuserId, lang, email });
                }, adsLoadingTime * 1000);
            } else {
                alert('Sorry, applicant report cannot be load: ' + e.toString());
                setLoading(false);
            }
        } catch (e) {
            alert('Sorry, applicant report cannot be load: ' + e.toString());
            setLoading(false);
        }
    };

    useEffect(() => {
        if (jobid) getReportFromParams().then();
    }, [jobid]);

    const onTrackLink = (url) => {
        report ? linkTrack(report.id, url) : null
    };

    const getHistory = () => {
        setLoadingHistory(true);
        setErrorHistory(false);
        fetchHistory({ email: email, url: APP_END_POINT_GET_HISTORY_IDS }).then(
            histories => {
                setHistoryList(histories);
                console.log(historyList);
                setLoadingHistory(false);
            }
        ).catch(setErrorHistory)
    };

    if (loading) {
        // loading section without ads
        // return (
        //     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
        //         <Box fontSize='64px' fontWeight='600' color='#49648A'>
        //             {t('report.loading')}
        //         </Box>
        //         <Box width='600px' m={8}>
        //             <LinearProgress/>
        //         </Box>
        //     </Box>
        // )
        return (<Box p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{}}>
            <Section><LoadingPage
                title={t("report.analyzing_title")}
                content={t("report.analyzing_text")}
                loadingTime={adsLoadingTime}
            />
            </Section>
        </Box>);
    }

    if (!report) {
        return (
            <Box textAlign='center'>
                {/* <Button variant='contained' color='primary' disableElevation onClick={() => setReport(mock)}>
                    {t('report.demo')}
                </Button> */}
                {/* <Button variant='contained' color='primary' disableElevation
                    href='/history'
                    style={{ marginLeft: 20 }}>
                    View applied jobs
                </Button> */}
                {/*show prompt after obtain member level */}
                {/* {HYLevel !== undefined && <PromoDialog />} */}

                <Button variant='contained' color='primary'
                    onClick={() => {
                        setViewHistory(!viewHistory);
                        getHistory()
                    }}
                    style={{ marginTop: "24px" }}>
                    {viewHistory ? t('report.hideHistory') : t('report.history')}
                </Button>
                <FileDropzone onSuccess={data => setReport(data)} />
                <Box mb={8}>
                </Box>
                <SwipeableDrawer anchor="right" open={viewHistory} onClose={() => {
                    setViewHistory(false)
                }} onOpen={() => {
                }}>
                    <HistoryList setReport={setReport} loading={loadingHistory} error={errorHistory}
                        historyList={historyList} />
                </SwipeableDrawer>
            </Box>
        )
    }

    const shareReportImg = generateReportImg();
    let shareReportUrl;
    if (document != undefined) {
        shareReportUrl = document.location.url;
    }
    const shareReportTitle =
        "As a " + report.career_path_info.career_paths.name +
        ", my market value is around $" + report.market_value_info.full_time_market_info.avg
        ;

    return (
        <>
            {/* <Header /> */}
            {/* <Container style={{ marginTop: 18, paddingLeft: 284, position: 'relative' }}>
        <Box position='absolute' width='250px' height='700px' left={0} top={0}>
          <Sidebar onReset={() => setReport(null)} />
        </Box> */}


            <Box display='flex' flexDirection='row'>

                {/* <Box className={classes['sidebar']}>
          <Section 
            style={{padding:'30px 10px 30px 10px', top: 18, borderRadius:5, position:'sticky', width: naviWindth, minWidth: naviMinWindth}} 
            className={classes['navibtn_container']}>
                <Box  display='flex' flexDirection='column'>
                    <NaviButtons/>
                </Box>
          </Section>
        </Box> */}

                <Container style={{ marginTop: 18, position: "relative" }}>

                    {/* <Box position='fixed' top={0} width='1280px' height={100} zIndex={1000} style={{backgroundColor:'white', borderBottomLeftRadius:20, borderBottomRightRadius:20}} > */}
                    <Section>
                        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' p={4}
                            mb={5}>
                            <Box>
                                <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                                    {t("report.report_title")}
                                </Box>
                                <Box fontSize={h3} lineHeight='21px' color='rgba(87, 91, 166, 1)'>
                                    {/* {t("report.report_text")} */}
                                    {/* {report.lang === 'cn' ? report.career_path_info.evaluation.zhs : report.career_path_info.evaluation.eng} */}
                                    <Trans
                                        i18nKey={"careeradvice.evaluation"}
                                        values={{ jobtitle: report.career_path_info.career_paths.name }}
                                        components={[<b>defaults</b>]}
                                    />
                                </Box>
                            </Box>
                            {/* Temp security fix: verify if contains hrid, no button display*/}
                            {(params.hrid === undefined) && <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ArrowBackOutlinedIcon />}
                                onClick={() => setReport(null)}
                                style={{ minWidth: 140, height: 40 }}
                            >
                                {t('sidebar.back')}
                            </Button>
                            }

                        </Box>

                        {/* <Box position='absolute' ml='auto' mr='auto' top={0} left={0} right={0} textAlign='center'>
              <SocialMedia onTrack={onTrackLink} />
            </Box> */}
                        <Box>

                            {/**跳转测试成功 */}
                            {/* <Button onClick={()=> {document.getElementById('market_competitiveness')?.scrollIntoView()  }}>test</Button> */}
                            {/* <Link href='#match_jobs'>test</Link> */}
                        </Box>
                    </Section>


                    {/* <Grid container spacing={4} style={{position:'absolute', top:120}}> */}
                    <Grid container spacing={4}>
                        {/* <Grid item xs={12}>
            <div id='career_advice'>
              <CareerAdviceSection report={report} />
            </div>
          </Grid> */}
                        <Grid item md={6} xs={12}>
                            <div id='market_value'>
                                <MarketValueSection report={report} />
                            </div>
                            <div id='market_competitiveness'>
                                <MarketCompetitiveness report={report} />
                            </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <div id='match_jobs'>
                                <MatchingJobsSection report={report} />
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12}>
                            <div id='career_pathway'>
                                <CareerPathwaySection
                                    report={report}
                                    selectedPathIndex={selectedPathIndex}
                                    setSelectedPathIndex={setSelectedPathIndex}
                                />
                            </div>
                        </Grid>

                        <Grid item md={12} lg={12}>
                            <div id='course_section'>
                                <CourseSection report={report}
                                    selectedPathIndex={selectedPathIndex}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box>
                {/*<FacebookShareOnBt title={'Check My Job Matching Report'}*/}
                {/*                   reportPicture={shareReportImg}/>*/}
                <SocialMediaButtons title={shareReportTitle}
                    reportPicture={shareReportImg}
                    url={shareReportUrl} />
            </Box>
        </>
    )
}
