import React from 'react';
import {Snackbar, Alert} from "@mui/material";

export default function AlertError({isError, setIsError, msg = 'Error has occurred', severity = 'warning'}) {
    return <Snackbar open={isError} autoHideDuration={6000} onClose={() => setIsError(false)}>
        <Alert onClose={() => setIsError(false)} severity={severity}>
            {msg}
        </Alert>
    </Snackbar>
}