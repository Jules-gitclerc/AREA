import React, {useState} from 'react';
import {Paper} from "@mui/material";
import WidgetAction from "./WidgetAction";

export default function Widget({isEdit, handleRemoveItem, model}) {
    const [openSettings, setOpenSettings] = useState(false);

    const handleOpenSettings = () => {
        setOpenSettings(true)
    }

    return <Paper style={{height: '100%', width: "100%"}}>
        {isEdit && <WidgetAction handleRemoveItem={handleRemoveItem} handleOpenSettings={handleOpenSettings} modelID={model.idBDD}/>}
        {model.component(openSettings, setOpenSettings, model.idBDD)}
    </Paper>
}