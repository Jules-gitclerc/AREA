import React, {useState} from 'react';
import {Grid} from "@mui/material";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";

export default function Chat() {
    const [selectedIdConv, setSelectedIdConv] = useState(0);

    const handleChangeSelectedIdConv = (idConv) => {
        setSelectedIdConv(idConv)
    }

    return <Grid container item xs={12} style={{height: '100%'}}>
        <Conversation handleChangeSelectedIdConv={handleChangeSelectedIdConv} selectedIdConv={selectedIdConv}/>
        <Message selectedIdConv={selectedIdConv}/>
    </Grid>
}