import React, {useEffect, useRef, useState} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {dataTheme} from "../../Main/config";
import DisplayTheme from "./DisplayTheme";
import AlertError from "../../Tools/AlertError";
import axios from "axios";

export default function Theme({handleThemeChangeParent}) {
    const [selectedId, setSelectedId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
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
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/users/theme`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setSelectedId(response.data.idTheme);
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
            source.cancel("Component theme Me got unmounted");
        }
    }, [isReload]);

    const handleThemeChange = async (id) => {
        if (selectedId === id)
            return;
        try {
            await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/users/theme`, {idTheme: id},
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                })
            setSelectedId(id);
            handleThemeChangeParent(id);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsReload(true);
            }
        }
    }


    return <Grid item xs={12} sm={10} md={7} style={{marginTop: 25}}>
        <Paper elevation={0} style={{borderRadius: 5}} sx={{p: 4}}>
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                        Theme
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{fontSize: 11}} sx={{color: 'grey.500'}}>
                        Select your theme:
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2} style={{marginTop: 5}}>
                {dataTheme.map((elem) => <Grid key={`${elem.name}-${elem.id}`} item xs={3}>
                    <DisplayTheme color={elem.color} name={elem.name} isChecked={selectedId === elem.id} isLoading={isLoading} handleThemeChange={async () => await handleThemeChange(elem.id)}/>
                </Grid>)}
            </Grid>
        </Paper>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}