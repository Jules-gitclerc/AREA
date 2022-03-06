import React, {useEffect, useRef, useState} from 'react';
import {
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {DateRange, Dns} from "@mui/icons-material";
import moment from "moment";
import axios from "axios";
import AlertError from "../../Tools/AlertError";

export default function LoginHistory() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false)
    const isMounted = useRef(null);

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/users/historyConnection`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setData(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                    setIsLoading(false);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component History connection Me got unmounted");
        }
    }, []);


    return <Paper elevation={0} style={{borderRadius: 5}}>
        <Grid container item xs={12} sx={{p: 4}}>
            <Grid container item xs={6}>
                <Grid item xs={12}>
                    <Typography style={{fontWeight: 'bold', fontSize: 20}}>
                        Login history
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{fontSize: 11}} sx={{color: 'grey.500'}}>
                        Your recent login activity:
                    </Typography>
                </Grid>
            </Grid>
            {isLoading && <Grid container item xs={6} justifyContent={'flex-end'}>
                <CircularProgress/>
            </Grid>}
        </Grid>
        <Grid container item xs={12}>
            <Table>
                <TableHead sx={{borderBottom: 1, borderTop: 1, borderColor: 'divider'}}>
                    <TableRow>
                        <TableCell style={{padding: 5}} align={'center'}>
                            <Grid container item xs={12} spacing={1} justifyContent={'center'}>
                                <Grid item>
                                    <DateRange/>
                                </Grid>
                                <Grid item>
                                    DATE
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell style={{padding: 5}} align={'center'}>
                            <Grid container item xs={12} spacing={1} justifyContent={'center'}>
                                <Grid item>
                                    <Dns/>
                                </Grid>
                                <Grid item>
                                    IP ADDRESS
                                </Grid>
                            </Grid>
                        </TableCell>
                        {/*<TableCell style={{padding: 5}}>
                            <Grid container item xs={12} alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Business/>
                                </Grid>
                                <Grid item>
                                    CLIENT
                                </Grid>
                            </Grid>
                        </TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((elem, index) => <TableRow key={`Table row history communication ${index}`}>
                        <TableCell align={'center'}>
                            {moment(elem.date, 'YYYY-MM-DDTHH:mm:ss').format('MMMM Do YYYY, HH:mm:ss')}
                        </TableCell>
                        <TableCell align={'center'}>
                            {elem.ip}
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </Grid>
        <AlertError setIsError={setIsError} isError={isError}/>
    </Paper>
}