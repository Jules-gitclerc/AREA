import React, {useContext, useEffect, useRef, useState} from "react";
import {Alert, Button, Grid, Typography} from "@mui/material";
import TemplateWeather from "./TemplateWeather";
import {Add} from "@mui/icons-material";
import DialogNewSettingsWeather from "./Dialog/DialogNewSettingsWeather";
import axios from "axios";
import AlertError from "../Tools/AlertError";
import MainLoader from "../Tools/MainLoader";
import DialogConfirmationDelete from "./Dialog/DialogConfirmationDelete";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";

export default function Weather() {
    const [openNewWeatherSettings, setOpenWeatherSettings] = useState(false);
    const [openDeleteWeather, setOpenDeleteWeather] = useState(false);
    const [idToDelete, setIdToDelete] = useState(0);
    const [data, setData] = useState([]);
    const [isReload, setIsReload] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);
    let tutorialMode = useContext(TutorialContext);

    useEffect(() => {
        if (!isReload)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/weather`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setData(response.data);
                    setIsLoading(false);
                    setIsReload(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                    setIsReload(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Weather got unmounted");
        }
    }, [isReload]);

    const handleClose = (isToReload) => {
        setOpenWeatherSettings(false);
        setIsReload(isToReload);
    }

    const handleCloseDelete = (isToReload) => {
        setOpenDeleteWeather(false);
        setIsReload(isToReload);
        setIdToDelete(0);
    }

    const handleOpenDelete = (id) => {
        setIdToDelete(id);
        setOpenDeleteWeather(true);
    }

    return <Grid container item xs={12} sx={{p: 4}} spacing={2}>
        <Grid item xs={9}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                Weather
            </Typography>
        </Grid>
        <Grid item xs={3}>
            <Button variant={'outlined'} fullWidth color={'primary'} startIcon={<Add/>}
                    onClick={() => setOpenWeatherSettings(true)}>
                Add new weather config
            </Button>
        </Grid>
        {tutorialMode.isActive && <Grid item xs={12}>
            <Alert severity="info" style={{width: '100%'}}>Create your weather profile.</Alert>
        </Grid>}
        {isLoading ? <Grid container item xs={12} style={{height: 500}} alignItems={'center'} justifyContent={'center'}>
                <MainLoader/>
            </Grid> :
            data.map(item => <Grid key={`${item.id} - weather all settings`} item xs={3}>
                <TemplateWeather countryCode={item.countryCode} city={item.city} units={'metric'} id={item.id}
                                 handleOpenDelete={handleOpenDelete}/>
            </Grid>)}
        <DialogNewSettingsWeather open={openNewWeatherSettings} handleClose={handleClose}/>
        <AlertError isError={isError} setIsError={setIsError}/>
        <DialogConfirmationDelete id={idToDelete} handleClose={handleCloseDelete} open={openDeleteWeather}/>
    </Grid>
}