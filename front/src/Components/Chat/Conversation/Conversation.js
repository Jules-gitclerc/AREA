import React, {useEffect, useRef, useState} from 'react';
import {
    Avatar,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment, List,
    ListItem,
    ListItemAvatar, ListItemText,
    TextField,
    Tooltip
} from "@mui/material";
import axios from "axios";
import AlertError from "../../Tools/AlertError";
import SkeletonConversation from "./SkeletonConversation";
import {AddBox, Search} from "@mui/icons-material";
import DialogNewConversation from "./DialogNewConversation";
import {AvatarGroup} from "@mui/lab";

export default function Conversation({handleChangeSelectedIdConv, selectedIdConv}) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([]);
    const [isReload, setIsReload] = useState(true)
    const [isError, setIsError] = useState(false)
    const [openDialogNewConv, setOpenDialogNewConv] = useState(false);
    const isMounted = useRef(null)

    useEffect(() => {
        if (!isReload)
            return;
        isMounted.current = true
        const source = axios.CancelToken.source();
        setIsLoading(true);
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/msg/conversation`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    })
                if (isMounted && isMounted.current) {
                    setData(response.data)
                    setIsLoading(false)
                    setIsReload(false)
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true)
                    setIsLoading(false)
                    setIsReload(false)
                }
            }
        })()
        return () => {
            isMounted.current = false
            source.cancel("Component Chat users table got unmounted");
        };
    }, [isReload])

    function handleCloseDialogNewConv(isToReload) {
        setOpenDialogNewConv(false);
        setIsReload(isToReload);
    }

    return <Grid container item xs={3} style={{height: '100%'}} sx={{borderRight: 1, borderColor: 'divider'}}
                 display={'block'}>
        <Grid container item xs={12} sx={{p: 1, borderBottom: 1, borderColor: 'divider'}}>
            <Grid item xs={10}>
                <TextField disabled={isLoading} variant={'outlined'} label={'Search bar'} size={'small'}
                           color={'primary'} fullWidth type={'search'} InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {!isLoading ? <Search/> : <CircularProgress style={{height: 20, width: 20}}/>}
                        </InputAdornment>
                    )
                }}/>
            </Grid>
            <Grid container item xs={2} justifyContent={'center'} alignItems={'center'}>
                <Tooltip title={'Add new conversation'}>
                    <IconButton onClick={() => setOpenDialogNewConv(true)}>
                        <AddBox/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
        {isLoading ? <SkeletonConversation/> : <List style={{width: '100%', padding: 0}}>
            {data.map(item => <ListItem button key={`Conversation - ${item.id}`} style={{width: '100%'}}
                                        onClick={() => handleChangeSelectedIdConv(item.id)}
                                        sx={{
                                            transition: '0.5s',
                                            bgcolor: selectedIdConv === item.id ? 'primary.main' : '',
                                            color: selectedIdConv === item.id ? 'white' : 'black',
                                            borderLeft: selectedIdConv === item.id ? '5px solid' : null,
                                            borderLeftColor: 'secondary.main',
                                            boxShadow: selectedIdConv === item.id ? 'grey 4px 3px 5px' : null,
                                            //borderBottom: 1,
                                            //borderColor: 'divider',
                                            [`&:hover`]: {
                                                bgcolor: selectedIdConv === item.id ? 'primary.main' : 'grey.300',
                                            },
                                        }}>
                <ListItemAvatar style={{marginRight: 10}}>
                    <AvatarGroup total={item.users.length}>
                        {item.users.map(user => <Tooltip title={user.username}><Avatar key={`Avatar user conv - ${user.id}`} alt={user.username} src={user.avatar}/></Tooltip>)}
                    </AvatarGroup>
                </ListItemAvatar>
                <ListItemText primary={
                    item.name
                }/>
            </ListItem>)}
        </List>}
        <DialogNewConversation open={openDialogNewConv} handleClose={handleCloseDialogNewConv} handleChangeSelectedIdConv={handleChangeSelectedIdConv}/>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Grid>
}