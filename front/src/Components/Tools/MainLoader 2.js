import React from 'react';
import {CircularProgress, Grid, Paper, Typography} from "@mui/material";

export default function MainLoader() {
    return <Paper variant={'outlined'} style={{height: 100, width: 100}}>
        <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: '70%'}}>
            <CircularProgress/>
        </Grid>
        <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: '30%'}}>
            <Typography variant={'caption'}>
                Loading
            </Typography>
        </Grid>
    </Paper>
}