import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, Box, CircularProgress, TextField} from "@mui/material";
import axios from "axios";

export default function AutocompleteCountry({value, setValue, isDisabled = false, isRequired = false}) {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState('');
    const isMounted = useRef(null);

    useEffect(() => {
        setIsError(false);
        isMounted.current = true
        const source = axios.CancelToken.source();
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_API}/api/location/country?search=${search}`,
                    {
                        cancelToken: source.token,
                        'headers': {'Authorization': `Bearer  ${localStorage.getItem('JWT')}`}
                    });
                if (isMounted && isMounted.current) {
                    setOptions(response.data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (err.response) {
                    setIsLoading(false);
                    setIsError(true);
                }
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component Autocomplete countries got unmounted");
        }
    }, [search])

    return <Autocomplete
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
            setSearch('')
        }}
        fullWidth
        autoHighlight
        getOptionLabel={(option) => option.country}
        options={options}
        renderOption={(props, option) => {
            if (isError)
                return <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    An Error has occured
                </Box>
            if (isLoading)
                return <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <CircularProgress style={{height: 20, width: 20, marginRight: 20}}/>
                    Loading...
                </Box>
            return <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.iso2.toLowerCase()}.png 2x`}
                    alt=""
                />
                {option.country} ({option.iso2})
            </Box>
        }}
        renderInput={(params) => (
            <TextField
                required={isRequired}
                disabled={isDisabled}
                onChange={(e) => setSearch(e.target.value)}
                {...params}
                label="Choose a country"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                }}
            />
        )}
    />
}