import {Trans, useTranslation} from "react-i18next";
import {Box, Grid} from "@material-ui/core";
import {h, h2} from "../../constant/fontsize";
import {PercentageLabel} from "../../components/PercentageLabel";
import {Section} from "../../components/Section";
import ReactECharts from "echarts-for-react";

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
                {name: t('b_radarchart.education'), max: 100},
                {name: t('b_radarchart.industry'), max: 100},
                {name: t('b_radarchart.workExperience'), max: 100},
                {name: t('b_radarchart.skills'), max: 100}
            ]
        },
        series: [{
            name: t('b_radarchart.title'),
            symbol: 'none',
            type: 'radar',
            areaStyle: {},
            data: [
                {
                    value: [
                        education_experience.marking, industry.marking,
                        work_experience.marking, skills.marking],
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
        <Box height={400}>
            <ReactECharts
                option={option} style={{height: '400px', width: '100%'}}
            />
        </Box>
    )
}

export const BusinessMarketCompetitiveness = ({report}) => {
    const {t} = useTranslation();
    const jobTitle = report.job_title;
    console.log(report);
    const {
        skills, industry, education_experience, work_experience
    } = report.resume_evaluation;

    let skills_improve = skills.reason;
    let industry_improve = industry.reason;
    let education_improve = education_experience.reason;
    let experience_improve = work_experience.reason;
    console.log(skills_improve, industry_improve,
        education_improve, experience_improve);

    const FitJobSection = () => {
        return (
            <Box fontSize={h2} fontWeight='500' color='#000000'>
                <Trans
                    i18nKey="b_radarchart.fit job"
                    values={{jobtitle: jobTitle}}
                    components={[<b>defaults</b>]}
                />
            </Box>
        );
    };

    const BarElement = ({percentage, text}) => {
        const widthInPercentage = (0.85 * percentage) + '%';
        return (<Box height={30}
                     display={'flex'} justifyContent={'space-between'}
                     style={{
                         width: widthInPercentage,
                         backgroundColor: '#194fbc', color: '#ffffff',
                         boxShadow: '1px 3px 5px 2px rgba(89,121,181,0.8)'
                     }}>
            <Box style={{margin: 5}}>{text}</Box>
            <Box style={{margin: 5}}>{percentage}%</Box>
        </Box>);
    }

    const PercentageLabels = () => {
        return (
            <Box style={{width: '70%'}}>
                <br/>
                <br/>
                <BarElement percentage={work_experience.marking} text={t('b_radarchart.workExperience')}/>
                <Box style={{
                    color: '#373b6c',
                    maxWidth: 450,
                    marginTop: 10,
                    display: 'flex'
                }}>{experience_improve}</Box>

                <br/>
                <BarElement percentage={education_experience.marking} text={t('b_radarchart.education')}/>
                <Box style={{
                    color: '#373b6c',
                    maxWidth: 450,
                    marginTop: 10,
                    display: 'flex'
                }}>{education_improve}</Box>
                <br/>

                <BarElement percentage={skills.marking} text={t('b_radarchart.skills')}/>
                <Box style={{
                    color: '#373b6c',
                    maxWidth: 450,
                    marginTop: 10,
                    display: 'flex'
                }}>{skills_improve}</Box>


                <br/>
                <BarElement percentage={industry.marking} text={t('b_radarchart.industry')}/>
                <Box style={{
                    color: '#373b6c',
                    maxWidth: 450,
                    marginTop: 10,
                    display: 'flex'
                }}>{industry_improve}</Box>
            </Box>);
    };

    return (
        <Section>
            <Box p={4}>
                <Box fontSize={h} fontWeight='500' lineHeight='42px' color='rgba(2, 76, 195, 1)'>
                    {t('b_radarchart.title')}
                </Box>
                <FitJobSection></FitJobSection>
                <Box container style={{display: 'flex'}}>
                    <PercentageLabels></PercentageLabels>
                    <Box style={{width: '30%'}}>
                        <BusinessRadarChart report={report}/>
                    </Box>
                </Box>
            </Box>
        </Section>
    )
};
