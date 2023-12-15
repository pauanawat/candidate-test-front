// UserList.tsx
import React, { useEffect, useState } from 'react'
import { post } from '../../../apis/api' // Import your authentication API instance
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid
} from '@mui/material'
import "./PostList.css"
import AlertMassage from '../../common/AlertMassage'
import { responseStatus } from '../../../const/constant'
import { IPost, IPostCreate } from '../../../store/post/postType'

interface dataProps {
    titlePage: string
    data: IPost | undefined
    isOpen?: boolean
    onClose: () => void
}

const ModalEditUser: React.FC<dataProps> = ({ titlePage, data, isOpen, onClose }) => {
    const [id, setId] = useState<number | undefined>()
    const [userId, setUserId] = useState<number | undefined>()
    const [title, setTitle] = useState<string | undefined>()
    const [body, setBody] = useState<string | undefined>()
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false)
    const [status, setStatus] = useState<string>()

    useEffect(() => {
        setStatus(undefined)
        if (isOpen) {
            setId(undefined)
            setUserId(undefined)
            setTitle(undefined)
            setBody(undefined)
        } else if (data) {
            setId(data.id)
            setUserId(data.userId)
            setTitle(data.title || '')
            setBody(data.body || '')
        }
    }, [data, isOpen])

    useEffect(() => {
        if ((!!id || !!isOpen) &&
            !!userId &&
            !!title &&
            !!body) {
            setDisableSaveBtn(false)
        } else
            setDisableSaveBtn(true)
    }, [id,
        userId,
        title,
        body
    ])
    const editUser = async () => {
        console.log("edit user")
        if ((!!id || !!body) &&
            !!userId &&
            !!title &&
            !!body) {
            let payload: IPostCreate = {
                title, body, userId
            }
            try {
                if (id)
                    await post.updatePost(id, payload).then((res) => {
                        if (res.data.message === "success") {
                            onClose()
                        }
                        else
                            setStatus(responseStatus.ERROR)
                    })
                else {
                    payload['userId'] = userId
                    await post.createPost(payload).then((res) => {
                        if (res.data.message === "success") {
                            onClose()
                        }
                        else
                            setStatus(responseStatus.ERROR)
                    })
                }
            } catch (error) {
                console.log(error)
                setStatus(responseStatus.ERROR)
            }
        }
    }

    return (
        <Dialog open={!!data || !!isOpen} onClose={onClose} maxWidth="md" fullWidth>
            {status ? <AlertMassage message={status} status={status} /> : null}
            <DialogTitle>{titlePage}</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} columns={10} style={{ marginTop: "1px" }}>
                    {id
                        ? <Grid item xs={5}>
                            <TextField disabled={true} label="ID" value={id} fullWidth />
                        </Grid>
                        : null
                    }
                    <Grid item xs={id ? 5 : 10}>
                        <TextField label="UserId" value={userId} onChange={(e) => setUserId(e.target.value === '' ? undefined : parseInt(e.target.value))} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField multiline rows={5} label="Title"
                            value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField multiline rows={5} label="Body"
                            value={body} onChange={(e) => setBody(e.target.value)} fullWidth />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={disableSaveBtn}
                    variant="contained"
                    color={id ? 'primary' : 'success'}
                    onClick={() => editUser()}>
                    {id ? "Save" : "Create"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => onClose()}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default ModalEditUser
