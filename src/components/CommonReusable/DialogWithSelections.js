// ui
import { Box, Modal, Chip, TextField, Button } from "@material-ui/core";
import { Section } from "../Section";
import { h, h1, h2 } from '../../constant/fontsize';
import { COLOR_TITLE } from "../../constant/color";

// hook
import { useState } from "react";

// 
import { useRequest } from "../../hooks/useRequest";

const ErrorText = ({ visible, text }) => {
  return (
    <Box display='flex' alignItems='center' color="red" mt={2}>
      {visible && text}
    </Box>
  )
}

const SubmitAndCancel = ({ onSubmit, onCancel, disableSbumit }) => {
  return (
    <Box mt={3}>
      <Button variant="contained" color="primary" disabled={disableSbumit} style={{ marginRight: 10 }} onClick={onSubmit} type="submit">Submit</Button>
      <Button variant="contained" color="primary" onClick={onCancel}>Cancel</Button>
    </Box>
  )
}

/**
 * @param userRelatedData contains api, api key, link to report
 * @param InputDialogOptions contains options display by this dialog
 * @returns reusable component DialogWithSelections
 */

export default function DialogWithSelections(props) {
  const [showDialog, setshowDialog] = useState(true);
  const [otherBlur, setOherBlur] = useState(false);

  const DialogOptions = props.InputDialogOptions;
  const [selectedOptions, setselectedOptions] = useState(0); //bit indicates selected or not

  const [manualInput, setManualInput] = useState("");

  const reportLinkRequest = useRequest()

  const reportLinkIssue = async ({ api, api_key, link, }) => {
    try {
      // attach form data
      const formData = new FormData()
      formData.append('Reported link', link);
      formData.append('dcc', api_key);

      const config = {
        method: 'post',
        url: api,
        data: formData
      }
      await reportLinkRequest.requestHandler(config)
    } catch (e) {
      console.log("error occur while sending request");
    }
  }

  const onSubmit = async () => {
    if (!checkEmpty()) {
      setOherBlur(true);
    }
    else {
      const feedbackMerged = InputToString();
      // use data from parent component to post changes to api
      console.log("Link from parent: ", props.userRelatedData.reportLink);
      console.log("api from parent: ", props.userRelatedData.api);
      console.log("api key from parent: ", props.userRelatedData.api_key);

      // use custom axio hook to handle request
      reportLinkIssue({ api: props.userRelatedData.api, api_key: props.userRelatedData.api_key, link: props.userRelatedData.reportLink });

      setshowDialog(false);
      setOherBlur(false);
    }
  }

  const InputToString = () => {
    let allInput = []
    // extra all selected input
    for (let i = 0; i < DialogOptions.length; i++) {
      if (selectedOptions & (1 << i)) {
        allInput = [...allInput, DialogOptions[i]]
      }
    }
    // extra all manual input
    if (manualInput) {
      allInput = [...allInput, manualInput]
    }
    return allInput.join(" ")
  }

  const onCloseModal = () => {
    setshowDialog(false)
    setOherBlur(false)
  }

  const checkEmpty = () => (manualInput.trim() || selectedOptions)

  // handle manual input
  const onManualInput = (e) => {
    setManualInput(e.target.value)
  }

  // on select given option
  // use left shift operator shifts the "1" with "idx" number of bits to the left
  const onSelectOption = (idx) => {
    setselectedOptions(v => {
      // bitwise operators addition to add selected to selectedOptions
      return (v ^ (1 << idx))
    })
  }

  return (
    <Box>
      {/* use Modal from @material-ui to blocks interaction with the rest of the application. */}
      <Modal open={showDialog} onClose={onCloseModal}>
        <Box mt={10} ml='auto' mr='auto' width='60%'>
          <Section >
            <Box p={4}>
              <Box fontSize={h2} color={COLOR_TITLE}>Choose the reason</Box>
              <Box mt={2} display='flex' flexWrap="wrap" style={{ maxWidth: '100%' }}>
                {DialogOptions.map((v, idx) =>
                  <Chip
                    clickableO
                    onClick={() => onSelectOption(idx)}
                    key={v}
                    label={v}
                    style={{
                      marginRight: 18,
                      color: (selectedOptions >> idx & 1) ? '#ffffff' : 'black',
                      backgroundColor: (selectedOptions >> idx & 1) ? COLOR_TITLE : '#ffffff',
                      filter: 'drop-shadow(10px 3px 20px rgba(16, 156, 241, 0.28))',
                      margin: '8px 4px',
                      overflowAnchor: "auto",
                    }}
                  />
                )}
              </Box>
              <Box display='flex' alignItems='center'>
                Other:
                  <TextField fullWidth id='otherProblem'
                  value={manualInput}
                  onChange={onManualInput}
                  onBlur={() => setOherBlur(true)}></TextField>
              </Box>
              <ErrorText visible={otherBlur && !checkEmpty()} text='You must choose or enter a reason before submit' />
              {/* <Box display='flex' alignItems='center' color="red" mt={2}>
                  {otherBlur && !checkEmpty() && 'Please choose or enter a reason'}
                </Box> */}
              <SubmitAndCancel onSubmit={onSubmit} onCancel={onCloseModal} />
            </Box>
          </Section>
        </Box>
      </Modal>
    </Box>
  )
}
