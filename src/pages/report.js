import { useCallback, useEffect, useState } from 'react'
import { Box, Container, Grid, LinearProgress } from '@material-ui/core'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

import { MarketCompetitiveness } from '../features/report/MarketCompetitivenessSection'
import { MarketValueSection } from '../features/report/MarketValueSection'
import { MatchingJobsSection } from '../features/report/MatchingJobsSection'
import { CareerPathwaySection } from '../features/report/CareerPathwaySection'
import { CourseSection } from '../features/report/CourseSection'

import { useDropzone } from 'react-dropzone'
import { Section } from '../components/Section'

function FileDropzone (props) {
  const { onSuccess, onError } = props
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1
  })

  useEffect(() => {
    if (acceptedFiles.length) {
      fetchReport(acceptedFiles).then(onSuccess)
    }
  }, [acceptedFiles])

  return (
    <Box
      p={4} mb={4} borderRadius='24px' style={{
      }}
    >
      <Section style={{
        borderWidth: '2px',
        borderColor: isDragActive ? 'blue' : '#eeeeee',
        borderStyle: 'dashed'
      }}
      >
        <Box style={{ backgroundColor: isDragActive ? 'blue' : 'white', borderRadius: '24px' }} p={8} {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag 'n' drop some files here, or click to select files</p>
      }
        </Box>
      </Section>
    </Box>
  )
}

const fetchReport = (files) => {
  console.log('files: ', files)
  const formdata = new FormData()
  formdata.append('api_key', '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861')
  formdata.append('resume_file', files[0], 'BinYu_DS_202008.docx')

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }

  return fetch('https://api.metisign.com/koios/v1/?api_key=9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861', requestOptions)
    .then(response => response.json())
}

const mock = {
  market_value_result:
  [{
    matched_job_title: 'Data Scientist',
    hard_skills_needed_to_improve: ['tableau', 'spark', 'java', 'r', 'azure', 'project management', 'c/c++', 'data engineering'],
    hard_skill_competitiveness: 88,
    contract: {
      market_high: 150,
      market_low: 42,
      market_avg: 96,
      predicted_market_value: { high: 135, low: 128 }
    },
    fulltime: {
      market_high: 170000,
      market_low: 60000,
      market_avg: 115000,
      predicted_market_value: { high: 150000, low: 140000 }
    },
    projected_career_path: [{
      title: 'Senior Data Scientist',
      market_avg_salary: { fulltime: 153000, contract: 135 },
      type: 'Technical'
    }]
  }, { matched_job_title: 'Software Engineer', hard_skills_needed_to_improve: ['c++', 'react', 'angular', 'kubernetes', 'c#', 'scala', '.net', 'aws', 'java', 'azure', 'nosql', 'linux', 'javascript', 'matlab', 'c/c++'], hard_skill_competitiveness: 81, contract: { market_high: 100, market_low: 30, market_avg: 65, predicted_market_value: { high: 83, low: 78 } }, fulltime: { market_high: 175000, market_low: 56000, market_avg: 115500, predicted_market_value: { high: 140000, low: 130000 } }, projected_career_path: [{ title: 'Senior Software Engineer', market_avg_salary: { fulltime: 157000, contract: 90 }, type: 'Technical' }] }, { matched_job_title: 'Data Engineer', hard_skills_needed_to_improve: ['aws', 'spark', 'data engineering'], hard_skill_competitiveness: 94, contract: { market_high: 150, market_low: 40, market_avg: 95, predicted_market_value: { high: 145, low: 136 } }, fulltime: { market_high: 150000, market_low: 58000, market_avg: 104000, predicted_market_value: { high: 140000, low: 130000 } }, projected_career_path: [{ title: 'Senior Data Engineer', market_avg_salary: { fulltime: 135000, contract: 135 }, type: 'Technical' }] }],
  recommended_jobs: [{
    job_title: 'Major Projects Data Scientist',
    job_link: 'https://ca.indeed.com/rc/clk?jk=24159a27f99d1fc4&fccid=f1582c464db8553b&vjs=3',
    full_time: { salary_range: 'Not Disclosed' },
    matched_percentage: 93
  }, { job_title: 'Software Engineer Intern (Machine Learning Platform Team - Spring/Summer 2021)', job_link: 'https://ca.indeed.com/rc/clk?jk=ab19da37a974a116&fccid=b8ce556031512ca3&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 92 }, { job_title: 'Intermediate Machine Learning Engineer', job_link: 'https://ca.indeed.com/rc/clk?jk=14941f7276e243c4&fccid=4512634d9e7338a8&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 90 }, { job_title: 'Senior Data Scientist/Manager', job_link: 'https://ca.indeed.com/rc/clk?jk=f3689c6e47361dfd&fccid=799362a2faa3b40a&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 88 }, { job_title: 'Data Architect, Technology Solutions', job_link: 'https://ca.indeed.com/rc/clk?jk=994396db9dbf862b&fccid=b8ee7f714bcca05b&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 88 }],
  overall_competitiveness: 8,
  overall_job_level: 'Senior',
  experiences_competitiveness: 100,
  education_competitiveness: 100,
  soft_skill_competitiveness: 33,
  soft_skills_needed_to_improve: ['adaptive', 'problem solving', 'resourceful', 'time management', 'creative', 'communication'],
  hard_skill_competitiveness: 88,
  hard_skills_needed_to_improve: ['tableau', 'spark', 'java', 'r', 'azure', 'project management', 'c/c++', 'data engineering'],
  education_levels_needed_to_improve: []
}

export default function Home () {
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState(mock)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (!report) {
    return (
      <FileDropzone onSuccess={setReport} />
    )
  }

  if (loading) {
    return (
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
        <Box fontSize='64px' fontWeight='600' color='#49648A'>
          Loading the demo report
        </Box>
        <Box width='600px' m={8}>
          <LinearProgress />
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Header />
      <Container style={{ marginTop: 18, paddingLeft: 270, position: 'relative' }}>
        <Box position='absolute' width='250px' height='700px' left={0} top={0}>
          <Sidebar />
        </Box>

        <Box my={3}>
          <Box fontSize='26px' fontWeight='500' lineHeight='42px'>
            Report Page
          </Box>
          <Box fontSize='14px' lineHeight='21px' color='#90A0B7'>
            Your current job market position based on your resume
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={6}>
            <MarketValueSection report={report} />
            <MatchingJobsSection report={report} />
          </Grid>

          <Grid item xs={6}>
            <MarketCompetitiveness report={report} />
          </Grid>

          <Grid item xs={12}>
            <CareerPathwaySection report={report} />
          </Grid>

          <Grid item xs={12}>
            <CourseSection report={report} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
