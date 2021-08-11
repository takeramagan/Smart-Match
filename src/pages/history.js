import { Container, Box, Button, Popover } from "@material-ui/core"
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect, useState } from 'react'
import { Section } from "../components/Section"
import { COLOR_TITLE, SECTION_BLUE } from "../constant/color";
import { h ,h1, h2} from'../constant/fontsize'
import mockdata from '../constant/mockApplyHistory.json'
import mockdataBf6 from '../constant/mockApplyHistory.json' // 6个月之前的数据
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import axios from "axios";
import { useRequest } from "../hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { hrHistoryAction } from "../slices/hrHistorySlice";

const JobCard = ({job}) => {
  const { jobid, job_status, joblink, apply_date, jobtitle,
    job_description, company, company_logo, application_status, feedback, job_salary
  } = job
  // const { view_date, download_date} = application_status
  return(
    <Box display='flex' flexDirection='row' color='white' bgcolor={SECTION_BLUE} p={2} 
      // borderRadius={10}
      // mb={2}
      >
      <img width={80} height={80} src={company_logo ?? 'defaultlogo.svg'} style={{borderRadius:15}}/>
      <Box ml={2} flexGrow={1}>
        <Box display='flex' flexDirection='row'>
          <Box width='30%'>
            <Box>Company: {company}</Box>
            <Box>Salary: {job_salary ?? 'Not disclosed'}</Box>
            <Box>Link: <a target='_blank' href={joblink}>Visit Job Link</a></Box>
          </Box>
          <Box display='flex' flexDirection='row'>
            Updates:
            <Box ml={2} display='flex' flexDirection='column'>
              <Box>2021-07-23: Job closed</Box>
              <Box>2021-07-10: Second round interview</Box>
              <Box>2021-06-25: You got a interview</Box>
              <Box>2021-06-21: Viewed</Box>
              <Box>2021-06-20: Applied</Box>
              </Box>
            </Box>
          </Box>
        
        {feedback && <Box>Feedback: {feedback}</Box>}
        {/* <Box>Description: {job_description}</Box> */}
      </Box>
    </Box>
    )
}

const CardItem = ({index, showDetail, onClick, item, style}) => {
  const onClickItem = () => {
    if(!showDetail) onClick(index)
    else onClick(-1)
  }
  const { jobid, status, joblink, apply_date, jobtitle, updates, latest_update,
    job_description, company, company_logo, application_status, feedback
  } = item

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    console.log("enter", event.currentTarget)
    if(index != undefined) setAnchorEl(event.currentTarget); //不是title
  };
  const handlePopoverClose = () => {
    console.log("leave")

    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return(
    <Box
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      my={1}
    >
      <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}

      >
        <Box width='10%' overflow='hidden'>{jobid}</Box>
        <Box width='30%' overflow='hidden'>{jobtitle}</Box>
        <Box width='20%' overflow='hidden'>{company}</Box>
        <Box width='15%' overflow='hidden'>{status}</Box>
        <Box width='20%' overflow='hidden'>{latest_update}</Box>
        <Box width='5%' >
        {/* {  index !== undefined && <Button onClick={onClickItem}>
          {showDetail && <ExpandLessIcon/>} 
          {!showDetail && <ExpandMoreIcon/>} 
          </Button>} */}
        </Box>
      </Box>
      {/* {showDetail && <JobCard job={item}/>} */}

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        // onClose={handlePopoverClose}
        disableRestoreFocus
        disableScrollLock
        style={{ 
          pointerEvents: 'none', 
        }}
      >
        <JobCard job={item}/>
      </Popover>

    </Box>
  )
}

/**
 * 6个月以前的记录
 * @param 
 * @returns 
 */
// const OldHistoryItem = ({item, style, isTitle, index}) => {
//   const onClickItem = () => {
//     if(!showDetail) onClick(index)
//     else onClick(-1)
//   }
//   const { jobid, status, joblink, apply_date, jobtitle,
//     job_description, company, company_logo, application_status, feedback
//   } = item

//   return(
//     <Box>
//       <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
//         <Box width='10%' overflow='hidden'>{jobid}</Box>
//         <Box width='30%' overflow='hidden'>{jobtitle}</Box>
//         <Box width='20%' overflow='hidden'>{company}</Box>
//         <Box width='10%' overflow='hidden'>{apply_date}</Box>
//         <Box width='15%' textAlign='center' >
//           {isTitle && 'Resume history'}
//           {!isTitle && <Box><Button><CloudDownloadIcon color='primary'/></Button></Box>
//           }
//         </Box>
//         <Box width='15%' textAlign='center'>
//           {isTitle && 'Analysis Report'}
//           {
//           !isTitle && <Box><Button><CloudDownloadIcon color='primary'/></Button></Box>
//           }
//         </Box>
//       </Box>
//       {/* {showDetail && <JobCard job={item}/>} */}
//     </Box>
//   )
// }




// const applicationHistory = (config) => {
//   return axios(config)
// }

const ApplyHistory = () => {
  const [showItem, setShowItem] = useState(-1)
  const onClick = (id) => {
    setShowItem(id)
  }

  const { currentPage, historyList } = useSelector(store => store.history)
  console.log("crr", currentPage, historyList)
  const dispatch = useDispatch()

  const {loading, requestHandler} = useRequest(true)
  const getData = async (isAppend = true) => {
    const config = {
      method: 'get',
      url: 'https://ai.smartmatch.app/chen/job.php?action=shuju&page=1&limit=30&hyid=1'
      // url: 'https://ai.smartmatch.app/chen/jobrecord.php?action=shuju&hyid=2'
    }

    const data = await requestHandler(config)
    console.log("get data", data.data)
    if(data.code === 0) dispatch(isAppend ? hrHistoryAction.addHistoryList(data.data) : hrHistoryAction.setHistoryList(data.data))
  }

  const postData = async () => {
    const data = new FormData();
    data.append('action', 'addjob');
    data.append('jobtitle', 'frontend developer');
    data.append('remuneration', '10-100');
    data.append('company', 'microsoft');
    data.append('note', '123');
    data.append('status', 'fi');
    data.append('joblink', 'www.baidu.com');
    data.append('hyid', 1);

    
    var config = {
      method: 'post',
      url: 'https://ai.smartmatch.app/chen/job.php',
      headers: { 
        // ...data.getHeaders()
      },
      data : data
    };

    const returnData = await requestHandler(config)
    console.log("post data", returnData)
  }

  useEffect(() => {
    getData(false)
  }, [])
  return(
    <Container 
      style={{ marginTop: 18}}
    >
      
      <Section>
        <Box p={4}>
          <Box fontSize={h} fontWeight='500' lineHeight='42px' color={COLOR_TITLE}>
            Application History
          </Box>
          <Box fontSize={h1} >
            Following are jobs you applied in 6 months
          </Box>
        </Box>

      </Section>
      <Section >
        <Box p={4} mt={4}>
          <CardItem 
          item={{jobid:"Id", jobtitle:"Job title", company: 'Company', status:'Job status',latest_update:"Application status"}} 
            style={{fontWeight:600}}  key={-1}/>
            {loading && "Loading"}
            {!loading && historyList.length === 0 && "No application history"}
            {!loading && historyList.map((job, i) => <CardItem index={i} item={job} onClick={onClick} showDetail={showItem === i} key={i}/>)}
        </Box>
      </Section>


      {/* <Section>
        <Box p={4} my={4}>
          <Box fontSize={h1} mb={2} fontWeight='500' color={COLOR_TITLE} flexGrow='1'>
            Jobs you applied 6 months ago
          </Box>
          <Box >
          <OldHistoryItem 
          item={{job_id:"Id", job_title:"Job title", job_company: 'Company', job_status:'Status',apply_date:"Apply date"}} 
            style={{fontWeight:600}}  isTitle/>
          {mockdataBf6.length === 0 && "No application history"}
          {mockdataBf6.map((job, i) => <OldHistoryItem index={i} item={job} onClick={onClick} showDetail={showItem === i} key={i}/>)}
        </Box>
        </Box>
      </Section> */}
    </Container>
  )
}

export default ApplyHistory