import React from "react";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {Skeleton} from "@mui/lab";

export default function SkeletonConversation() {
    return <List style={{width: '100%', padding: 0}}>
        {[0, 1, 2, 3, 4, 5].map(item => <ListItem key={`Skeleton conversation - ${item}`} style={{width: '100%'}} sx={{borderBottom: 1, borderColor: 'divider'}}>
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText primary={
                <Skeleton style={{width: '90%'}}/>
            } secondary={<Skeleton style={{width: '60%'}}/>}/>
        </ListItem>)}
    </List>
}