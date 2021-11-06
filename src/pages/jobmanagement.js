// import react hook
import { useCallback, useEffect, useState } from 'react';
/* import libs */
// import react-redux
import { useDispatch, useSelector } from "react-redux";
// import mui components
import { Container, Box, Button, Modal } from "@material-ui/core";
// import nextjs router
import { useRouter } from "next/router";

// import custom style
import { Section } from "../components/Section";
import { h, h1 } from '../constant/fontsize';
// import axios custom hook
import { useRequest } from "../hooks/useRequest";
//
import { hrHistoryAction } from "../slices/hrHistorySlice";

/* import constants */
// import API 
import { APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C } from "../constant/externalURLs";

// import feature components
import { AddApplicant } from "../features/jobmanagement/AddApplicant";
import { CardItem } from "../features/jobmanagement/CardItem";
import { JobDetail } from "../features/jobmanagement/AddOrEditJob";
import { CheckApplicant } from "../features/jobmanagement/CheckApplicant";
import { ApplicantsDetail } from "../features/jobmanagement/ApplicantsDetail";

// import test related
import mockdata from '../constant/mockReleasedJobs.json';
import { LoadingPage } from "../features/report/LoadingWhenUpload";

// const useStyles = makeStyles({
//   rejectReasonContainer: {
//     "&:hover":{
//       cursor: 'pointer'
//     }
//   },
// })

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

    useEffect(() => {
        if (hrId) {
            getExistJobList().then();
            console.log("HRid changed");
        }
    }, [hrId]);

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
            console.log("C: Jobmanagement ", showJobDetail);
        } else {
            closeModal();
        }
    };

    const TestOnlyButton = () => {
        if (hrId === undefined && process.env.ENV_FLAG !== 'production') {
            return (
                <Box>
                    <Button onClick={() => {
                        getExistJobList().then()
                    }} color='primary' variant='contained' style={{ borderRadius: 20 }}>Fetch Job</Button>
                </Box>
            );
        } else {
            return "";
        }
    };

    //fetch data
    const dispatch = useDispatch();
    const HttpClient = useRequest();

    const getExistJobList = async () => {
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
            const data = await HttpClient.requestHandler(config);
            console.log("Fetch job posting data from API", data.job_postings);
            if (data.job_postings) {
                dispatch(hrHistoryAction.setHistoryList(data.job_postings));
            }
        } catch (e) {
            console.error("error happen while fetching posted jobs", e)
        }
    };

    const deleteJob = async (props) => {
        const data = new FormData();
        data.append('dcc', X_API_KEY_B_AND_C);
        data.append('hrid', hrId);
        data.append('jobid',props);
        console.log('hrid when delete job posting = ', hrId);
        const config = {
            method: 'post',
            url: APP_END_POINT_B_AND_C + 'delete_job_posting',
            data: data
        };
        try {
            const response = await HttpClient.requestHandler(config);
            console.log(response);
            // refetch data to refresh page
            getExistJobList();
        } catch (e) {
            console.error("error happen while fetching posted jobs", e)
        }
    }

    console.log("HR posted list: ", hrHistoryList);

    return (
        <Container
            style={{ marginTop: 18 }}
        >
            {/*test only button*/}
            <TestOnlyButton />

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
                        }} color='primary' variant='contained' style={{ borderRadius: 20 }}>Post Job</Button>
                    </Box>
                </Box>

            </Section>

            <Section>
                <Box p={4} mt={4}>
                    <CardItem
                        item={{
                            header_jobid: "Id",
                            header_currency: "Country",
                            header_jobtitle: "Job Title",
                            header_Applicants: "Applicants",
                            header_job_status: 'Job Status',
                            header_postdate: "Post Date",
                            header_edit: "Edit Job",
                            note: "Note",
                            header_delete: "Delete Job"
                        }}
                        style={{ fontWeight: 600}}
                        key={-1}
                        isTitle />
                    {hrHistoryList.length === 0 && "No application history"}
                    {hrHistoryList.map((job, i) =>
                        <CardItem
                            index={i}
                            item={job}
                            style={{ height: "80px"}}
                            onShowJobDetail={showJobDetailCallback}
                            onCheckApplicants={() => checkApplicantsCallback(job)}
                            onShowApplicants={showApplicantsCallback}
                            onAddApplicant={() => onAddApplicant(i)}
                            onDeleteJob={(props) => { deleteJob(props) }}
                            // showDetail={showItem === i}
                            key={i} />
                    )}
                </Box>
            </Section>

            <Modal open={showJobDetail || showApplicants} onClose={onClose} style={{ overflowY: 'scroll' }}>
                <>
                    {showJobDetail && <JobDetail job={hrHistoryList[showItem]} index={showItem} closeModal={closeModal}
                        updatePage={getExistJobList} hrid={hrId}></JobDetail>}
                    {showApplicants && <ApplicantsDetail job={hrHistoryList[showItem]}></ApplicantsDetail>}
                </>
            </Modal>
            <Modal open={showAddApplicant} onClose={closeModal}>
                <AddApplicant job={hrHistoryList[showItem]} onCancel={closeModal} refreshPage={getExistJobList} />
            </Modal>
            <Modal open={showCheckApplicantForm} onClose={closeModal}>
                <CheckApplicant country_code={selectedJobCountry}
                    job_description={selectedJobDescription}
                    job_title={selectedJobTitle}
                    onCancel={closeModal}
                    refreshPage={getExistJobList}
                    hrId={hrId}
                    jobId={selectedJobId} />
            </Modal>
        </Container>
    )
};

export default JobManagement;
