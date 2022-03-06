import React from "react";
import {List, ListItemButton, ListItemIcon, ListItemText, Popover, Typography} from "@mui/material";
import {Edit, ExitToApp, People} from "@mui/icons-material";

export default function PopoverMenuConv({anchorEl, handleClose}) {
    return <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
    >
        <List dense>
            <ListItemButton>
                <ListItemIcon>
                    <Edit/>
                </ListItemIcon>
                <ListItemText primary={'Edit conversation name'}/>
            </ListItemButton>
            {/*<ListItemButton>
                <ListItemIcon>
                    <ExitToApp/>
                </ListItemIcon>
                <ListItemText primary={'Leave conversation'}/>
            </ListItemButton>
                <ListItemButton>
                <ListItemIcon>
                <People/>
                </ListItemIcon>
                <ListItemText primary={'Add people'}/>
                </ListItemButton>*/}
        </List>
    </Popover>
}