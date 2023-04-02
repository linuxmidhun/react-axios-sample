import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const StudentAdd = (props) => {
    let navigate = useNavigate();
    // const [message, setMessage] = useState("")
    const [student, setStudent] = useState(props.data)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    }

    const goBack = () =>
        props.method === "post" ? navigate('/') : window.location.reload();

    const saveData = () => {
        if (props.method === "post") {
            axios.post("http://localhost:3005/students/", student)
                .then(response => {
                    navigate('/');
                })
                .catch(error => {
                    console.log(error)
                })
        } else if (props.method === "put") {
            axios.put("http://localhost:3005/students/" + student.id, student)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box sx={{ minWidth: 275, width: 400 }}>
                <Typography variant='h3'>{props.method === "post" ? "Add " : "Edit "}Student&nbsp;&nbsp;
                    <Button variant='contained'
                        color='secondary' onClick={() => goBack()}>
                        <ArrowCircleLeftOutlinedIcon />&nbsp;&nbsp;Back</Button>
                </Typography>
                <br />
                <Card style={{ backgroundColor: 'ivory' }}>
                    <br /><br />
                    <TextField name='name' label='Name' value={student.name} onChange={handleChange} /><br /> <br />
                    <TextField name='grade' label='Grade' value={student.grade} onChange={handleChange} /><br /> <br />
                    <Button onClick={saveData} variant='contained' color='success'>
                        <SaveOutlinedIcon />&nbsp;&nbsp;Save</Button>
                    <br /><br />
                </Card>
            </Box>
        </Grid>
    )
}

export default StudentAdd