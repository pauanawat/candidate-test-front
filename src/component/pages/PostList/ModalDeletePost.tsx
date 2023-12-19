// UserList.tsx
import React from 'react'
import { post } from '../../../apis/api' // Import your authentication API instance
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
import AlertMassage from '../../common/AlertMassage'

interface dataProps {
    data: IPost | undefined
    onClose: () => void
}

const ModalDeleteUser: React.FC<dataProps> = ({ data, onClose }) => {

    const deleteUser = async () => {
        if (data && data.id) {
            try {
                post.deletePost(data.id).then((res) => {
                    if (res.status === 200) {
                        onClose()
                    } else {
                        return <AlertMassage message={"Failed to delete data"} status={400} />
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
