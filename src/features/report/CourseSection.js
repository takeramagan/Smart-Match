import {Box, Button, Chip, Link, Grid, Typography, makeStyles, TextField} from '@material-ui/core'
import {Section} from '../../components/Section'
import {useTranslation} from 'react-i18next'
import {h1, h2, h3, h4, h5} from '../../constant/fontsize'
import {
    DK_LINK,
    DK_IMPROVE,
    APP_END_POINT_B_AND_C,
    APP_END_POINT_CUSTOMER_REPORT_ACCURACY,
    X_API_KEY_B_AND_C,
    X_API_KEY_HISTORY
} from '../../constant/externalURLs'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {linkTrack} from '../../untils/linkTrack'
import {CareerAdviceSection} from './CareerAdviceSection'
import Rating from '@material-ui/lab/Rating';
import {withStyles} from '@material-ui/core/styles';
import {useState} from 'react'
import {useRequest} from '../../hooks/useRequest'
import {useRouter} from 'next/router'
import {useFormik} from "formik";

const useStyles = makeStyles({
    ai: {
        width: '100px',
        height: '100px',
        '&:hover': {
            transition: 'all 0.6s ease',
            transform: 'rotate(360deg) scale(1.5)',
            cursor: 'pointer',
        }

    },
    clicktext: {
        '&:hover': {
            transition: 'all',
            transform: 'scale(1.05)',
            cursor: 'pointer',
        }
    }
});

const EducationSection = ({report, selectedPathIndex}) => {
    const {t} = useTranslation();
    const requiredSkills = report.career_path_info.career_paths.path[selectedPathIndex]?.how_to_improve?.required_skills

    // if (!report.education_levels_needed_to_improve.length) {
    if (!requiredSkills) {
        return null
    }

    return (
        <Box>
            {/* <Box fontSize={h1} my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
        {t('course.education')}
      </Box> */}
            <Box pb={2}>
                {/* {report.education_levels_needed_to_improve.map((item) => { */}
                {requiredSkills.slice(0, 10).map((item) => {
                    return (
                        <Chip
                            key={item}
                            label={item} style={{
                            marginRight: 18,
                            backgroundColor: '#ffffff',
                            filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                            margin: '8px 4px'
                        }}
                        />
                    )
                })}
            </Box>
        </Box>
    )
};

const SoftSkillSection = ({report}) => {
    const {t} = useTranslation()

    if (!report.soft_skills_needed_to_improve.length) {
        return null
    }

    return (
        <Box width='45%'>
            <Box fontSize={h1} my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
                {t('course.softskill')}
            </Box>
            <Box py={2}>
                {report.soft_skills_needed_to_improve.map((item) => {
                    return (
                        <Chip
                            key={item}
                            label={item} style={{
                            marginRight: 18,
                            backgroundColor: '#ffffff',
                            filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                            margin: '8px 4px'
                        }}
                        />
                    )
                })}
            </Box>
        </Box>
    )
};

const HardSkillSection = ({report}) => {
    const {t} = useTranslation()

    if (!report.hard_skills_needed_to_improve.length) {
        return null
    }

    return (
        <Box width='45%'>
            <Box fontSize={h1} my={2} fontWeight='500' color='rgba(55, 58, 112, 1)'>
                {t('course.hardskill')}
            </Box>
            <Box py={2}>
                {report.hard_skills_needed_to_improve.map((item) => {
                    return (
                        <Chip
                            key={item}
                            label={item} style={{
                            marginRight: 18,
                            backgroundColor: '#ffffff',
                            filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                            margin: '8px 4px'
                        }}
                        />
                    )
                })}
            </Box>

        </Box>
    )
};

const SuggestedCourse = ({report, selectedPathIndex}) => {
    const {t} = useTranslation();
    const suggestedCourses = report.career_path_info.career_paths.path[selectedPathIndex]?.how_to_improve?.suggested_courses[0]
    // const courseLogo = Object.entries(suggestedCourses)[1][1]
    const courseLogo = suggestedCourses.logo ?? 'https://static.wixstatic.com/media/d44c9e_b34eb8491f984802b8961715fdf76082~mv2.png/v1/fill/w_96,h_60,al_c,q_85,usm_0.66_1.00_0.01/DK-Logo.webp'
    // const courseName = Object.entries(suggestedCourses)[0][0]
    // const courseLink = Object.entries(suggestedCourses)[0][1]
    const courseName = suggestedCourses.coursename;
    const courseLink = suggestedCourses.courselink;
    console.log("course", courseLogo, courseName, courseLink);
    const suggestedCertificates = report.career_path_info.career_paths.path[selectedPathIndex]?.how_to_improve?.required_certificates[0]

    console.log("course", certLogo, suggestedCertificates);
    //const certLogo = Object.entries(suggestedCertificates)[1][1]
    const certLogo = suggestedCertificates.logo ?? 'Amazon.svg';
    // const certName = Object.entries(suggestedCertificates)[0][0]
    // const certLink = Object.entries(suggestedCertificates)[0][1]
    const certName = suggestedCertificates.certname;
    const certLink = suggestedCertificates.certlink;
    return (
        <Box py={2} display='flex' justifyContent='space-between' flexDirection="column">
            <Box width='100%' display='flex' justifyContent='space-between'>
                <Box width='50%'>
                    {/* <Box fontSize={h1} my={2} fontWeight='500' color='rgba(174, 174, 174, 1)'> */}
                    <Box fontSize={h1} my={2} fontWeight='500' color='#024CC3'>
                        {t('suggest.certifacate')}
                    </Box>
                </Box>
                <Box width='50%'>
                    {/* <Box fontSize={h1} my={2} fontWeight='500' color='rgba(174, 174, 174, 1)'> */}
                    <Box fontSize={h1} my={2} fontWeight='500' color='#024CC3'>
                        {t('suggest.course')}
                    </Box>
                </Box>
            </Box>
            <Box display='flex' flexDirection='row' alignItems='center'>
                <Box width='50%'>
                    <Box ml={0} display='flex' justifyContent='space-between'>
                        <Box color='#6A707E' fontSize={h3} display='flex' alignItems='center'>
                            <Box
                                width='67px' height='67px' mr={1} style={{
                                // backgroundColor: '#ccc'
                            }}
                            >
                                {/* <img width='67px' height='67px' src='Amazon.svg' /> */}
                                <img width='67px' height='67px' src={certLogo}/>
                            </Box>

                            {/* <Link target='_blank' rel='noreferrer' href='https://brainstation.io/course/online/data-science'>{t('suggest.brain station')} <br /> {t('suggest.data science')}</Link> */}
                            {/* <Box>{suggestedCertificates?.slice(0,3).map(item=>
                <Link target='_blank' key={item} rel='noreferrer' href={DK_LINK} onClick={()=>linkTrack(report.id, DK_LINK)}>{item}<br/></Link>
              )}</Box> */}
                            <Box>
                                {/* {suggestedCertificates?.slice(0,3).map(item=>
                {
                  const [name, link] = Object.entries(item)[0]
                  return <Link target='_blank' key={name} rel='noreferrer' href={link} onClick={()=>linkTrack(report.id, link)}>{name}<br/></Link>
                }
              )} */}
                                {
                                    <Link target='_blank' rel='noreferrer' href={certLink}
                                          onClick={() => linkTrack(report.id, certLink)}>{certName}</Link>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box width='50%'>
                    <Box ml={0} display='flex' justifyContent='space-between'>
                        <Box color='#6A707E' fontSize={h3} display='flex' alignItems='center' justifyContent='center'>
                            <Box
                                width='67px' height='40px' mr={1}
                            >
                                {/* <img width='67px' height='40px' src='https://static.wixstatic.com/media/d44c9e_b34eb8491f984802b8961715fdf76082~mv2.png/v1/fill/w_96,h_60,al_c,q_85,usm_0.66_1.00_0.01/DK-Logo.webp' /> */}
                                <img width='67px' height='40px' src={courseLogo}/>
                            </Box>

                            <Box>
                                {/* {
                suggestedCourses.map(course => {
                  const [k, v] = Object.entries(course)[0]
                  return  <Link target='_blank' key={k} href={v} onClick={()=>linkTrack(report.id, v)}>•{k}<br/></Link>
               })
              } */}
                                {
                                    <Link target='_blank' href={courseLink}
                                          onClick={() => linkTrack(report.id, courseLink)}>{courseName}<br/></Link>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
};

export function CourseSection({report, selectedPathIndex}) {
    const defaultValue = 3;
    const {t} = useTranslation();
    const classes = useStyles();
    const [rating, setRating] = useState({rated: false, value: defaultValue});
    const params = useRouter().query;
    const {hrid, jobid, email} = params;
    const {requestHandler} = useRequest();

    // comment form
    const formik = useFormik({
        initialValues: {
            comments: "",
            rate: 3,
            rated: false
        }
    });

    const submitRating = async () => {
        const endPoint = (hrid && jobid) ? (APP_END_POINT_B_AND_C + 'report_accuracy') : APP_END_POINT_CUSTOMER_REPORT_ACCURACY;
        const dcc = (hrid && jobid) ? X_API_KEY_B_AND_C : X_API_KEY_HISTORY;
        try {
            formik.values.rated = true;
            const data = new FormData();
            data.append('email', email);
            data.append('dcc', dcc);
            data.append('report_accuracy_rating', formik.values.rate);
            data.append('comments', formik.values.comments);
            hrid && data.append('hrid', hrid);
            jobid && data.append('jobid', jobid);
            const config = {
                method: 'post',
                url: endPoint,
                data: data
            };
            const result = await requestHandler(config);
            console.log("rating= ", result);
        } catch (e) {
        }
    };

    const CheckIfMarked = () => {
        // check if it's rated, if it rated, display msg
        if (formik.values && formik.values.rated) {
            return <h4>{t("rating.rated_msg")}</h4>;
        } else {
            return "";
        }
    };

    const DisabledStyleRating = withStyles({
        root: {
            height: 48,
            color: '#ffb400',
            opacity: 0.5,
        },
        label: {
            textTransform: 'capitalize',
        },
    })(Rating);

    // create new custom style rating (with transparent stars just like if its disabled)
    // use the disable style rating when its already rated, otherwise use normal rating
    const CustomRating = () => {
        if (!formik.values || !formik.values.rated) {
            return <Rating
                name="simple-controlled"
                value={rating.value}
                onChange={(event, value) => {
                    formik.values.rate = value ?? defaultValue;
                    setRating({rated: true, value: formik.values.rate});
                }}
            />;
        }

        return <DisabledStyleRating name="simple-controlled"
                                    value={rating.value}
                                    onChange={(event, value) => {
                                        const newValue = value ?? defaultValue;
                                        setRating({rated: true, value: newValue});
                                    }}/>
    }

    return (
        <Section>
            <Box p={4} mb={4}>
                <CareerAdviceSection report={report}/>
                {/* <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t("course.title")}
        </Box> */}
                {/* <EducationSection report={report} selectedPathIndex={selectedPathIndex}/> */}
                {/* <Box display='flex' justifyContent='space-between'>
          <SoftSkillSection report={report} />
          <HardSkillSection report={report} />
        </Box> */}
                {/* <Box fontSize={h1} mb={-3} mt={2} fontWeight='500' color='#024CC3'>
          {t("course.title")}
        </Box> */}
                <SuggestedCourse report={report} selectedPathIndex={selectedPathIndex}/>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                    {/* <a href={DK_IMPROVE} target="_blank" style={{textDecoration:'none'}} onClick={() => linkTrack(report.id, DK_IMPROVE)}>
            <Typography color='primary' className={classes.clicktext} style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
              {t('suggest.contact')}
            </Typography>
          </a> */}
                    <Typography color='primary' style={{fontSize: h2, fontWeight: '500', marginRight: 20}}>
                        {t('suggest.contact')}
                        {/* <a href={DK_IMPROVE} target="_blank" style={{color:'#0061FF'}} onClick={() => linkTrack(report.id, DK_IMPROVE)}>
              {t('suggest.Click here')}
              </a> */}
                        <Button href={DK_IMPROVE}
                                variant='contained'
                                color='primary'
                                target="_blank"
                                style={{borderRadius: 15, marginLeft: 10, height: 30}}
                                onClick={() => linkTrack(report.id, DK_IMPROVE)}
                        >
                            {t("radarchart.Click here")}
                        </Button>
                    </Typography>
                    <Link
                        href={DK_IMPROVE}
                        target='_blank'
                        onClick={() => {
                            linkTrack(report.id, DK_IMPROVE)
                        }}
                    >
                        <img src='ai.svg' width={80} height={100} className={classes.ai}/>
                    </Link>
                    {/* </Box> */}
                </Box>

                {/* =================== Rate Section ================= */}
                {/* mark in stars */}
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                    <div>
                        <Typography color='primary'>Rate the accuracy of this report</Typography>
                        <CustomRating></CustomRating>
                    </div>
                    { /* Rated Msg Section */}
                    <CheckIfMarked></CheckIfMarked>
                </Box>

                {/* comment section */}
                <Box style={{marginTop: 10, marginBottom: 10}}>
                    <Typography color='primary'>
                        Help us improve by leaving your comments and suggestions below: </Typography>
                    <TextField id="comments" size='small' name='comments'
                               fullWidth variant="outlined" rowsMax={15} rows={5}
                               multiline
                               style={{
                                   opacity: (formik.values && formik.values.rated ?
                                       0.5 : 1)
                               }}
                               value={formik.values.comments}
                               onChange={formik.handleChange}
                               helperText={formik.touched.comments && formik.errors.comments}
                               onBlur={formik.handleBlur}
                               placeholder="Your comments."/>
                </Box>

                {/* submit button */}
                <Box style={{marginTop: 10, marginBottom: 10, textAlign: 'right'}}>
                    <Button variant='contained'
                            color='primary'
                            target="_blank"
                            style={{
                                borderRadius: 15, marginLeft: 10, height: 30,
                                opacity: (formik.values && formik.values.rated) ? 0.5 : 1
                            }}
                            onClick={() => submitRating(formik)}
                    >
                        {t("rating.submit_button")}
                    </Button>
                </Box>
            </Box>

        </Section>
    )
}
