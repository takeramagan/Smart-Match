// import react hook
import {useEffect, useState} from 'react';
// import language related
import i18n from '../i18n/config';
import {Trans, useTranslation} from 'react-i18next';
// import material-ui related
import {
    Box,
    Button,
    Container, FormControl,
    Grid, InputLabel, MenuItem, Select
} from '@material-ui/core';
// import custom style setting
import {h, h3} from '../constant/fontsize';
// import layout components
import {Section} from '../components/Section';
// import custom feature components
import {BusinessMarketCompetitiveness} from "../features/businessReport/BusinessMarketCompetitivenessSection";
import {BusinessCourseSection} from '../features/businessReport/BusinessCourseSection';
import {LoadingPage} from "../features/report/LoadingWhenUpload";
// import other library
import {useRouter} from 'next/router';
// import API related
import {useRequest} from '../hooks/useRequest';
import {
    APP_END_POINT_B_AND_C,
    APP_END_POINT_GET_HISTORY_IDS,
    X_API_KEY_B_AND_C
} from '../constant/externalURLs';
// import icons
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import DescriptionIcon from "@material-ui/icons/Description";

export default function BusinessReport({presetReport}) {
    const {t} = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const adsLoadingTime = 3;
    //  todo: remove this after test
    if (presetReport) {
        presetReport.hrCheck = true;
    }
    const [report, setReport] = useState(() => {
        if (!presetReport) {
            if (typeof window !== 'undefined') {
                presetReport = window.localStorage.getItem('hrCheckReportBasedOnJob');
                if(!!presetReport) return JSON.parse(presetReport);
            }

            // both preset and local storage report cannot be found,
            // use dummy report than
            return ({
                "job_title": "Test job title",
                "applicant_email": "owenljn@gmail.com",
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
    useEffect(()=>{
        setTimeout(() => {
            setLoading(false);
        }, adsLoadingTime * 1000);
    });

    const [reportAccuracyRating, setReportAccuracyRate] = useState(0);

    if(loading){
        return (<Box p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{}}>
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
                            <Box style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '24px', fontWeight: '500' }}>
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
                                <p style={{ fontSize: "11px", position: "absolute", bottom: "8px", margin: "auto", left: "0", right: "0", textAlign: "center" }}>{t("report.protected_statement")}</p>
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
        </Box>);
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
                                            applicantEmail: report.applicant_email,
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
                                onClick={() => router.push('/jobmanagement')}
                                style={{minWidth: 140, height: 40}}
                            >
                                {t('sidebar.back2')}
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