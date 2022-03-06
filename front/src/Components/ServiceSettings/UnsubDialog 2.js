import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel, Switch
} from "@mui/material";
import AlertError from "../Tools/AlertError";

export default function DialogConfirmationUnsub({open, handleClose, service}) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleCloseDialog = (isConfirmed) => {
        setIsConfirmed(false);
        handleClose(isConfirmed);
    }

    return <Dialog open={open} fullWidth maxWidth={'sm'} onClose={() => handleCloseDialog(false)}>
        <DialogTitle>
            Unsub service
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure to unsub from {service.name} ? Actions and reactions linked with this service will be removed.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <FormControlLabel control={<Switch checked={isConfirmed} onChange={() => setIsConfirmed(prevState => !prevState)} />} label="Confirmed" />
            <Button variant={'contained'} color={'secondary'} onClick={() => handleCloseDialog(false)}>
                Cancel
            </Button>
            <Button disabled={!isConfirmed} variant={'contained'} onClick={() => handleCloseDialog(true)} color={'primary'}>
                Unsub
            </Button>
        </DialogActions>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Dialog>

}