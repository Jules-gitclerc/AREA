import React, {useContext, useEffect, useState} from "react";
import {
    Toolbar,
    AppBar,
    Tooltip,
    IconButton,
    Grid,
    TextField,
    InputAdornment,
    Avatar,
    Typography,
    Popover,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    ListItem, Divider, ListItemAvatar, Collapse, Badge, Switch
} from "@mui/material";
import { styled } from '@mui/material/styles';
import {
    Notifications,
    ChatBubble,
    Search,
    Logout,
    Person,
    Settings,
    Palette,
    Power,
    PowerOff, Circle, KeyboardArrowDown, KeyboardArrowUp, MenuBook
} from "@mui/icons-material";
import {drawWith} from "./config";
import {useNavigate} from "react-router-dom";
import UserContext from "../Tools/UserContext/UserContext";
import socketContext from "../Tools/SocketContext/SocketContext";
import AlertError from "../Tools/AlertError";
import axios from "axios";

let statusData = [
    {
        id: 1,
        label: 'Online',
        color: 'green',
    },
    {
        id: 2,
        label: 'Inactive',
        color: 'orange',
    },
    {
        id: 3,
        label: 'Absent',
        color: 'red',
    }
]

export default function AppBarArea({isLoading, handleTutorialChange}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openStatus, setOpenStatus] = useState(false);
    let userContext = useContext(UserContext);
    const [status, setStatus] = useState(1);
    const [isError, setIsError] = useState(false);
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const [isTutorialMode, setIsTutorialMode] = useState(false);
    const [isLoadingTutorial, setIsLoadingTutorial] = useState(false);
    let navigate = useNavigate();
    let socket = useContext(socketContext)

    useEffect(() => {
        if (userContext) {
            setStatus(userContext.idStatus || 1)
            setIsTutorialMode(userContext.isTutorialMode);
        }
    }, [userContext])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: statusData.find(item => item.id === status) ? statusData.find(item => item.id === status).color : 'black',
            color: statusData.find(item => item.id === status) ? statusData.find(item => item.id === status).color : 'black',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        },
    }));

    const handleStatusChange = async (idStatus) => {
        try {
            setIsLoadingStatus(true);
            await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/users/status`, {idStatus: idStatus},
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            setStatus(idStatus);
            setOpenStatus(false);
            setIsLoadingStatus(false);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoadingStatus(false);
            }
        }
    }

    const handleIsTutorialModeChange = async () => {
        try {
            setIsLoadingTutorial(true);
            await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/users/tutorialMode`, {isTutorialMode: !isTutorialMode},
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            handleTutorialChange()
            setIsTutorialMode(prevState => !prevState);
            setIsLoadingTutorial(false);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoadingTutorial(false);
            }
        }
    }

    const getSecondaryActionStatus = () => {
        if (isLoadingStatus)
            return <CircularProgress style={{width: 15, height: 15}}/>
        return <IconButton size={'small'}>
            {openStatus ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
        </IconButton>
    }

    return <AppBar position="static" sx={{bgcolor: 'white'}}>
        <Toolbar>
            <Grid container item xs={12}>
                <Grid container item xs={6} alignItems={'center'}>
                    <Grid item xs={7} style={{marginLeft: drawWith + 10}}>
                        {/*<TextField disabled={isLoading || !userContext} fullWidth size={"small"} label={'Search Bar'}
                                    variant={'outlined'} type={'search'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Search/>
                                            </InputAdornment>
                                        )
                                    }}/>*/}
                    </Grid>
                </Grid>
                <Grid container item xs={6} justifyContent={'flex-end'} alignItems={'center'} spacing={2}>
                    {isLoading || !userContext ? <Grid item>
                        <CircularProgress style={{width: 25, height: 25}}/>
                    </Grid> : <Grid item>
                        <Tooltip title="Chat">
                            <IconButton onClick={() => navigate('/App/Chat')}>
                                <ChatBubble/>
                            </IconButton>
                        </Tooltip>
                    </Grid>}

                    {/*isLoading || !userContext ? <Grid item>
                        <CircularProgress style={{width: 25, height: 25}}/>
                    </Grid> : <Grid item>
                        <Tooltip title="Notifications">
                            <IconButton>
                                <Notifications/>
                            </IconButton>
                        </Tooltip>
                    </Grid>*/}

                    {isLoading || !userContext ? <Grid item>
                        <CircularProgress style={{width: 25, height: 25}}/>
                    </Grid> : <Grid item>
                        <Tooltip title="Open Profile">
                            <IconButton onClick={handleClick}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    variant="dot"
                                >
                                    <Avatar alt={userContext.username} src={userContext.avatar}/>
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </Grid>}
                </Grid>
            </Grid>
        </Toolbar>

        {userContext && <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <List dense style={{width: 300, padding: 0}}>
                <ListItem alignItems="flex-start"
                          secondaryAction={
                              <Tooltip title={!socket ? 'Socket is disconnected' : 'Socket is connected'}>
                                  <IconButton>
                                      {!socket ? <PowerOff/> : <Power/>}
                                  </IconButton>
                              </Tooltip>
                          }>
                    <ListItemAvatar>
                        <Avatar alt={userContext.username} src={userContext.avatar}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={userContext.username}
                        secondary={
                            <Typography
                                variant="caption"
                                color="gray"
                            >
                                {userContext.firstName} {userContext.lastName}
                            </Typography>
                        }
                    />
                </ListItem>
                <Divider/>
                <ListItem button style={{paddingTop: 0, paddingBottom: 0}} disabled={isLoadingStatus} onClick={() => setOpenStatus(prevState => !prevState)}
                          secondaryAction={getSecondaryActionStatus()}>
                    <ListItemIcon>
                        <Circle style={{color: statusData.find(item => item.id === status).color, fontSize: 15}}/>
                    </ListItemIcon>
                    <ListItemText primary={statusData.find(item => item.id === status).label}/>
                </ListItem>
                <Collapse in={openStatus}>
                    <Divider/>
                    <ListItem style={{padding: 0}}>
                        <List style={{padding: 0, width: '100%'}} dense>
                            {statusData.map(elem => <ListItemButton key={`${elem.id} all status data`} style={{
                                display: elem.id === status ? 'none' : '',
                                paddingTop: 0,
                                paddingBottom: 0
                            }} onClick={async () => await handleStatusChange(elem.id)}>
                                <ListItemIcon>
                                    <Circle style={{color: elem.color, fontSize: 15}}/>
                                </ListItemIcon>
                                <ListItemText primary={elem.label}/>
                            </ListItemButton>)}
                        </List>
                    </ListItem>
                </Collapse>
                <Divider/>
                <ListItem button style={{paddingTop: 0, paddingBottom: 0}} secondaryAction={isLoadingTutorial ? <CircularProgress style={{width: 15, height: 15}}/> : <Switch checked={isTutorialMode} size={'small'}/>} onClick={handleIsTutorialModeChange}>
                    <ListItemIcon>
                        <MenuBook/>
                    </ListItemIcon>
                    <ListItemText primary={'Tutorial Mode'}/>
                </ListItem>
                <Divider/>
                <ListItemButton onClick={() => {
                    handleClose();
                    navigate('/App/Profile/Me');
                }}>
                    <ListItemIcon>
                        <Person/>
                    </ListItemIcon>
                    <ListItemText primary={'Profile'}/>
                </ListItemButton>
                <ListItemButton onClick={() => {
                    handleClose();
                    navigate('/App/Profile/Settings');
                }}>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={'Settings'}/>
                </ListItemButton>
                <ListItemButton onClick={() => {
                    handleClose();
                    navigate('/App/Profile/Theme');
                }}>
                    <ListItemIcon>
                        <Palette/>
                    </ListItemIcon>
                    <ListItemText primary={'Theme'}/>
                </ListItemButton>
                <Divider/>
                <ListItemButton onClick={() => {
                    localStorage.clear();
                    navigate('/Login');
                }}>
                    <ListItemIcon>
                        <Logout/>
                    </ListItemIcon>
                    <ListItemText primary={'Log out'}/>
                </ListItemButton>
            </List>
        </Popover>}
        <AlertError isError={isError} setIsError={setIsError}/>
    </AppBar>
}