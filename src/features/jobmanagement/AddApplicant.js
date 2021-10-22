// import other libs
import {Box, TextField} from "@material-ui/core";
import * as yup from 'yup';
import {useFormik} from 'formik';

// axios
import {useRequest} from "../../hooks/useRequest";

// import reusable components
import {SubmitAndCancel} from "../../components/CommonReusable/SubmitAndCancel";
import {Section} from "../../components/Section";

// import constants
import {COLOR_TITLE} from "../../constant/color";
import {h1, h2} from '../../constant/fontsize';
import {APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C} from "../../constant/externalURLs";

// toast notification
import {toast} from 'react-toastify';
import {toastStyle} from "../../constant/constant";

//
import checkLink from "../../untils/checkLink";
import {useEffect} from "react";

export const AddApplicant = ({job, onCancel, refreshPage}) => {

    useEffect(() => {
        console.log("Job: ", job);
        console.log("OnCancel: ", onCancel);
        console.log("RefreshPage: ", refreshPage);
    }, []);

    const {requestHandler} = useRequest();

    // todo: remove this function later, ssl/tls check needs to be done
    //  by the load-balancer
    const transformLink = (value, originalValue) => {
        // 1. verify if input link contains http/https
        if (value.indexOf("http://") == 0 || value.indexOf("https://") == 0) {
            return value;
        }
        // 2. if no http/https, add to begin
        else {
            const headerHttp = "http://";
            const headerHttps = "https://";
            const localUrl = headerHttps + value;
            // const result = await fetch(localUrl, { method: 'HEAD' });
            // if (result.ok){
            //     return localUrl;
            // }
            // else{
            //     return headerHttp+value;
            // }
            return localUrl;
        }
    }

    const addApplicantSchema = yup.object({
        name: yup
            .string()
            .required('Name is required'),
        email: yup.string().email("Invalid email").required('Email is required'),
        joblink: yup.string().required('Job link is required').transform(transformLink).test('match', 'Not a valid link(eg: http(s)://google.com)', function (v) {
            return checkLink(v)
        }),
        company: yup.string().required('Company name is required'),
    });

    // console.log(job);
    const submitData = async ({email, name, joblink, company}) => {
        console.log('email', email, name, joblink, company);
        console.log('job', job);
        try {
            const data = new FormData();
            data.append('email', email); //mock data
            data.append('name', name); //mock data
            data.append('jobid', job.job_id);
            data.append('joblink', joblink);
            data.append('hrid', job.hr_id); //mock data
            data.append('company_name', company);
            data.append('dcc', X_API_KEY_B_AND_C);
            console.log(
                {
                    email,
                    name,
                    jobid: job.job_id,
                    joblink,
                    hrid: job.hr_id,
                    company_name: company,
                    dcc: X_API_KEY_B_AND_C
                }
            );
            const config = {
                method: 'post',
                url: APP_END_POINT_B_AND_C + ('insert_application'),
                data: data
            };
            const result = await requestHandler(config);
            console.log("applicant", result);
            if (result.status === 'success') { //这里返回值 没有status code... T_T
                onCancel();
                refreshPage();
            }
        } catch (e) {
            console.log("insert error", e);
            toast.error('User hasn\'t yet been pre-assessed. ' +
                'Please run the pre-assessment first.', toastStyle);
            // toast.error('User has applied this job, or has not uploaded a resume. please check the email', toastStyle)
        }
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            joblink: "",
            company: ""
        },
        validationSchema: addApplicantSchema,
        onSubmit: (values) => {
            submitData(values)
        },
    });
    return (
        <Box style={{width: 360, marginLeft: 'auto', marginRight: 'auto'}}>
            <Section>
                <Box p={4} mt={4} fontSize={h2}>
                    <Box fontSize={h1} color={COLOR_TITLE}>
                        Add applicant detail
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Box mt={2}>
                            <TextField id="name" label="Name" variant="outlined" size='small' name='name'
                                       value={formik.values.name}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.name && Boolean(formik.errors.name)}
                                       helperText={formik.touched.name && formik.errors.name}
                                       style={{width: 300}}/>
                        </Box>
                        <Box mt={2}>
                            <TextField id="email" label="Email" variant="outlined" size='small' name='email'
                                       value={formik.values.email}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       helperText={formik.touched.email && formik.errors.email}
                                       style={{width: 300}}/>
                        </Box>
                        <Box mt={2}>
                            <TextField id="company" label="Company name" variant="outlined" size='small' name='company'
                                       value={formik.values.company}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.company && Boolean(formik.errors.company)}
                                       helperText={formik.touched.company && formik.errors.company}
                                       style={{width: 300}}/>
                        </Box>
                        <Box mt={2}>
                            <TextField id="joblink" label="Job link" variant="outlined" size='small' name='joblink'
                                       value={formik.values.joblink}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       error={formik.touched.joblink && Boolean(formik.errors.joblink)}
                                       helperText={formik.touched.joblink && formik.errors.joblink}
                                       style={{width: 300}}/>
                        </Box>
                        <SubmitAndCancel onCancel={onCancel}/>
                    </form>
                </Box>
            </Section>
        </Box>
    )
};
