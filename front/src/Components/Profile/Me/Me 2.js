import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@mui/material";
import BasicDetails from "./BasicDetails";
import AlertError from "../../Tools/AlertError";
import axios from "axios";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

export default function Me() {
    const [data, setData] = useState(null);
    const [isReload, setIsReload] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
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
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/users/me`,
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
            source.cancel("Component Profile Me got unmounted");
        }
    }, [isReload]);

    const hotReload = () => {
        setIsReload(true);
    }

    return <Grid container item xs={12} sm={10} md={7} spacing={4}>
        <Grid item xs={12} style={{marginTop: 25}}>
            <BasicDetails hotReload={hotReload} data={data} isLoading={isLoading}/>
        </Grid>
        <Grid item xs={12}>
            <DeleteAccount isLoading={isLoading}/>
        </Grid>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}