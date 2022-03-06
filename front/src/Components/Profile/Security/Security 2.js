import React from 'react';
import {Grid} from "@mui/material";
import ChangePassword from "./ChangePassword";
import LoginHistory from "./LoginHistory";

export default function Security() {
    return <Grid container item xs={12} sm={10} md={7} spacing={4}>
        <Grid item xs={12} style={{marginTop: 25}}>
            <ChangePassword/>
        </Grid>
        <Grid item xs={12}>
            <LoginHistory/>
        </Grid>
    </Grid>
}