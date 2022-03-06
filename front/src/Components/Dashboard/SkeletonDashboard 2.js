import React from 'react';
import {Grid, Skeleton} from "@mui/material";

export default function SkeletonDashboard() {
    return <Grid container item xs={12} style={{marginTop: 20}} spacing={2}>
        <Grid item xs={4} style={{height: 280}}>
            <Skeleton variant="rectangular" width={'100%%'} height={'100%'} style={{borderRadius: 5}}/>
        </Grid>
        <Grid item xs={4} style={{height: 280}}>
            <Skeleton variant="rectangular" width={'100%%'} height={'100%'} style={{borderRadius: 5}}/>
        </Grid>
        <Grid item xs={4} style={{height: 280}}>
            <Skeleton variant="rectangular" width={'100%%'} height={'100%'} style={{borderRadius: 5}}/>
        </Grid>
        <Grid item xs={12} style={{height: 280}}>
            <Skeleton variant="rectangular" width={'100%%'} height={'100%'} style={{borderRadius: 5}}/>
        </Grid>
        <Grid item xs={8} style={{height: 280}}>
            <Skeleton variant="rectangular" width={'100%%'} height={'100%'} style={{borderRadius: 5}}/>
        </Grid>
        <Grid item xs={4} style={{height: 280}}>
            <Skeleton variant="rectangular" width={'100%%'} height={'100%'} style={{borderRadius: 5}}/>
        </Grid>
    </Grid>
}