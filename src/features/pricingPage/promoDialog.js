
/*import material ui related */
import { withStyles, Button, Dialog, IconButton, Typography } from '@material-ui/core';
// material ui dialog components
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import material ui icons
import CloseIcon from '@material-ui/icons/Close';
// import react related
import { useState, useContext } from "react";
// import global variable from context api
import AppGlobalContext from "../../globalContext";
// import pricing and promo section
import PricingSection from "./pricingSection";
import { PromoSection } from "./promoSection";
// import const tiers
import { tiers } from "../../constant/constant";

const styles = (theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export const PromoDialog = (props) => {
    const [open, setOpen] = useState(true);
    const { AppMode } = useContext(AppGlobalContext);

    console.log("Data from context api: ", AppMode);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {AppMode === "test" &&
                < Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open dialog
                </Button>
            }
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
                <DialogTitle onClose={handleClose} />
                {AppMode === "business" &&
                    <DialogContent >
                        <PricingSection tiers={tiers} />
                    </DialogContent>
                }
                <DialogActions style={{ overflow: "hidden" }}>
                    <PromoSection />
                </DialogActions>
            </Dialog>
        </div >
    );
}