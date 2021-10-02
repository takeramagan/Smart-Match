import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// import axios custom hook
import { useRequest } from "../../hooks/useRequest";
// import formik
import { useFormik } from 'formik';
// import validation libs
import * as yup from 'yup';
// import toast
import { toast } from 'react-toastify';
import { toastStyle } from "../../constant/constant";
// import material ui component
import { Box, Button, TextField, Select, FormControl, InputLabel, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, MenuItem  } from "@material-ui/core";
// import custom style
import { Section } from "../../components/Section";
import { h1, h2 } from '../../constant/fontsize';
import { COLOR_TITLE } from "../../constant/color";
// import reusable components
import { SubmitAndCancel } from "../../components/CommonReusable/SubmitAndCancel";
// import API 
import { APP_END_POINT_B_AND_C, X_API_KEY_B_AND_C } from "../../constant/externalURLs";

//Edit or add Job
export const JobDetail = ({ job, index, closeModal, updatePage, hrid }) => {
    const validationSchema = yup.object({
        title: yup
            .string()
            .required('Job title is required'),
        salary_start: yup
            .number().integer("Integer only").moreThan(0, "Should > 0")
            .required("Required"),
        salary_end: yup
            .number().integer("Integer only").min(yup.ref('salary_start'), "To >= From")
            .required("Required"),
        description: yup
            .string()
            .required('Job description is required'),
        note: yup
            .string(),
        jobtype: yup.number(),
        status: yup.number(),
        job_reference_id: yup.string().required("Job Id is required")
    });
    // let initJob = {status:0, link:"", post_date:"", applicants:[],title:"", modify_date:"", description:null, salary_start:null, salary_end:null}
    let initJob = {};
    const isNew = index === -1;
    const {
        job_id: jobid, jobstatus, link, post_date, modify_date,
        applicants, jobtitle: title, description,
        salarylow: salary_start, salaryhigh: salary_end,
        jobtype, note, job_reference_id, currency
    } = isNew ? initJob : job;
    const [openConfirmDlg, setOpenConfirmDlg] = useState(false); //open confirm dialog

    const formik = useFormik({
        initialValues: {
            title: title ?? "",
            salary_start: salary_start > 0 ? salary_start : 0,
            salary_end: salary_end > 0 ? salary_end : 0,
            note: note ?? "",
            description: description ?? "",
            jobtype: parseInt(jobtype ?? 0),//0:full time 1:contract 2:part
            status: parseInt(jobstatus ?? 0),//0:accepting 1:closed 2:filled
            job_reference_id: job_reference_id ?? "",
            currency: currency ?? "CAD"
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            submitData(values).then();
        },
    });

    // salary unit state listener
    const [salaryUnitState, setSalaryUnitState] = useState(
        (formik.initialValues.jobtype == 0) ? 'per Year' : 'per Hour');

    const jobTypeChange = (v) => {
        setSalaryUnit(v.target.value);
    };

    // get the salary unit display str
    const setSalaryUnit = (v) => {
        setSalaryUnitState(v === '0' ? 'per Year' : 'per Hour');
        return salaryUnitState;
    };

    const { requestHandler } = useRequest();
    const submitData = async (values) => {
        try {
            const data = new FormData();
            // data.append('action', isNew ? 'addjob' : 'editjob');
            // if(!isNew) data.append('jobid', jobid )
            data.append('jobtitle', values.title);
            data.append('salarylow', values.salary_start);
            data.append('salaryhigh', values.salary_end);
            data.append('company', 'microsoft');
            data.append('note', values.note);
            data.append('hrid', hrid); //mock data
            data.append('jobstatus', values.status);
            data.append('description', values.description);
            data.append('joblink', 'www.baidu.com');
            data.append('jobtype', values.jobtype);
            data.append('dcc', X_API_KEY_B_AND_C);
            data.append('jobid', isNew ? uuidv4() : jobid);
            data.append('job_reference_id', values.job_reference_id);
            data.append('currency', values.currency);
            const config = {
                method: 'post',
                url: APP_END_POINT_B_AND_C + (isNew ? 'publish_job_posting' : 'update_job_posting'),
                data: data
            };
            console.log(config);
            const result = await requestHandler(config);
            console.log("Submit result: ", result);
            if (result.status === 'success') {
                updatePage();
                closeModal();
            } else {
                toast.error('Oops, something went wrong, the job cannot be set, please try again later.', toastStyle);
            }
        } catch (e) {
            toast.error('Oops, something went wrong, the job cannot be set: '
                + e.toString(), toastStyle);
        }
    };

    const equals = (init, cur) => {
        for (const [k, v] of Object.entries(init)) {
            if (v != cur[k]) return false
        }
        return true
    };

    const onClickCancel = () => {
        if (equals(formik.initialValues, formik.values)) {
            console.log("close ");
            closeModal();
        } else {
            console.log("not equal ");
            //open confirm dialog
            setOpenConfirmDlg(true);
        }
    };

    const onCloseDlg = () => {
        setOpenConfirmDlg(false)
    };

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     // setState({
    //     //   ...state,
    //     //   [name]: event.target.value,
    //     // });
    // };

    return (
        <Box style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Section>
                <Box mt={4} p={4}>
                    <Box fontSize={h1} color={COLOR_TITLE}>
                        {isNew ? "Post New Job" : "Edit Job"}
                    </Box>
                </Box>
            </Section>
            <Section>
                <Box p={4} mt={4} fontSize={h2}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box>
                            <TextField id="job_reference_id" label="Job id" variant="outlined" size='small'
                                name='job_reference_id'
                                value={formik.values.job_reference_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.job_reference_id && Boolean(formik.errors.job_reference_id)}
                                helperText={formik.touched.job_reference_id && formik.errors.job_reference_id}
                                style={{ width: 150 }} />
                        </Box>
                        <Box mt={2}>
                            <TextField id="title" label="Job title" variant="outlined" size='small' name='title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                style={{ width: 300 }} />
                        </Box>

                        <Box mt={2}>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="jobtype">Job type</InputLabel>
                                <Select
                                    style={{ height: 40 }}
                                    native
                                    variant="outlined"
                                    value={formik.values.jobtype? formik.values.jobtype: ""}
                                    onChange={e => {
                                        formik.handleChange(e);
                                        jobTypeChange(e);
                                    }}
                                    label="Job type"
                                    inputProps={{
                                        name: 'jobtype',
                                        id: 'jobtype',
                                    }}
                                >
                                    {/* <option aria-label="None" value="" /> */}
                                    {/* <MenuItem value={0}>Fulltime</MenuItem>
                                    <MenuItem value={1}>Contract</MenuItem>
                                    <MenuItem value={2}>Part-time</MenuItem> */}
                                    <option value={0}>Fulltime</option>
                                    <option value={1}>Contract</option>
                                    <option value={2}>Part-time</option>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" style={{ marginLeft: 10 }}>
                                <InputLabel htmlFor="status">Job Status</InputLabel>
                                <Select
                                    style={{ height: 40 }}
                                    native
                                    variant="outlined"
                                    // value={state.age}
                                    value={formik.values.status? formik.values.status: ""}
                                    onChange={formik.handleChange}
                                    label="Job status"
                                    inputProps={{
                                        name: 'status',
                                        id: 'status',
                                    }}
                                >
                                    {/* <option aria-label="None" value="" /> */}
                                    <option value={0}>Accepting</option>
                                    <option value={1}>Closed</option>
                                    <option value={2}>Filled</option>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <span style={{ marginRight: 10 }}>Salary:
                            </span>
                            <Select
                                style={{ height: 40 }}
                                native
                                variant="outlined"
                                // value={state.age}
                                value={formik.values.currency?formik.values.currency:""}
                                onChange={formik.handleChange}
                                inputProps={{
                                    name: 'currency',
                                    id: 'currency',
                                }}
                            >
                                <option value={'USD'}>$USD</option>
                                <option value={'CAD'}>$CAD</option>
                            </Select>
                            <TextField id="salary_start" label="From" variant="outlined" size='small' type='number'
                                value={formik.values.salary_start}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.salary_start && Boolean(formik.errors.salary_start)}
                                helperText={formik.touched.salary_start && formik.errors.salary_start}
                                style={{ width: 100, marginRight: 10, marginLeft: 10 }} />
                            <TextField id="salary_end" label="To" variant="outlined" size='small' type='number'
                                style={{ width: 100 }}
                                onBlur={formik.handleBlur}
                                value={formik.values.salary_end}
                                onChange={formik.handleChange}
                                error={formik.touched.salary_end && Boolean(formik.errors.salary_end)}
                                helperText={formik.touched.salary_end && formik.errors.salary_end}
                            />
                            <span style={{ width: 100, marginLeft: 10 }}>{salaryUnitState}
                            </span>
                        </Box>
                        <Box mt={2}>
                            <TextField id="note" label="Job Note" variant="outlined" rowsMax={5} rows={2} fullWidth
                                multiline
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                        <Box mt={2}>
                            <TextField id="description" label="Job Description" variant="outlined" rowsMax={15} rows={5}
                                fullWidth
                                multiline
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Box>
                        <SubmitAndCancel onCancel={onClickCancel} />
                    </form>
                </Box>
            </Section>

            <Dialog
                open={openConfirmDlg}
                onClose={onCloseDlg}
            >
                <DialogTitle>{"Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Discard modification?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDlg} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => {
                        onCloseDlg();
                        closeModal()
                    }} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};