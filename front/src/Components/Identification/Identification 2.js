import React, {useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import { Grid, Typography, Button} from "@mui/material";

export default function Identification() {
    let {idUser, username} = useParams();

    useEffect(() => {
        (async () => {
            try {
                await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/users/identification/${idUser}`, {})
            } catch (err) {
                console.log(err);
            }
        })()
    }, [idUser, username])

    return <Grid container item xs={12} style={{height: '100vh', width: '100vw'}} justifyContent={'center'}
                 alignItems={'center'}>
        <div style={{
            backgroundImage: 'url(https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?size=626&ext=jpg&ga=GA1.2.1483490050.1637884800)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}/>
        <Grid container item xs={5} style={{zIndex: 6}}>
            <Grid container item xs={12}>
                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                    <Typography variant='h2'>
                        Congratulations
                    </Typography>
                </Grid>
                <Grid justifyContent={'center'} container item xs={12}>
                    <Typography variant={'h6'} style={{textDecoration: "underline"}}>
                        Your account is now active !
                    </Typography>
                </Grid>
                <Grid container item xs={12} justifyContent={'center'} sx={{p: 2}}>
                    <Button variant={"contained"} href="/">Go to Ulys !</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}