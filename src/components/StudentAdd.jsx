import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const StudentAdd = () => {
    const [message, setMessage] = useState("")
    const [student, setStudent] = useState({
        id: 0,
        name: "",
        grade: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    }

    const saveData = () => {
        axios.post("http://localhost:3005/students/", student)
            .then(response => {
                setMessage("New data saved")
            })
            .catch(error => {
                setMessage("Could not save data")
                console.log(error)
            })
    }

    return (
        <div>
            <Typography variant='h2'>Add Student</Typography>
            <Button><Link to='/'>Back</Link></Button>
            <hr />            
            <TextField name='name' label='Name' value={student.name} onChange={handleChange} /><br /> <br />
            <TextField name='grade' label='Grade' value={student.grade} onChange={handleChange} /><br /> <br />
            <Typography variant='h5' color='success'>{message}</Typography> <br />
            <Button onClick={saveData} variant='contained'>Save</Button>
        </div>
    )
}

export default StudentAdd