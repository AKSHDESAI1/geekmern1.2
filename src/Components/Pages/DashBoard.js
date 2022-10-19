import React from 'react'
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ChangePassword from './Auth/ChangePassword';
import { useLoggedUserQuery } from '../../services/userAuthApi';

const DashBoard = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        console.log("Logout Clicked");
        localStorage.removeItem("token")
        return navigate("/login");
    }

    const token = "Bearer " + localStorage.getItem("token")
    const responseInfo = useLoggedUserQuery(token);
    return (
        <Grid container>
            <Grid item sm={4} sx={{ backgroundColor: "gray", p: 5, color: "white" }}>
                <h2 style={{ fontWeight: "bold", color: "black", fontStyle: "revert" }}>DashBoard</h2>
                {responseInfo.error ? (<>error</>) : (responseInfo.isLoading ? (<>Loading</>) : (responseInfo.data ? (<>
                    <Typography variant='h5'>Email: {responseInfo.data.message.email}</Typography>
                    <Typography variant='h6'>Name: {responseInfo.data.message.name}</Typography>

                </>) : (<>aksh</>)))}

                <Button variant='contained' color='warning' size='large' onClick={handleLogout}>Logout</Button>
            </Grid>

            <Grid item sm={8}>
                <ChangePassword />
            </Grid>
        </Grid>
    )
}

export default DashBoard