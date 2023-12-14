// UserList.tsx
import React, { useEffect, useState } from 'react'
import { user } from '../../../apis/api' // Import your authentication API instance
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    TextField,
    Grid,
    DialogContentText,
    Alert
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import "./UserList.css"
import { IUserFilter, UpdateUserType, UserType } from '../../../store/user/userType'

interface dataProps {
    data: UserType | undefined
    onClose: () => void
}

const ModalDeleteUser: React.FC<dataProps> = ({ data, onClose }) => {

    const deleteUser = async () => {
        if (data && data.id) {
            user.deleteUser(data.id).then((res) => {
                if (res.data.message == "success"){
                    onClose()
                }
            })
        }
    }

    return (
        <Dialog open={!!data} onClose={onClose} fullWidth>
            {data && (
                <>
                    <DialogTitle>Do you want to delete thie user?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`user id: ${data.id}, name: ${data.name}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteUser()}>
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => onClose()}>
                            Cancel
                        </Button>
                    </DialogActions>
                </>
            )
            }
        </Dialog >
    )
}

export default ModalDeleteUser
