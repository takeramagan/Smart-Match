// import material ui component
import { Box, Button } from "@material-ui/core";
// import icons
import EditIcon from '@material-ui/icons/Edit';
// import constant 
import { h2 } from '../../constant/fontsize';
import { JOB_STATUS } from "../../constant/jobstatus";

export const CardItem = ({ item, isTitle, index, onShowJobDetail, onShowApplicants, style, onAddApplicant, onCheckApplicants, onDeleteJob }) => {
    const { job_reference_id, currency, jobtitle, applicants, jobstatus: status, link, job_posting_time, modify_date, note, description
    } = item;
    //console.log("Item to card item: ", item);
    //0:accepting 1:closed 2:filled
    const job_status = (status >= 0 && status < JOB_STATUS.length) ? JOB_STATUS[status] : status;
    const numOfApplicants = (applicants ?? 0); //标题没有index
    const getCountryName = currency === 'USD' ? 'USA' : 'CA';

    return (
        <Box>
            <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center'
                justifyContent='center' style={style}>
                <Box width='8%' overflow='hidden'>{isTitle ? item.header_jobid : job_reference_id}</Box>
                <Box width='8%' overflow='hidden'>{isTitle ? item.header_currency : getCountryName}</Box>
                <Box width='15%' overflow='hidden'>
                    {isTitle ? item.header_jobtitle :
                        <Button
                            onClick={() => onCheckApplicants(currency, description)} variant='contained' color='primary'
                            style={{ height: 30, marginTop: 10, marginBottom: 10 }}
                        >
                            {jobtitle}
                        </Button>}
                </Box>
                <Box width='15%' overflow='hidden' textAlign='center'>
                    {/* index === undefined 表示list 的标题栏*/}
                    {isTitle ? item.header_Applicants :
                        <Box display='flex' flexDirection='row' width='100%' justifyContent='space-evenly'>
                            <Button
                                disabled={numOfApplicants === 0}
                                onClick={() => onShowApplicants(index)} variant='contained' color='primary'
                                style={{ height: 30, marginTop: 10, marginBottom: 10 }}
                            >
                                {numOfApplicants}
                            </Button>
                            <Button variant='contained' color='primary'
                                style={{ height: 30, marginTop: 10, marginBottom: 10 }}
                                onClick={onAddApplicant}>Add</Button>
                        </Box>}
                </Box>
                <Box width='12%' overflow='hidden' textAlign='center'>{isTitle ? item.header_job_status : job_status}</Box>
                <Box width='8%'>
                    {isTitle ? item.header_edit :
                        <Button onClick={() => onShowJobDetail(index)}>
                            {/* {showDetail && <ExpandLessIcon />}
                            {!showDetail && <ExpandMoreIcon />} */}
                            <EditIcon color='primary' />
                        </Button>}
                </Box>
                <Box width='10%' overflow='hidden'>{isTitle ? item.header_postdate : (job_posting_time.split("T")[0])}</Box>
                <Box width='15%' overflow='hidden' textAlign='center'>
                    {note}
                </Box>
                <Box width='10%' overflow='hidden' textAlign='center'>
                    {isTitle && item.header_delete}
                    {!isTitle &&
                        <Button variant='contained' color='primary'
                            style={{ height: 30, marginTop: 10, marginBottom: 10 }}
                            onClick={() => onDeleteJob(item.job_id)}>
                            Delete
                        </Button>}
                </Box>
            </Box>
            {/* {showDetail && <JobCard job={item}/>} */}
        </Box>
    )
};