import React, {useState} from 'react';
import {Grid, Tab, Tabs, Typography} from "@mui/material";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Me from "./Me/Me";
import Security from "./Security/Security";
import Theme from "./Theme/Theme";
import {Badge, Palette, GppGood, Settings} from "@mui/icons-material";
import SettingsProfile from "./Settings/Settings";

function SelectedRouter({setTabs, app, value}) {
    setTabs(value)
    return app
}

export default function Profile({handleThemeChange}) {
    const [tabs, setTabs] = useState("Me");
    let navigate = useNavigate();

    const pages = [
        {
            label: 'Me',
            value: 'Me',
            component: <Me/>,
            icon: <Badge/>
        },
        {
            label: 'Theme',
            value: 'Theme',
            component: <Theme handleThemeChangeParent={handleThemeChange}/>,
            icon: <Palette/>
        },
        {
            label: 'Security',
            value: 'Security',
            component: <Security/>,
            icon: <GppGood/>
        },
        {
            label: 'Settings',
            value: 'Settings',
            component: <SettingsProfile/>,
            icon: <Settings/>
        },
    ]

    const handleTabsChange = (event, newValue) => {
        navigate(newValue);
    };

    return <Grid container item xs={12} style={{padding: 10}} justifyContent={'center'}>
        <Grid container item xs={12} sm={10} md={7} style={{paddingBottom: 30, paddingTop: 30}}>
            <Typography variant={'h5'} style={{fontWeight: 'bold'}}>
                PROFILE
            </Typography>
        </Grid>
        <Grid container item xs={12} sm={10} md={7}>
            <Tabs value={tabs} onChange={handleTabsChange}>
                {pages.map((item, index) => <Tab icon={item.icon} iconPosition="start" key={`${item.label}-${index}-tabs-profile`} label={item.label} value={item.value}/>)}
            </Tabs>
        </Grid>
        <Routes>
            <Route path={`/`} element={<Navigate to={pages[0].value}/>}/>
            {pages.map((item, index) => <Route key={`${item.label}-${index}-router-profile`} path={item.value} element={<SelectedRouter setTabs={setTabs} value={item.value} app={item.component}/>}/>)}
        </Routes>
    </Grid>
}