// import react hook
import { useState } from 'react';
/* import libs */
// import mui components
import { Box, Button, Modal, TextField, Chip, makeStyles, MenuItem } from "@material-ui/core";
// import incons
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
// import nextjs router
import { useRouter } from "next/router";
// import toast
import { toast } from 'react-toastify';
// import custom component
import { Section } from "../../components/Section";
// import custom style
import { h2 } from '../../constant/fontsize';
import { COLOR_TITLE } from "../../constant/color";
import { toastStyle } from "../../constant/constant";
// import axios custom hook
import { useRequest } from "../../hooks/useRequest";
/* import constants */
import { RESUME_INVITE, RESUME_REJECTED } from "../../constant/jobstatus";
// import API 
import { APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C } from "../../constant/externalURLs";

// import reuse custom function
import checkLink from "../../untils/checkLink";

// import reusable components
import { SubmitAndCancel } from "../../components/CommonReusable/SubmitAndCancel";


export const Operations = ({ applicantId, jobId, onReject, email, refreshPage }) => {
    const [showRejectReason, setShowRejectReason] = useState(false);
    // const rejectReasonOptions = [ "工作技能不匹配", "工作经历不匹配", "项目经验太少", "简历格式混乱", "简历逻辑不清"];
    const rejectReasonOptions = ["Skills do not match", "Work experiences do not match", "Not enough project experience",
        "Resume structure unclear", "Not enough hands-on skills"];
    const [rejectReasons, setRejectReasons] = useState(0); //bit indicates selected or not
    const [otherReason, setOtherReason] = useState("");
    const [otherBlur, setOherBlur] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [inviteBlur, setInviteBlur] = useState(false);
    // const styles = useStyles()

    const [showInvite, setShowInvite] = useState(false);

    const operationRequest = useRequest();
    const params = useRouter().query;
    const hrId = params.id ?? 1;

    /**
     *
     * @param {k:v} data :
     * @param {number} application_status 0: default value 1: resume rejected
     * @returns
     */
    const getOperationConfig = (data, application_status = 0) => {
        const formData = new FormData();
        formData.append('userid', applicantId ?? 20);
        formData.append('email', email);
        formData.append('hrid', hrId);
        formData.append('jobid', jobId ?? 1);
        formData.append('dcc', X_API_KEY_B_AND_C);
        formData.append('updates', JSON.stringify(data));
        formData.append('application_status', application_status); //0: default state 1: reject
        console.log("application status= ", application_status);
        // application_status !== 1 ?? formData.append('invite_description', inviteDescription) //0: default state 1: reject
        return ({
            method: 'post',
            url: APP_END_POINT_B_AND_C + 'update_application',
            data: formData
        });
    };

    const rejectReasonToString = () => {
        let reason = [];
        for (let i = 0; i < rejectReasonOptions.length; i++) {
            if (rejectReasons & (1 << i)) {
                reason = [...reason, rejectReasonOptions[i]];
                console.log(reason)

            }
        }

        if (otherReason) reason = [...reason, otherReason];
        return reason.join(" ")
    };

    const onCloseModal = () => {
        setShowRejectReason(false);
        setOherBlur(false);
    };

    const checkReasons = () => (otherReason.trim() || rejectReasons);

    const onSubmit = async () => {
        if (!checkReasons()) {
            setOherBlur(true)
        } else {
            try {
                const rejectReason = rejectReasonToString();
                console.log("reject reason", rejectReason);
                // const status = JSON.stringify()
                const resp = await operationRequest.requestHandler(getOperationConfig({
                    action: RESUME_REJECTED,
                    info: rejectReason
                }, 1));
                console.log("reject = ", resp);
                if (resp.status === 'success') {
                    onReject();
                    onCloseModal();
                    console.log("reject succ");
                } else {
                    console.log("reject error");
                    toast.error('Network Error, please retry', toastStyle);
                }
            } catch (e) {
                console.error("error while reject");
                console.error(e);
                toast.error('Network Error, please retry', toastStyle);
            }
            console.log(otherReason)
        }
    };

    const onSelectReason = (i) => {
        setRejectReasons(v => {
            return (v ^ (1 << i))
        }) //对应该位取反
    };

    const onOtherReason = (e) => {
        setOtherReason(e.target.value)
    };

    const onSubmitInvite = async () => {
        if (!checkLink(inviteLink) || !(checkDescription(inviteDescription))) {
            setInviteBlur(true);
            setDescBlur(true);
            console.log("false")
        } else {

            try {
                // const status = JSON.stringify({status: RESUME_INVITE, info: inviteLink.trim()})
                await operationRequest.requestHandler(getOperationConfig({
                    action: RESUME_INVITE, info: inviteLink.trim(),
                    description: inviteDescription
                }));
                onCloseInviteModal();
                refreshPage()
            } catch (e) {
                console.error("error while submit link")
            }
        }
    };

    const onCancelInvite = () => {
        onCloseInviteModal();
    };

    const onCloseInviteModal = () => {
        setShowInvite(false);
        setInviteBlur(false);
    };

    const [inviteDescription, setInviteDescription] = useState();
    const [descBlur, setDescBlur] = useState(false);
    const onChangeLink = (e) => {
        setInviteLink(e.target.value.trim());
    };
    const onChangeDescription = (e) => setInviteDescription(e.target.value);
    const checkDescription = (description) => (description?.trim());

    return (
        <Box>
            <Button onClick={() => setShowInvite(true)}>Invite <GroupAddIcon color="primary" /></Button>
            <Button onClick={() => setShowRejectReason(true)}>Reject <CloseIcon color="error" /></Button>
            <Modal open={showInvite} onClose={onCloseInviteModal}>
                <Box mt={10} ml='auto' mr='auto' width="80%">
                    <Section>
                        <Box p={4}>
                            {/* <InlineWidget url="https://calendly.com/176237421/interview" /> */}
                            {/* <InlineWidget url="https://calendly.com/acmesales" /> */}
                            Please generate your invite link via
                            <a href='http://calendly.com' target='_blank'>Calendly</a>,
                            <a href='https://calendar.google.com/' target='_blank'>Google calendar</a> or
                            other tools and paste your link below
                            <TextField placeholder='Paste your invite link here'
                                onChange={onChangeLink}
                                fullWidth
                                value={inviteLink}
                                onBlur={() => setInviteBlur(true)}
                            />
                            <ErrorText visible={(inviteBlur && !checkLink(inviteLink))}
                                text='Please enter a valid invite link: http(s)://...' />
                            <TextField
                                label="Invitation description" variant="outlined"
                                placeholder='Please enter your description about this invitation'
                                onChange={onChangeDescription}
                                fullWidth value={inviteDescription}
                                multiline
                                rows={2}
                                rowsMax={4}
                                onBlur={() => setDescBlur(true)}
                            />
                            <ErrorText visible={(descBlur && !checkDescription(inviteDescription))}
                                text='Description is empty' />
                            <SubmitAndCancel onSubmit={onSubmitInvite} onCancel={onCancelInvite} />
                        </Box>
                    </Section>
                </Box>
            </Modal>
            <Modal open={showRejectReason} onClose={onCloseModal}>
                <Box mt={10} ml='auto' mr='auto' width='60%'>
                    <Section>
                        <Box p={4}>
                            <Box fontSize={h2} color={COLOR_TITLE}>Choose the reason</Box>
                            <Box mt={2} display='flex' flexWrap="wrap" style={{ maxWidth: '100%' }}>
                                {rejectReasonOptions.map((v, i) =>
                                    <Chip
                                        clickable
                                        onClick={() => onSelectReason(i)}
                                        key={v}
                                        label={v} style={{
                                            marginRight: 18,
                                            color: (rejectReasons >> i & 1) ? '#ffffff' : 'black',
                                            backgroundColor: (rejectReasons >> i & 1) ? COLOR_TITLE : '#ffffff',
                                            filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                                            margin: '8px 4px',
                                            overflowAnchor: "auto",
                                        }}
                                    />
                                )}

                            </Box>
                            <Box display='flex' alignItems='center'>
                                Other:
                                <TextField fullWidth id='otherreason'
                                    value={otherReason}
                                    onChange={onOtherReason}
                                    onBlur={() => setOherBlur(true)}
                                ></TextField>
                            </Box>
                            <ErrorText visible={otherBlur && !checkReasons()} text='Please choose or enter a reason' />
                            {/* <Box display='flex' alignItems='center' color="red" mt={2}>
                {otherBlur && !checkReasons() && 'Please choose or enter a reason'}
              </Box> */}
                            <SubmitAndCancel onSubmit={onSubmit} onCancel={onCloseModal} />
                        </Box>
                    </Section>
                </Box>
            </Modal>
        </Box>
    )
};

const ErrorText = ({ visible, text }) => {
    return (
        <Box display='flex' alignItems='center' color="red" mt={2}>
            {visible && text}
        </Box>
    )
};