import React from 'react';
import {Avatar, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip} from "@mui/material";
import {AvatarGroup, Skeleton} from "@mui/lab";
import {Menu} from "@mui/icons-material";
import PopoverMenuConv from "./PopoverMenuConv";

export default function RecapConv({isLoading, data}) {
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    return <Grid container item xs={12} style={{height: 57}} sx={{borderBottom: 1, borderColor: 'divider'}}>
        <ListItem style={{width: '100%'}} secondaryAction={
            <Tooltip title={'Menu conversation'}>
                <IconButton disabled={isLoading} edge="end" onClick={handleOpenMenu}>
                    <Menu/>
                </IconButton>
            </Tooltip>
        }>
            {isLoading || !data || !data.conversation ? <>
                    <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40}/>
                </ListItemAvatar>
                    <ListItemText primary={
                        <Skeleton style={{width: '95%'}}/>
                    }/></>
                :
                <><ListItemAvatar style={{marginRight: 10}}>
                    <AvatarGroup total={data.conversation.users.length}>
                        {data.conversation.users.map(user => <Tooltip title={user.username}><Avatar key={`Avatar user conv - ${user.id}`} alt={user.username}
                                                                                       src={user.avatar}/></Tooltip>)}
                    </AvatarGroup>
                </ListItemAvatar>
                    <ListItemText primary={
                        data.conversation.name
                    }/></>}
        </ListItem>
        <PopoverMenuConv handleClose={handleCloseMenu} anchorEl={anchorElMenu}/>
    </Grid>
}