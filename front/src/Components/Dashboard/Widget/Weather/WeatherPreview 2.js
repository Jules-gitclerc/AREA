import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";

export default function WeatherPreview() {
    return <Paper style={{width: '100%', height: 100}}>
        <Grid container item xs={12} style={{height: '100%'}} justifyContent={'center'} alignItems={'center'}>
            <Typography>
                Weather Widget
            </Typography>
        </Grid>
    </Paper>
}