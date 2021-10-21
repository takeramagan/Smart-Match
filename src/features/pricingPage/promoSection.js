import { TextField, Grid, Typography, Button, InputAdornment } from '@material-ui/core';

import { useState } from "react";

export const PromoSection = (props) => {
    const [promoCode, setPromoCode] = useState("");

    const handleChange = (event) => {
        setPromoCode(event.target.value);
    }
    const handleSubmitPromo=(event)=>{
        console.log(promoCode);
    }

    return (
        // Grid section shows promo dialog
        <Grid container spacing={3} alignItems="center" style={{ padding: "24px", textAlign: "center" }}>
            <Grid item xs={12}>
                <Typography component="h5" variant="h5" style={{ color: "#024CC3" }}>
                    Have a promo code? Redeem now!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    value={promoCode}
                    variant={"outlined"}
                    type={'text'}
                    onChange={handleChange}
                    InputProps={{
                        style:{
                            borderRadius: 25, borderColor: '#C3C5DF'
                        },
                        endAdornment:
                            <InputAdornment position="end">
                                <Button variant="contained" color="primary" onClick={handleSubmitPromo}>
                                    REDEEM
                                </Button>
                            </InputAdornment>
                    }}
                />
            </Grid>
        </Grid >
    )
};

