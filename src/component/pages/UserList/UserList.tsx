// UserList.tsx
import React, {  useState } from 'react'
import { user } from '../../../apis/api' // Import your authentication API instance
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container,
    Button,
    TextField,
    Grid,
    IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import "./UserList.css"
import { IUserFilter, UserType } from '../../../store/user/userType'
import ModalEditUser from './ModalEditUser'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalDeleteUser from './ModalDeleteUser'

const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<UserType>()
    const [selectedUserDelete, setSelectedUserDelete] = useState<UserType>()
    const [filterId, setFilterId] = useState<number | null>(null)
    const [filterEmail, setFilterEmail] = useState<string>('')
    const [filterName, setFilterName] = useState<string>('')
    const [filterPhone, setFilterPhone] = useState<string>('')

    const fetchUsers = async () => {
        try {
            let payload: IUserFilter = {}
            if (filterId) payload["id"] = filterId
            if (filterEmail) payload["email"] = filterEmail
            if (filterName) payload["name"] = filterName
            if (filterPhone) payload["phone"] = filterPhone
            const response = await user.getUser(payload)
            if (response.status == 200)
                setUsers(response.data.result)

        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const handleOpenModal = (user: UserType) => {
        setOpenModalCreate(false)
        setSelectedUser(user)
    }

    const handleCloseModal = () => {
        fetchUsers()
        setSelectedUser(undefined)
    }
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true)
        setSelectedUser(undefined)
    }

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false)
        fetchUsers()
        setSelectedUser(undefined)
    }
    const handleOpenModalDelete = (user: UserType) => {
        setSelectedUserDelete(user)
    }
    const handleCloseModalDelete = () => {
        fetchUsers()
        setSelectedUserDelete(undefined)
    }
    return (
        <Container>
            <h1>User List</h1>
            <Grid container spacing={3} columns={16}>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search by ID"
                        type="number"
                        value={filterId || ''}
                        onChange={(e) => setFilterId(e.target.value === '' ? null : parseInt(e.target.value))}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search by Name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search by Email"
                        value={filterEmail}
                        onChange={(e) => setFilterEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search by Phone"
                        value={filterPhone}
                        onChange={(e) => setFilterPhone(e.target.value)}
                    />
                </Grid>
                <Grid item xs={16}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button className="div-space" variant="contained" onClick={() => fetchUsers()}>
                            Search
                        </Button>
                        <Button className="div-space" variant="outlined" color="success" onClick={() => handleOpenModalCreate()}>
                            Create
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <div className='table-wrapper'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Web</TableCell>
                                <TableCell align="center">Action</TableCell>
                                {/* Add more table headers for other user properties */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.website}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" onClick={() => handleOpenModal(user)}>
                                            <EditIcon />
                                        </Button>
                                        <IconButton color='error' aria-label="delete" onClick={() => handleOpenModalDelete(user)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    {/* Add more table cells for other user properties */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {openModalCreate && !selectedUser
                ? <ModalEditUser title="Add User" data={selectedUser} isOpen={openModalCreate} onClose={handleCloseModalCreate} />
                : <ModalEditUser title="Edit User Profile" isOpen={openModalCreate} data={selectedUser} onClose={handleCloseModal} />
            }
            <ModalDeleteUser data={selectedUserDelete} onClose={handleCloseModalDelete} />
        </Container>
    )
}

export default UserList
