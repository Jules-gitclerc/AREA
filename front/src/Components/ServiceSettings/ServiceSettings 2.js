import { Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ActionsReactions from "./ActionReactions";
import Services from "./Services";
import {PropFromId, iconFromName} from '../Tools/Services';
import AlertError from "../Tools/AlertError";

export default function ServicesSettings({onServicesSub}) {
    const [areas, setAreas] = useState({
        services: [],
        actions: [],
        reactions: [],
        myAreas: []
    })
    const [canAddArea, setCanAddArea] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(null);

    const onDialogClose = async () => {
        await getActionsAndReactions(true);
    }

    const deleteAR = async (arId, isLoadingOver) => {
        try {
            setIsLoading(true);
            await axios.delete(`${process.env.REACT_APP_DASHBOARD_API}/AR/link/${arId}`,
            {
                'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
            });
            setIsLoading(!isLoadingOver);
        } catch (err) {
            if (err.response) {
                setIsError(true);
                setIsLoading(!isLoadingOver);
            }
        }
    }

    const handleAreaSub = async (area) => {
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
                setAreas({
                    myAreas: areas.myAreas,
                    ...areas
                })
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                setIsError(true)
            }
        }
    }

    const handleServicesSub = async (serviceToDel) => {
        setAreas({
            myAreas: areas.services,
            ...areas
        })
        if (serviceToDel !== undefined) {
            await areas.myAreas.forEach(async (area) => {
                if (area.action.id_service === serviceToDel.id || area.reaction.id_service === serviceToDel.id) {
                    await deleteAR(area.id, false);
                }
            });
        }
        await onServicesSub(areas.services);
        areas.services.filter((e) => e.isActive === true).length !== 0 ? setCanAddArea(true) : setCanAddArea(false);
        await getActionsAndReactions(true);
    }

    const checkIfCanAdd = async (nbService) => {
        nbService !== 0 ? setCanAddArea(true) : setCanAddArea(false);
    }

    const checkIfAR = (service) => {
        let value = areas.myAreas.some((e) => e.action.id_service === service.id || e.reaction.id_service === service.id);
        return (value);
    }

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
                const res = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/link`,
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
                areas.actions = arFetched.actions;
                areas.reactions = arFetched.reactions;
                areas.myAreas = areasFetched;
                setAreas(areas);
            } catch (err) {
                if (err.response) {
                    setIsError(true);
                }
            }
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
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/AR/ilian`,
                {
                    cancelToken: source.token,
                    'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                });
                if (isMounted && isMounted.current) {
                    let actionsFetched = response.data.actions;
                    actionsFetched.forEach((element, index) => {
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        actionsFetched[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    let reactionsFetched = response.data.reactions;
                    reactionsFetched.forEach((element, index) => {
                        let params = [];
                        if (element.params) {
                            element?.params.forEach((param) => {
                                params.push({name: param, value: ''});
                            });
                        }
                        reactionsFetched[index] = {
                            icon: PropFromId(element.id_service)['icon'],
                            color: PropFromId(element.id_service)['color'],
                            ...element,
                            params: params
                        }
                    })
                    let areasFetched = response.data.link;
                    areasFetched.forEach((element, index) => {
                        areasFetched[index] = {
                            action: actionsFetched.find((e) => e.id === element.idActions),
                            reaction: reactionsFetched.find((e) => e.id === element.idReactions),
                            ...element
                        }
                        areasFetched[index].action.params = areasFetched[index].paramsAction;
                        areasFetched[index].reaction.params = areasFetched[index].paramsReaction;
                    })
                    let servicesFetched = response.data.services;
                    servicesFetched.forEach((element, index) => {
                        servicesFetched[index] = {
                            icon: iconFromName(element.name),
                            ...element
                        }
                    })
                    checkIfCanAdd(servicesFetched.filter((e) => e.isActive === true).length);
                    areas.services = servicesFetched;
                    areas.actions = actionsFetched;
                    areas.reactions = reactionsFetched;
                    areas.myAreas = areasFetched;
                    setAreas(areas);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
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
    }, [])

    return (
        <Grid container item xs={12}>
            <Services services={areas.services} onServiceSub={handleServicesSub} checkIfAR={checkIfAR} isLoading={isLoading}/>
            <Divider/>
            <ActionsReactions
            actions={areas.actions}
            reactions={areas.reactions}
            areas={areas.myAreas}
            isLoading={isLoading}
            canAddArea={canAddArea}
            onDialogClose={onDialogClose}
            onAreaActivation={handleAreaSub}
            />
            <AlertError isError={isError} setIsError={setIsError}/>
        </Grid>
    )

}