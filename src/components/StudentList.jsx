import { TableBody, TableCell, TableContainer, TableHead, Table, TableRow, Typography, Paper, Button, ButtonGroup, Grid, Box } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StudentAdd from './StudentAdd';
import { useNavigate } from 'react-router-dom'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

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
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box sx={{ minWidth: 275, maxWidth: 700 }}>
                        <Typography variant='h3' color='success'>Students&nbsp;&nbsp;
                            <Button variant='contained' color='secondary'
                                onClick={() => newItem()}> <AddCircleOutlineOutlinedIcon />&nbsp;&nbsp;New Student</Button>
                        </Typography>
                        <br />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead style={{ backgroundColor: 'whitesmoke' }}>
                                    <TableRow>
                                        <TableCell><b>ID</b></TableCell>
                                        <TableCell><b>Name</b></TableCell>
                                        <TableCell><b>Grade</b></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ backgroundColor: 'ivory' }}>
                                    {students.map((value, index) => {
                                        return <TableRow key={index}>
                                            <TableCell><b>{value.id}</b></TableCell>
                                            <TableCell>{value.name}</TableCell>
                                            <TableCell>{value.grade}</TableCell>
                                            <TableCell>
                                                <ButtonGroup>
                                                    <Button variant='contained' color='info' size="small"
                                                        onClick={() => editItem(value)}>
                                                        {/* <Link to={{ pathname: `/student/${value.id}` }}
                                                state={{ id: value.id }}>Edit</Link> */}
                                                        <EditOutlinedIcon />
                                                    </Button>
                                                    <Button variant='contained' color='error' size="small"
                                                        onClick={() => deleteItem(value.id)}>
                                                        <DeleteForeverOutlinedIcon /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            }
        </div>
    )
}

export default StudentList