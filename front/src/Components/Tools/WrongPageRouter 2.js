import React from 'react';
import {Button, Grid} from '@mui/material'
import {useNavigate} from "react-router-dom";

export default function WrongPageRouter({redirect}) {
    let navigate = useNavigate();

    return <Grid container direction="column">
        <Grid item xs={6} style={{alignSelf: 'center'}}>
            <img alt={'Img Wrong Router'} src={require('../../assets/wrong_page_img1-removebg-preview.png')} height={596}
                 width={600}/>
        </Grid>
        <Grid item xs={6} style={{alignSelf: 'center'}}>
            <Button variant="text" onClick={() => {
                navigate(redirect);
            }}>Revenir a l'accueil</Button>
        </Grid>
    </Grid>
}