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
import "./PostList.css"
import { IPost } from '../../../store/post/postType'

interface dataProps {
    data: IPost | undefined
    onClose: () => void
}

const ModalDeleteUser: React.FC<dataProps> = ({ data, onClose }) => {

    const deleteUser = async () => {
        if (data && data.id) {
            user.deleteUser(data.id).then((res) => {
                if (res.data.message == "success") {
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
                            {`Post id: ${data.id}, Title: ${data.title}`}
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
