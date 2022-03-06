import React, {useState} from 'react';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import {Cancel, Save} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import AutocompleteCountry from "../../Tools/Input/AutocompleteCountry";
import AutocompleteCities from "../../Tools/Input/AutocompleteCities";
import TemplateWeather from "../TemplateWeather";
import axios from "axios";
import AlertError from "../../Tools/AlertError";

export default function DialogNewSettingsWeather({open, handleClose}) {
    const [country, setCountry] = useState(null);
    const [cities, setCities] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleCloseDialog = (isToReload) => {
        handleClose(isToReload);
        setCountry(null);
        setCities(null);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            let body = {
                countryCode: country.iso2,
                city: cities
            }
            await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/weather`, body,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            setIsLoading(false);
            handleCloseDialog(true);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(false);
            }
        }
    }

    return <Dialog fullWidth maxWidth={"md"} open={open} onClose={() => handleCloseDialog(false)} onSubmit={onSubmit} component={'form'}>
        <DialogTitle>New Weather Setting</DialogTitle>
        <DialogContent>
            <Grid container item xs={12}>
                <Alert severity="info" style={{width: '100%'}}>Please select country and cities for registering your new settings weather for your widget.</Alert>
            </Grid>
            <Grid container item xs={12} style={{marginTop: 7}} justifyContent={'space-around'} alignItems={'center'}>
                <Grid container item xs={4} spacing={2}>
                    <Grid item xs={12}>
                        <AutocompleteCountry value={country} setValue={(value) => {
                            setCountry(value)
                            setCities(null);
                        }} isRequired={true}/>
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteCities value={cities} setValue={setCities} isRequired={true} iso={!!country ? country.iso2 : null}/>
                    </Grid>
                </Grid>

                <Grid container item xs={5}>
                    <TemplateWeather city={cities} units={'metric'} countryCode={!!country ? country.iso2 : null}/>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button startIcon={<Cancel/>} variant={'contained'} color={'secondary'} onClick={() => handleCloseDialog(false)}>
                CANCEL
            </Button>
            <LoadingButton loading={isLoading} startIcon={<Save/>} variant={'contained'} color={'primary'} type={'submit'}>
                SAVE
            </LoadingButton>
        </DialogActions>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Dialog>

}