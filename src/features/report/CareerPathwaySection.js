import {Box, Link, Typography, Button} from '@material-ui/core'
import {useEffect, useState, useLayoutEffect} from 'react'
import {Section} from '../../components/Section'
import {makeStyles} from '@material-ui/core/styles'
import {formatter} from '../../untils/currency'
import {useTranslation} from 'react-i18next'
import {h1, h2, h3, h4, h5} from '../../constant/fontsize'
import {DK_LINK} from '../../constant/externalURLs'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '500',
        zIndex: '10',
        cursor: 'pointer',
        height: '80px',
        position: 'absolute',
        color: 'white',
        // transition: 'all 0.6s ease',
        // background: ({ noBackgroundColor, selected, background }) => noBackgroundColor ? 'inherit' : (selected ? background : '#E0E0E0'),
        '&:hover': {
            backgroundColor: ({noBackgroundColor}) => noBackgroundColor ? 'inherit' : '#49648A',
            color: 'white'
            // '& .salary': {
            //   color: '#ccc'
            // }
            // border: '2px solid #49648A'
        }

    }

})

const CareerBlock = ({countryCode, name, salary, top, left, selected, noBackgroundColor, onClick, style, background}) => {
    const classes = useStyles({noBackgroundColor, selected, background})
    return (
        <Box
            className={classes.root}
            p={2}
            top={top}
            left={left}
            onClick={onClick}
            style={{
                background: noBackgroundColor ? 'white' : (selected ? background : '#E0E0E0'),
                borderRadius: noBackgroundColor ? '0' : '20px',
                width: noBackgroundColor ? '100px' : '180px'

                // ...style
            }}

        >
            <Box>
                {/* <Box className='title' fontSize={h4} color={noBackgroundColor ? (selected ? '#024CC3' : '#6A707E') : 'inherit'}> */}
                <Box className='title' fontSize={h4} color={selected ? 'white' : 'black'}>
                    {name}
                </Box>
                <Box className='salary' fontSize={h5} color={selected ? 'white' : 'black'}>
                    Approx. {formatter(countryCode).format(salary)}
                </Box>
            </Box>

        </Box>
    )
}

const CareerOriginBlock = ({countryCode, name, salary, top, left, selected, noBackgroundColor, onClick, low, high}) => {
    const classes = useStyles({noBackgroundColor, selected})
    return (
        <Box
            className={classes.root}
            p={2}
            top={top}
            left={left}
            onClick={onClick}
            style={{
                backgroundColor: 'white',
                filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.44))',
                width: '180px',
                borderRadius: '20px'
            }}
        >
            <Box>
                <Box className='title' fontSize={h3} color='black'>
                    {name}
                </Box>
                <Box className='salary' fontSize={h5} color='#6A707E'>
                    {/* {formatter(countryCode).format(salary)} */}
                    {formatter(countryCode).format(low)} ~ {formatter(countryCode).format(high)}
                </Box>
            </Box>

        </Box>
    )
}

const Aaaaa = ({selected, left: v}) => {
    const left = v > 600 ? v : 600
    const path = `M0.55886 189.392L50.003 180.469C87.7589 166.581 126.729 155.665 138.138 117.088V117.088C154.025 83.3643 183.164 36.34 249.186 45.8839L${left} 45.8839`
    // const path = `M8.55886 219.392L60.003 200.469L800 23`
    return (
        // <svg width='500' height='241' viewBox='0 0 614 241' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <svg width={left} height='241' viewBox='0 0 614 241' fill='none' xmlns='http://www.w3.org/2000/svg'>
            {/* <path d='M8.55886 219.392L60.003 200.469C97.7589 186.581 126.729 155.665 138.138 117.088V117.088C154.025 63.3643 203.164 26.34 259.186 25.8839L613.377 23' stroke={selected ? 'url(#paint0_linear)' : '#F2F2F2'} strokeWidth='45' /> */}
            <path d={path} stroke={selected ? 'url(#paint0_linear)' : 'url(#paint0_linear1)'} strokeWidth='30'/>
            <defs>
                {/* <linearGradient id='paint0_linear' x1='7.77943' y1='123.665' x2='500' y2='118.727' gradientUnits='userSpaceOnUse'> */}
                <linearGradient id='paint0_linear' x1='7.77943' y1='123.665' x2={left} y2='118.727'
                                gradientUnits='userSpaceOnUse'>
                    {/* <stop offset='0.114583' stopColor='#F2F1F1' />
          <stop offset='0.401042' stopColor='#46EBD5' />
          <stop offset='0.635417' stopColor='#60EFFF' />
          <stop offset='1' stopColor='#0061FF' /> */}
                    <stop offset='0.114583' stopColor='rgba(96,239,255, 0.4)'/>
                    <stop offset='0.401042' stopColor='#66FFCC'/>
                    <stop offset='0.635417' stopColor='#60EFFF'/>
                    <stop offset='1' stopColor='#0099cc'/>
                </linearGradient>
                <linearGradient id='paint0_linear1' x1='7.77943' y1='123.665' x2={left} y2='118.727'
                                gradientUnits='userSpaceOnUse'>
                    <stop offset='0.114583' stopColor='#f2f2f2'/>
                    <stop offset='0.401042' stopColor='#f2f2f2'/>
                    <stop offset='0.635417' stopColor='#f2f2f2'/>
                    <stop offset='1' stopColor='#f2f2f2'/>
                </linearGradient>
            </defs>
        </svg>

    )
}

const Aaaab = ({selected, left: v}) => {
    const left = v > 500 ? v : 500
    const path = `M19.9999 50.9863C8.95427 50.9644 0.0178244 41.9922 0.0398119 30.9466L0.0616022 20C0.0835897 8.95429 9.0557 0.0178369 20.1014 0.0398244L362.868 0.722135L705.635 1.40445C716.681 1.42643 725.617 10.3985 725.595 21.4442L725.573 32.3908C725.551 43.4365 716.579 52.373 705.534 52.351L19.9999 50.9863Z`
    return (
        // <svg width={left} height='43' viewBox='0 0 726 53' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <svg width={left + 40} height='30' viewBox='0 0 726 33' fill='none'
             xmlns='http://www.w3.org/2000/svg'>
            {/* <path d='M19.9999 50.9863C8.95427 50.9644 0.0178244 41.9922 0.0398119 30.9466L0.0616022 20C0.0835897 8.95429 9.0557 0.0178369 20.1014 0.0398244L362.868 0.722135L705.635 1.40445C716.681 1.42643 725.617 10.3985 725.595 21.4442L725.573 32.3908C725.551 43.4365 716.579 52.373 705.534 52.351L19.9999 50.9863Z' fill={selected ? 'url(#paint0_linear)' : '#F2F2F2'} /> */}
            <path d={path} fill={selected ? 'url(#paint0_linear)' : 'url(#paint0_linear1)'}/>
            <defs>
                <linearGradient id='paint0_linear' x1='0.77943' y1='123.665' x2='500' y2='118.727'
                                gradientUnits='userSpaceOnUse'>
                    {/* <stop offset='0.114583' stopColor='#F2F1F1' />
          <stop offset='0.141042' stopColor='#46EBD5' />
          <stop offset='0.635417' stopColor='#60EFFF' />
          <stop offset='1' stopColor='#0061FF' /> */}
                    <stop offset='0.114583' stopColor='rgba(96,239,255, 0.4)'/>
                    <stop offset='0.141042' stopColor='#66FFCC'/>
                    <stop offset='0.635417' stopColor='#60EFFF'/>
                    <stop offset='1' stopColor='#0099cc'/>
                </linearGradient>

                <linearGradient id='paint0_linear1' x1='0.77943' y1='123.665' x2='500' y2='118.727'
                                gradientUnits='userSpaceOnUse'>
                    <stop offset='0.114583' stopColor='#f2f2f2'/>
                    <stop offset='0.141042' stopColor='#f2f2f2'/>
                    <stop offset='0.635417' stopColor='#f2f2f2'/>
                    <stop offset='1' stopColor='#f2f2f2'/>
                </linearGradient>
            </defs>
        </svg>

    )
}

const CareerSinglePath = ({countryCode, tops, lefts, careerPath, position, selected, onClick}) => {
    const [type, nextLevel, furtherLevel] = careerPath

    return (
        <>
            {/* career path 1 */}
            {nextLevel.title && furtherLevel.title && (
                <CareerBlock
                    countryCode={countryCode}
                    name={nextLevel.title}
                    salary={nextLevel.salary}
                    top={tops[position]}
                    left={lefts[1]}
                    selected={selected}
                    onClick={onClick}
                    // background='linear-gradient(90deg, #46EBD5 10.16%, #60EFFF 92.75%)'
                    background='linear-gradient(90deg, #46EBD5 10.16%, #60EFFF 92.75%)'
                />
            )}
            {(nextLevel.title || furtherLevel.title) && (
                <CareerBlock
                    countryCode={countryCode}
                    name={furtherLevel.title ?? nextLevel.title}
                    salary={furtherLevel.title ? furtherLevel.salary : nextLevel.salary}
                    top={tops[position]}
                    left={lefts[2]}
                    selected={selected}
                    onClick={onClick}
                    // background='linear-gradient(90.07deg, #1883FF 0.07%, #0E15AD 99.99%)'
                    background='linear-gradient(90.07deg, #1883FF 0.07%, #0099cc 99.99%)'
                />
            )}
            {/* <CareerBlock
        name={type}
        top={tops[position] + 10}
        left={lefts[3]-250}
        noBackgroundColor
        onClick={onClick}
        selected={selected}
      /> */}

        </>
    )
}

const selectCareerPath = (career) => {
    const next0 = career.projected_career_path[0] || {}
    const next1 = career.projected_career_path[1] || {market_avg_salary: {}}
    if (!career.projected_career_path[1]) {
        return [next0.type, {}, {
            title: next0.title,
            salary: next0.market_avg_salary.fulltime
        }]
    } else {
        return [next0.type, {
            title: next0.title,
            salary: next0.market_avg_salary.fulltime
        }, {
            title: next1.title,
            salary: next1.market_avg_salary.fulltime
        }]
    }
}

export function CareerPathwaySection({report, selectedPathIndex, setSelectedPathIndex}) {
    // const tops = [10, 146, 290]
    // const lefts = [30, 230, 480, 765]
    const tops = [25, 146, 275]
    let width = document.getElementById('career_pathway')?.getBoundingClientRect().width
    const [lefts, setLefts] = useState([30, 230, 480, 765])

    const resize = () => {
        width = document.getElementById('career_pathway')?.getBoundingClientRect().width ?? width;
        setLefts([25 + 0.1 * width, 0.3 * width, 0.7 * width, 0.7 * width])
    }
    useEffect(() => {
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, [])
    useLayoutEffect(() => {
        resize()
    }, []);

    const careerPath = report.career_path_info.career_paths
    // const curJobTitle = report.market_value_info.matched_job_title
    const curJobTitle = careerPath.name
    const curFulltimeSalary = report.market_value_info.full_time_market_info
    const paths = careerPath.path
    const {low, high} = report.market_value_info.predicted_full_time_salary
    const market_value_result = paths.map(path => {
        const curLevel = {title: path.name, market_avg_salary: {fulltime: path.salary.market_avg_salary_fulltime}}
        const level2 = path.next_level //第2个job Block存在
        const nextLevel = level2 ? {
            title: level2.name,
            market_avg_salary: {fulltime: level2.salary.market_avg_salary_fulltime}
        } : null
        const projected_career_path = level2 ? [curLevel, nextLevel] : [curLevel]
        return {projected_career_path}
    })
// const market_value_result = [
//   {projected_career_path:[{type:'1', title:'hello1', market_avg_salary:{fulltime:100}}, {type:'1', title:'hello4', market_avg_salary:{fulltime:100}}]},
//   {projected_career_path:[{type:'1', title:'hello2', market_avg_salary:{fulltime:100}}, {type:'1', title:'hello5', market_avg_salary:{fulltime:100}}]},
//   {projected_career_path:[{type:'1', title:'hello3', market_avg_salary:{fulltime:100}}, {type:'1', title:'hello6', market_avg_salary:{fulltime:100}}]},
//   {projected_career_path:[{type:'1', title:'hello2', market_avg_salary:{fulltime:100}}]},

//   {projected_career_path:[{type:'1', title:'hello3', market_avg_salary:{fulltime:100}}]},

// ]
    const numOfPaths = market_value_result.length
    const [pathPosition, setPathPosition] = useState(numOfPaths === 1 ? 1 : 0) //0: 高亮第一条path  1: 高亮中间path  2:高亮最下面path
    let listOfPathIndex //指定从每条path对应的数据的Index, -1 代表该path不显示
    switch (numOfPaths) {
        case 0: //没有数据
            listOfPathIndex = [-1, -1, -1] //只有一条数据, 放中间
            break;
        case 1:
            listOfPathIndex = [-1, 0, -1] //只有一条数据, 第一条数据放中间
            break;
        case 2:
            listOfPathIndex = [0, -1, 1] //2条数据, 放第一个和最后一个
            break;
        case 3: //3条或者3条以上
        default:
            listOfPathIndex = [0, 1, 2]   //3条数据 都放
            break;

    }
    const {t} = useTranslation()
    const scrollToSection = () => {
        // document.getElementById("course_section").scrollIntoView();
    }
    return (
        <Section>
            <Box p={4} style={{minWidth: 790, width: '100vw'}} mr={-8} id='pathwaybox'>
                <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3' flexGrow='1'>
                    {t("career_pathway.title")}
                </Box>
                <Box
                    p={2} width='100%' height='400px' position='relative'
                >
                    {/* <CareerOriginBlock name={market_value_result[0].matched_job_title} salary={market_value_result[0].fulltime.market_avg} top={150} left={0} /> */}
                    <CareerOriginBlock
                        countryCode={report.countryCode}
                        // name={curJobTitle} salary={curFulltimeSalary.avg} top={150} left={0} />
                        // name={curJobTitle} salary={curFulltimeSalary.avg} top={150} left={ width > 1200 ? 130  : width> 1100 ? 100 : width > 1000? 80 : width> 980 ? 50 : width> 800 ? 30: 0} />
                        name={curJobTitle} salary={curFulltimeSalary.avg} top={150}
                        low={low} high={high}
                        left={width > 800 ? (width - 800) * 0.3 : 0}/>

                    {/* career path 1 */}
                    {listOfPathIndex[0] != -1 &&
                    <CareerSinglePath
                        countryCode={report.countryCode}
                        tops={tops}
                        lefts={lefts}
                        position={0}
                        selected={pathPosition === 0}
                        careerPath={selectCareerPath(market_value_result[listOfPathIndex[0]])}
                        onClick={() => {
                            setSelectedPathIndex(listOfPathIndex[0]);
                            setPathPosition(0);
                            scrollToSection()
                        }}
                    />}
                    {listOfPathIndex[1] != -1 && (
                        <CareerSinglePath
                            countryCode={report.countryCode}
                            tops={tops}
                            lefts={lefts}
                            position={1}
                            selected={pathPosition === 1}
                            careerPath={selectCareerPath(market_value_result[listOfPathIndex[1]])}
                            onClick={() => {
                                setSelectedPathIndex(listOfPathIndex[1]);
                                setPathPosition(1);
                                scrollToSection()
                            }}
                        />
                    )}
                    {listOfPathIndex[2] != -1 && <CareerSinglePath
                        countryCode={report.countryCode}
                        tops={tops}
                        lefts={lefts}
                        position={2}
                        selected={pathPosition === 2}
                        careerPath={selectCareerPath(market_value_result[listOfPathIndex[2]])}
                        onClick={() => {
                            setSelectedPathIndex(listOfPathIndex[2]);
                            setPathPosition(2);
                            scrollToSection()
                        }}
                    />}
                    {listOfPathIndex[0] != -1 &&
                    // <Box top='-10px' left='50px' position='absolute' zIndex={2}>
                    // <Box top='20px' left={width < 500 ? 50 : width> 800? 0 : 40} position='absolute' zIndex={2}>
                    <Box top='20px' left={50} position='absolute' zIndex={2}>
                        <Aaaaa selected={pathPosition === 0} left={lefts[2]}/>
                    </Box>}
                    {listOfPathIndex[1] != -1 && (
                        <Box top='173px' left='100px' position='absolute' zIndex={3}>
                            <Aaaab selected={pathPosition === 1} left={lefts[2]}/>
                        </Box>
                    )}
                    {listOfPathIndex[2] != -1 &&
                    // <Box top='145px' left='50px' position='absolute' zIndex={2} style={{ transform: 'rotateX(180deg)' }}>
                    // <Box top='130px' left={width < 500 ? 50 : width> 800? 0 : 40} position='absolute' zIndex={2} style={{ transform: 'rotateX(180deg)' }}>
                    <Box top='120px' left='50px' position='absolute' zIndex={2} style={{transform: 'rotateX(180deg)'}}>
                        <Aaaaa selected={pathPosition === 2} left={lefts[2]}/>
                    </Box>
                    }
                </Box>

                {/* <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Typography color='primary' style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
            {t('career_pathway.contact')}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AccountCircleIcon />}
              href={DK_LINK}
              target='_blank'
              color='primary'
              size='large'
              style={{borderRadius:20, width:150 }}
            >
              {t('contact.click me')}
            </Button>
          </Box>
        </Box> */}
            </Box>
        </Section>
    )
}
