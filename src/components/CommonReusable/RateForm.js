import {useTranslation} from "react-i18next";
import {
    APP_END_POINT_B_AND_C,
    APP_END_POINT_CUSTOMER_REPORT_ACCURACY,
    X_API_KEY_B_AND_C, X_API_KEY_HISTORY
} from "../../constant/externalURLs";
import {h4} from "../../constant/fontsize";
import Rating from "@material-ui/lab/Rating";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import {Section} from "../Section";
import {useEffect, useState} from "react";

export const RateForm = ({onCancel, formik, hrid, jobid, email, requestHandler, defaultValue, rated}) => {
    const {t} = useTranslation();
    const [rating, setRating] = useState({rated: false, value: defaultValue});
    const submitRating = async () => {
        console.log('submit attempt');
        const endPoint = (hrid && jobid) ? (APP_END_POINT_B_AND_C + 'report_accuracy') : APP_END_POINT_CUSTOMER_REPORT_ACCURACY;
        const dcc = (hrid && jobid) ? X_API_KEY_B_AND_C : X_API_KEY_HISTORY;
        try {
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
            alert(t("rating.rated_msg"));
            onCancel();
        } catch (e) {
            alert(t("rating.failed_msg") + e.toString());
            onCancel();
        }
    };
    // create new custom style rating (with transparent stars just like if its disabled)
    // use the disable style rating when its already rated, otherwise use normal rating
    // const CustomRating = () => {
    //     if (!formik.values || !formik.values.rated) {
    //     }
    //
    //     return <DisabledStyleRating name="simple-controlled"
    //                                 value={rating.value}
    //                                 onChange={(event, value) => {
    //                                     const newValue = value ?? defaultValue;
    //                                     setRating({rated: true, value: newValue});
    //                                 }}/>
    // };

    return (
        <Box style={{
            width: 650, marginLeft: 'auto', marginRight: 'auto',
            marginTop: 200
        }}>
            <Section style={{padding: 20}}>
                {/* mark in stars */}
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                    <div>
                        <Typography color='primary'>Rate the accuracy of this report</Typography>
                        <Rating
                            name="simple-controlled"
                            value={formik.values.rate}
                            onChange={(event, value) => {
                                formik.values.rate = value ?? defaultValue;
                                setRating({rated: true, value: formik.values.rate});
                            }}
                        />
                    </div>
                    { /* Rated Msg Section */}
                    {
                        (!!rated) ?
                            <h4>{t("rating.rated_msg")}</h4> : ""
                    }
                </Box>

                {/* comment section */}
                <Box style={{marginTop: 10, marginBottom: 10}}>
                    <Typography color='primary'>
                        Help us improve by leaving your comments and suggestions below: </Typography>
                    <TextField id="comments" size='small' name='comments'
                               fullWidth variant="outlined" rowsMax={15} rows={5}
                               multiline
                               style={{
                                   opacity: (rated ? 0.5 : 1)
                               }}
                               value={formik.values.comments}
                               onChange={formik.handleChange}
                               helperText={formik.touched.comments && formik.errors.comments}
                               onBlur={formik.handleBlur}
                               placeholder="Your comments."/>
                </Box>

                {/* submit and cancel button */}
                <Box style={{marginTop: 10, marginBottom: 10, textAlign: 'right'}}>
                    <Button variant='contained'
                            color='primary'
                            target="_blank"
                            style={{
                                borderRadius: 15, marginLeft: 10, height: 30,
                            }}
                            onClick={() => {
                                console.log('clicked');
                                onCancel();
                            }}
                    >
                        {t("rating.cancel_button")}
                    </Button>
                    <Button variant='contained'
                            color='primary'
                            disabled={formik.errors.required}
                            target="_blank"
                            style={{
                                borderRadius: 15, marginLeft: 10, height: 30,
                            }}
                            onClick={() => submitRating(formik)}
                    >
                        {t("rating.submit_button")}
                    </Button>
                </Box>
            </Section></Box>
    );
};

