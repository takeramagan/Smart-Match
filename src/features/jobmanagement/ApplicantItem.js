// import mui components
import { Box, Button } from "@material-ui/core";
// import mui icons
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
// import API 
import { APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C } from "../../constant/externalURLs";
// import axios custom hook
import { useRequest } from "../../hooks/useRequest";

export const ApplicantItem = ({ applicant, isTitle, style, index, jobid, onReject, refreshPage }) => {
    const {
        name, application_time: apply_date, matching_level: match, resume, resume_report, user_id, resume_link, report,
        updates, hr_id, job_id, email
    } = applicant;
    const { action, time } = updates?.length ? updates[0] : {};
    const { action: actionType, info, description } = action ? JSON.parse(action) : {};
    const resumeRequest = useRequest();

    const updateResumeStatus = async (status) => {
        if (actionType >= RESUME_REJECTED) return;
        try {
            const formData = new FormData();
            formData.append('userid', user_id ?? 20);
            formData.append('hrid', hr_id);
            formData.append('jobid', job_id ?? 1);
            formData.append('dcc', X_API_KEY_B_AND_C);
            formData.append('updates', JSON.stringify({ action: status }));
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
                    color="primary" /></Button>}
            </Box>
            <Box width='10%' overflow='hidden' textAlign='center'>
                {isTitle && resume_report}
                {!isTitle &&
                    <Button target='_blank'
                        href={`/businessReport?hrid=${hr_id}&jobid=${job_id}&index=${index}&email=${email}`}
                        onClick={onViewReport}><CloudDownloadIcon color="primary" /></Button>}
            </Box>
            <Box width='25%' overflow='hidden' textAlign='center'>
                {isTitle && "Operation"}
                {!isTitle && <Operations applicantId={user_id} jobId={jobid} onReject={onReject} email={email}
                    refreshPage={refreshPage} />}
            </Box>
            <Box width='25%' overflow='hidden' textAlign='center'>
                {isTitle && "Note"}
                {!isTitle && ((actionType >= 0 ? `${resumeHrStatusArray[actionType]}` : '') + (description ? `: ${description}` : ''))}
            </Box>
        </Box>
    )
};