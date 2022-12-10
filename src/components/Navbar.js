import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <>
            <CssBaseline />
            <Grid container style={{
                background: '#CACADC',
                position: 'sticky',
                top: 0,
                height: '10vh',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Grid item xs={6}> <Link to ="/"><img src="logo.png" alt="logo" width={200} /></Link>  </Grid>
                <Grid item xs={6}><h1>Contacts</h1></Grid>
            </Grid>
            <Divider />
        </>
    )
}

export default Navbar