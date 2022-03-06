import React, {useEffect, useRef, useState} from 'react';
import {Grid, Alert} from "@mui/material";
import DialogWeather from "./DialogWeather/DialogWeather";
import axios from "axios";
import MainLoader from "../../../Tools/MainLoader";
import Template from "./Template";
import AlertError from "../../../Tools/AlertError";

export default function Weather({openSettings, setOpenSettings, idWidget}) {
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isReload, setIsReload] = useState(true);
    const isMounted = useRef(null);

    useEffect(() => {
        if (!isReload)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/dashboard/widget/weather/${idWidget}`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setSettings(response.data);
                    setIsLoading(false);
                    setIsReload(false);
                }
            } catch (err) {
                if (err.response) {
                    console.log(err);
                    setIsError(true);
                    setIsReload(false);
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Weather got unmounted");
        }
    }, [isReload, idWidget]);

    const handleCloseSettings = (isToReload) => {
        setOpenSettings(false)
        setIsReload(isToReload)
    }

    if (isLoading) {
        return <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: '100%'}}>
            <MainLoader/>
        </Grid>
    }

    return <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} style={{height: '100%'}}>
        {!!settings ? <Template units={'metric'} city={settings.city} countryCode={settings.countryCode}/> :
            <Alert severity={'warning'}>No settings set</Alert>}
        <DialogWeather open={openSettings} handleClose={handleCloseSettings} idBDD={idWidget}/>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}