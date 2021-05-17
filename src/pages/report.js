import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Container, Grid, LinearProgress } from '@material-ui/core'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

import { MarketCompetitiveness } from '../features/report/MarketCompetitivenessSection'
import { MarketValueSection } from '../features/report/MarketValueSection'
import { MatchingJobsSection } from '../features/report/MatchingJobsSection'
import { CareerPathwaySection } from '../features/report/CareerPathwaySection'
import { CourseSection } from '../features/report/CourseSection'

import { useDropzone } from 'react-dropzone'
import { Section } from '../components/Section'
import { fetchMarketValue } from '../services/market-value'
import DescriptionIcon from '@material-ui/icons/Description'
import HourglassFullIcon from '@material-ui/icons/HourglassFull'

function FileDropzone (props) {
  const { onSuccess, onError } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1
  })

  useEffect(() => {
    if (acceptedFiles.length) {
      setLoading(true)
      fetchReport(acceptedFiles).then((res) => {
        console.log('res: ', res)
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
              Smart Match is not able to analysis your resume
            </Box>
            <pre style={{ color: '#FE654F', margin: '64px 0' }}>
              Error <br />{error || error.message}
            </pre>
            <Box mt={24}>
              <Button variant='contained' color='secondary' disableElevation onClick={() => window.location.reload()}>Please try again</Button>
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
          <Box style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '48px', fontWeight: '500' }}>
            {loading ? 'Analyzing...' : 'Upload Resume'}
          </Box>
          <Box my={2} style={{ color: 'rgba(55, 58, 112, 1)' }}>
            {loading ? 'Smart Match is analysing your resume...' : 'Upload your latest resume to reveal your potential matching jobs and market value'}
          </Box>
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
            ? <p>Drop the files here ...</p>
            : <p>Drag & drop some files here, or click to select files</p>
      }
              <p style={{ color: 'rgba(201, 201, 201, 1)' }}>File should be docx, doc, odt or pdf. Max 10MB</p>
              <Box mt={4}>
                <DescriptionIcon style={{ color: 'rgba(70, 235, 213, 1)', fontSize: 90 }} />
              </Box>
            </Box>
          )}
        </Box>
      </Section>
    </Box>
  )
}

const fetchReport = (files) => {
  return fetchMarketValue(files[0])
}

const mock = { market_value_result: [{ matched_job_title: 'Data Scientist', hard_skills_needed_to_improve: ['java', 'project management', 'azure', 'spark', 'r', 'c/c++', 'tableau', 'data engineering'], hard_skill_competitiveness: 88, contract: { market_high: 150, market_low: 42, market_avg: 132, market_mid_low: 85, market_mid_high: 142, predicted_market_value: { high: 135, low: 128 } }, fulltime: { market_high: 170000, market_low: 60000, market_avg: 149600, market_mid_low: 100000, market_mid_high: 160000, predicted_market_value: { high: 150000, low: 140000 } }, projected_career_path: [{ title: 'Senior Data Scientist', market_avg_salary: { fulltime: 153000, contract: 135 }, type: 'Technical' }] }, { matched_job_title: 'Software Engineer', hard_skills_needed_to_improve: ['angular', 'java', 'nosql', 'matlab', 'azure', 'aws', 'c/c++', '.net', 'c++', 'linux', 'react', 'kubernetes', 'c#', 'scala', 'javascript'], hard_skill_competitiveness: 81, contract: { market_high: 100, market_low: 30, market_avg: 81, market_mid_low: 54, market_mid_high: 91, predicted_market_value: { high: 83, low: 78 } }, fulltime: { market_high: 175000, market_low: 56000, market_avg: 141750, market_mid_low: 93000, market_mid_high: 157500, predicted_market_value: { high: 140000, low: 130000 } }, projected_career_path: [{ title: 'Senior Software Engineer', market_avg_salary: { fulltime: 157000, contract: 90 }, type: 'Technical' }] }, { matched_job_title: 'Data Engineer', hard_skills_needed_to_improve: ['data engineering', 'spark', 'aws'], hard_skill_competitiveness: 94, contract: { market_high: 150, market_low: 40, market_avg: 141, market_mid_low: 88, market_mid_high: 147, predicted_market_value: { high: 145, low: 136 } }, fulltime: { market_high: 150000, market_low: 58000, market_avg: 141000, market_mid_low: 94000, market_mid_high: 145000, predicted_market_value: { high: 140000, low: 130000 } }, projected_career_path: [{ title: 'Senior Data Engineer', market_avg_salary: { fulltime: 135000, contract: 135 }, type: 'Technical' }] }], recommended_jobs: [{ job_title: 'Major Projects Data Scientist', job_link: 'https://ca.indeed.com/rc/clk?jk=24159a27f99d1fc4&fccid=f1582c464db8553b&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 93 }, { job_title: 'Software Engineer Intern (Machine Learning Platform Team - Spring/Summer 2021)', job_link: 'https://ca.indeed.com/rc/clk?jk=ab19da37a974a116&fccid=b8ce556031512ca3&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 92 }, { job_title: 'Intermediate Machine Learning Engineer', job_link: 'https://ca.indeed.com/rc/clk?jk=14941f7276e243c4&fccid=4512634d9e7338a8&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 90 }, { job_title: 'Senior Data Scientist/Manager', job_link: 'https://ca.indeed.com/rc/clk?jk=f3689c6e47361dfd&fccid=799362a2faa3b40a&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 88 }, { job_title: 'Data Architect, Technology Solutions', job_link: 'https://ca.indeed.com/rc/clk?jk=994396db9dbf862b&fccid=b8ee7f714bcca05b&vjs=3', full_time: { salary_range: 'Not Disclosed' }, matched_percentage: 88 }], overall_competitiveness: 8, overall_job_level: 'Senior', experiences_competitiveness: 100, education_competitiveness: 100, soft_skill_competitiveness: 33, soft_skills_needed_to_improve: ['creative', 'communication', 'problem solving', 'time management', 'resourceful', 'adaptive'], hard_skill_competitiveness: 88, hard_skills_needed_to_improve: ['java', 'project management', 'azure', 'spark', 'r', 'c/c++', 'tableau', 'data engineering'], education_levels_needed_to_improve: [] }
export default function Home () {
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  if (!report) {
    return (
      <Box textAlign='center'>
        <FileDropzone onSuccess={data => setReport(data)} />
        <Box mb={8}>
          <Button variant='contained' color='primary' disableElevation onClick={() => setReport(mock)}>
            See demo report
          </Button>
        </Box>
      </Box>
    )
  }

  if (loading) {
    return (
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
        <Box fontSize='64px' fontWeight='600' color='#49648A'>
          Loading the report
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
      <Container style={{ marginTop: 18, paddingLeft: 284, position: 'relative' }}>
        <Box position='absolute' width='250px' height='700px' left={0} top={0}>
          <Sidebar onReset={() => setReport(null)} />
        </Box>

        <Box my={3}>
          <Box fontSize='26px' fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
            Evaluation
          </Box>
          <Box fontSize='14px' lineHeight='21px' color='rgba(87, 91, 166, 1)'>
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
