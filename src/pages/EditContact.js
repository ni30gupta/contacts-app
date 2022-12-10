import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { storage } from '../utils/firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const EditContact = () => {
    const [details, setDetails] = useState({})
    const [contacts, setContacts] = useState([])
    const [imageUpload, setImageUpload] = useState(null)

    const menus = ["Personal", "Office", "Other"]

    const styles = {
        wrapper: {
            height: 300,
            width: 550,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            margin: 'auto',
            padding: 15,
            borderRadius: 10,
            background: '#D6E4E5'
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between'
        },
    }

    let { id } = useParams();

    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('contacts'))
        setContacts(ls)
        let details = ls.find(data => data.id == id)
        setDetails(details)
    }, [])

    const handleImage = (e) => {
        setImageUpload(e.target.files[0])
    }

    const editContact = () => {
        const index = contacts.findIndex(data => data.id == id)
        if (imageUpload) {
            const imageRef = ref(storage, `images/${imageUpload.name}`)
            uploadBytes(imageRef, imageUpload).then(() => {
                getDownloadURL(imageRef).then((x) => {
                    let current = contacts[index]
                    console.log(current)
                    contacts[index] = { ...details, ['image']: x }
                    console.log(contacts)
                    localStorage.setItem("contacts", JSON.stringify(contacts))
                })
            })
        } else {
            contacts[index] = details
            localStorage.setItem("contacts", JSON.stringify(contacts))
        }
        setDetails({})
    }

    const handleChange = (e) => {
        setDetails({ ...details, id: parseInt(id), [e.target.name]: e.target.value })
    }

    return (
        <Box sx={{ height: '85vh', width: '100%', marginTop: 10 }}>
            <Box sx={{ boxShadow: 2 }} style={styles.wrapper}>
                <div style={styles.container} >
                    <h1 style={{ margin: 'auto' }}>Edit Contact</h1>
                </div>
                <div style={styles.container} >
                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        onChange={handleChange}
                        name="name"
                        value={details.name || ""}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Phone"
                        onChange={handleChange}
                        name="phone"
                        type="number"
                        value={details.phone || ""}
                    />
                </div>
                <div style={styles.container}>

                    <FormControl style={{ minWidth: "45%" }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={details.type || ""}
                            label="Type"
                            name="type"
                            onChange={handleChange}
                        >
                            {menus.map((menu, ind) => <MenuItem key={ind} value={menu}>{menu}</MenuItem>)}

                        </Select>
                    </FormControl>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Whatsapp</span>
                        <FormControl style={{ display: 'flex', marginLeft: 10 }}>
                            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={true}
                                name="whatsapp"
                                style={{ display: 'flex', flexDirection: 'row' }}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div style={styles.container}>
                    <div>
                        <span>Profile Image </span>
                        <input type="file" name="picture" onChange={handleImage} />
                    </div>
                    <Button variant="contained" onClick={editContact}>Edit</Button>
                </div>
            </Box>
        </Box>
    )
}

export default EditContact