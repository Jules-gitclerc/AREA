import React, {useEffect, useRef, useState} from 'react';
import {Box, createTheme, Grid, ThemeProvider} from "@mui/material";
import AppBarArea from "./AppBarArea";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Profile from "../Profile/Profile";
import {
    theme_default,
    drawWith,
    dataTheme,
    DEFAULT_PAGE,
    GENERAL_DASHBOARD,
    GENERAL_PROFILE,
    SERVICE_SETTINGS,
    API_WEATHER, CHAT
} from "./config";
import {UserContextProvider} from "../Tools/UserContext/UserContext";
import axios from "axios";
import MainLoader from "../Tools/MainLoader";
import DrawerArea from "./DrawerArea";
import ServiceSettings from '../ServiceSettings/ServiceSettings';
import {SocketContextProvider} from "../Tools/SocketContext/SocketContext";
import Dashboard from "../Dashboard/Dashboard";
import WrongPageRouter from "../Tools/WrongPageRouter";
import ServicePage from '../ServicePage/ServicePage';
import Weather from "../Weather/Weather";
import {TutorialContextProvider} from "../Tools/TutorialContext/TutorialContext";
import {PropFromId} from '../Tools/Services';
import TwitterRedirect from '../Tools/Twitter/TwitterRedirect';
import SpotifyRedirect from '../Tools/Spotify/SpotifyRedirect';
import Chat from "../Chat/Chat";
import RedditRedirect from '../Tools/Reddit/RedditRedirect';

function SelectedRouter({setIdSelectedDrawerButton, app, idRoute}) {
    setIdSelectedDrawerButton(idRoute)
    return app
}

export default function Main() {
    const [theme, setTheme] = useState(createTheme(theme_default));
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const isMounted = useRef(null);
    const [tutorial, setTutorial] = useState({isActive: true})
    const [idSelectedDrawerButton, setIdSelectedDrawerButton] = useState(DEFAULT_PAGE);
    const [services, setServices] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!isFirstLoading)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/users/me`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setUser(response.data);
                    let themeTarget = dataTheme.find(item => item.id === response.data.idTheme)
                    if (themeTarget)
                        setTheme(createTheme(themeTarget.color))
                    setTutorial({isActive: response.data.isTutorialMode})
                    setServicesData(response.data.services);
                    setIsLoading(false);
                    setIsFirstLoading(false);
                }
            } catch (err) {
                console.log(err);
                if (err.response) {
                    alert('Error has occured please retry your connection.');
                    navigate('/Login');
                    setIsLoading(false);
                }
                setIsLoading(false);
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Main GET user data got unmounted");
        }
    }, [navigate, isFirstLoading])

    const handleThemeChange = (id) => {
        let themeTarget = dataTheme.find(item => item.id === id)
        if (themeTarget)
            setTheme(createTheme(themeTarget.color))
    }

    const handleTutorialChange = () => {
        setTutorial({isActive: !tutorial.isActive})
    }

    const handleServicesSub = (childServices) => {
        let newServices = services;
        childServices.forEach((item, index) => {
            let { isActive } = childServices[index];
            newServices[index].isActive = isActive;
        });
        setServices([...newServices]);
    }

    const setServicesData = (data) => {
        let newServices = data;
        newServices.forEach((item, index) => {
            let {icon, pageId, path} = PropFromId(item.id);
            newServices[index] = {
                icon,
                pageId,
                path,
                ...item
            }
        });
        console.log(newServices)
        setServices(newServices);
    }

    return <ThemeProvider theme={theme}>
        {/*<SocketContextProvider>*/}
            <UserContextProvider user={user}>
                <TutorialContextProvider value={tutorial}>
                    <Grid container item xs={12}>
                        <AppBarArea isLoading={isLoading} handleTutorialChange={handleTutorialChange}/>
                        <DrawerArea isLoading={isLoading} idSelected={idSelectedDrawerButton} services={services}/>
                        <Box component="main"
                            sx={{bgcolor: 'grey.100'}} style={{
                            flexGrow: 1,
                            overflow: 'auto',
                            height: 'calc(100vh - 68px)',
                            width: `calc(100% - ${drawWith}px)`
                        }}>
                            {isLoading ? <Grid item container xs={12} style={{height: '100%'}} alignItems={'center'}
                                            justifyContent={'center'}>
                                <MainLoader/>
                            </Grid> : <Routes>
                                <Route path={`/`} element={<Navigate to={'Service'}/>}/>
                                {services.filter((item) => item.isActive === true).map((item, index) => <Route key={`${item.name}-${index}-router-service`} path={item.path} element={<SelectedRouter app={<ServicePage service={item}/>} idRoute={item.pageId} setIdSelectedDrawerButton={setIdSelectedDrawerButton} />}/>)}
                                <Route path={`Service/`} element={<SelectedRouter app={<ServiceSettings onServicesSub={handleServicesSub}/>} idRoute={SERVICE_SETTINGS} setIdSelectedDrawerButton={setIdSelectedDrawerButton} />}/>
                                <Route path={`Dashboard`} element={<SelectedRouter app={<Dashboard/>} idRoute={GENERAL_DASHBOARD} setIdSelectedDrawerButton={setIdSelectedDrawerButton} />}/>
                                <Route path={`Profile/*`} element={<SelectedRouter app={<Profile handleThemeChange={handleThemeChange}/>} idRoute={GENERAL_PROFILE} setIdSelectedDrawerButton={setIdSelectedDrawerButton} />}/>
                                <Route path={`TwitterRedirect`} element={<SelectedRouter app={<TwitterRedirect/>} setIdSelectedDrawerButton={setIdSelectedDrawerButton}/>}/>
                                <Route path={`SpotifyRedirect`} element={<SelectedRouter app={<SpotifyRedirect/>} setIdSelectedDrawerButton={setIdSelectedDrawerButton}/>}/>
                                <Route path={`Chat`} element={<SelectedRouter app={<Chat/>} idRoute={CHAT} setIdSelectedDrawerButton={setIdSelectedDrawerButton}/>}/>
                                <Route path={`RedditRedirect`} element={<SelectedRouter app={<RedditRedirect/>} setIdSelectedDrawerButton={setIdSelectedDrawerButton}/>}/>
                                <Route path={`Weather/*`}
                                    element={<SelectedRouter app={<Weather/>} idRoute={API_WEATHER}
                                    setIdSelectedDrawerButton={setIdSelectedDrawerButton}/>}/>
                                <Route
                                    path="*"
                                    element={
                                        <main style={{padding: "1rem"}}>
                                            <WrongPageRouter redirect={'/App/'}/>
                                        </main>
                                    }
                                />
                            </Routes>}
                        </Box>
                    </Grid>
                </TutorialContextProvider>
            </UserContextProvider>
            {/*</SocketContextProvider>*/}
    </ThemeProvider>
}