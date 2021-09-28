import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { Box, LinearProgress, Typography } from '@material-ui/core';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export function LinearWithValueLabel(props) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            // always set loading progress into 100 if it exceed 100 
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + ((1/props.loadingTime)*100)));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={(progress)} maxValue={100} />
        </Box>
    );
}