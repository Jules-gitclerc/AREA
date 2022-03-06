import { Add } from "@mui/icons-material";
import { Button, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AreaDialog from "../ServiceSettings/AreaDialog";
import AreaComponent from "../Tools/AreaComponent";
import axios from "axios";
import {iconFromName, PropFromId} from '../Tools/Services';
import AlertError from "../Tools/AlertError";

export default function ServicePage({service}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actions, setActions] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(null);

    const getActionsAndReactions = async (isLoadingOver) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/`,
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            });
            let arFetched = response.data;
            arFetched.actions.forEach((element, index) => {
                let params = [];
                if (element.params) {
                    element?.params.forEach((param) => {
                        params.push({name: param, value: ''});
                    });
                }
                arFetched.actions[index] = {
                    icon: PropFromId(element.id_service)['icon'],
                    color: PropFromId(element.id_service)['color'],
                    ...element,
                    params: params
                }
            })
            arFetched.reactions.forEach((element, index) => {
                let params = [];
                if (element.params) {
                    element?.params.forEach((param) => {
                        params.push({name: param, value: ''});
                    });
                }
                arFetched.reactions[index] = {
                    icon: PropFromId(element.id_service)['icon'],
                    color: PropFromId(element.id_service)['color'],
                    ...element,
                    params: params
                }
            })
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/service/link?idService=${service.id}`,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
                let areasFetched = res.data;
                areasFetched.forEach((element, index) => {
                    areasFetched[index] = {
                        action: arFetched.actions.find((e) => e.id === element.idActions),
                        reaction: arFetched.reactions.find((e) => e.id === element.idReactions),
                        ...element
                    }
                    areasFetched[index].action.params = areasFetched[index].paramsAction;
                    areasFetched[index].reaction.params = areasFetched[index].paramsReaction;
                })
                setAreas(areasFetched);
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
            setActions(arFetched.actions);
            setReactions(arFetched.reactions);
            setIsLoading(!isLoadingOver);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(!isLoadingOver);
            }
        }
    }

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/`,
                {
                    cancelToken: source.token,
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
                if (isMounted && isMounted.current) {
                    let arFetched = response.data;
                    arFetched.actions.forEach((element, index) => {
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        arFetched.actions[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    arFetched.reactions.forEach((element, index) => {
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        arFetched.reactions[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    await (async () => {
                        try {
                            setIsLoading(true);
                            const res = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/service/link?idService=${service.id}`,
                            {
                                cancelToken: source.token,
                                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                            });
                            if (isMounted && isMounted.current) {
                                let areasFetched = res.data;
                                areasFetched.forEach((element, index) => {
                                    areasFetched[index] = {
                                        action: arFetched.actions.find((e) => e.id === element.idActions),
                                        reaction: arFetched.reactions.find((e) => e.id === element.idReactions),
                                        ...element
                                    }
                                    areasFetched[index].action.params = areasFetched[index].paramsAction;
                                    areasFetched[index].reaction.params = areasFetched[index].paramsReaction;
                                })
                                setAreas(areasFetched);
                            }
                        } catch (err) {
                            if (err.response) {
                                setIsError(true);
                            }
                        }
                    })()
                    setActions(arFetched.actions);
                    setReactions(arFetched.reactions);
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
            source.cancel("Component Services GET user data got unmounted");
        }
    }, [service])

    const handleAddClose = async (value) => {
        if (value === true) {
            await getActionsAndReactions(true);
        }
        setIsAddOpen(false);
    }

    const handleAreaActivation = async (area) => {
        try {
            let body = {
                idAction: area.action.id,
                idReaction: area.reaction.id,
                paramsAction: area.action.params,
                paramsReaction: area.reaction.params,
                isActive: !area.isActive
            }
            let response = await axios.put(`${process.env.REACT_APP_DASHBOARD_API}/AR/link/${area.id}`, body,
                {
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
            if (response.status === 200) {
                area.isActive = !area.isActive;
                setAreas([...areas]);
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                setIsError(true)
            }
        }
    }

    const handleAddOpen = async () => {
        setIsAddOpen(true);
    }

    return (
        <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} style={{background: service.color, paddingTop: 30}} justifyContent={'center'} alignItems={'center'} direction={'column'}>
                {iconFromName(service.name)}
                <Typography variant={'h5'} style={{fontWeight: 'bold'}} style={{ padding: 20, color: 'white' }}>
                    { service.name }
                </Typography>
            </Grid>
            <Divider style={{width: '100%'}}/>
            <Grid container item xs={12} style={{ padding: 20 }} spacing={2}>
                <Grid container item xs={6}>
                    <Typography variant={'h5'} style={{padding: 10, fontWeight: 'bold'}}>
                        ACTIONS-REACTIONS
                    </Typography>
                </Grid>
                <Grid container item xs={6} alignItems={'center'} justifyContent={'flex-end'} spacing={2}>
                    <Grid item>
                        {isLoading ? <Skeleton variant="rectangular" width={150} height={50} /> : <Button variant={'outlined'} startIcon={<Add/>} onClick={() => handleAddOpen()}>
                            Add Action-Reaction
                        </Button>}
                    </Grid>
                </Grid>
                <Grid container item xs={12} style={{ padding: 40 }} spacing={2}>
                    {areas.map((item, index) =>
                        <AreaComponent
                        key={`${item.action.service}-${index}-cards-service`}
                        area={item}
                        onActivation={handleAreaActivation}
                        />
                    )}
                    <AreaDialog
                        isAddOpen={isAddOpen}
                        onClose={handleAddClose}
                        actions={actions}
                        reactions={reactions}
                        pageService={service}
                    />
                </Grid>
            </Grid>
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )
}