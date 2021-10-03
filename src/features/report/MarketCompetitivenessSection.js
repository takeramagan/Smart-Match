import {Box, Grid, Button, Typography, makeStyles, Link, Popover} from '@material-ui/core'
import {PercentageLabel} from '../../components/PercentageLabel'
import {Section} from '../../components/Section'
import ReactECharts from 'echarts-for-react'
import {useTheme} from '@material-ui/core/styles'
import {useTranslation, Trans} from 'react-i18next'
import {h, h1, h2, h3, h4, h5} from '../../constant/fontsize'
import {DK_RESUME} from '../../constant/externalURLs'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {linkTrack} from '../../untils/linkTrack'
import {useState} from 'react'
import {POPUP_BG_COLOR} from '../../constant/color'

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
            transform: 'scale(1.1)',
            cursor: 'pointer',
        }
    },
    // popover:{
    //   borderRadius: '15px',
    // }
})

export const RadarChart = ({report}) => {
    const {t} = useTranslation()
    // const format = 70
    // const language = 80
    // const matchLevel = 90
    // const grammer = 100
    const {
        format, language, matching: matchLevel, logic,
        format_explanation, language_explanation, profesion_match_explanation, logic_explanation
    } = report.resume_marking_info
    const getExplaination = (explaination) => {
        return (report.lang === 'cn' ? (explaination.zhs ?? explaination.eng) : explaination.eng)
        // const words = (report.lang === 'cn' ? (explaination.zhs ?? explaination.eng) : explaination.eng)
        // const temp = words.split(' ')
        // const ret = []
        // for(let i = 0; i< temp.length; i+=8){
        //   ret.push(temp.slice(i, i+10).join(" "))
        // }
        // return ret.join('<br />')
    }
    const formatExpl = getExplaination(format_explanation)
    const langExpl = getExplaination(language_explanation)
    const matchExpl = getExplaination(profesion_match_explanation)
    const logicExpl = getExplaination(logic_explanation)
    const option = {
        title: {},
        color: ['rgba(96,239,255, 0.4)'],
        tooltip: {},
        legend: {
            bottom: 10
        },
        radar: {
            radius: '60%',
            splitNumber: 1,
            axisLine: {
                show: false
            },
            splitArea: {
                areaStyle: {
                    color: ['#F8F8F8']
                }
            },
            name: {
                textStyle: {
                    color: '#6A707E',
                    fontSize: 12
                }
            },
            indicator: [
                {name: t('radarchart.Format'), max: 100},
                {name: t('radarchart.Language'), max: 100},
                {name: t('radarchart.Match Level'), max: 100},
                {name: t('radarchart.Logic'), max: 100}
            ]
        },
        series: [{
            name: t('radarchart.Resume Analysis'),
            symbol: 'none',
            type: 'radar',
            areaStyle: {},
            data: [
                {
                    value: [format, language, matchLevel, logic],
                    // name: t('radarchart.Resume Analysis')
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        textStyle: {width: 200},
                        position: (point, params, dom, rect, size) => ([-10, point[1]]),
                        formatter: function (params) {
                            return (
                                // t('radarchart.Resume Analysis') + '<br />' +
                                t('radarchart.Format') + ':    ' + params.value[0] + '<br />' + formatExpl + '<br />' + '<br />' +
                                t('radarchart.Logic') + ':    ' + params.value[3] + '<br />' + logicExpl + '<br />' + '<br />' +
                                t('radarchart.Match Level') + ':    ' + params.value[2] + '<br />' + matchExpl + '<br />' + '<br />' +
                                t('radarchart.Language') + ':    ' + params.value[1] + '<br />' + langExpl + '<br />'
                            )
                        },
                    }
                }
            ]
        }],

    }
    // const [enterRadar, setEnterRadar] = useState(false)
    // // const [radar, setRadar] = useState({enterRadar:false, anchorEl:null})
    // const onMouseEnter = (e) => {
    //   console.log("over", e)
    //   setEnterRadar((v) =>  (!v ? true: v))
    //   // e.preventDefalt()
    //   // setRadar({...radar, enterRadar:true})
    // }
    // const onMouseOut = (e) => {
    //   console.log("out")
    //   setEnterRadar(false)
    //   // setAnchorEl(null);
    //   // setRadar({...radar, enterRadar:false})
    // }

    //add popover
    // const classes=useStyles()
    // const [anchorEl, setAnchorEl] = useState(null);
    // const handlePopoverOpen = (event) => {
    //   console.log('event in ', event)
    //   setAnchorEl(event.currentTarget);
    //   // setRadar({...radar, anchorEl: event.currentTarget})
    //   // event.stopPropagation()

    // };
    // const handlePopoverClose = () => {
    //   setAnchorEl(null);
    //   // setRadar({...radar, anchorEl: null})
    //   console.log('event out ')

    // };
    // const openPopOver = Boolean(anchorEl);

    return (
        <Box height={400}
            // onMouseEnter={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
        >
            <ReactECharts
                // onEvents={{ 'mouseover': onMouseEnter, 'mouseout' : onMouseOut}}
                // onEvents={{ 'mouseover': handlePopoverOpen, 'mouseout' : handlePopoverClose}}
                option={option} style={{height: '400px', width: '100%'}}
            />
            {/* <Popover
      id="popover"
      open={openPopOver}
      anchorEl={ anchorEl}
      anchorOrigin={{
        vertical: 20,
        horizontal: 0,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      style={{ 
        pointerEvents: 'none', 
      }}
      classes={{paper:classes.popover}}
      // disableRestoreFocus
      disableScrollLock
    >
      <Box p={1} width={370} bgcolor={POPUP_BG_COLOR}>
	hello
      </Box>
    </Popover> */}
        </Box>
    )
}

export const BusinessRadarChart = ({report}) => {
    const {t} = useTranslation();
    const {
        skills, industry, education_experience, work_experience
    } = report.resume_evaluation;
    const option = {
        title: {},
        color: ['rgba(96,239,255, 0.4)'],
        tooltip: {},
        legend: {
            bottom: 10
        },
        radar: {
            radius: '60%',
            splitNumber: 1,
            axisLine: {
                show: false
            },
            splitArea: {
                areaStyle: {
                    color: ['#F8F8F8']
                }
            },
            name: {
                textStyle: {
                    color: '#6A707E',
                    fontSize: 12
                }
            },
            indicator: [
                {name: t('radarchart.workExperience'), max: 100},
                {name: t('radarchart.skills'), max: 100},
                {name: t('radarchart.education'), max: 100},
                {name: t('radarchart.industry'), max: 100}
            ]
        },
        series: [{
            name: t('radarchart.title'),
            symbol: 'none',
            type: 'radar',
            areaStyle: {},
            data: [
                {
                    value: [
                        skills.marking, industry.marking,
                        education_experience.marking,
                        work_experience.marking],
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        textStyle: {width: 200},
                        position: (point, params, dom, rect, size) => ([-10, point[1]]),
                    }
                }
            ]
        }],

    }

    return (
        <Box height={400}
        >
            <ReactECharts
                option={option} style={{height: '400px', width: '100%'}}
            />
        </Box>
    )
}

export const MarketCompetitiveness = ({report}) => {
    const theme = useTheme();
    const {t} = useTranslation();
    const jobtitle = report.market_value_info.matched_job_title

    const jobLevel = 'Senior';
    const competitiveness = 9;

    const {
        format, language, matching: matchLevel, logic,
        format_to_improve, language_to_improve, logic_to_improve, profession_match_to_improve
    } = report.resume_marking_info;

    let format_improve = report.lang === 'cn' ? format_to_improve?.zhs : format_to_improve?.eng;
    format_improve = format < 100 ? format_improve[0] : t('radarchart.Format 100');

    let lang_improve = report.lang === 'cn' ? language_to_improve?.zhs : language_to_improve?.eng;
    lang_improve = language < 100 ? lang_improve[0] : t('radarchart.Language 100');

    let profession_improve = report.lang === 'cn' ? profession_match_to_improve?.zhs : profession_match_to_improve?.eng;
    profession_improve = matchLevel < 100 ? profession_improve[0] : t('radarchart.Match 100');

    let logic_improve = report.lang === 'cn' ? logic_to_improve?.zhs : logic_to_improve?.eng;
    logic_improve = logic < 100 ? logic_improve[0] : t('radarchart.Logic 100');

    const classes = useStyles();

    const ClickSection = () => {
        console.log(report);
        if (!report.hrCheck) {
            return (<Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' mt={-2}
                         mb={-3}>
                {/* <a href={DK_RESUME} target="_blank" style={{textDecoration:'none'}} onClick={() => linkTrack(report.id, DK_RESUME)}>
            <Typography color='primary' className={classes.clicktext} style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
              <Trans
                i18nKey="radarchart.contact"
                components={[<b style={{color: 'red'}}>defaults</b>]}
              />
            </Typography>
          </a> */}
                <Typography color='primary' style={{fontSize: h2, fontWeight: '500', marginRight: 20}}>
                    {/* <a href={DK_RESUME} target="_blank" style={{color:'#0061FF'}} onClick={() => linkTrack(report.id, DK_RESUME)}>
                {t("radarchart.Click here")}
              </a> */}
                    <Button href={DK_RESUME}
                            variant='contained'
                            color='primary'
                            target="_blank"
                            style={{borderRadius: 15, marginRight: 10, height: 30}}
                            onClick={() => linkTrack(report.id, DK_RESUME)}
                    >
                        {t("radarchart.Click here")}
                    </Button>
                    <Trans
                        i18nKey="radarchart.contact"
                        components={[<b>defaults</b>]}
                    />
                </Typography>
                <img src='ai.svg' width={80} height={100} className={classes.ai}/>
                {/* <Link
              href={DK_RESUME}
              target='_blank'
              onClick={() => {linkTrack(report.id, DK_RESUME)}}
            >
              <img src='ai.svg' width={80} height={100} className={classes.ai}/>
            </Link> */}
            </Box>);
        } else {
            return "";
        }
    };

    const FitJobSection = () => {
        if (report.hrCheck) {
            return (
                <Box fontSize={h2} fontWeight='500' color='#000000'>
                    <Trans
                        i18nKey="radarchart.fit job"
                        values={{jobtitle: jobtitle}}
                        components={[<b>defaults</b>]}
                    />
                </Box>
            );
        } else {
            return (
                <>
                    <Box fontSize={h2} fontWeight='500' color='#6A707E'>
                        {/* You seem to be a good fit for <b>{report.market_value_result[0].matched_job_title}</b> at */}
                        <Trans
                            i18nKey="radarchart.fit job"
                            values={{jobtitle: jobtitle}}
                            components={[<b>defaults</b>]}
                        />
                    </Box>
                    <Box fontSize={h3} fontWeight='500' lineHeight='24px' mb={-3}>
                        {/* You are ranked {report.overall_job_level.toLowerCase()} level {report.overall_competitiveness}/10 compared to your competitors. Below are your detailed category of your resume analysis. */}
                        {/* {t('radarchart.rank', {joblevel: jobLevel.toLowerCase(), competitiveness: competitiveness})} */}
                        {t('radarchart.text')}
                    </Box>
                </>
            );
        }
    };

    const PercentageLabels = () => {
        if (report.hrCheck) {
            return (
                <Grid item xs={6}>
                    <Box display='flex' flexDirection="column">
                        <Box display='flex' flexDirection="row">
                            <Box width={100}>
                                <PercentageLabel name={t('radarchart.workExperience')} value={format}
                                                 text={format_improve} mt={6}/></Box>
                            <Box style={{
                                color: '#373b6c',
                                maxWidth: 450,
                                marginTop: 10,
                                display: 'flex',
                                alignItems: 'center'
                            }}>{format_improve}</Box>
                        </Box>
                        <Box display='flex' flexDirection="row">
                            <Box width={100}>
                                <PercentageLabel name={t('radarchart.skills')} value={logic}
                                                 text={logic_improve} mt={6}/></Box>
                            <Box style={{
                                color: '#373b6c',
                                maxWidth: 450,
                                marginTop: 10,
                                display: 'flex',
                                alignItems: 'center'
                            }}>{logic_improve}</Box>
                        </Box>
                        <Box display='flex' flexDirection="row">
                            <Box width={100}>
                                <PercentageLabel name={t('radarchart.education')}
                                                 value={matchLevel} mt={6} width={100}
                                                 text={profession_improve}/></Box>
                            <Box style={{
                                color: '#373b6c',
                                maxWidth: 450,
                                marginTop: 10,
                                display: 'flex',
                                alignItems: 'center'
                            }}>{profession_improve}</Box>
                        </Box>
                        <Box display='flex' flexDirection="row">
                            <Box width={100}>
                                <PercentageLabel name={t('radarchart.industry')} value={language}
                                                 text={lang_improve} mt={6} width={100}/></Box>
                            <Box style={{
                                color: '#373b6c',
                                maxWidth: 450,
                                marginTop: 10,
                                display: 'flex',
                                alignItems: 'center'
                            }}>{lang_improve}</Box>
                        </Box>
                    </Box>
                </Grid>);
        } else {
            return (
                <Grid item xs={4}>
                    <Box display='flex' flexDirection="column" mt={4}>
                        <PercentageLabel name={t('radarchart.Format')} value={format}
                                         text={format_improve}/>
                        <PercentageLabel name={t('radarchart.Logic')} value={logic}
                                         text={logic_improve}/>
                        <PercentageLabel name={t('radarchart.Match Level')}
                                         value={matchLevel}
                                         text={profession_improve}/>
                        <PercentageLabel name={t('radarchart.Language')} value={language}
                                         text={lang_improve}/>
                    </Box>
                </Grid>);
        }
    };

    const boxWidth = !!report.hrCheck ? 6 : 8;

    return (
        <Section>
            <Box p={4}>
                <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                    {t('radarchart.title')}
                </Box>
                <FitJobSection></FitJobSection>
                {/* <Box fontSize='36px' fontWeight='500' color={theme.palette.primary.main}>
          {jobLevel}
        </Box> */}
                <Grid container>
                    <Grid item xs={boxWidth}>
                        <RadarChart report={report}/>
                    </Grid>
                    <PercentageLabels hrCheck={report.hrCheck}></PercentageLabels>
                </Grid>

                {/* click section */}
                <ClickSection></ClickSection>
            </Box>
        </Section>
    )
};

export const BusinessMarketCompetitiveness = ({report}) => {
    const {t} = useTranslation();
    const jobTitle = report.job_title;
    console.log(report);
    const {
        skills, industry, education_experience, work_experience
    } = report.resume_evaluation;

    let format_improve = skills.reason;
    let lang_improve = industry.reason;
    let profession_improve = education_experience.reason;
    let logic_improve = work_experience.reason;
    console.log(format_improve, lang_improve,
        profession_improve, logic_improve);

    const FitJobSection = () => {
        return (
            <Box fontSize={h2} fontWeight='500' color='#000000'>
                <Trans
                    i18nKey="radarchart.fit job"
                    values={{jobtitle: jobTitle}}
                    components={[<b>defaults</b>]}
                />
            </Box>
        );
    };

    const PercentageLabels = () => {
        return (
            <Grid item xs={6}>
                <Box display='flex' flexDirection="column">
                    <Box display='flex' flexDirection="row">
                        <Box width={100}>
                            <PercentageLabel name={t('radarchart.workExperience')}
                                             value={work_experience.marking}
                                             text={format_improve} mt={6}/></Box>
                        <Box style={{
                            color: '#373b6c',
                            maxWidth: 450,
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center'
                        }}>{format_improve}</Box>
                    </Box>
                    <Box display='flex' flexDirection="row">
                        <Box width={100}>
                            <PercentageLabel name={t('radarchart.skills')} value={skills.marking}
                                             text={logic_improve} mt={6}/></Box>
                        <Box style={{
                            color: '#373b6c',
                            maxWidth: 450,
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center'
                        }}>{logic_improve}</Box>
                    </Box>
                    <Box display='flex' flexDirection="row">
                        <Box width={100}>
                            <PercentageLabel name={t('radarchart.education')}
                                             value={education_experience.marking} mt={6} width={100}
                                             text={profession_improve}/></Box>
                        <Box style={{
                            color: '#373b6c',
                            maxWidth: 450,
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center'
                        }}>{profession_improve}</Box>
                    </Box>
                    <Box display='flex' flexDirection="row">
                        <Box width={100}>
                            <PercentageLabel name={t('radarchart.industry')}
                                             value={industry.marking}
                                             text={lang_improve} mt={6} width={100}/></Box>
                        <Box style={{
                            color: '#373b6c',
                            maxWidth: 450,
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center'
                        }}>{lang_improve}</Box>
                    </Box>
                </Box>
            </Grid>);
    };

    return (
        <Section>
            <Box p={4}>
                <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                    {t('radarchart.title')}
                </Box>
                <FitJobSection></FitJobSection>
                <Grid container>
                    <Grid item xs={6}>
                        <BusinessRadarChart report={report}/>
                    </Grid>
                    <PercentageLabels></PercentageLabels>
                </Grid>
            </Box>
        </Section>
    )
};
