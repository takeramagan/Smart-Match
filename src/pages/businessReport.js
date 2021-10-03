// import react hook
import {useEffect, useState} from 'react';
// import language related
import i18n from '../i18n/config';
import {Trans, useTranslation} from 'react-i18next';
// import material-ui related
import {
    Box,
    Button,
    Container,
    Grid
} from '@material-ui/core';
// import custom style setting
import {h, h3} from '../constant/fontsize';
// import layout components
import {Section} from '../components/Section';
// import custom feature components
import {BusinessMarketCompetitiveness} from '../features/report/MarketCompetitivenessSection';
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

export default function BusinessReport({presetReport}) {
    const {t} = useTranslation();
    const params = useRouter().query;
    const userId = params.hrid;
    const lang = params.lang?.toLowerCase(); //get language
    const jobid = params.jobid;
    const index = params.index;
    const email = params.email;
    const [loading, setLoading] = useState(true);
    const adsLoadingTime = 3;
    if (presetReport) {
        presetReport.hrCheck = true;
    }
    const [report, setReport] = useState(() => {
        setTimeout(() => {
            setLoading(false);
        }, adsLoadingTime * 1000);
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
    if (loading) {
        return (
            <Box p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{}}>
                <Section>
                    <LoadingPage
                        title={t("report.analyzing_title")}
                        content={t("report.analyzing_text")}
                        loadingTime={adsLoadingTime}
                    />
                </Section>
            </Box>
        );
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