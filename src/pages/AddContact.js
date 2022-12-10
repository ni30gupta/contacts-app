import { TextField, Box, Button, withStyles, InputLabel, Select, MenuItem, FormControl, Switch, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React, { useState, useEffect } from 'react'
import contact from '../utils/contactSchema';
import { storage } from '../utils/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"


const AddContact = () => {

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
            background:'#D6E4E5'
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between'
        },
    }

    const [details, setDetails] = useState({whatsapp:true})
    const [contacts, setContacts] = useState([])
    const [imageUpload, setImageUpload] = useState(null)

    const menus = ["Personal", "Office", "Other"]

    const handleChange = (e) => {
        const getId = contacts.length
        setDetails({ ...details, id: getId, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setImageUpload(e.target.files[0])
    }

    const addContact = () => {
        const current = new contact({ ...details })
        setDetails({})
        if (imageUpload) {
            const imageRef = ref(storage, `images/${imageUpload.name}`)
            uploadBytes(imageRef, imageUpload).then(() => {
                getDownloadURL(imageRef).then((x) => {
                    current['image'] = x
                    setContacts([...contacts, current])
                })
            })
        }
    }


    useEffect(() => {
        contacts?.length > 0 && window.localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts])

    useEffect(() => {
        const ls = localStorage.getItem("contacts")
        ls && setContacts(JSON.parse(ls))
    }, [])


    return (
        <Box sx={{ height: '85vh', width: '100%', marginTop: 10 ,}}>
            <Box sx={{ boxShadow: 2 }} style={styles.wrapper}>
                <div style={styles.container} >
                    <h1 style={{ margin: 'auto' }}>Add Contact</h1>
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
                        <input type="file" name="picture" onChange={handleImage}/>
                    </div>
                    <Button variant="contained"onClick={addContact}>
                        Add
                    </Button>
                </div>
            </Box>
        </Box>
    )
}

export default AddContact