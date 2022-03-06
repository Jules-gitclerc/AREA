import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Button, Grid, Skeleton, Typography} from "@mui/material";
import AlertError from "../../../Tools/AlertError";

export default function Template({city, countryCode, units}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/api/weather/currentWeather?city=${city}&countryCode=${countryCode}&units=${units}`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Template got unmounted");
        }
    }, [city, countryCode, units]);

    return <Grid container item xs={12} style={{height: '100%'}} sx={{p: 1}}>
        <Grid item xs={5} style={{height: '100%'}}>
            <Grid container item xs={12} alignItems={'center'} style={{height: '30%'}}>
                <Button fullWidth size={"small"} startIcon={<img
                    loading="lazy"
                    style={{
                        width: "30px",
                        height: "auto",
                        borderRadius: 3,
                    }}
                    src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
                    alt={countryCode.toLowerCase()}
                />}>
                    {city}
                </Button>
            </Grid>
            <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: '70%'}}>
                {isLoading ? <Skeleton width={100} height={100}/> : <Typography variant={'h4'}>
                    {Math.round(data.main.temp)} {units === 'metric' ? "°C" : "°F"}
                </Typography>}
            </Grid>
        </Grid>
        <Grid container item xs={7} style={{height: '100%'}} justifyContent={'flex-end'} sx={{p: 1}}>
            {isLoading ? <Grid item>
                <Skeleton width={40} height={50}/>
            </Grid> : <Grid item>
                <img alt={data.weather.main} src={`http://openweathermap.org/img/w/${data.weather.icon}.png`}
                     style={{width: 100, height: 'auto'}}/>
            </Grid>}
        </Grid>
        <AlertError setIsError={setIsError} isError={isError}/>
    </Grid>

}