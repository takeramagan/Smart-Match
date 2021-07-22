import { Container, Box, Button } from "@material-ui/core"
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react'
import { Section } from "../components/Section"
import { COLOR_TITLE, SECTION_BLUE } from "../constant/color";
import { h ,h1, h2} from'../constant/fontsize'
import mockdata from '../constant/mockApplyHistory.json'
import mockdataBf6 from '../constant/mockApplyHistory.json' // 6个月之前的数据
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


const JobCard = ({job}) => {
  const { job_id, job_status, job_link, apply_date, job_title,
    job_description, job_company, company_logo, application_status, comments, job_salary
  } = job
  const { view_date, download_date} = application_status
  return(
    <Box display='flex' flexDirection='row' color='white' bgcolor={SECTION_BLUE} py={1} pl={1} borderRadius={10} mb={2}>
      <img width={80} height={80} src={company_logo ?? 'defaultlogo.svg'} style={{borderRadius:15}}/>
      <Box ml={2} flexGrow={1}>
        <Box display='flex' flexDirection='row'>
          <Box width='30%'>
            <Box>Company: {job_company}</Box>
            <Box>Salary: {job_salary ?? 'Not disclosed'}</Box>
            <Box>Link: <a target='_blank' href={job_link}>Visit Job Link</a></Box>
          </Box>
          <Box display='flex' flexDirection='row'>
            History:
            <Box ml={2} display='flex' flexDirection='column'>
              <Box>Applied on {apply_date}</Box>
              {view_date && <Box>Viewed on {view_date}</Box>}
              {download_date && <Box>Download on {download_date}</Box>}
              </Box>
            </Box>
          </Box>
        
        {comments && <Box>Comments: {comments}</Box>}
        <Box>Description: {job_description}</Box>
      </Box>
    </Box>
    )
}

const CardItem = ({index, showDetail, onClick, item, style}) => {
  const onClickItem = () => {
    if(!showDetail) onClick(index)
    else onClick(-1)
  }
  const { job_id, job_status, job_link, apply_date, job_title,
    job_description, job_company, company_logo, application_status, comments
  } = item

  return(
    <Box>
      <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
        <Box width='10%' overflow='hidden'>{job_id}</Box>
        <Box width='30%' overflow='hidden'>{job_title}</Box>
        <Box width='20%' overflow='hidden'>{job_company}</Box>
        <Box width='15%' overflow='hidden'>{job_status}</Box>
        <Box width='20%' overflow='hidden'>{apply_date}</Box>
        <Box width='5%' >
        {  index !== undefined && <Button onClick={onClickItem}>
          {showDetail && <ExpandLessIcon/>} 
          {!showDetail && <ExpandMoreIcon/>} 
          </Button>}
        </Box>
      </Box>
      {showDetail && <JobCard job={item}/>}
    </Box>
  )
}

/**
 * 6个月以前的记录
 * @param 
 * @returns 
 */
const OldHistoryItem = ({item, style, isTitle, index}) => {
  const onClickItem = () => {
    if(!showDetail) onClick(index)
    else onClick(-1)
  }
  const { job_id, job_status, job_link, apply_date, job_title,
    job_description, job_company, company_logo, application_status, comments
  } = item

  return(
    <Box>
      <Box key={index} display='flex' flexDirection='row' fontSize={h2} alignItems='center' justifyContent='center' style={style}>
        <Box width='10%' overflow='hidden'>{job_id}</Box>
        <Box width='30%' overflow='hidden'>{job_title}</Box>
        <Box width='20%' overflow='hidden'>{job_company}</Box>
        <Box width='10%' overflow='hidden'>{apply_date}</Box>
        <Box width='15%' textAlign='center' >
          {isTitle && 'Resume history'}
          {!isTitle && <Box><Button><CloudDownloadIcon color='primary'/></Button></Box>
          }
        </Box>
        <Box width='15%' textAlign='center'>
          {isTitle && 'Analysis Report'}
          {
          !isTitle && <Box><Button><CloudDownloadIcon color='primary'/></Button></Box>
          }
        </Box>
      </Box>
      {/* {showDetail && <JobCard job={item}/>} */}
    </Box>
  )
}

const ApplyHistory = () => {
  const [showItem, setShowItem] = useState(-1)
  const onClick = (id) => {
    setShowItem(id)
  }
  return(
    <Container 
      style={{ marginTop: 18}}
    >
      
      <Section>
        <Box p={4}>
          <Box fontSize={h} fontWeight='500' lineHeight='42px' color={COLOR_TITLE}>
            Apply History
          </Box>
          <Box fontSize={h1} >
            Following are jobs you applied in 6 months
          </Box>
        </Box>

      </Section>
      <Section >
        <Box p={4} mt={4}>
          <CardItem 
          item={{job_id:"Id", job_title:"Job title", job_company: 'Company', job_status:'Job status',apply_date:"Apply date"}} 
            style={{fontWeight:600}}  key={-1}/>
          {mockdata.length === 0 && "No application history"}
          {mockdata.map((job, i) => <CardItem index={i} item={job} onClick={onClick} showDetail={showItem === i} key={i}/>)}
        </Box>
      </Section>


      <Section>
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
      </Section>
    </Container>
  )
}

export default ApplyHistory