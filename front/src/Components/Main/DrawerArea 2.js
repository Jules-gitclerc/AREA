import React, {useContext} from 'react';
import {
    Divider,
    Drawer,
    Grid,
    Toolbar,
    Typography,
    List,
    ListSubheader,
    ListItemButton,
    ListItemIcon, ListItemText, Box, ListItem, Skeleton, Alert
} from "@mui/material";
import {API_WEATHER, CHAT, drawWith, GENERAL_DASHBOARD, GENERAL_PROFILE, SERVICE_SETTINGS} from "./config";
import {Cloud, Dashboard, Message, Person} from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate} from "react-router-dom";
import UserContext from "../Tools/UserContext/UserContext";

function ClassicListItemButtonNav({idSelected, id, label, icon, redirectTo, isLoading}) {
    let navigate = useNavigate();

    if (isLoading)
        return <ListItem style={{width: '100%'}}>
            <Skeleton variant={'rectangular'} width={'100%'} height={30} style={{width: '100%'}} sx={{bgcolor: 'grey.900'}}/>
        </ListItem>

    return <ListItemButton onClick={() => {
        navigate(redirectTo);
    }} sx={{
        [`&:hover`]: {
            bgcolor: 'dashboard.drawer.hover',
            borderRadius: '10px',
            marginLeft: '5px',
            marginRight: '5px'
        },
    }}>
        <ListItemIcon sx={{color: idSelected === id ? 'dashboard.drawer.buttonSelected' : 'dashboard.drawer.button'}} style={{color: idSelected === id ? 'dashboard.drawer.buttonSelected' : 'dashboard.drawer.button'}}>
            {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{color: idSelected === id ? 'dashboard.drawer.buttonSelected' : 'dashboard.drawer.button'}}/>
    </ListItemButton>
}

export default function DrawerArea({isLoading, idSelected, services}) {
    let userContext = useContext(UserContext);

    return <Drawer
        variant="permanent"
        open={true}
        sx={{
            width: drawWith,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawWith, boxSizing: 'border-box', bgcolor: 'dashboard.drawer.background'},
        }}
    >
        <Toolbar>
            <Grid container item xs={12} justifyContent={'space-between'} alignItems={'center'}>
                <img aly={'Ulys-Logo'} src={'/Ulys-5.png'} style={{width: 60, height: 'auto'}} alt="logo"/>
                <Typography color={"white"} variant={'h3'} style={{fontWeight: 'bold'}}>
                    ULYS
                </Typography>
            </Grid>
        </Toolbar>
        <Divider color={'gray'}/>
        <Box sx={{overflow: 'auto'}}>
            {userContext && !userContext.isIdentified && <Alert severity="warning" style={{margin: 10}}>Your account is not identified, please check your mail box.</Alert>}
            <List
                dense
                subheader={
                    <ListSubheader sx={{bgcolor: 'dashboard.drawer.background', color: 'dashboard.drawer.titleList', fontWeight: 'bold'}}>
                        General
                    </ListSubheader>
                }
            >
                <ClassicListItemButtonNav redirectTo={'Dashboard'} icon={<Dashboard/>} id={GENERAL_DASHBOARD}
                                          label={<Typography variant={"subtitle1"}> Dashboard </Typography>} idSelected={idSelected} isLoading={isLoading}/>
                <ClassicListItemButtonNav redirectTo={'Profile'} icon={<Person/>} id={GENERAL_PROFILE} label={<Typography variant={"subtitle1"}> Profile </Typography>}
                                          idSelected={idSelected} isLoading={isLoading}/>
                <ClassicListItemButtonNav redirectTo={'Chat'} icon={<Message/>} id={CHAT} label={<Typography variant={"subtitle1"}> Message </Typography>}
                                          idSelected={idSelected} isLoading={isLoading}/>
            </List>
            <List
                dense
                subheader={
                    <ListSubheader sx={{bgcolor: 'dashboard.drawer.background', color: 'dashboard.drawer.titleList', fontWeight: 'bold'}}>
                        API
                    </ListSubheader>
                }
            >
                <ClassicListItemButtonNav redirectTo={'Weather'} icon={<Cloud/>} id={API_WEATHER}
                                          label={<Typography variant={"subtitle1"}> Weather </Typography>} idSelected={idSelected} isLoading={isLoading}/>
            </List>
            <List
                dense
                subheader={
                    <ListSubheader sx={{bgcolor: 'dashboard.drawer.background', color: 'dashboard.drawer.titleList', fontWeight: 'bold'}}>
                        Services
                    </ListSubheader>
                }
            >
                {!userContext ? <Skeleton variant="rectangular" width={'100%'} height={'100%'} style={{borderRadius: 5}}/>
                 : services.map((item, index) => {
                     if (!item.isActive)
                        return (<div/>);
                     else
                     return (
                        <ClassicListItemButtonNav icon={item.icon}
                        redirectTo={item.path}
                        id={item.pageId}
                        label={item.name}
                        key={`${item.id} - service bar - ${index}`}
                        idSelected={idSelected}
                        />
                    )
                })}
                <ClassicListItemButtonNav redirectTo={'Service'} icon={<SettingsIcon/>} id={SERVICE_SETTINGS}
                                          label={<Typography variant={"subtitle1"}> Service settings </Typography>} idSelected={idSelected} isLoading={isLoading}/>
            </List>
        </Box>


    </Drawer>
}