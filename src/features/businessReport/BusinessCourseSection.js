import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useRequest} from "../../hooks/useRequest";
import {useFormik} from "formik";
import {Box, Button, Modal, Typography} from "@material-ui/core";
import {Section} from "../../components/Section";
import {h2} from "../../constant/fontsize";
import {DK_CONTACT_US} from "../../constant/externalURLs";
import {RateForm} from "../../components/CommonReusable/RateForm";

export function BusinessCourseSection({report}) {
    const {t} = useTranslation();
    const defaultValue = report.report_accuracy_rating ?
        report.report_accuracy_rating : 3;
    const [showRateForm, setShowRateForm] = useState(false);
    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", handleScroll);
        }

        watchScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    const handleScroll = () => {
        if (!refuseRate && !formik.values.rated &&
            (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            setRefuseRate(true);
            setTimeout(
                () => {
                    if (!refuseRate) {
                        setShowRateForm(true);
                    }
                },
                10000);
        }
    };

    const closeModal = () => {
        console.log(formik.errors.required);
        setRefuseRate(true);
        setShowRateForm(false);
    };

    const params = useRouter().query;
    const {hrid, jobid, email} = params;
    const {requestHandler} = useRequest();

    // comment form
    const formik = useFormik({
        initialValues: {
            comments: report.comments ? report.comments : "",
            rate: report.report_accuracy_rating ? report.report_accuracy_rating : 3,
            rated: !!report.report_accuracy_rating
        }
    });

    const [refuseRate, setRefuseRate] = useState(formik.values && formik.values.rated);

    // rate form request button
    const RateRequestButton = () => {
        if (!refuseRate) {
            return "";
        } else {
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
        }
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
                        <RateForm onCancel={closeModal} formik={formik}
                                  hrid={hrid} jobid={jobid}
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