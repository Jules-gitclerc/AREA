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
import {LoadingButton} from "@mui/lab";
import axios from "axios";
import AlertError from "../../Tools/AlertError";

export default function DialogConfirmationDelete({open, handleClose, id}) {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCloseDialog = (isToRedirect) => {
        if (isToRedirect) {
            (async () => {
                try {
                    setIsLoading(true);
                    await axios.delete(`${process.env.REACT_APP_DASHBOARD_API}/weather/${id}`,
                        {
                            'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                        })
                    handleClose(isToRedirect);
                    setIsConfirmed(false);
                    setIsLoading(false);
                } catch (err) {
                    if (err.response) {
                        setIsError(true);
                        setIsLoading(false);
                    }
                }
            })()
        } else {
            handleClose(isToRedirect);
            setIsConfirmed(false);
        }
    }

    return <Dialog open={open} fullWidth maxWidth={'sm'} onClose={() => handleCloseDialog(false)}>
        <DialogTitle>
            Delete Weather Settings
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure to delete this weather settings?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <FormControlLabel control={<Switch checked={isConfirmed} onChange={() => setIsConfirmed(prevState => !prevState)} />} label="Confirmed" />
            <Button variant={'contained'} color={'secondary'} onClick={() => handleCloseDialog(false)}>
                Cancel
            </Button>
            <LoadingButton loading={isLoading} disabled={!isConfirmed} variant={'contained'} onClick={() => handleCloseDialog(true)} color={'primary'}>
                Delete
            </LoadingButton>
        </DialogActions>
        <AlertError isError={isError} setIsError={setIsError}/>
    </Dialog>

}