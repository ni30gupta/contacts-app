import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [contacts, setContacts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const ls = localStorage.getItem("contacts")
        ls && setContacts(JSON.parse(ls).sort((a, b) => b.name > a.name ? -1 : 0))
    }, [])

    const deleteContact = (id) => {
        let text = "This will delete a contact!";
        if (window.confirm(text) == true) {
            let filtered = contacts.filter(contact => contact.id !== id)
            setContacts(filtered)
            localStorage.setItem('contacts', JSON.stringify(filtered))
        }
    }

    return (
        <>
            {
                contacts.length > 0 ? (
                    <Box sx={{ width: '70%' }} style={{ margin: "auto", height: '80vh', marginTop: 20, }}>
                        <TableContainer component={Paper} style={{ height: '95%', overflowY: "scroll" }}>
                            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Picture</TableCell>
                                        <TableCell >Name</TableCell>
                                        <TableCell >Phone</TableCell>
                                        <TableCell >Whatsapp</TableCell>
                                        <TableCell >Type</TableCell>
                                        <TableCell >Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contacts?.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell >
                                                <img
                                                    style={{ borderRadius: '50%', width: 50, height: 50 }}
                                                    src={row.image} alt={row.image}
                                                />
                                            </TableCell>
                                            <TableCell >{row.name}</TableCell>
                                            <TableCell >{row.phone}</TableCell>
                                            <TableCell >{row.whatsapp}</TableCell>
                                            <TableCell >{row.type}</TableCell>
                                            <TableCell >
                                                <Link to={`/edit-contact/${row.id}`} >
                                                    <EditIcon style={{ color: 'blue' }} />
                                                </Link>
                                                <DeleteForeverIcon
                                                    onClick={() => deleteContact(row.id)}
                                                    style={{ color: 'red', cursor: 'pointer', marginLeft: 20 }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ marginTop: 20, height: '5%', }}>
                            <Button
                                onClick={() => navigate("/add-contact")}
                                style={{ float: 'right', }} lg variant='contained' color="warning"
                            >
                                Add New Contact
                            </Button>
                        </div>
                    </Box>
                ) : <div>
                    <h3>No contacts Saved Yet.</h3>
                    <Button
                        onClick={() => navigate("/add-contact")}
                        style={{ float: 'left' }} lg variant='contained'
                    >
                        Add New Contact
                    </Button>
                </div>
            }
        </>
    )
}

export default Home