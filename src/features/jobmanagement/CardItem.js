// import material ui component
import { Box, Button } from "@material-ui/core";
// import icons
import EditIcon from '@material-ui/icons/Edit';
// import constant 
import { h2 } from '../../constant/fontsize';
import { JOB_STATUS } from "../../constant/jobstatus";

export const CardItem = ({
    index, onShowJobDetail, onShowApplicants, item,
    style, isTitle, onAddApplicant,
    onCheckApplicants
}) => {
    const {
        job_id: id, jobstatus: status, link, job_posting_time, postdate, modify_date, applicants, jobtitle: title,
        edit, note, job_reference_id, currency, description
    } = item;
    //0:accepting 1:closed 2:filled
    const job_status = (status >= 0 && status < JOB_STATUS.length) ? JOB_STATUS[status] : status;
    const numOfApplicants = isTitle ? "Applicants" : (applicants ?? 0); //标题没有index
    const getCountryNameOrCurrency = currency === 'Country' ?
        currency : (currency === 'USD' ? 'USA' : 'CA');

    return (
        <Box>
            <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center'
                justifyContent='center' style={style}>
                <Box width='8%' overflow='hidden'>{isTitle ? 'Job ID' : job_reference_id}</Box>
                <Box width='10%' overflow='hidden'>{getCountryNameOrCurrency}</Box>
                <Box width='20%' overflow='hidden'>
                    {isTitle ? 'Job Title' : <Button
                        onClick={() => onCheckApplicants(currency, description)} variant='contained' color='primary'
                        style={{height: 30, marginTop: 10, marginBottom: 10}}
                    >{title}</Button>}
                </Box>
                <Box width='15%' overflow='hidden' textAlign='center'>
                    {/**index === undefined 表示list 的标题栏*/}
                    {isTitle && numOfApplicants}
                    {!isTitle &&
                        <Box display='flex' flexDirection='row' width='100%' justifyContent='space-evenly'>
                            <Button
                                disabled={numOfApplicants === 0}
                                onClick={() => onShowApplicants(index)} variant='contained' color='primary'
                                style={{ height: 30, marginTop: 10, marginBottom: 10 }}
                            >{numOfApplicants}</Button>
                            <Button variant='contained' color='primary'
                                style={{ height: 30, marginTop: 10, marginBottom: 10 }}
                                onClick={onAddApplicant}>Add</Button>
                        </Box>}
                </Box>
                <Box width='20%' overflow='hidden' textAlign='center'>{isTitle ? "Job status" : job_status}</Box>
                <Box width='8%'>
                    {isTitle && edit}
                    {!isTitle &&
                        <Button onClick={() => onShowJobDetail(index)}>
                            {/* {showDetail && <ExpandLessIcon/>}
            {!showDetail && <ExpandMoreIcon/>}  */}
                            <EditIcon color='primary' />
                        </Button>
                    }
                </Box>
                <Box width='10%' overflow='hidden'>{isTitle ? postdate : (job_posting_time.split("T")[0])}</Box>
                <Box width='26%' overflow='hidden' textAlign='center'>
                    {note}
                </Box>
            </Box>
            {/* {showDetail && <JobCard job={item}/>} */}
        </Box>
    )
};