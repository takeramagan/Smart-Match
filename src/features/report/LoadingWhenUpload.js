import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@material-ui/core';

import { LinearWithValueLabel as ProgressBar } from "../../components/CommonReusable/LinearProgressBar";


export function LoadingPage(props) {
    const { t } = useTranslation();
    const logo = 'metisign.png';

    return (
        <Box style={{ borderRadius: '24px' }} py={18} justify="center" >
            {/* Ads part */}
            <Box style={{ background: 'linear-gradient(135deg, #b3dced 0%,#50e0e0 0%,#ffffff 75%,#ffffff 89%,#50e0e0 100%)' }} my={2} >
                {/* Logo */}
                <Grid container direction="row" alignItems="center" justify="center" spacing={1}>
                    <Grid item>
                        <img id='image0' style={{ width: 70, height: 70 }} src={logo} />
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: '24px', fontWeight: '500' }}>
                            {"MetiSign"}
                        </Typography>
                        <Typography style={{ fontSize: '14px', fontWeight: '500' }}>
                            {"STAFFING COMPANY"}
                        </Typography>
                    </Grid>
                </Grid>
                {/* Ads text */}
                <Typography style={{ fontSize: '36px', fontWeight: '600' }}>
                    {"We Find. We Match."}
                </Typography>
                <Typography style={{ fontSize: '36px', fontWeight: '600' }}>
                    {"We Serve. We Thrive"}
                </Typography>
            </Box>
            {/* Loading bar part*/}
            <Box m={5} >
                <Box style={{ color: 'rgba(0, 97, 255, 1)', fontSize: '24px', fontWeight: '500', margin: "24px"}}>
                    {props.title}
                </Box>
                {/* {props.content} */}
                <ProgressBar loadingTime={props.loadingTime}></ProgressBar>
            </Box>
        </Box>
    )
}