import {Grid, Paper, Alert, Typography} from "@mui/material";
import {useContext, useState} from "react";
import axios from "axios";
import SkeletonServices from "./SkeletonServices";
import React from "react";
import AlertError from "../Tools/AlertError";
import TutorialContext from "../Tools/TutorialContext/TutorialContext";
import DialogConfirmationUnsub from "./UnsubDialog";

export default function Services({services, onServiceSub, checkIfAR, isLoading}) {
    const [serviceToDel, setServiceToDel] = useState('');
    const [isError, setIsError] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    let tutorialMode = useContext(TutorialContext);

    const handleServiceUnsubClose = (isUnsub) => {
        if (isUnsub) {
            subUnsubToService(serviceToDel, true);
        }
        setIsAddOpen(false);
    }

    const handleAddOpen = () => {
        setIsAddOpen(true);
    }

    const subUnsubToService = async (service, shouldDeleteAR) => {
        service.isActive = !service.isActive;
        onServiceSub(shouldDeleteAR ? serviceToDel : undefined);
        await (async () => {
            try {
                let body = {
                    action: service.isActive ? 'sub' : 'unsub',
                    serviceId: service.id
                };
                await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/services/subscribe`, body,
                    {
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
        })()
    }

    const handleServiceActivation = async (service) => {
        if (service.isActive) {
            if (checkIfAR(service)) {
                setServiceToDel(service);
                handleAddOpen();
            } else {
                subUnsubToService(service, false);
            }
        } else {
            if (service.name === 'Twitter') {
                window.location.href = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YXVaTlVPUGJrYnBPcGJrdERwTFI6MTpjaQ&redirect_uri=" + process.env.REACT_APP_DASHBOARD_FRONT + "/App/TwitterRedirect&scope=offline.access%20tweet.read%20tweet.write%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain"
            } else if (service.name === 'Spotify') {
                window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=187c0fc794714871bbe61948b5232d56&scope=user-read-private%20user-read-email%20user-library-read%20user-read-playback-state%20user-modify-playback-state&redirect_uri=" + process.env.REACT_APP_DASHBOARD_FRONT + "/App/SpotifyRedirect&state=generateRandomString(16)"
            } else if (service.name === 'Reddit') {
                window.location.href = "https://www.reddit.com/api/v1/authorize?client_id=A1dJ6sEJqHjO27RHN4pwTw&response_type=code&state=generateRandomString(16)&redirect_uri=" + process.env.REACT_APP_DASHBOARD_FRONT + "/App/RedditRedirect&duration=temporary&scope=identity%20submit"
            } else {
                subUnsubToService(service, false);
            }
        }
    }

    return (
        <Grid container item xs={12} style={{padding: 20}} spacing={2}>
            <Grid container item xs={12}>
                <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                    SERVICES
                </Typography>
            </Grid>
            {tutorialMode.isActive && <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Select your service below.</Alert>
            </Grid>}
            {isLoading ? <SkeletonServices/> :
                <Grid container item xs={12} spacing={2}>
                    {services.map((item, index) => <Grid item xs={2} key={`${item.name}-${index}-card-service`}>
                        <Paper style={{
                            height: 140,
                            background: item.isActive ? item.color : 'gray',
                            cursor: 'pointer',
                            borderRadius: 10
                        }} sx={{
                            transition: '0.5s',
                            '&:hover': {boxShadow: 12}
                        }} elevation={0} onClick={() => handleServiceActivation(item)}>
                            <Grid container item xs={12} direction={'column'} alignItems={'center'}
                                  justifyContent={'center'} sx={{p: 2}} style={{height: '100%'}}>
                                {item.icon}
                                <Typography color={'white'} style={{fontWeight: 'bold'}}>
                                    {item.name}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>)}
                </Grid>
            }
            <DialogConfirmationUnsub service={serviceToDel} open={isAddOpen} handleClose={handleServiceUnsubClose}/>
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}