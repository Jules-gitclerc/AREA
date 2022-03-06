import {Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Tooltip} from "@mui/material";
import React, {useRef, useState, useEffect} from "react";
import axios from "axios";
import AvatarCropper from "./AvatarCropper";
import {getRotatedImage} from "./canvasUtils";
import {getOrientation} from "get-orientation/browser";
import Edit from '@mui/icons-material/Edit';

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

export default function AvatarUpload({logoUrl, handleSave, handleDelete, label = 'avatar'}) {
    const avatarRef = useRef()
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [image, setImage] = useState('')
    const [openCropper, setOpenCropper] = useState(false)
    const [imgSrc, setImageSrc] = useState(null)
    const isMounted = useRef(null)
    const inputFile = useRef(null)

    function handleUpdate() {
        inputFile.current.click();
    }

    async function onFileChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }

            setImageSrc(imageDataUrl)
            setOpenCropper(true)
        }
    }

    function handleOpenMenu(event) {
        if (!image || logoUrl.includes('type=corporate'))
            handleUpdate()
        else
            setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleCloseCropper() {
        setOpenCropper(false)
        setImageSrc(null)
    }

    useEffect(() => {
        isMounted.current = true
        const source = axios.CancelToken.source();

        (async () => {
            try {
                if (!!logoUrl && logoUrl.substr(0, 4) !== 'null') {
                    const response = await axios.get(`${process.env.REACT_APP_KEYBOON_API}/image/download/${logoUrl}`,
                        {
                            cancelToken: source.token,
                            'headers': {'Authorization': `Bearer  ${process.env.REACT_APP_BEARER || localStorage.getItem('JWT')}`}
                        });
                    setImage(response.data)
                } else {
                    setImage(null)
                }
            } catch (err) {
                //TODO: isError
            }
        })()
        return () => {
            isMounted.current = false;
            source.cancel("Component got unmounted");
        }
    }, [logoUrl])

    return (
        <>
            <IconButton onClick={handleOpenMenu}>
                <Tooltip title={`Click here to modify ${label}`}>
                    <Avatar
                        ref={avatarRef}
                        style={{
                            border: '1px solid #02020224',
                            height: 80,
                            width: 80,
                        }}
                        alt={`Click here to modify ${label}`}
                        src={image}
                    />
                </Tooltip>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuList dense sx={{padding: 0}}>
                    <MenuItem onClick={handleUpdate}>
                        <ListItemIcon>
                            <Edit/>
                        </ListItemIcon>
                        <ListItemText>
                            {`Update the ${label}`}
                        </ListItemText>
                    </MenuItem>
                    {/* <MenuItem onClick={handleRemove}>
                       <ListItemIcon>
                            <FontAwesomeIcon icon={faTrash}/>
                        </ListItemIcon>
                        <ListItemText primary={`Delete the ${label}`}/>
                    </MenuItem>*/}
                </MenuList>
            </Menu>
            <AvatarCropper
                imageSrc={imgSrc}
                handleClose={handleCloseCropper}
                handleSave={handleSave}
                open={openCropper}
            />
            <input key={Number(openCropper)} type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onFileChange}/>
        </>
    )
}