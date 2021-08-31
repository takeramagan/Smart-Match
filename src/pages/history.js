import { Container, Box, Button, Popover, Modal, makeStyles } from "@material-ui/core"
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
import { resumeStatusArray, RESUME_REJECTED } from "../constant/jobstatus";
import { InlineWidget } from "react-calendly";
import getUserId from "../untils/getUserId";
import { APP_END_POINT_B_AND_C, APP_END_POINT_CUSTOMER, X_API_KEY_B_AND_C, X_API_KEY_CUSTOMER } from "../constant/externalURLs";
import checkLink from "../untils/checkLink";
import { blue } from "@material-ui/core/colors";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  checkBtn:{
    height: 22,
    width: 60,
    borderRadius: 10,
    marginLeft: 10,
    color: blue,
  }
})


const JobCard = ({job, feedback}) => {
  const { jobid, job_status, joblink, apply_date, jobtitle,
    job_description, company, company_logo, application_status, salary_low, salary_high, updates
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
          <Box>
            <Box>Company: {company}</Box>
            <Box>Salary: {salary_low ?  `$${salary_low} to $${salary_high}` : 'Not disclosed'}</Box>
            {/* <Box>Link: <a target='_blank' href={joblink}>Visit Job Link</a></Box> */}
          </Box>
          <Box display='flex' flexDirection='row' ml={4}>
            Updates:
            <Box ml={2} display='flex' flexDirection='column'>
              {/* {//sample
                !updates.length && <> 
                  <Box>2021-07-23: Job closed</Box>
                  <Box>2021-07-10: Second round interview </Box>
                  <Box>2021-06-25: You got a interview</Box>
                  <Box>2021-06-21: Viewed</Box>
                  <Box>2021-06-20: Applied</Box>
                </>
              } */}
              {
                updates && updates?.map(({time, action}) => {
                  const {action: actionType, info, description} = JSON.parse(action)
                  if(!time || actionType < 0 || actionType > resumeStatusArray.length) 
                    return null
                  else
                    return(<Box key={time}>{time.split('T')[0]}: {resumeStatusArray[actionType] ?? actionType}
                    {" "}
                    {!!description&&description}
                    </Box>)
                })
              }
              </Box>
            </Box>
          </Box>
        
        {feedback && <Box>Feedback: {feedback}</Box>}
        {/* <Box>Description: {job_description}</Box> */}
      </Box>
    </Box>
    )
}

const CardItem = ({index, showDetail, onClick, item={}, style}) => {
  const onClickItem = () => {
    if(!showDetail) onClick(index)
    else onClick(-1)
  }
  const { job_id, status, job_link, apply_date, job_title, updates, latest_update,
    job_description, company_name, company_logo
  } = item

  const isTitle = (index === undefined)
  const { action:applicationStatus, info, description} = (!isTitle && updates.length )? JSON.parse(updates[0].action) : {}
  const feedback = (applicationStatus === RESUME_REJECTED) ? info : null
  console.log("feedback", feedback)

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    console.log("enter", event.currentTarget)
    if(!isTitle) setAnchorEl(event.currentTarget); //不是title
  };
  const handlePopoverClose = () => {
    console.log("leave")

    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [showModal, setShowModal] = useState(false)
  const onCloseModal = () => {
    setShowModal(false)
  }

  const onShowModal = () => {
    setShowModal(true)
    handlePopoverClose() 
  }
  const styles = useStyles()

  const ApplicantStatus = ({text, info}) => {
    const link = info?.trim()
    const isValidLink = checkLink(link)
    const isCalendly = link?.startsWith('https://calendly.com/')
    return (
    <>
      {text}
      {isValidLink && isCalendly && <Button onClick={onShowModal} variant='contained' color='primary' className={styles['checkBtn']}>Check</Button>}
      {isValidLink && !isCalendly && <Button target='_blank' href={info} variant='contained' color='primary' className={styles['checkBtn']}>Check</Button>}
      <Modal open={showModal} onClose={onCloseModal} > 
        <Box mt={4} width={600} marginLeft='auto' marginRight='auto'>
          <InlineWidget url={info} />
        </Box>
      </Modal>
    </>)
  }

  const getJobStatus = (i) => {
    //0:accepting 1:closed 2:filled
    if(i === 0) return 'Accepting'
    else if(i === 1) return  'Closed'
    else if(i === 2) return 'Filled'
    else return 'Closed' 
  }

  return(
    <Box
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      my={1}
    >
      <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}

      >
        <Box width='10%' overflow='hidden'>{isTitle ? "Id" : job_id ?? 0}</Box>
        <Box width='15%' overflow='hidden'>{isTitle ? "Job title": job_link ? <a target='_blank' href={job_link}>{job_title}</a> : job_title ?? <a target='_blank' href='https://www.google.com'>Sample Company</a>}</Box>
        <Box width='10%' overflow='hidden'>{isTitle ? 'Company': company_name ?? "Sample Company"}</Box>
        <Box width='15%' overflow='hidden'>{isTitle ? 'Job status': getJobStatus(status ?? 0)}</Box>
        <Box width='20%' overflow='hidden'>{isTitle ? "Application status" : <ApplicantStatus text={resumeStatusArray[applicationStatus]} info={info}/>}</Box>
        <Box width='30%' >
        {/* {  index !== undefined && <Button onClick={onClickItem}>
          {showDetail && <ExpandLessIcon/>} 
          {!showDetail && <ExpandMoreIcon/>} 
          </Button>} */}
          {!isTitle && description}
          {isTitle && "Info"}
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
        <JobCard job={item} feedback={feedback}/>
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
  // const userId = getUserId()
  const params = useRouter().query
  const email = params.email
  console.log("email history= ", email)
  const getData = async (isAppend = true) => {
    const formData = new FormData()
    formData.append('email', email ?? 'test@gmail.com')
    formData.append('dcc', X_API_KEY_CUSTOMER)
    const config = {
      method: 'post',
      url:  APP_END_POINT_CUSTOMER + 'get_all_applications',
      data: formData
    }

    const data = await requestHandler(config)
    console.log("get data", data)
    if(data.applicants_info_list) dispatch(isAppend ? hrHistoryAction.addHistoryList(data.applicants_info_list) : hrHistoryAction.setHistoryList(data.applicants_info_list))
  }

  // const postData = async () => {
  //   const data = new FormData();
  //   data.append('action', 'addjob');
  //   data.append('jobtitle', 'frontend developer');
  //   data.append('remuneration', '10-100');
  //   data.append('company', 'microsoft');
  //   data.append('note', '123');
  //   data.append('status', 'fi');
  //   data.append('joblink', 'www.baidu.com');
  //   data.append('hyid', 1);

    
  //   var config = {
  //     method: 'post',
  //     url: 'https://ai.smartmatch.app/chen/job.php',
  //     headers: { 
  //       // ...data.getHeaders()
  //     },
  //     data : data
  //   };

  //   const returnData = await requestHandler(config)
  //   console.log("post data", returnData)
  // }

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
            istitle
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