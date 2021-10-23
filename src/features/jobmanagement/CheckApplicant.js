import {useTranslation} from "react-i18next";
import {useRequest} from "../../hooks/useRequest";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {useRouter} from "next/router";
import {
    JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK,
    X_API_KEY_JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK
} from "../../constant/externalURLs";
import {toast} from "react-toastify";
import {toastStyle} from "../../constant/constant";
import {useDropzone} from "react-dropzone";
import {Box, CircularProgress, TextField} from "@material-ui/core";
import {Section} from "../../components/Section";
import {LoadingPage} from "../report/LoadingWhenUpload";
import {h1, h2} from "../../constant/fontsize";
import {COLOR_TITLE} from "../../constant/color";
import DescriptionIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {SubmitAndCancel} from "../../components/CommonReusable/SubmitAndCancel";
import * as yup from "yup";

const checkApplicantSchema = yup.object({
    email: yup.string().email("Invalid email").required('Email is required'),
    resume_file: yup.string().required('Applicant resume is required')
});


// pre-assessment form
export const CheckApplicant = ({
                                   onCancel, country_code, job_title,
                                   job_description, hrId, jobId
                               }) => {
    const {t} = useTranslation();
    const {requestHandler} = useRequest();
    const [loading, setLoading] = useState(false);
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1
    });
    const [submitLoading, setSubmitLoading] = useState(false);
    const adsLoadingTime = 3;
    const formik = useFormik({
        initialValues: {
            email: "",
            resume_file: ""
        },
        validationSchema: checkApplicantSchema
    });
    const router = useRouter();

    const submitData = async () => {
        try {
            setSubmitLoading(true);
            const data = new FormData();
            data.append('email', formik.values.email);
            data.append('country_code', country_code);
            data.append('job_description', job_description);
            data.append('resume_file', formik.values.resume_file);
            data.append('dcc', X_API_KEY_JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK);
            const config = {
                method: 'POST',
                url: JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK,
                data: data
            };

            const result = await requestHandler(config);
            console.log("check applicant", result);
            if (result) {
                result.job_title = job_title;
                console.log(result);
                window.localStorage.setItem('hrCheckReportBasedOnJob',
                    JSON.stringify(result));
                setTimeout(() => {
                    setLoading(false);
                }, adsLoadingTime * 1000);
                // nav and use dummy data
                router.push(
                    {
                        pathname: './businessReport',
                        query: {
                            hrId: hrId,
                            jobId: jobId,
                            email: formik.values.email
                        },
                    }).then();
            } else {
                toast.error('Check applicant resume failed ' +
                    'with unknown reason, please try again later.', toastStyle);
            }
        } catch (e) {
            // router.push('./businessReport').then();
            // nav and use dummy data
            toast.error('Check appicant resume failed: ' + e.toString(), toastStyle);
            // alert('User has applied this job, or hasn't uploaded a resume. please check the email')
            setSubmitLoading(false);
        }
    };
    useEffect(() => {
        if (acceptedFiles.length) {
            formik.values.resume_file = acceptedFiles[0];
        }
    }, [acceptedFiles]);

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

    if (submitLoading) {
        return (
            <Box style={{width: 360, margin: 'auto', marginTop: '200px'}}>
                <Section>
                    <Box p={4} mt={4} fontSize={h2}>
                        <Box fontSize={h1} color={COLOR_TITLE}>
                            <h3 style={{textAlign: 'center'}}>
                                Submitting Form...
                                <CircularProgress
                                    style={{marginLeft: '20px',
                                    marginBottom:'-3px'}}
                                    size={20}
                                /></h3>
                        </Box></Box></Section>
            </Box>
        );
    }
    return (<Box style={{width: 360, marginLeft: 'auto', marginRight: 'auto'}}>
            <Section>
                <Box p={4} mt={4} fontSize={h2}>
                    <Box fontSize={h1} color={COLOR_TITLE}>
                        {t('jobmanagement_check_applicant.assessApplicantFormTitle')}
                    </Box>

                    <form onSubmit={formik.handleSubmit}>
                        <Box mt={2}>
                            <span>
                                {t('jobmanagement_check_applicant.email')}</span>
                            <TextField id="email" variant="outlined" size='small' name='email'
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       helperText={formik.touched.email && formik.errors.email}
                                       style={{width: 300}}/>
                        </Box>
                        <Box mt={2}  {...getRootProps({className: 'dropzone'})}>
                            <span>{t('jobmanagement_check_applicant.resume')}</span>
                            <input {...getInputProps()} />
                            <Box
                                height={300}
                                width={300}
                                borderRadius='24px'
                                py={6} style={{
                                backgroundColor: isDragActive ? '#F5F6FB' : 'white',
                                borderWidth: '2px',
                                borderColor: isDragActive ? 'rgba(0, 97, 255, 1)' : '#eeeeee',
                                borderStyle: 'dashed',
                                margin: '15px auto',
                                padding: '20px'
                            }}
                            >
                                {
                                    isDragActive
                                        ? <p>{t("report.dragable_title")}</p>
                                        : <p>{t("report.drag_title")}</p>
                                }
                                {
                                    (formik.values.resume_file) ?
                                        <div><strong>{formik.values.resume_file.name}</strong></div> :
                                        ""
                                }

                                <p style={{color: 'rgba(201, 201, 201, 1)'}}>{t("report.drag_text")}</p>
                                <Box mt={4}>
                                    <DescriptionIcon style={{color: 'rgba(70, 235, 213, 1)', fontSize: 90}}/>
                                </Box>
                            </Box>
                        </Box>
                        <SubmitAndCancel onSubmit={submitData} onCancel={onCancel}/>
                    </form>
                </Box>
            </Section></Box>
    )
};
