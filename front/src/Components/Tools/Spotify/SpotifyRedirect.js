import { Button, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function SpotifyRedirect() {
    const [isError, setIsError] = useState(false);
    const findCodeInURL = (url) => {
        let result = url.indexOf("code");
        if (result !== -1) {
            return (url.substring(result + 5, url.length))
        }
        return ('');
    }

    const handleGoBack = async () => {
        let res = findCodeInURL(window.location.href);
        if (res !== '') {
            console.log(res);
            try {
                let body = {
                    code: res
                }
                const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/spotify/auth`, body,
                    {
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                console.log('success: ', response);
                try {
                    let subBody = {
                        action: 'sub',
                        serviceId: 2
                    };
                    await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/services/subscribe`, subBody,
                        {
                            'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                        });
                } catch (err) {
                    if (err.response) {
                        setIsError(true);
                    }
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            } finally {
                window.location.href = `${process.env.REACT_APP_DASHBOARD_FRONT}/App/Spotify`
            }
        }
    }

    return (
        <Grid>
            <Button variant={'contained'} color={'secondary'} onClick={() => {handleGoBack()}}>Go back</Button>
        </Grid>
    )
}