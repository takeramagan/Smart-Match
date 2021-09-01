import { Container, Box, Button, Modal ,TextField, Select, FormControl , InputLabel, 
  Dialog, DialogActions, DialogTitle,DialogContent, DialogContentText, Chip, makeStyles, MenuItem  } from "@material-ui/core"
import { Section } from "../components/Section"
import { h ,h1, h2} from'../constant/fontsize'
import mockdata from '../constant/mockReleasedJobs.json'
import { useCallback, useEffect, useState } from 'react'
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { COLOR_TITLE } from "../constant/color"
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux"
import { checkStatus, useRequest } from "../hooks/useRequest"
import { hrHistoryAction } from "../slices/hrHistorySlice"
import { useRouter } from "next/router"
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import { InlineWidget } from "react-calendly";
import { RESUME_ANALYSIS_VIEWED, RESUME_INVITE, RESUME_REJECTED, RESUME_VIEWED } from "../constant/jobstatus"
import { APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C } from "../constant/externalURLs"
import { v4 as uuidv4 } from 'uuid';
import getUserId from "../untils/getUserId"
import checkLink from "../untils/checkLink"
import { resumeHrStatusArray, JOB_STATUS } from "../constant/jobstatus"
import { async } from "regenerator-runtime"

// const useStyles = makeStyles({
//   rejectReasonContainer: {
//     "&:hover":{
//       cursor: 'pointer'
//     }
//   },
// })



const Operations = ({applicantId, jobId, onReject, email}) => {
  const [showRejectReason, setShowRejectReason] = useState(false)
  const rejectReasonOptions = [ "工作技能不匹配", "工作经历不匹配", "项目经验太少", "简历格式混乱", "简历逻辑不清", "长得不够帅"]
  const [rejectReasons, setRejectReasons] = useState(0) //bit indicates selected or not
  const [otherReason, setOtherReason] = useState("")
  const [otherBlur, setOherBlur] = useState(false)
  const [inviteLink, setInviteLink] = useState("")
  const [inviteBlur, setInviteBlur] = useState(false)
  // const styles = useStyles()

  const [showInvite, setShowInvite] = useState(false)
  const operatonRequest = useRequest()
  const params = useRouter().query
  const hrId = params.id ?? 1

  /**
   * 
   * @param {k:v} data :
   * @param {number} application_status 0: default value 1: resume rejected
   * @returns 
   */
  const getOperationconfig = (data, application_status=0) => { 
    // const formdata = new FormData
    // formdata.append('action', 'addrecord')
    // formdata.append('jobid', jobId ?? 0) //0代替
    // formdata.append('hrid', hrId ?? 0)
    // formdata.append('hyid', applicantId ?? 0) //0 代替
console.log("jbid=", jobId, 'hrid=', hrId, 'hyid', applicantId)
    // Object.entries(data).forEach(([k,v]) =>{console.log(k, v); formdata.append(k, v)})
  console.log("data", data)
  const formData = new FormData()
  formData.append('userid', applicantId ?? 20)
  formData.append('email', email)
  formData.append('hrid', hrId)
  formData.append('jobid', jobId ?? 1)
  formData.append('dcc', X_API_KEY_B_AND_C)
  formData.append('updates', JSON.stringify(data))
  formData.append('application_status', application_status) //0: default state 1: reject
console.log("application status= ", application_status)
  // application_status !== 1 ?? formData.append('invite_description', inviteDescrition) //0: default state 1: reject
  return ({
    method: 'post',
    url: APP_END_POINT_B_AND_C + 'update_application',
    data: formData
  })
}

  const rejectReasonToString = () => {
    let reason = []
    for(let i=0; i<rejectReasonOptions.length; i++){
      if(rejectReasons & (1 << i)){
        reason = [...reason, rejectReasonOptions[i]]
        console.log(reason)
  
      }
    }

    if(otherReason) reason = [...reason, otherReason]
    return reason.join(" ")
  }

  const onCloseModal = () => {
    setShowRejectReason(false)
    setOherBlur(false)
  }

  const checkReasons = () => (otherReason.trim() || rejectReasons)

  const onSubmit = async () => {
    if(!checkReasons()) {
      setOherBlur(true)
    }else{

      try{
        const rejectReason = rejectReasonToString()
        console.log("reject reason", rejectReason)
        // const status = JSON.stringify()
        const resp = await operatonRequest.requestHandler(getOperationconfig({action: RESUME_REJECTED, info: rejectReason}, 1))
    console.log("reject = ", resp)
        if(resp.status === 'success'){
          onReject()
          onCloseModal()
          console.log("reject succ")
        }else{
          console.log("reject error")
        }
      }catch(e){
        console.error("error while reject")
        console.error(e)
      }
      console.log(otherReason)
    }
  }

  const onSelectReason = (i) => {
    setRejectReasons(v => {return ( v ^ (1 << i))}) //对应该位取反
  }

  const onOtherReason = (e) => {
    setOtherReason(e.target.value)
  }

  // const checkLink = (link) => {
  //   return link.trim().match(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
  // }
  
  const onSubmitInvite = async () => {
    if(!checkLink(inviteLink) || !(checkDescrition(inviteDescrition))) {
      setInviteBlur(true)
      setDescBlur(true)
      console.log("false")
    }else{

      try{
        // const status = JSON.stringify({status: RESUME_INVITE, info: inviteLink.trim()})
        await operatonRequest.requestHandler(getOperationconfig({action: RESUME_INVITE, info: inviteLink.trim(),
        description: inviteDescrition
        }))
        onCloseInviteModal()
      }catch(e){
        console.error("error while submit link")
      }
    }
  }

  const onCancelInvite = () => {
    onCloseInviteModal()
  }

  const onCloseInviteModal =() => {
    setShowInvite(false)
    setInviteBlur(false)
  }

  const [inviteDescrition, setInviteDescrition] = useState()
  const [descBlur, setDescBlur] = useState(false)
  const onChangeLink = (e) => {
    setInviteLink(e.target.value.trim())
  }
  const onChangeDescription = (e) => setInviteDescrition(e.target.value)
  const checkDescrition = (description) => (description?.trim())

  return(
    <Box> 
      <Button onClick={() => setShowInvite(true)}>Invite <GroupAddIcon color="primary"/></Button>
      <Button onClick={() => setShowRejectReason(true)}>Reject <CloseIcon color="error" /></Button>
      <Modal open={showInvite} onClose={onCloseInviteModal}>
        <Box mt={10} ml='auto' mr='auto' width="80%" >
          <Section >
            <Box p={4}>
              {/* <InlineWidget url="https://calendly.com/176237421/interview" /> */}
              {/* <InlineWidget url="https://calendly.com/acmesales" /> */}
              Please generate your invite link via <a href='http://calendly.com' target='_blank'
              >Calendly</a> , <a href='https://calendar.google.com/' target='_blank'>Google calendar</a> or other tools and paste your link below<TextField placeholder='Paste your invite link here'
                onChange={onChangeLink} 
                fullWidth value={inviteLink} 
                onBlur={() => setInviteBlur(true)}
              />
              <ErrorText visible={(inviteBlur && !checkLink(inviteLink))} text='Please enter a valid invite link: http(s)://...'/>
              <TextField 
                label="Invitation description" variant="outlined"
                placeholder='Please enter your description about this invitation'
                onChange={onChangeDescription} 
                fullWidth value={inviteDescrition}
                multiline
                rows={2}
                rowsMax={4} 
                onBlur={() => setDescBlur(true)}
              />
              <ErrorText visible={(descBlur && !checkDescrition(inviteDescrition))} text='Description is empty'/>
              <SubmitAndCancel onSubmit={onSubmitInvite} onCancel={onCancelInvite} />
            </Box>
          </Section>
        </Box>
      </Modal>
      <Modal open={showRejectReason} onClose={onCloseModal}>
        <Box mt={10} ml='auto' mr='auto' width='60%'>
          <Section >
            <Box p={4}>
              <Box fontSize={h2} color={COLOR_TITLE}>Choose the reason</Box>
              <Box mt={2} display='flex' flexWrap="wrap" style={{maxWidth:'100%'}}>
                  { rejectReasonOptions.map((v,i) => 
                    <Chip
                      clickable
                      onClick={() => onSelectReason(i)}
                      key={v}
                      label={v} style={{
                      marginRight: 18,
                      color: (rejectReasons >> i & 1) ? '#ffffff' : 'black',
                      backgroundColor: (rejectReasons >> i & 1) ? COLOR_TITLE :'#ffffff',
                      filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                      margin: '8px 4px',
                      overflowAnchor:"auto",
                      }}
                    />

                  )}

              </Box>
              <Box display='flex' alignItems='center'>
                Other: 
                <TextField fullWidth id='otherreason'  
                  value={otherReason}
                  onChange={onOtherReason} 
                  onBlur={() =>setOherBlur(true)}
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
}

const ApplicantItem = ({applicant, isTitle, style, index, jobid, onReject}) => {
  const {name, application_time: apply_date, matching_level: match,resume, resume_report, user_id, resume_link, report,
    updates, hr_id, job_id, email}  = applicant
  const { action, time } = updates?.length ? updates[0] : {}
  const { action:actionType, info, description } = action ? JSON.parse(action) : {}
  const resumeRequest = useRequest()

  const updateResumeStatus = async (status) => {
    if(actionType >= RESUME_REJECTED) return 
    try{
      const formData = new FormData()
      formData.append('userid', user_id ?? 20)
      formData.append('hrid', hr_id)
      formData.append('jobid', job_id ?? 1)
      formData.append('dcc', X_API_KEY_B_AND_C)
      formData.append('updates', JSON.stringify({action: status}))
      const config = {
        method: 'post',
        url: APP_END_POINT_B_AND_C + 'update_application',
        data: formData
      }
      await resumeRequest.requestHandler(config)
    }catch(e){
      console.log("view resume error")
    }
  }

  const onViewResume =  () => updateResumeStatus(RESUME_VIEWED) // 1: viewed
  const onViewReport = async () => updateResumeStatus(RESUME_ANALYSIS_VIEWED) // 2: report viewed


  return (

    <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
      <Box width='10%' overflow='hidden'>{name}</Box>
      <Box width='15%' overflow='hidden'>{apply_date?.split('T')[0]}</Box>
      <Box width='5%' overflow='hidden' textAlign='center'>
        {isTitle && match}
        {!isTitle && `${match}%`}
      </Box>
      <Box width='10%' overflow='hidden' textAlign='center'>
        {isTitle && resume}
        {!isTitle && <Button target='_blank' href={resume_link} onClick={onViewResume}><CloudDownloadIcon color="primary"/></Button>}
      </Box>
      <Box width='10%' overflow='hidden' textAlign='center'>
        {isTitle && resume_report}
        {!isTitle && <Button target='_blank' href={`/report?hrid=${hr_id}&jobid=${job_id}&index=${index}`} onClick={onViewReport}><CloudDownloadIcon color="primary"/></Button>}
      </Box>
      <Box width='25%' overflow='hidden' textAlign='center'>
        {isTitle && "Operation"}
        {!isTitle && <Operations applicantId={user_id} jobId={jobid} onReject={onReject} email={email}/>}
      </Box>
      <Box width='25%' overflow='hidden' textAlign='center'>
        {isTitle && "Note"}
        {!isTitle && ((actionType >=0 ? `${resumeHrStatusArray[actionType]}` : '') + (description ? `: ${description}` : ''))}
      </Box>
    </Box>

  )

}

const SubmitAndCancel = ({onSubmit, onCancel, disableSbumit}) => {

  return (
    <Box mt={3}>
      <Button variant="contained" color="primary" disabled={disableSbumit} style={{marginRight:10}} onClick={onSubmit} type="submit">Submit</Button>
      <Button variant="contained" color="primary" onClick={onCancel}>Cancel</Button>
    </Box>
  )
}

const ErrorText = ({visible, text}) => {
  return(
    <Box display='flex' alignItems='center' color="red" mt={2}>
      {visible && text}
    </Box>
  )
}

const addApplicantSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  email: yup.string().email("Invalid email").required('Email is required'),
  joblink: yup.string().required('Job link is required').test('match', 'Not a valid link(eg: http(s)://google.com)', function(v){
    return checkLink(v)
  }),
  company: yup.string().required('Company name is required'),
})
const AddApplicant = ({job, onCancel}) => {
  const { requestHandler } = useRequest()
  const submitData = async ({email, name, joblink, company}) => {
    console.log('email', email, name, joblink, company)
    console.log('job', job)
    try{
      const data = new FormData()
      data.append('email', email); //mock data
      data.append('name', name); //mock data
      data.append('jobid', job.job_id);
      data.append('joblink', joblink);
      data.append('hrid', job.hr_id); //mock data
      data.append('company_name', company);
      data.append('dcc', X_API_KEY_B_AND_C);
 console.log(
   {
    email, name, jobid:job.job_id, joblink, hrid:job.hr_id, company_name:company, dcc:X_API_KEY_B_AND_C
   }
 )
      const config = {
        method: 'post',
        url: APP_END_POINT_B_AND_C + ('insert_application'),
        data : data
      }
      const result = await requestHandler(config)
      console.log("applicant", result)
      if(result.status === 'success') { //这里返回值 没有status code... T_T
        onCancel()
      }

    }catch(e){
      console.log("insert error", e)
      alert('User has applied this job, or hasnot uploaded resume. please check the email')
    }
  }
  const formik = useFormik({
    initialValues: {
      name:  "",
      email: "",
      joblink: "",
      company:""
    },
    validationSchema: addApplicantSchema,
    onSubmit: (values) => {
      submitData(values)
    },
  });
  return(
  <Box style={{width:360, marginLeft:'auto', marginRight:'auto'}}>
 
       <Section >

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
            <SubmitAndCancel  onCancel={onCancel}/>
          </form>
          </Box>
          </Section>
  </Box>)
}

const  ApplicantsDetail = ({job}) => {
  const { job_id, status, post_date, modify_date, applicants, jobtitle } = job
  // let applicantList = applicants
  // if(typeof(applicants) !== "object") applicantList = []
  const [applicantList, setApplicantList] = useState([])
  const hrid = getUserId()
  const { requestHandler } = useRequest()
console.log('job', job)
  const onReject = (index) => {
    return setApplicantList([...applicantList.slice(0, index), ...applicantList.slice(index+1)])
  }

  useEffect(async ()=>{
    try{
      const data = new FormData()
      data.append('hrid', hrid ?? 1); //mock data
      data.append('jobid', job_id);
      data.append('dcc', X_API_KEY_B_AND_C);
console.log('hrid= ', hrid, 'jobid= ', job_id)
      const config = {
        method: 'post',
        url: APP_END_POINT_B_AND_C + ('get_all_applications'),
        data : data
      }
      const result = await requestHandler(config)
      console.log("applicant", result.applicants_info_list)
      console.log("applicant", result)
      if(!result.status) { //这里返回值 没有status code... T_T
        // if(result.status === 'success') {
        console.log("get applicants succcess")
        setApplicantList(result.applicants_info_list.sort((a, b)=> (b.matching_level - a.matching_level)))
      }else{
        console.log("get applicants error")
      }
    }catch(e){
      console.log("error get applicants")
    }
  }, [])
  return (
    <Box mt={4} style={{width:'80%', marginLeft:'auto', marginRight:'auto'}}>
      <Section >
        <Box mt={4} p={4}>
          <Box fontSize={h1} color={COLOR_TITLE}>
            {jobtitle}
          </Box>
        </Box>
      </Section>
      <Section >
        <Box p={4} mt={4}>
          <ApplicantItem 
          applicant={{name:"Name", application_time:"Apply Date", matching_level:'Match',resume:"Resume", resume_report:"Resume Analysis"}} 
          style={{fontWeight:600}}  isTitle/>
          {(applicantList?.length === 0) && "No applicants Right now"}
          {applicantList?.map((item, i) => 
            <ApplicantItem applicant={item} key={i} index={i} jobid={job_id} onReject={() => onReject(i)}/>)}
        </Box>
      </Section>
    </Box>
)
}      


const validationSchema = yup.object({
  title: yup
    .string()
    .required('Job title is required'),
  salary_start: yup
    .number().integer("Integer only").moreThan(0, "Should > 0")
    .required("Required"),
  salary_end: yup
    .number().integer("Integer only").min(yup.ref('salary_start'), "To >= From")
    .required("Required"),
  description: yup
    .string()
    .required('Job description is required'),
  note: yup
    .string(),
  jobtype: yup.number(),
  status: yup.number()
});

//Edit or add Job
const JobDetail = ({job, index, closeModal, updatePage, hrid}) => {
  // let initJob = {status:0, link:"", post_date:"", applicants:[],title:"", modify_date:"", description:null, salary_start:null, salary_end:null}
  let initJob = {}
  const isNew = index === -1
  const { job_id: jobid, status, link, post_date, modify_date, applicants, jobtitle:title, description, salarylow: salary_start, salaryhigh: salary_end, job_type, note } =  isNew ? initJob:job
  const [openConfirmDlg, setOpenConfirmDlg] = useState(false) //open confirm dialog

  const formik = useFormik({
    initialValues: {
      title: title ?? "",
      salary_start: salary_start > 0 ? salary_start : 0,
      salary_end: salary_end > 0 ? salary_end : 0,
      note: note ?? "",
      description: description ?? "",
      jobtype: (job_type >=0 && job_type <=2) ? job_type : 0,//0:full time 1:contract 2:part
      status: parseInt(status),//0:accepting 1:closed 2:filled
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      submitData(values)
    },
  });

  const { requestHandler } = useRequest()
  const submitData = async (values) => {
    try{
      const data = new FormData()
      // data.append('action', isNew ? 'addjob' : 'editjob');
      // if(!isNew) data.append('jobid', jobid )
      data.append('jobtitle', values.title);
      data.append('salarylow', values.salary_start);
      data.append('salaryhigh', values.salary_end);
      data.append('company', 'microsoft');
      data.append('note', values.note);
      data.append('hrid', hrid ?? 1); //mock data
      data.append('jobstatus', values.status);
      data.append('description', values.description);
      data.append('joblink', 'www.baidu.com');
      data.append('jobtype', values.jobtype);
      data.append('dcc', X_API_KEY_B_AND_C);
      data.append('jobid',isNew ? uuidv4() : jobid);
      const config = {
        method: 'post',
        url: APP_END_POINT_B_AND_C + (isNew ? 'publish_job_posting' : 'update_job_posting'),
        data : data
      }
      const result = await requestHandler(config)

      console.log("submit result", result)
      if(result.status === 'success') {
        console.log("Submit succcess")
        updatePage()
        closeModal()
      }else{
        console.log("data error submit")
      }
    }catch(e){
      console.log("error submit")
    }
  }

  const equals = (init, cur) => {
    for(const [k, v] of Object.entries(init)){
      if(v != cur[k]) return false
    }
    return true
  }

  const onClickCancel = () => {
    if(equals(formik.initialValues, formik.values)){
      console.log("close ")
      closeModal()
    }else{
      console.log("not equal ")
      //open confirm dialog
      setOpenConfirmDlg(true)
    }
  }

  const onCloseDlg = () => {
    setOpenConfirmDlg(false)
  }

  const handleChange = (event) => {
    const name = event.target.name;
    // setState({
    //   ...state,
    //   [name]: event.target.value,
    // });
  };
  return (

    <Box style={{width:'80%', marginLeft:'auto', marginRight:'auto'}}>
      <Section >
        <Box mt={4} p={4}>
          <Box fontSize={h1} color={COLOR_TITLE}>
            {isNew? "Post New Job" : "Edit Job"}
          </Box>
        </Box>
      </Section>
      <Section >
        <Box p={4} mt={4} fontSize={h2}>
        <form onSubmit={formik.handleSubmit}>
            <Box >
              <TextField id="title" label="Job title" variant="outlined" size='small' name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                style={{width: 300}}/>
            </Box>

            <Box mt={2}>
              <FormControl variant="outlined" >
              <InputLabel htmlFor="jobtype">Job type</InputLabel>
                <Select
                  style={{height:40}}
                  native
                  variant="outlined"
                  // value={state.age}
                  value={formik.values.jobtype}
                  onChange={formik.handleChange}
                  label="Job type"
                  inputProps={{
                    name: 'jobtype',
                    id: 'jobtype',
                  }}
                >
                  {/* <option aria-label="None" value="" /> */}
                  <option value={0}>Fulltime</option>
                  <option value={1}>Contract</option>
                  <option value={2}>Part-time</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" style={{marginLeft:10}}>
              <InputLabel htmlFor="status">Job Status</InputLabel>
                <Select
                  style={{height:40}}
                  native
                  variant="outlined"
                  // value={state.age}
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  defaultValue={formik.values.status}
                  label="Job status"
                  inputProps={{
                    name: 'status',
                    id: 'status',
                  }}
                >
                  {/* <option aria-label="None" value="" /> */}
                  <option  value={0}>Accepting</option >
                  <option  value={1}>Closed</option >
                  <option  value={2}>Filled</option >
                </Select>
              </FormControl>
            </Box>
            <Box mt={2}>
              Salary:
              <TextField id="salary_start" label="From" variant="outlined" size='small' type='number'
                value={formik.values.salary_start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.salary_start && Boolean(formik.errors.salary_start)}
                helperText={formik.touched.salary_start && formik.errors.salary_start}
                style={{width:100, marginRight:10, marginLeft:10}} />
              <TextField id="salary_end" label="To" variant="outlined" size='small' type='number'
                style={{width:100}}
                onBlur={formik.handleBlur}
                value={formik.values.salary_end}
                onChange={formik.handleChange}
                error={formik.touched.salary_end && Boolean(formik.errors.salary_end)}
                helperText={formik.touched.salary_end && formik.errors.salary_end}
              />
            </Box>
            <Box mt={2}>
            <TextField id="note" label="Job Note" variant="outlined" rowsMax={5} rows={2} fullWidth multiline 
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            </Box>
            <Box mt={2}>
            <TextField id="description" label="Job Description" variant="outlined" rowsMax={15} rows={5} fullWidth
              multiline 
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)} 
              helperText={formik.touched.description && formik.errors.description}
            />
            </Box>
            <SubmitAndCancel  onCancel={onClickCancel}/>
            {/* <Box mt={3}>
              <Button variant="contained" color="primary" style={{marginRight:10}} type="submit">Submit</Button>
              <Button variant="contained" color="primary" onClick={onClickCancel}>Cancel</Button>
            </Box> */}
          </form>
        </Box>
      </Section>

      <Dialog
        open={openConfirmDlg}
        onClose={onCloseDlg}
      >
        <DialogTitle >{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
              Discard modification?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDlg} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>{onCloseDlg(); closeModal()}} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
)
}


const CardItem = ({index, onShowJobDetail, onShowApplicants, item, style, isTitle, onAddApplicant}) => {

  const { job_id:id, jobstatus:status, link, job_posting_time, postdate, modify_date, applicants, jobtitle: title, edit, note } = item
  //0:accepting 1:closed 2:filled
  const job_status  = (status >= 0 && status < JOB_STATUS.length ) ? JOB_STATUS[status]: status
  const numOfApplicants = isTitle ? "Applicants" : (applicants ?? 0) //标题没有index

  return(
    <Box>
      <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
        {/* <Box width='8%' overflow='hidden'>{isTitle ? 'Job ID' : id}</Box> */}
        <Box width='20%' overflow='hidden'>{title}</Box>
        <Box width='15%' overflow='hidden' textAlign='center'>
          {/**index === undefined 表示list 的标题栏*/}
          {isTitle  && numOfApplicants}
          {!isTitle && 
            <Box display='flex' flexDirection='row' width='100%' justifyContent='space-evenly'>
            <Button 
              disabled={numOfApplicants === 0}
              onClick={() => onShowApplicants(index)} variant='contained' color='primary' style={{height:30, marginTop:10, marginBottom:10}}
            >{numOfApplicants}</Button>
            <Button variant='contained' color='primary' style={{height:30, marginTop:10, marginBottom:10}} onClick={onAddApplicant}>Add</Button>
            </Box>}
        </Box>
        <Box width='20%' overflow='hidden' textAlign='center'>{isTitle ? "Job status" : job_status}</Box>
        <Box width='8%' >
          {isTitle && edit}
          {!isTitle && 
          <Button onClick={() => onShowJobDetail(index)}>
            {/* {showDetail && <ExpandLessIcon/>} 
            {!showDetail && <ExpandMoreIcon/>}  */}
            <EditIcon color='primary'/>
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
}

const JobManagement = () => {
  const [showItem, setShowItem] = useState(-1) //index in Job list, -1表示没有 
  const [showJobDetail, setShowJobDetail] = useState(false)
  const [showApplicants, setShowApplicants] = useState(false)
  const hrHistory = useSelector(store => store.history)
  const currentPage = hrHistory.currentPage
  const hrHistoryList = hrHistory.historyList
  const params = useRouter().query
  const hrId = params.id
console.log('hrid1 = ', params.id, hrId )
  const onShowJobDetail = (id) => {
    setShowItem(id)
    setShowJobDetail(true)
  }

  const [showAddApplicant, setShowAddApplicant] = useState(false)
  const onAddApplicant = (index) => {
    setShowAddApplicant(true)
    setShowItem(index)
  }

  const showJobDetailCallback = useCallback((id) => onShowJobDetail(id),[])
  const showApplicantsCallback = useCallback((id) => onShowApplicants(id),[])

  const onShowApplicants = (id) => {
    setShowItem(id)
    setShowApplicants(true)
  }

  const closeModal = () => {
    setShowItem(-1);
    setShowJobDetail(false); 
    setShowApplicants(false)
    setShowAddApplicant(false)
  }

  const onClose = () => { 
    if(showJobDetail){ //在jobmodal 里面自己控制关闭
      console.log(showJobDetail)
    }else{
      closeModal()
    }
  }

  //fetch data
  const dispatch = useDispatch()
  const getHrHistory = useRequest()
  const getData = async () => {
    const data = new FormData()
    data.append('dcc', X_API_KEY_B_AND_C)
console.log('hrid2= ', hrId)
    data.append('hrid', hrId)
    const config = {
      method: 'post',
      url: APP_END_POINT_B_AND_C + 'get_all_job_postings',
      data: data
    }
    try{
      const data = await getHrHistory.requestHandler(config)
      console.log("get data", data.job_postings)
      if(data.job_postings) dispatch(hrHistoryAction.setHistoryList(data.job_postings))
    }catch(e){
      console.error("error happen while fetching posted jobs", e)
    }
  }

console.log("hr", hrHistoryList)

  useEffect(()=>{
    if(hrId) getData()
  }, [hrId])

  return(
    <Container 
      style={{ marginTop: 18}}
    >
      <Section>
        <Box p={4}>
          <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
            Job Managements
          </Box>
          <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
            <Box fontSize={h1} >
              Following are jobs you posted within 6 months
            </Box>
            <Button onClick={()=>{onShowJobDetail(-1)}} color='primary' variant='contained' style={{borderRadius:20}}>Post Job</Button>
          </Box>
        </Box>

      </Section>

      <Section >
        <Box p={4} mt={4}>
          <CardItem 
          item={{jobid:"Id", jobtitle:"Job title", status:'Job status',postdate:"Post date", edit:"Edit job", note:"Note"}} 
            style={{fontWeight:600}}  key={-1} isTitle/>
          {hrHistoryList.length === 0 && "No application history"}
          {hrHistoryList.map((job, i) => 
            <CardItem 
              index={i} 
              item={job} 
              onShowJobDetail={showJobDetailCallback}
              onShowApplicants={showApplicantsCallback} 
              onAddApplicant={() =>onAddApplicant(i)}
              // showDetail={showItem === i} 
              key={i}/>
          )}
        </Box>
      </Section>
      <Modal open={showJobDetail || showApplicants} onClose={onClose}>
        <>
        {showJobDetail && <JobDetail job={hrHistoryList[showItem]} index={showItem} closeModal={closeModal} updatePage={getData} hrid={hrId}></JobDetail>}
        {showApplicants && <ApplicantsDetail job={hrHistoryList[showItem]}></ApplicantsDetail>}
        </>
      </Modal>
      <Modal open={showAddApplicant} onClose={closeModal}>
        <AddApplicant job={hrHistoryList[showItem]} onCancel={closeModal}/>
      </Modal>
    </Container>
  )
}

export default JobManagement