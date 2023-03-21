import { TableBody, TableCell, TableContainer, TableHead, Table, TableRow, Typography, Paper, Button } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3005/students")
            .then(response => {
                console.log(response.data);
                setStudents(response.data);
            })
            .catch(error => console.log(error));
    }, []);
    return (
        <div>
            <Typography variant='h2' color='success'>Students</Typography>
            <Button><Link to='/new'>New Student</Link></Button>
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
                                <TableCell><Link to={{ pathname: `/student/${value.id}` }} state={{ id: value.id }}>Edit</Link></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default StudentList