import { TableBody, TableCell, TableContainer, TableHead, Table, TableRow, Typography, Paper, Button, ButtonGroup } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StudentAdd from './StudentAdd';
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
    let navigate = useNavigate();
    const [students, setStudents] = useState([])
    const [update, setUpdate] = useState(false)
    const [student, setStudent] = useState()

    useEffect(() => {
        axios.get("http://localhost:3005/students")
            .then(response => {
                console.log(response.data);
                setStudents(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const deleteItem = (id) => {
        axios.delete("http://localhost:3005/students/" + id)
            .then(_ => {
                alert("Data removed");
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    }

    const editItem = (item) => {
        setStudent(item)
        setUpdate(true)
    }

    const newItem = () => navigate("/new");

    return (
        <div>
            {update ?
                <StudentAdd data={student} method="put" /> :
                <div>
                    <Typography variant='h2' color='success'>Students</Typography>
                    <Button variant='contained' color='secondary' onClick={()=> newItem()}> + New Student</Button>
                    <hr />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID </TableCell>
                                    <TableCell>Name </TableCell>
                                    <TableCell>Grade </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((value, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>{value.id}</TableCell>
                                        <TableCell>{value.name}</TableCell>
                                        <TableCell>{value.grade}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button variant='contained' color='success'
                                                    onClick={() => editItem(value)}>
                                                    {/* <Link to={{ pathname: `/student/${value.id}` }}
                                                state={{ id: value.id }}>Edit</Link> */}
                                                    Edit
                                                </Button>
                                                <Button variant='contained' color='error'
                                                    onClick={() => deleteItem(value.id)}
                                                >Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    )
}

export default StudentList