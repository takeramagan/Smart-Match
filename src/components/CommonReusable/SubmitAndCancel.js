import { Box, Button } from "@material-ui/core";


export const SubmitAndCancel = ({ onSubmit, onCancel, disableSbumit }) => {
    return (
        <Box mt={3}>
            <Button variant="contained" color="primary" disabled={disableSbumit} style={{ marginRight: 10 }}
                onClick={onSubmit} type="submit">Submit</Button>
            <Button variant="contained" color="primary" onClick={onCancel}>Cancel</Button>
        </Box>
    )
};