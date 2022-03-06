import React, {useEffect, useRef, useState} from 'react';
import {List, ListItem, ListItemIcon, ListItemText, Checkbox, CircularProgress} from "@mui/material";
import {Skeleton} from "@mui/lab";
import axios from "axios";
import AlertError from "../../../../Tools/AlertError";

function WeatherConfigLoading() {
    return <List>
        {[1, 2, 3, 4, 5].map(item => <ListItem key={`skeleton loading weather config - ${item}`} secondaryAction={
            <Skeleton variant={'rectangular'} height={20} width={20}/>
        }>
            <ListItemIcon>
                <Skeleton variant={'rectangular'} height={20} width={30}/>
            </ListItemIcon>
            <Skeleton variant={'rectangular'} height={20} width={430}/>
        </ListItem>)}
    </List>
}

export default function ListConfigWeather({idSelected, setIdSelected, isLoadingParent}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);

    useEffect(() => {
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
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Weather got unmounted");
        }
    }, []);

    if (isLoading)
        return <WeatherConfigLoading/>

    return <>
        <List style={{padding: 0, width: '100%'}}>
            {data.map(item => <ListItem key={`weather config - ${item.id}`} secondaryAction={
                isLoadingParent ? <CircularProgress/>  : <Checkbox checked={idSelected === item.id} color={"secondary"} onChange={() => setIdSelected(item.id)}/>
            }>
                <ListItemIcon>
                    <img
                        loading="lazy"
                        style={{
                            width: "30px",
                            height: "auto",
                            borderRadius: 3,
                        }}
                        src={`https://flagcdn.com/w20/${item.countryCode.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${item.countryCode.toLowerCase()}.png 2x`}
                        alt={item.countryCode.toLowerCase()}
                    />
                </ListItemIcon>
                <ListItemText primary={`${item.country} - ${item.city}`}/>
            </ListItem>)}
        </List>
        <AlertError setIsError={setIsError} isError={isError}/>
    </>
}