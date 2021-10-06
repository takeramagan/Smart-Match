// import react hook
import {useCallback, useEffect, useState} from 'react';
/* import libs */
// import form handle lib
import {useFormik} from 'formik';
// import validation libs
import * as yup from 'yup';
// import functional lib dropzone
import {useDropzone} from "react-dropzone";
// import react-redux
import {useDispatch, useSelector} from "react-redux";
// import mui components
import {Container, Box, Button, Modal, TextField, Chip, makeStyles, MenuItem} from "@material-ui/core";

// import custom style
import {Section} from "../components/Section";
import {h, h1, h2} from '../constant/fontsize';
import {COLOR_TITLE} from "../constant/color";
// import axios custom hook
import {useRequest} from "../hooks/useRequest";

//
import {hrHistoryAction} from "../slices/hrHistorySlice";

// import incons
import DescriptionIcon from "@material-ui/core/SvgIcon/SvgIcon";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

/* import constants */
// 
import {RESUME_ANALYSIS_VIEWED, RESUME_INVITE, RESUME_REJECTED, RESUME_VIEWED} from "../constant/jobstatus";
// import API 
import {
    APP_END_POINT_B_AND_C,
    JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK,
    X_API_KEY_B_AND_C, X_API_KEY_JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK
} from "../constant/externalURLs";

import getUserId from "../untils/getUserId";
import checkLink from "../untils/checkLink";
import {resumeHrStatusArray} from "../constant/jobstatus";
import {toast} from 'react-toastify';
import {toastStyle} from "../constant/constant";

import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

// import reusable components
import {SubmitAndCancel} from "../components/CommonReusable/SubmitAndCancel";

// import feature components
import {AddApplicant} from "../features/jobmanagement/AddApplicant";
import {CardItem} from "../features/jobmanagement/CardItem";
import {JobDetail} from "../features/jobmanagement/AddOrEditJob";

// import test related
import mockdata from '../constant/mockReleasedJobs.json';
import {LoadingPage} from "../features/report/LoadingWhenUpload";

// const useStyles = makeStyles({
//   rejectReasonContainer: {
//     "&:hover":{
//       cursor: 'pointer'
//     }
//   },
// })


const Operations = ({applicantId, jobId, onReject, email, refreshPage}) => {
    const [showRejectReason, setShowRejectReason] = useState(false);
    // const rejectReasonOptions = [ "工作技能不匹配", "工作经历不匹配", "项目经验太少", "简历格式混乱", "简历逻辑不清"];
    const rejectReasonOptions = ["Skills do not match", "Work experiences do not match", "Not enough project experience",
        "Resume structure unclear", "Not enough hands-on skills"];
    const [rejectReasons, setRejectReasons] = useState(0); //bit indicates selected or not
    const [otherReason, setOtherReason] = useState("");
    const [otherBlur, setOherBlur] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [inviteBlur, setInviteBlur] = useState(false);
    // const styles = useStyles()

    const [showInvite, setShowInvite] = useState(false);

    const operationRequest = useRequest();
    const params = useRouter().query;
    const hrId = params.id ?? 1;

    /**
     *
     * @param {k:v} data :
     * @param {number} application_status 0: default value 1: resume rejected
     * @returns
     */
    const getOperationConfig = (data, application_status = 0) => {
        const formData = new FormData();
        formData.append('userid', applicantId ?? 20);
        formData.append('email', email);
        formData.append('hrid', hrId);
        formData.append('jobid', jobId ?? 1);
        formData.append('dcc', X_API_KEY_B_AND_C);
        formData.append('updates', JSON.stringify(data));
        formData.append('application_status', application_status); //0: default state 1: reject
        console.log("application status= ", application_status);
        // application_status !== 1 ?? formData.append('invite_description', inviteDescription) //0: default state 1: reject
        return ({
            method: 'post',
            url: APP_END_POINT_B_AND_C + 'update_application',
            data: formData
        });
    };

    const rejectReasonToString = () => {
        let reason = [];
        for (let i = 0; i < rejectReasonOptions.length; i++) {
            if (rejectReasons & (1 << i)) {
                reason = [...reason, rejectReasonOptions[i]];
                console.log(reason)

            }
        }

        if (otherReason) reason = [...reason, otherReason];
        return reason.join(" ")
    };

    const onCloseModal = () => {
        setShowRejectReason(false);
        setOherBlur(false);
    };

    const checkReasons = () => (otherReason.trim() || rejectReasons);

    const onSubmit = async () => {
        if (!checkReasons()) {
            setOherBlur(true)
        } else {
            try {
                const rejectReason = rejectReasonToString();
                console.log("reject reason", rejectReason);
                // const status = JSON.stringify()
                const resp = await operationRequest.requestHandler(getOperationConfig({
                    action: RESUME_REJECTED,
                    info: rejectReason
                }, 1));
                console.log("reject = ", resp);
                if (resp.status === 'success') {
                    onReject();
                    onCloseModal();
                    console.log("reject succ");
                } else {
                    console.log("reject error");
                    toast.error('Network Error, please retry', toastStyle);
                }
            } catch (e) {
                console.error("error while reject");
                console.error(e);
                toast.error('Network Error, please retry', toastStyle);
            }
            console.log(otherReason)
        }
    };

    const onSelectReason = (i) => {
        setRejectReasons(v => {
            return (v ^ (1 << i))
        }) //对应该位取反
    };

    const onOtherReason = (e) => {
        setOtherReason(e.target.value)
    };

    const onSubmitInvite = async () => {
        if (!checkLink(inviteLink) || !(checkDescription(inviteDescription))) {
            setInviteBlur(true);
            setDescBlur(true);
            console.log("false")
        } else {

            try {
                // const status = JSON.stringify({status: RESUME_INVITE, info: inviteLink.trim()})
                await operationRequest.requestHandler(getOperationConfig({
                    action: RESUME_INVITE, info: inviteLink.trim(),
                    description: inviteDescription
                }));
                onCloseInviteModal();
                refreshPage()
            } catch (e) {
                console.error("error while submit link")
            }
        }
    };

    const onCancelInvite = () => {
        onCloseInviteModal();
    };

    const onCloseInviteModal = () => {
        setShowInvite(false);
        setInviteBlur(false);
    };

    const [inviteDescription, setInviteDescription] = useState();
    const [descBlur, setDescBlur] = useState(false);
    const onChangeLink = (e) => {
        setInviteLink(e.target.value.trim());
    };
    const onChangeDescription = (e) => setInviteDescription(e.target.value);
    const checkDescription = (description) => (description?.trim());

    return (
        <Box>
            <Button onClick={() => setShowInvite(true)}>Invite <GroupAddIcon color="primary"/></Button>
            <Button onClick={() => setShowRejectReason(true)}>Reject <CloseIcon color="error"/></Button>
            <Modal open={showInvite} onClose={onCloseInviteModal}>
                <Box mt={10} ml='auto' mr='auto' width="80%">
                    <Section>
                        <Box p={4}>
                            {/* <InlineWidget url="https://calendly.com/176237421/interview" /> */}
                            {/* <InlineWidget url="https://calendly.com/acmesales" /> */}
                            Please generate your invite link via
                            <a href='http://calendly.com' target='_blank'>Calendly</a>,
                            <a href='https://calendar.google.com/' target='_blank'>Google calendar</a> or
                            other tools and paste your link below
                            <TextField placeholder='Paste your invite link here'
                                       onChange={onChangeLink}
                                       fullWidth value={inviteLink}
                                       onBlur={() => setInviteBlur(true)}
                            />
                            <ErrorText visible={(inviteBlur && !checkLink(inviteLink))}
                                       text='Please enter a valid invite link: http(s)://...'/>
                            <TextField
                                label="Invitation description" variant="outlined"
                                placeholder='Please enter your description about this invitation'
                                onChange={onChangeDescription}
                                fullWidth value={inviteDescription}
                                multiline
                                rows={2}
                                rowsMax={4}
                                onBlur={() => setDescBlur(true)}
                            />
                            <ErrorText visible={(descBlur && !checkDescription(inviteDescription))}
                                       text='Description is empty'/>
                            <SubmitAndCancel onSubmit={onSubmitInvite} onCancel={onCancelInvite}/>
                        </Box>
                    </Section>
                </Box>
            </Modal>
            <Modal open={showRejectReason} onClose={onCloseModal}>
                <Box mt={10} ml='auto' mr='auto' width='60%'>
                    <Section>
                        <Box p={4}>
                            <Box fontSize={h2} color={COLOR_TITLE}>Choose the reason</Box>
                            <Box mt={2} display='flex' flexWrap="wrap" style={{maxWidth: '100%'}}>
                                {rejectReasonOptions.map((v, i) =>
                                    <Chip
                                        clickable
                                        onClick={() => onSelectReason(i)}
                                        key={v}
                                        label={v} style={{
                                        marginRight: 18,
                                        color: (rejectReasons >> i & 1) ? '#ffffff' : 'black',
                                        backgroundColor: (rejectReasons >> i & 1) ? COLOR_TITLE : '#ffffff',
                                        filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                                        margin: '8px 4px',
                                        overflowAnchor: "auto",
                                    }}
                                    />
                                )}

                            </Box>
                            <Box display='flex' alignItems='center'>
                                Other:
                                <TextField fullWidth id='otherreason'
                                           value={otherReason}
                                           onChange={onOtherReason}
                                           onBlur={() => setOherBlur(true)}
                                ></TextField>
                            </Box>
                            <ErrorText visible={otherBlur && !checkReasons()} text='Please choose or enter a reason'/>
                            {/* <Box display='flex' alignItems='center' color="red" mt={2}>
                {otherBlur && !checkReasons() && 'Please choose or enter a reason'}
              </Box> */}
                            <SubmitAndCancel onSubmit={onSubmit} onCancel={onCloseModal}/>
                        </Box>
                    </Section>
                </Box>
            </Modal>
        </Box>
    )
};

const ApplicantItem = ({applicant, isTitle, style, index, jobid, onReject, refreshPage}) => {
    const {
        name, application_time: apply_date, matching_level: match, resume, resume_report, user_id, resume_link, report,
        updates, hr_id, job_id, email
    } = applicant;
    const {action, time} = updates?.length ? updates[0] : {};
    const {action: actionType, info, description} = action ? JSON.parse(action) : {};
    const resumeRequest = useRequest();

    const updateResumeStatus = async (status) => {
        if (actionType >= RESUME_REJECTED) return;
        try {
            const formData = new FormData();
            formData.append('userid', user_id ?? 20);
            formData.append('hrid', hr_id);
            formData.append('jobid', job_id ?? 1);
            formData.append('dcc', X_API_KEY_B_AND_C);
            formData.append('updates', JSON.stringify({action: status}));
            const config = {
                method: 'post',
                url: APP_END_POINT_B_AND_C + 'update_application',
                data: formData
            };
            await resumeRequest.requestHandler(config)
        } catch (e) {
            console.log("view resume error")
        }
    };

    const onViewResume = () => updateResumeStatus(RESUME_VIEWED); // 1: viewed
    const onViewReport = async () => updateResumeStatus(RESUME_ANALYSIS_VIEWED); // 2: report viewed


    return (
        <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center'
             style={style}>
            <Box width='10%' overflow='hidden'>{name}</Box>
            <Box width='15%' overflow='hidden'>{apply_date?.split('T')[0]}</Box>
            <Box width='5%' overflow='hidden' textAlign='center'>
                {isTitle && match}
                {!isTitle && `${match}%`}
            </Box>
            <Box width='10%' overflow='hidden' textAlign='center'>
                {isTitle && resume}
                {!isTitle && <Button target='_blank' href={resume_link} onClick={onViewResume}><CloudDownloadIcon
                    color="primary"/></Button>}
            </Box>
            <Box width='10%' overflow='hidden' textAlign='center'>
                {isTitle && resume_report}
                {!isTitle &&
                <Button target='_blank'
                        href={`/report?hrid=${hr_id}&jobid=${job_id}&index=${index}&email=${email}`}
                        onClick={onViewReport}><CloudDownloadIcon color="primary"/></Button>}
            </Box>
            <Box width='25%' overflow='hidden' textAlign='center'>
                {isTitle && "Operation"}
                {!isTitle && <Operations applicantId={user_id} jobId={jobid} onReject={onReject} email={email}
                                         refreshPage={refreshPage}/>}
            </Box>
            <Box width='25%' overflow='hidden' textAlign='center'>
                {isTitle && "Note"}
                {!isTitle && ((actionType >= 0 ? `${resumeHrStatusArray[actionType]}` : '') + (description ? `: ${description}` : ''))}
            </Box>
        </Box>
    )
};


const ErrorText = ({visible, text}) => {
    return (
        <Box display='flex' alignItems='center' color="red" mt={2}>
            {visible && text}
        </Box>
    )
};

const checkApplicantSchema = yup.object({
    email: yup.string().email("Invalid email").required('Email is required'),
    resume_file: yup.string().required('Applicant resume is required')
});

const CheckApplicant = ({onCancel, country_code, job_title,
                            job_description, hrId, jobId}) => {
    const {t} = useTranslation();
    const {requestHandler} = useRequest();
    const [loading, setLoading] = useState(false);
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
                result.job_title= job_title;
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
        }
    };

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1
    });

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

    return (
        <Box style={{width: 360, marginLeft: 'auto', marginRight: 'auto'}}>
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
                                        <div></div>
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
            </Section>
        </Box>)
};

const ApplicantsDetail = ({job}) => {
    const {job_id, status, post_date, modify_date, applicants, jobtitle} = job;
    // let applicantList = applicants
    // if(typeof(applicants) !== "object") applicantList = []
    const [applicantList, setApplicantList] = useState([]);
    const hrid = getUserId();
    const {requestHandler} = useRequest();
    console.log('job', job);
    const onReject = (index) => {
        return setApplicantList([...applicantList.slice(0, index), ...applicantList.slice(index + 1)])
    };

    const getApplicants = async () => {
        try {
            const data = new FormData();
            data.append('hrid', hrid ?? 1); //mock data
            data.append('jobid', job_id);
            data.append('dcc', X_API_KEY_B_AND_C);
            console.log('hrid= ', hrid, 'jobid= ', job_id);
            const config = {
                method: 'post',
                url: APP_END_POINT_B_AND_C + ('get_all_applications'),
                data: data
            };
            const result = await requestHandler(config);
            console.log("applicant", result.applicants_info_list);
            console.log("applicant", result);
            if (!result.status) { //这里返回值 没有status code... T_T
                // if(result.status === 'success') {
                console.log("get applicants success");
                setApplicantList(result.applicants_info_list.sort((a, b) =>
                    (b.matching_level - a.matching_level)));
                console.log('applicantList', applicantList);
            } else {
                console.log("get applicants error")
            }
        } catch (e) {
            console.log("error get applicants")
        }
    };
    useEffect(getApplicants, []);
    
    return (
        <Box mt={4} style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Section>
                <Box mt={4} p={4}>
                    <Box fontSize={h1} color={COLOR_TITLE}>
                        {jobtitle}
                    </Box>
                </Box>
            </Section>
            <Section>
                <Box p={4} mt={4}>
                    <ApplicantItem
                        applicant={{
                            name: "Name",
                            application_time: "Apply Date",
                            matching_level: 'Match',
                            resume: "Resume",
                            resume_report: "Resume Analysis"
                        }}
                        style={{fontWeight: 600}} isTitle/>
                    {(applicantList?.length === 0) && "No applicants Right now"}
                    {applicantList?.map((item, i) =>
                        <ApplicantItem applicant={item} key={i} index={i} jobid={job_id} onReject={() => onReject(i)}
                                       refreshPage={getApplicants}/>)}
                </Box>
            </Section>
        </Box>
    )
};

const JobManagement = () => {
    const [showItem, setShowItem] = useState(-1); //index in Job list, -1表示没有
    const [showJobDetail, setShowJobDetail] = useState(false);
    const [showApplicants, setShowApplicants] = useState(false);
    const [selectedJobCountry, setSelectedJobCountry] = useState('ca');
    const [selectedJobDescription, setSelectedJobDescription] = useState('');
    const [selectedJobId, setSelectedJobId] = useState('');
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const hrHistory = useSelector(store => store.history);
    const currentPage = hrHistory.currentPage;
    const hrHistoryList = hrHistory.historyList;
    const params = useRouter().query;
    const hrId = params.id;
    // console.log('Initial hrid1 = ', hrId);
    const onShowJobDetail = (id) => {
        setShowItem(id);
        setShowJobDetail(true);
    };

    const [showCheckApplicantForm, setShowCheckApplicantForm] = useState(false);
    // open the form window, so the hr will upload applicant resume and enter applicant email
    const onCheckApplicants = (job) => {
        console.log('selected job at jobmanagement 605:', job);
        setSelectedJobDescription(job.description);
        setSelectedJobId(job.job_id);
        setSelectedJobTitle(job.jobtitle);
        if (job.currency === 'usd') {
            setSelectedJobCountry('us');
        } else {
            setSelectedJobCountry('ca');
        }
        setShowCheckApplicantForm(true);
    };

    const [showAddApplicant, setShowAddApplicant] = useState(false);
    const onAddApplicant = (index) => {
        setShowAddApplicant(true);
        setShowItem(index);
    };

    const showJobDetailCallback = useCallback((id) => onShowJobDetail(id), []);
    const showApplicantsCallback = useCallback((id) => onShowApplicants(id), []);
    const checkApplicantsCallback = useCallback((job) =>
        onCheckApplicants(job), []);

    const onShowApplicants = (id) => {
        setShowItem(id);
        setShowApplicants(true);
    };

    const closeModal = () => {
        setShowItem(-1);
        setShowJobDetail(false);
        setShowApplicants(false);
        setShowAddApplicant(false);
        setShowCheckApplicantForm(false);
    };

    const onClose = () => {
        if (showJobDetail) { //在jobmodal 里面自己控制关闭
            console.log(showJobDetail);
        } else {
            closeModal();
        }
    };

    const TestOnlyButton = () => {
        if (hrId===undefined && process.env.ENV_FLAG !== 'production') {
            return (
                <Box>
                    <Button onClick={() => {
                        getData().then()
                    }} color='primary' variant='contained' style={{borderRadius: 20}}>Fetch Job</Button>
                </Box>
            );
        } else {
            return "";
        }
    };

    //fetch data
    const dispatch = useDispatch();
    const getHrHistory = useRequest();

    const getData = async () => {
        const data = new FormData();
        data.append('dcc', X_API_KEY_B_AND_C);
        data.append('hrid', hrId);
        console.log('hrid when fetch data = ', hrId);
        const config = {
            method: 'post',
            url: APP_END_POINT_B_AND_C + 'get_all_job_postings',
            data: data
        };
        try {
            const data = await getHrHistory.requestHandler(config);
            console.log("get data", data.job_postings);
            if (data.job_postings) {
                dispatch(hrHistoryAction.setHistoryList(data.job_postings));
            }
        } catch (e) {
            console.error("error happen while fetching posted jobs", e)
        }
    };

    console.log("hr posted list: ", hrHistoryList);

    useEffect(() => {
        console.log("reached: ", hrId);
        if (hrId) {
            getData().then();
        }
    }, [hrId]);

    return (
        <Container
            style={{marginTop: 18}}
        >
            {/*test only button*/}
            <TestOnlyButton></TestOnlyButton>

            <Section>
                <Box p={4}>
                    <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                        Job Managements
                    </Box>
                    <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                        <Box fontSize={h1}>
                            Following are jobs you posted within 6 months
                        </Box>
                        <Button onClick={() => {
                            onShowJobDetail(-1)
                        }} color='primary' variant='contained' style={{borderRadius: 20}}>Post Job</Button>
                    </Box>
                </Box>

            </Section>

            <Section>
                <Box p={4} mt={4}>
                    <CardItem
                        item={{
                            jobid: "Id",
                            jobtitle: "Job Title",
                            status: 'Job Status',
                            postdate: "Post Date",
                            edit: "Edit Job",
                            note: "Note",
                            currency: "Country"
                        }}
                        style={{fontWeight: 600}} key={-1} isTitle/>
                    {hrHistoryList.length === 0 && "No application history"}
                    {hrHistoryList.map((job, i) =>
                        <CardItem
                            index={i}
                            item={job}
                            onShowJobDetail={showJobDetailCallback}
                            onCheckApplicants={() => checkApplicantsCallback(job)}
                            onShowApplicants={showApplicantsCallback}
                            onAddApplicant={() => onAddApplicant(i)}
                            // showDetail={showItem === i}
                            key={i}/>
                    )}
                </Box>
            </Section>
            <Modal open={showJobDetail || showApplicants} onClose={onClose} style={{overflowY: 'scroll'}}>
                <>
                    {showJobDetail && <JobDetail job={hrHistoryList[showItem]} index={showItem} closeModal={closeModal}
                                                 updatePage={getData} hrid={hrId}></JobDetail>}
                    {showApplicants && <ApplicantsDetail job={hrHistoryList[showItem]}></ApplicantsDetail>}
                </>
            </Modal>
            <Modal open={showAddApplicant} onClose={closeModal}>
                <AddApplicant job={hrHistoryList[showItem]} onCancel={closeModal} refreshPage={getData}/>
            </Modal>
            <Modal open={showCheckApplicantForm} onClose={closeModal}>
                <CheckApplicant country_code={selectedJobCountry}
                                job_description={selectedJobDescription}
                                job_title={selectedJobTitle}
                                onCancel={closeModal} refreshPage={getData}
                                hrId={hrId} jobId={selectedJobId}/>
            </Modal>
        </Container>
    )
};

export default JobManagement;
