import { useEffect, useState } from "react";
import getUserId from "../../untils/getUserId";
import { useRequest } from "../../hooks/useRequest";
import { APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C } from "../../constant/externalURLs";
import { Box } from "@material-ui/core";
import { Section } from "../../components/Section";
import { h1 } from "../../constant/fontsize";
import { COLOR_TITLE } from "../../constant/color";

// import Appilcant Item functional component
import { ApplicantItem } from "./ApplicantItem";

export const ApplicantsDetail = ({ job }) => {
    const { job_id, status, post_date, modify_date, applicants, jobtitle } = job;
    // let applicantList = applicants
    // if(typeof(applicants) !== "object") applicantList = []
    const [applicantList, setApplicantList] = useState([]);
    const hrid = getUserId();
    const { requestHandler } = useRequest();
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
        <Box mt={4} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
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
                        style={{ fontWeight: 600 }} isTitle />
                    {(applicantList?.length === 0) && "No applicants Right now"}
                    {applicantList?.map((item, i) =>
                        <ApplicantItem applicant={item} key={i} index={i} jobid={job_id} onReject={() => onReject(i)}
                            refreshPage={getApplicants} />)}
                </Box>
            </Section>
        </Box>
    )
};