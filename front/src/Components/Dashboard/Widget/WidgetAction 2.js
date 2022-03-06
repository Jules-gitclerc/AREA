import React from 'react';
import {Grid, IconButton, Tooltip} from "@mui/material";
import {Cancel, Settings} from "@mui/icons-material";

export default function WidgetAction({handleRemoveItem, handleOpenSettings, modelID}) {
    return <Grid container item xs={12} justifyContent={'flex-end'} style={{height: 0, position: 'relative', top: -20, left: 20}}>
        <Grid item>
            <Tooltip title={'Widget settings'}>
                <IconButton onClick={handleOpenSettings}>
                    <Settings/>
                </IconButton>
            </Tooltip>
        </Grid>
        <Grid item>
            <Tooltip title={'Delete this widget'}>
                <IconButton onClick={() => handleRemoveItem(modelID)}>
                    <Cancel style={{color: 'red'}}/>
                </IconButton>
            </Tooltip>
        </Grid>
    </Grid>
}