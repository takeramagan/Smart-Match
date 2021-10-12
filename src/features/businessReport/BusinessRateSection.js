import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useRequest} from "../../hooks/useRequest";
import {useFormik} from "formik";
import {Box, Button, Modal, Typography} from "@material-ui/core";
import {Section} from "../../components/Section";
import {h2} from "../../constant/fontsize";
import {
    APP_END_POINT_B_AND_C,
    DK_CONTACT_US,
    X_API_KEY_B_AND_C
} from "../../constant/externalURLs";
import {RateForm} from "../../components/CommonReusable/RateForm";

export function BusinessRateSection({report, hrId, jobId, email}) {
    const {t} = useTranslation();
    const [rate, setRate] = useState({rate: -1, comments: ''});
    const [showRateForm, setShowRateForm] = useState(false);
    const [refuseRate, setRefuseRate] = useState(() => {
        return !!rate && rate.rate > 0;
    });
    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", handleScroll);
        }

        watchScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [refuseRate]);
    useEffect(() => {
        getRatingInfo().then();
    }, [refuseRate]);

    const getRatingInfo = async () => {
        try {
            formik.values.rated = true;
            const data = new FormData();
            if (!!report.applicant_email && !!hrId) {
                data.append('email', report.applicant_email);
                data.append('dcc', X_API_KEY_B_AND_C);
                data.append('hrid', hrId);
                data.append('jobid', jobId);
                const config = {
                    method: 'post',
                    url: APP_END_POINT_B_AND_C + ('get_accuracy'),
                    data: data
                };
                const result = await requestHandler(config);
                console.log("rating accuracy= ", result);
                if (!!result) {
                    console.log('result: ', result);
                    setRate({
                        rate: result.report_accuracy_rating,
                        comments: result.comments
                    });
                    formik.values.rate = result.report_accuracy_rating;
                    formik.values.comments = result.comments;
                    setRefuseRate(true);
                }
            }
        } catch (ignore) {
        }
    };

    const defaultValue = report.report_accuracy_rating ?
        report.report_accuracy_rating : 3;

    const handleScroll = () => {
        if (!refuseRate && (rate.rate < 0) &&
            (window.innerHeight + window.pageYOffset)
            >= document.body.offsetHeight) {
            console.log('show rate form triggered!!!!!!!!!!!!!!!!!!!');
            setRefuseRate(true);
            setTimeout(
                () => {
                    setShowRateForm(true);
                },
                10000);
        }
    };

    const closeModal = () => {
        setRefuseRate(true);
        setShowRateForm(false);
        getRatingInfo().then();
    };

    const {requestHandler} = useRequest();

    // comment form
    const formik = useFormik({
        initialValues: {
            comments: rate.comments ? rate.comments : "",
            rate: (!!rate && rate.rate > 0) ? rate.rate : 3
        }
    });


    // rate form request button
    const RateRequestButton = () => {
        return <Button variant='contained'
                       color='primary'
                       target="_blank"
                       style={{
                           borderRadius: 15, marginLeft: 10, height: 30,
                       }}
                       onClick={() => (setShowRateForm(true))}
        >
            {t("rating.request_rate_button")}
        </Button>;
    };

    return (
        <Section
            style={{marginTop: 18}}>
            <Box display={'flex'} flexDirection={'row'}>
                <Box p={4} mb={4}>
                    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography color='primary' style={{fontSize: h2, fontWeight: '500', marginRight: 20}}>
                            <Button
                                variant='contained'
                                color='primary'
                                target="_blank"
                                style={{
                                    borderRadius: 15, marginLeft: 10,
                                    marginRight: 20, marginBottom: 10,
                                    height: 30
                                }}
                                onClick={() => {
                                    window.open('mailto:' + DK_CONTACT_US);
                                }}
                            >
                                {t("b_radarchart.contact")}
                            </Button>
                            <span color={'#004AAD'}>{t("b_radarchart.contact_description")}</span>
                        </Typography>
                    </Box>

                    {/* =================== Rate Section ================= */}
                    <Modal open={showRateForm}>
                        <RateForm onCancel={() => {
                            closeModal();
                        }} formik={formik}
                                  rated={rate.rate > 0}
                                  hrid={hrId} jobid={jobId}
                                  email={email}
                                  requestHandler={requestHandler}
                                  defaultValue={defaultValue}
                        />
                    </Modal>
                    <Box display={'flex'} style={{justifyContent: 'center', marginTop: 10}}>
                        <RateRequestButton></RateRequestButton>
                    </Box>
                </Box>
                <img src='ai.svg' width={80} height={100} style={{
                    marginTop: 35,
                    marginRight: 35
                }}/>
            </Box>
        </Section>
    );
}
