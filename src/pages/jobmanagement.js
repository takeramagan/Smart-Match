import { Container, Box, Button, Modal ,TextField, Select, FormControl , InputLabel} from "@material-ui/core"
import { Section } from "../components/Section"
import { h ,h1, h2} from'../constant/fontsize'
import mockdata from '../constant/mockReleasedJobs.json'
import { useCallback, useState } from 'react'
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { COLOR_TITLE } from "../constant/color"
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';


const ApplicantItem = ({item, isTitle, style, index}) => {
  const {name, apply_date, match,resume, resume_report}  = item
  return (

    <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
      <Box width='20%' overflow='hidden'>{name}</Box>
      <Box width='15%' overflow='hidden'>{apply_date}</Box>
      <Box width='10%' overflow='hidden' textAlign='center'>
        {isTitle && match}
        {!isTitle && `${match*100}%`}
      </Box>
      <Box width='10%' overflow='hidden' textAlign='center'>
        {isTitle && resume}
        {!isTitle && <Button target='_blakn' href={resume}><CloudDownloadIcon color="primary"/></Button>}
      </Box>
      <Box width='20%' overflow='hidden' textAlign='center'>
        {isTitle && resume_report}
        {!isTitle && <Button target='_blakn' href={resume_report}><CloudDownloadIcon color="primary"/></Button>}
      </Box>
      <Box width='25%' overflow='hidden' textAlign='center'>
        {isTitle && "Operation"}
      </Box>
    </Box>

  )

}

const  ApplicantsDetail = ({job}) => {
  const { id, status, link, post_date, modify_date, applicants, title } = job
  return (

    <Box style={{width:'80%', marginLeft:'auto', marginRight:'auto'}}>
      <Section >
        <Box mt={4} p={4}>
          <Box fontSize={h1} color={COLOR_TITLE}>
            {title}
          </Box>
        </Box>
      </Section>
      <Section >
        <Box p={4} mt={4}>
          <ApplicantItem 
          item={{name:"Name", apply_date:"Apply Date", match:'Match',resume:"Resume", resume_report:"Resume Analysis"}} 
          style={{fontWeight:600}}  isTitle/>
          {applicants.length === 0 && "No applicants Right now"}
          {applicants.map((item, i) => <ApplicantItem item={item} key={i} index={i}/>)}
        </Box>
      </Section>
    </Box>
)
}      

const JobDetail = ({job, index}) => {
  // let initJob = {status:0, link:"", post_date:"", applicants:[],title:"", modify_date:"", description:null, salary_start:null, salary_end:null}
  let initJob = {}
  const isNew = index === -1
  const { id, status, link, post_date, modify_date, applicants, title, description, salary_start, salary_end, job_type, note } =  isNew ? initJob:job

  // const [state, setState] = React.useState({
  //   age: '',
  //   name: 'hai',
  // });

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
        <form>
            <Box >
              <TextField id="title" label="Title" variant="outlined" value={title} size='small' style={{width: 300}}/>
            </Box>

            <Box mt={2}>
              <FormControl variant="outlined" >
              <InputLabel htmlFor="jobtype">Job type</InputLabel>
                <Select
                  style={{height:40}}
                  native
                  variant="outlined"
                  // value={state.age}
                  value={job_type}
                  onChange={handleChange}
                  label="Job type"
                  inputProps={{
                    name: 'age',
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
                  value={job_type}
                  onChange={handleChange}
                  label="Job status"
                  inputProps={{
                    name: 'age',
                    id: 'status',
                  }}
                >
                  {/* <option aria-label="None" value="" /> */}
                  <option value={0}>Applying</option>
                  <option value={1}>Closed</option>
                  <option value={2}>Filled</option>
                </Select>
              </FormControl>
            </Box>
            <Box mt={2}>
              Salary:
              <TextField id="salaryStart" label="From" variant="outlined" value={salary_start} size='small' style={{width:100, marginRight:10, marginLeft:10}} />
              <TextField id="salaryEnd" label="To" variant="outlined" value={salary_end} size='small' style={{width:100}}/>
            </Box>
            <Box mt={2}>
            <TextField id="note" label="Job Note" variant="outlined" rowsMax={5} rows={2} fullWidth
              multiline value={note}/>
            </Box>
            <Box mt={2}>
            <TextField id="description" label="Job Description" variant="outlined" rowsMax={15} rows={5} fullWidth
              multiline value={description}/>
            </Box>
            <Box mt={3}>
              <Button variant="contained" color="primary" style={{marginRight:10}}>Submit</Button>
              <Button variant="contained" color="primary">Cancel</Button>
            </Box>
          </form>
        </Box>
      </Section>
    </Box>
)
}


const CardItem = ({index, onShowJobDetail, onShowApplicants, item, style}) => {

  const { id, status, link, post_date, modify_date, applicants, title, edit, note } = item
  const job_status = status === 0 ? "Closed" : status === 1 ? "Accepting" : status === 2 ? "Filled" : status
  const numOfApplicants = index === undefined ? "Applicants" : applicants.length //标题没有index

  return(
    <Box>
      <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
        <Box width='8%' overflow='hidden'>{id}</Box>
        <Box width='20%' overflow='hidden'>{title}</Box>
        <Box width='10%' overflow='hidden' textAlign='center'>
          {/**index === undefined 表示list 的标题栏*/}
          {index === undefined  && numOfApplicants}
          {index !== undefined && 
            <Button onClick={() => onShowApplicants(index)} variant='contained' color='primary' style={{height:30, marginTop:10, marginBottom:10}}
            >{numOfApplicants}</Button>}
        </Box>
        <Box width='20%' overflow='hidden' textAlign='center'>{job_status}</Box>
        <Box width='8%' >
          {index === undefined && edit}
          {index !== undefined && 
          <Button onClick={() => onShowJobDetail(index)}>
            {/* {showDetail && <ExpandLessIcon/>} 
            {!showDetail && <ExpandMoreIcon/>}  */}
            <EditIcon color='primary'/>
          </Button>
          }
        </Box>
        <Box width='10%' overflow='hidden'>{post_date}</Box>
        <Box width='26%' overflow='hidden' textAlign='center'>
          {note}
        </Box>
      </Box>
      {/* {showDetail && <JobCard job={item}/>} */}
    </Box>
  )
}

const JobManagement = () => {
  const [showItem, setShowItem] = useState(-1) //-1表示没有
  const [showJobDetail, setShowJobDetail] = useState(false)
  const [showApplicants, setShowApplicants] = useState(false)

  const onShowJobDetail = (id) => {
    setShowItem(id)
    setShowJobDetail(true)
  }

  const showJobDetailCallback = useCallback((id) => onShowJobDetail(id),[])
  const showApplicantsCallback = useCallback((id) => onShowApplicants(id),[])

  const onShowApplicants = (id) => {
    setShowItem(id)
    setShowApplicants(true)
  }
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
          item={{id:"Id", title:"Job title", status:'Job status',post_date:"Post date", edit:"Edit job", note:"Note"}} 
            style={{fontWeight:600}}  key={-1}/>
          {mockdata.length === 0 && "No application history"}
          {mockdata.map((job, i) => 
            <CardItem 
              index={i} 
              item={job} 
              onShowJobDetail={showJobDetailCallback}
              onShowApplicants={showApplicantsCallback} 
              // showDetail={showItem === i} 
              key={i}/>
          )}
        </Box>
      </Section>
      <Modal open={showJobDetail || showApplicants} onClose={() => {setShowItem(-1); setShowJobDetail(false); setShowApplicants(false)}}>
        <>
        {showJobDetail && <JobDetail job={mockdata[showItem]} index={showItem}></JobDetail>}
        {showApplicants && <ApplicantsDetail job={mockdata[showItem]}></ApplicantsDetail>}
        </>
      </Modal>
    </Container>
  )
}

export default JobManagement