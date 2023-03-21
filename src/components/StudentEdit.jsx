import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const StudentEdit = () => {
    let navigate = useNavigate();
    const location = useLocation()
    const { id } = location.state
    const [initialLoad, setInitialLoad] = useState(true)
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

    const updateData = () => {
        axios.put("http://localhost:3005/students/" + id, student)
            .then(response => {
                setMessage("Data Updated")
            })
            .catch(error => {
                setMessage("Could not update Data")
                console.log(error)
            })
    }

    const deleteData = () => {
        axios.delete("http://localhost:3005/students/" + id)
            .then(_ => {
                alert("Data removed");
                navigate("/");
            })
            .catch(error => {
                setMessage("Could not remove Data")
                console.log(error)
            })
    }

    useEffect(() => {
        if (initialLoad) {
            axios.get("http://localhost:3005/students/" + id)
                .then(response => {
                    console.log(response.data)
                    setStudent(response.data)
                })
                .catch(error => console.log(error))
            setInitialLoad(false)
        }
    }, [id, initialLoad, setInitialLoad]);
    return (
        <div>
            <Typography variant='h2'>Edit Student</Typography>
            <Button><Link to='/'>Back</Link></Button>
            <hr />
            <TextField name='name' label='Name' value={student.name} onChange={handleChange} /><br /> <br />
            <TextField name='grade' label='Grade' value={student.grade} onChange={handleChange} /><br /> <br />
            <Typography variant='h5' color='success'>{message}</Typography> <br />
            <Button onClick={updateData} variant='contained'>Update</Button>&nbsp;
            <Button onClick={deleteData} variant='contained' color='error'>Delete</Button>
        </div>
    )
}

export default StudentEdit