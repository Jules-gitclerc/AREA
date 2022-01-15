import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {
    Button, Checkbox, Collapse,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {Email, Lock, Visibility, VisibilityOff, Login, Person, Badge, KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import {Alert, LoadingButton} from "@mui/lab";

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBlindPass, setIsBlindPass] = useState(true);
    const [isTermActive, setIsTermActive] = useState(false);
    const [showTerm, setShowTerm] = useState(false);
    let navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        try {
            setIsLoading(true)
            let body = {
                email: email,
                password: password,
                username: firstName + ' ' + lastName,
                firstName: firstName,
                lastName: lastName,
                auth: 'local',
            }
            const response = await axios.post(`${process.env.REACT_APP_DASHBOARD_API}/auth/register`, body);

            localStorage.setItem('JWT', response.data.accessToken);
            navigate('/Main')
            setIsLoading(false)
        } catch (err) {
            if (err.response) {
                setIsError(true)
                setIsLoading(false)
            }
        }
    }

    return <Grid container item xs={12} alignItems={'center'} justifyContent={'center'} style={{height: '100vh'}}>
        <Grid item xs={4}>
            <Paper elevation={8} style={{width: '100%'}}>

                <Grid container item xs={12} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{p: 1}}
                      direction={'column'}>
                    <Grid item xs={12}>
                        <Typography variant="h4" style={{fontWeight: 'bold'}}>
                            Register
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color={'grey.500'}>
                            Register on the internal platform
                        </Typography>
                    </Grid>

                </Grid>

                <Divider variant="middle"/>

                <Grid container item xs={12} spacing={2} justifyContent={'center'} alignItems={'center'}
                      component={'form'} sx={{p: 3}} onSubmit={onSubmit}>

                    <Grid item xs={6}>
                        <TextField type={'text'} fullWidth label={'First Name'} required variant={'outlined'} value={firstName}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <Person/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField type={'text'} fullWidth label={'Last Name'} required variant={'outlined'} value={lastName}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <Badge/>
                                           </InputAdornment>
                                       ),
                                   }}
                                   onChange={(e) => setLastName(e.target.value)}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth required variant={'outlined'} type={'email'} value={email} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email/>
                                </InputAdornment>
                            ),
                        }}
                                   onChange={(e) => setEmail(e.target.value)} label={'Email Address'}/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth required variant={'outlined'} type={isBlindPass ? 'password' : 'text'}
                                   value={password}
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <Lock/>
                                           </InputAdornment>
                                       ),
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <IconButton onClick={() => setIsBlindPass(prevState => !prevState)}>
                                                   {isBlindPass ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>
                                       )
                                   }}
                                   onChange={(e) => setPassword(e.target.value)} label={'Password'}/>
                    </Grid>

                    <Grid container item xs={12} justifyContent={'space-between'}>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox checked={isTermActive} onChange={() => setIsTermActive(prevState => !prevState)} />}
                            label="I have read the Terms and Conditions"
                            labelPlacement="end"
                        />
                        <IconButton onClick={() => setShowTerm(prevState => !prevState)}>
                            {showTerm ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                        </IconButton>
                    </Grid>

                    <Collapse in={showTerm}>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                This is Epitech Project !
                            </Typography>
                        </Grid>
                    </Collapse>

                    <Grid item xs={12}>
                        <LoadingButton disabled={!isTermActive} loading={isLoading} fullWidth color={'primary'} type={'submit'}
                                       variant={'contained'}>
                            Register
                        </LoadingButton>
                    </Grid>

                </Grid>

                <Divider variant="middle"/>

                <Grid container item xs={12} sx={{p: 3}}>
                    <Button size={'small'} onClick={() => navigate('/login')} startIcon={<Login/>}>
                        Having an account
                    </Button>
                </Grid>
            </Paper>

            <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={() => setIsError(false)} severity="warning" sx={{width: '100%'}}>
                    A error has occurred!
                </Alert>
            </Snackbar>

        </Grid>

    </Grid>
}