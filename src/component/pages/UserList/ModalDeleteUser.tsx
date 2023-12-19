// UserList.tsx
import React from 'react'
import { user } from '../../../apis/api' // Import your authentication API instance
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
} from '@mui/material'
import "./UserList.css"
import { UserType } from '../../../store/user/userType'
import AlertMassage from '../../common/AlertMassage'

interface dataProps {
    data: UserType | undefined
    onClose: () => void
}

const ModalDeleteUser: React.FC<dataProps> = ({ data, onClose }) => {

    const deleteUser = async () => {
        if (data && data.id) {
            try {
                user.deleteUser(data.id).then((res) => {
                    if (res.status === 200) {
                        onClose()
                    } else {
                        return <AlertMassage message={"Failed to delete data"} status={res.status} />
                    }
                })
            } catch (error) {
                return <AlertMassage message={"Internal server error"} status={500} />
            }
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
