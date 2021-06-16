import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Container, Grid, LinearProgress, Select, FormControl, InputLabel, MenuItem, Typography} from '@material-ui/core'
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { HistoryList } from '../components/HistoryList'

import { MarketCompetitiveness } from '../features/report/MarketCompetitivenessSection'
import { MarketValueSection } from '../features/report/MarketValueSection'
import { MatchingJobsSection } from '../features/report/MatchingJobsSection'
import { CareerPathwaySection } from '../features/report/CareerPathwaySection'
import { CourseSection } from '../features/report/CourseSection'
import { CareerAdviceSection} from '../features/report/CareerAdviceSection'

import { useDropzone } from 'react-dropzone'
import { Section } from '../components/Section'
import { fetchMarketValue } from '../services/market-value'
import DescriptionIcon from '@material-ui/icons/Description'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/config'
import { useRouter } from 'next/router'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {h, h2, h3} from '../constant/fontsize'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon:{
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    color:'black'
  }
})

function FileDropzone (props) {
  const { onSuccess, onError } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1
  })
  const params = useRouter().query
  const userId = params.id
  const lang = params.lang?.toLowerCase() //get language

  //add selector
  const [area, setArea] = useState('Canada')
  const handleAreaChange = (event) => {
    setArea(event.target.value)
  }

  const [position, setPosition] = useState('')
  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }
  
  const { t } = useTranslation()
  useEffect(() =>{ 
    if(lang && ['en', 'cn'].includes(lang)){
      i18n.changeLanguage(lang)
    }
  },[lang])
  useEffect(() => {
    if (acceptedFiles.length) {
      setLoading(true)
      fetchReport(acceptedFiles, {id:userId, area, position}).then((res) => {
        // console.log('res: ', res)
        if (res.error) {
          setError(res.error)
        } else {
          onSuccess(res)
          setLoading(false)
        }
      }).catch(setError)
    }
  }, [acceptedFiles])

  if (error) {
    return (
      <Box
        p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{
        }}
      >
        <Section>
          <Box style={{ borderRadius: '24px' }} p={8} {...getRootProps({ className: 'dropzone' })}>
            <Box pt={4} style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '48px', fontWeight: '500' }}>
              Sorry
            </Box>
            <Box my={2} style={{ color: 'rgba(55, 58, 112, 1)' }}>
              {t("report.error")}
            </Box>
            <pre style={{ color: '#FE654F', margin: '64px 0' }}>
              Error <br />{error || error.message}
            </pre>
            <Box mt={24}>
              <Button variant='contained' color='secondary' disableElevation onClick={() => window.location.reload()}>{t("report.error_retry")}</Button>
            </Box>
          </Box>
        </Section>
      </Box>
    )
  }

  return (
    <Box
      p={4} mb={4} borderRadius='24px' width={800} margin='40px auto 16px' style={{
      }}
    >
      <Section>
        <Box style={{ borderRadius: '24px' }} p={8} {...getRootProps({ className: 'dropzone' })}>
          <Box style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '24px', fontWeight: '500' }}>
            {loading ? t("report.analyzing_title") : t("report.upload_text")}
            {/* {loading ? t("report.analyzing_title") : t("report.upload_title")} */}
          </Box>
          {/**Area and position select start =======> */}
          <Box pt={2} onClick={e=>e.stopPropagation()}>
            <FormControl style={{width:100, backgroundColor:'white', marginRight:20}} >
            <InputLabel id="area">Area</InputLabel>
            <Select
              value={area}
              onChange={handleAreaChange}
            >
              <MenuItem value='China'>China</MenuItem>
              <MenuItem value='Canada'>Canada</MenuItem>
              <MenuItem value='USA'>USA</MenuItem>
            </Select>
            </FormControl>
            <FormControl style={{width:200, backgroundColor:'white'}}>
            <InputLabel id="area">Position</InputLabel>
            <Select
              value={position}
              onChange={handlePositionChange}
            >
              <MenuItem value='China'>DevOPs</MenuItem>
              <MenuItem value='Canada'>Frontend Developer</MenuItem>
              <MenuItem value='USA'>Backend Developer</MenuItem>
            </Select>
            </FormControl>
          </Box>
        {/**<======Area and position select end */}
          {/* <Box my={2} style={{ color: 'rgba(55, 58, 112, 1)' }}>
            {loading ? t("report.analyzing_text") : t("report.upload_text")}
          </Box> */}
          { loading && 
            <Box my={2} style={{ color: 'rgba(55, 58, 112, 1)' }}>
              {t("report.analyzing_text")}
            </Box>
          }
          <input {...getInputProps()} />
          {loading && (
            <Box
              height={300}
              width={500}
              borderRadius='24px'
              py={6} style={{
                backgroundColor: isDragActive ? '#F5F6FB' : 'white',
                borderWidth: '2px',
                borderColor: isDragActive ? 'rgba(0, 97, 255, 1)' : '#eeeeee',
                borderStyle: 'dashed',
                margin: '60px auto 16px'

              }}
            >
              <Box mt={10}>
                <HourglassFullIcon style={{ color: 'rgba(70, 235, 213, 1)', fontSize: 90 }} />
              </Box>
            </Box>
          )}
          {!loading && (
            <Box
              height={300}
              width={500}
              borderRadius='24px'
              py={6} style={{
                backgroundColor: isDragActive ? '#F5F6FB' : 'white',
                borderWidth: '2px',
                borderColor: isDragActive ? 'rgba(0, 97, 255, 1)' : '#eeeeee',
                borderStyle: 'dashed',
                margin: '60px auto 16px'

              }}
            >
              {
          isDragActive
            ? <p>{t("report.dragable_title")}</p>
            : <p>{t("report.drag_title")}</p>
      }
              <p style={{ color: 'rgba(201, 201, 201, 1)' }}>{t("report.drag_text")}</p>
              <Box mt={4}>
                <DescriptionIcon style={{ color: 'rgba(70, 235, 213, 1)', fontSize: 90 }} />
              </Box>
            </Box>
          )}
        </Box>
        {/* <Box pb={6}>
          <FormControl style={{width:100, backgroundColor:'white', marginRight:20}} >
          <InputLabel id="area">Area</InputLabel>
          <Select
            value={area}
            onChange={handleAreaChange}
          >
            <MenuItem value='China'>China</MenuItem>
            <MenuItem value='Canada'>Canada</MenuItem>
            <MenuItem value='USA'>USA</MenuItem>
          </Select>
          </FormControl>
          <FormControl style={{width:200, backgroundColor:'white'}}>
          <InputLabel id="area">Position</InputLabel>
          <Select
            value={position}
            onChange={handlePositionChange}
          >
            <MenuItem value='China'>DevOPs</MenuItem>
            <MenuItem value='Canada'>Frontend Developer</MenuItem>
            <MenuItem value='USA'>Backend Developer</MenuItem>
          </Select>
          </FormControl>
        </Box> */}
      </Section>
    </Box>
  )
}

const fetchReport = (files, params) => {
  return fetchMarketValue(files[0], params)
}

const SocialMedia = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (          
    <Box mt={1} style={{flexDirection:"column", display:"flex", alignItems:"center"}}>
      <Typography color='primary' style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
        {t('careeradvice.contact')}
      </Typography>
      
      <div>
        <a href='https://www.facebook.com/DK-105342934694333' target='_blank'>
          <FacebookIcon className={classes.icon}/>
        </a>
        <a href='https://twitter.com/DK48655550' target='_blank'>
          <TwitterIcon className={classes.icon}/>
        </a>
        <a href='https://www.instagram.com/dk_ca_dk/' target='_blank'>
          <InstagramIcon className={classes.icon}/>
        </a>
        <a href='https://www.linkedin.com/company/dkedu/' target='_blank'>
          <LinkedInIcon className={classes.icon}/>  
        </a>
      </div>
    </Box> 

)}

const mock = { market_value_result: [{ matched_job_title: 'Data Scientist', hard_skills_needed_to_improve: ['java', 'project management', 'azure', 'spark', 'r', 'c/c++', 'tableau', 'data engineering'], hard_skill_competitiveness: 88, contract: { market_high: 150, market_low: 42, market_avg: 132, market_mid_low: 85, market_mid_high: 142, predicted_market_value: { high: 135, low: 128 } }, fulltime: { market_high: 170000, market_low: 60000, market_avg: 149600, market_mid_low: 100000, market_mid_high: 160000, predicted_market_value: { high: 150000, low: 140000 } }, projected_career_path: [{ title: 'Senior Data Scientist', market_avg_salary: { fulltime: 153000, contract: 135 }, type: 'Technical' }] }, { matched_job_title: 'Software Engineer', hard_skills_needed_to_improve: ['angular', 'java', 'nosql', 'matlab', 'azure', 'aws', 'c/c++', '.net', 'c++', 'linux', 'react', 'kubernetes', 'c#', 'scala', 'javascript'], hard_skill_competitiveness: 81, contract: { market_high: 100, market_low: 30, market_avg: 81, market_mid_low: 54, market_mid_high: 91, predicted_market_value: { high: 83, low: 78 } }, fulltime: { market_high: 175000, market_low: 56000, market_avg: 141750, market_mid_low: 93000, market_mid_high: 157500, predicted_market_value: { high: 140000, low: 130000 } }, projected_career_path: [{ title: 'Senior Software Engineer', market_avg_salary: { fulltime: 157000, contract: 90 }, type: 'Technical' }] }, { matched_job_title: 'Data Engineer', hard_skills_needed_to_improve: ['data engineering', 'spark', 'aws'], hard_skill_competitiveness: 94, contract: { market_high: 150, market_low: 40, market_avg: 141, market_mid_low: 88, market_mid_high: 147, predicted_market_value: { high: 145, low: 136 } }, fulltime: { market_high: 150000, market_low: 58000, market_avg: 141000, market_mid_low: 94000, market_mid_high: 145000, predicted_market_value: { high: 140000, low: 130000 } }, projected_career_path: [{ title: 'Senior Data Engineer', market_avg_salary: { fulltime: 135000, contract: 135 }, type: 'Technical' }] }], recommended_jobs: [{ job_title: 'Major Projects Data Scientist', job_link: 'https://ca.indeed.com/rc/clk?jk=24159a27f99d1fc4&fccid=f1582c464db8553b&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 93 }, { job_title: 'Software Engineer Intern (Machine Learning Platform Team - Spring/Summer 2021)', job_link: 'https://ca.indeed.com/rc/clk?jk=ab19da37a974a116&fccid=b8ce556031512ca3&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 92 }, { job_title: 'Intermediate Machine Learning Engineer', job_link: 'https://ca.indeed.com/rc/clk?jk=14941f7276e243c4&fccid=4512634d9e7338a8&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 90 }, { job_title: 'Senior Data Scientist/Manager', job_link: 'https://ca.indeed.com/rc/clk?jk=f3689c6e47361dfd&fccid=799362a2faa3b40a&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 88 }, { job_title: 'Data Architect, Technology Solutions', job_link: 'https://ca.indeed.com/rc/clk?jk=994396db9dbf862b&fccid=b8ee7f714bcca05b&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 88 }], overall_competitiveness: 8, overall_job_level: 'Senior', experiences_competitiveness: 100, education_competitiveness: 100, soft_skill_competitiveness: 33, soft_skills_needed_to_improve: ['creative', 'communication', 'problem solving', 'time management', 'resourceful', 'adaptive'], hard_skill_competitiveness: 88, hard_skills_needed_to_improve: ['java', 'project management', 'azure', 'spark', 'r', 'c/c++', 'tableau', 'data engineering'], education_levels_needed_to_improve: [] }
export default function Home () {
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState(null)
  const { t } = useTranslation()
  const [viewHistory, setViewHistory] = useState(false)
  const [selectedPathIndex, setSelectedPathIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (!report) {
    return (
      <Box textAlign='center'>
        <FileDropzone onSuccess={data => setReport(data)} />
        <Box mb={8} >
          <Button variant='contained' color='primary' disableElevation onClick={() => setReport(mock)}>
            {t('report.demo')}
          </Button>

          <Button variant='contained' color='primary' disableElevation onClick={() => setViewHistory(!viewHistory)} style={{marginLeft:20}}>
            {viewHistory ? t('report.hideHistory') : t('report.history')}
          </Button>
        </Box>
        <SwipeableDrawer anchor="right" open={viewHistory} onClose={() => setViewHistory(false)} onOpen={()=>{}}>
          <HistoryList/>
        </SwipeableDrawer>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
        <Box fontSize='64px' fontWeight='600' color='#49648A'>
        {t('report.loading')}
        </Box>
        <Box width='600px' m={8}>
          <LinearProgress />
        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* <Header /> */}
      {/* <Container style={{ marginTop: 18, paddingLeft: 284, position: 'relative' }}>
        <Box position='absolute' width='250px' height='700px' left={0} top={0}>
          <Sidebar onReset={() => setReport(null)} />
        </Box> */}




      <Container style={{ marginTop: 18, position:"relative" }}>

      <Box position='fixed' top={0} width='1280px' height={100} zIndex={1000} style={{backgroundColor:'white', borderBottomLeftRadius:20, borderBottomRightRadius:20}} >
          <Box my={3} ml={4}>
              <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                {t("report.report_title")}
              </Box>
              <Box fontSize={h3} lineHeight='21px' color='rgba(87, 91, 166, 1)'>
                {t("report.report_text")}
              </Box>
              
          </Box>
          <Box position='absolute' ml='auto' mr='auto' top={0} left={0} right={0} textAlign='center'>
            <SocialMedia/>
          </Box>
          <Box position='absolute' width={100} right={15} top={25}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => setReport(null)}
            style={{borderRadius:20}}
          >
            {t('sidebar.back')}
          </Button>
          {/**跳转测试成功 */}
          {/* <Button onClick={()=> {document.getElementById('market_competitiveness')?.scrollIntoView()  }}>test</Button> */}
          {/* <Link href='#match_jobs'>test</Link> */}
          </Box>
        </Box>


        <Grid container spacing={4} style={{position:'absolute', top:120}}>
          <Grid item xs={12}>
            <div id='career_advice'>
              <CareerAdviceSection report={report} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div id='market_value'>
              <MarketValueSection report={report} />
            </div>
            <div id='market_competitiveness'>
              <MarketCompetitiveness report={report} />
            </div>
          </Grid>

          <Grid item xs={6}>
          <div id='match_jobs'>
           <MatchingJobsSection report={report} />
          </div>
          </Grid>

          <Grid item xs={7} >
            <div id='career_pathway'>
              <CareerPathwaySection 
                report={report} 
                selectedPathIndex={selectedPathIndex} 
                setSelectedPathIndex={setSelectedPathIndex}
              />
            </div>
          </Grid>

          <Grid item xs={5}>
            <div id='course_section'>
              <CourseSection report={report} selectedPathIndex={selectedPathIndex}/>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
