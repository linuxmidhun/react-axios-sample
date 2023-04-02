import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <Typography variant='h2'>Add Student</Typography>
            <Button variant='contained' color='secondary' onClick={() => goBack()}>Back</Button>
            <hr />
            <TextField name='name' label='Name' value={student.name} onChange={handleChange} /><br /> <br />
            <TextField name='grade' label='Grade' value={student.grade} onChange={handleChange} /><br /> <br />
            <Button onClick={saveData} variant='contained'>Save</Button>
        </div>
    )
}

export default StudentAdd