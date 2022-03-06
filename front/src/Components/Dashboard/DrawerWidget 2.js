import React, {useReducer, useState} from 'react';
import {Button, ButtonGroup, Chip, Drawer, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Add, ArrowForwardIos, Remove, Save, Search} from "@mui/icons-material";
import widgetData from "./Widget/config";
import AlertError from "../Tools/AlertError";
import {LoadingButton} from "@mui/lab";
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case 'config':
            state.forEach(item => {
                item.save = 0
            })
            return [...state];
        case 'increment':
            state[action.index].save += 1
            return [...state];
        case 'decrement':
            state[action.index].save -= 1
            return [...state];
        default:
            throw new Error();
    }
}

function init(initial) {
    initial.forEach(item => {
        item.save = 0
    })
    return [...initial];
}

export default function DrawerWidget({open, handleClose}) {
    const [search, setSearch] = useState('');
    const [state, dispatch] = useReducer(reducer, widgetData, init);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseDrawer = (isToReload) => {
        handleClose(isToReload)
        dispatch({type: 'config'});
    }

    const handleSave = async () => {
        try {
            setIsLoading(true);
            let widget = []

            state.forEach(item => {
                for (let x = 0; x < item.save; x++)
                    widget.push({
                        id: item.id
                    })
            })
            await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/dashboard/widget`, {widget: widget},
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                })
            handleCloseDrawer(true)
            setIsLoading(false);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(false);
            }
        }
    }

    return <Drawer
        anchor={'right'}
        open={open}
        onClose={() => handleCloseDrawer(false)}
        sx={{
            width: 350,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: 350, boxSizing: 'border-box'},
        }}
    >
        <Grid container item xs={12} display={'block'}>
            <Grid container item xs={12} sx={{borderBottom: 1, borderColor: 'divider', p: 1}}>
                <IconButton onClick={() => handleCloseDrawer(false)}>
                    <ArrowForwardIos/>
                </IconButton>
            </Grid>
            <Grid item xs={12} style={{height: 'calc(100% - 110px)'}}>
                <Grid item xs={12} sx={{p: 1}}>
                    <TextField label={'Search'} type={'search'} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} variant={'outlined'}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <Search/>
                                       </InputAdornment>
                                   ),
                               }}/>
                </Grid>
                {state.map((item, index) => <Grid item xs={12} sx={{p: 1}} key={`new widget select - ${item.id}`}>
                    {item.preview}
                    <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'} style={{marginTop: 10}}>
                        <Grid item>
                            <Chip label={`${item.save} widget`} color={'secondary'} disabled={item.save === 0} size={'small'}/>
                        </Grid>
                        <Grid item>
                            <ButtonGroup variant="contained">
                                <Button size={'small'} disabled={item.save === 0} onClick={() => dispatch({type: 'decrement', index: index})}>
                                    <Remove/>
                                </Button>
                                <Button size={'small'} onClick={() => dispatch({type: 'increment', index: index})}>
                                    <Add/>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>)}
            </Grid>
            <Grid item xs={12} sx={{borderTop: 1, borderColor: 'divider', p: 1}}>
                <LoadingButton loading={isLoading} variant="outlined" fullWidth startIcon={<Save/>} onClick={handleSave}>
                    Save
                </LoadingButton>
            </Grid>
        </Grid>
        <AlertError setIsError={setIsError} isError={isError}/>
    </Drawer>
}