import React, {useEffect, useRef, useState} from "react";
import {Button, CircularProgress, Grid, IconButton, Tooltip, Typography, Skeleton} from "@mui/material";
import {Add, AutoFixHigh, AutoFixOff} from "@mui/icons-material";
import DrawerWidget from "./DrawerWidget";
import CardLayout from "./CardLayout";
import SkeletonDashboard from "./SkeletonDashboard";
import AlertError from "../Tools/AlertError";
import axios from "axios";
import widgetData from "./Widget/config";

export default function Dashboard() {
    const [drawerWidgetOpen, setDrawerWidgetOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [widget, setWidget] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReload, setIsReload] = useState(true);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);

    useEffect(() => {
        if (!isReload)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/dashboard/widget`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    let target = []

                    response.data.forEach(item => {
                        let model = widgetData.find(elem => elem.id === item.idWidget);

                        if (model) {
                            let newPush = {...model}
                            newPush.idBDD = item.id
                            target.push(newPush)
                        }
                    })
                    setWidget(target);
                    setIsLoading(false);
                    setIsReload(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsReload(false);
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Dashboard got unmounted");
        }
    }, [isReload]);

    const handleCloseDrawerWidget = (isToReload) => {
        setDrawerWidgetOpen(false);
        setIsReload(isToReload);
    }

    return <Grid container item xs={12} sx={{p: 4}}>
        <DrawerWidget handleClose={handleCloseDrawerWidget} open={drawerWidgetOpen}/>
        <Grid item xs={6}>
            <Typography style={{fontWeight: 'bold'}} variant={'h3'}>
                Welcome
            </Typography>
        </Grid>
        <Grid container item xs={6} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
            <Grid item>
                {isLoading ? <CircularProgress/> : <Tooltip title={isEdit ? 'Remove edit mode' : 'Edit your widget'}>
                    <IconButton onClick={() => setIsEdit(prevState => !prevState)}>
                        {isEdit ? <AutoFixOff/> : <AutoFixHigh/>}
                    </IconButton>
                </Tooltip>}
            </Grid>
            <Grid item>
                {isLoading ? <Skeleton variant="rectangular" width={150} height={50} /> : <Button variant={'outlined'} startIcon={<Add/>} onClick={() => setDrawerWidgetOpen(true)}>
                    Add widget
                </Button>}
            </Grid>
        </Grid>
        {isLoading ? <SkeletonDashboard/> : <CardLayout isEdit={isEdit} widget={widget} setWidget={setWidget}/>}
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}