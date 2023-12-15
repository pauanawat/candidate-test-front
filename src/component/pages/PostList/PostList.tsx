import React, { useState } from 'react'
import { post } from '../../../apis/api'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container,
    Button,
    TextField,
    Grid,
    IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import "./PostList.css"
import { IPost, IPostFilter } from '../../../store/post/postType'
import ModalEditPost from './ModalEditPost'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalDeletePost from './ModalDeletePost'

const PostList: React.FC = () => {
    const [posts, setPost] = useState<IPost[]>([])
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false)
    const [selectedPost, setSelectedPost] = useState<IPost>()
    const [selectedPostDelete, setSelectedPostDelete] = useState<IPost>()
    const [filterId, setFilterId] = useState<number | null>(null)
    const [filterUserId, setFilterUserId] = useState<number | null>(null)
    const [filterTitle, setFilterTitle] = useState<string>('')
    const [filterBody, setFilterBody] = useState<string>('')

    const fetchPost = async () => {
        try {
            let payload: IPostFilter = {}
            if (filterId) payload["id"] = filterId
            if (filterUserId) payload["userId"] = filterUserId
            if (filterTitle) payload["title"] = filterTitle
            if (filterBody) payload["body"] = filterBody
            const response = await post.getPost(payload)
            if (response.status == 200)
                setPost(response.data.posts)

        } catch (error) {
            console.error('Error fetching posts:', error)
        }
    }

    const handleOpenModal = (post: IPost) => {
        setOpenModalCreate(false)
        setSelectedPost(post)
    }

    const handleCloseModal = () => {
        fetchPost()
        setSelectedPost(undefined)
    }
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true)
        setSelectedPost(undefined)
    }

    const handleCloseModalCreate = () => {
        setOpenModalCreate(false)
        fetchPost()
        setSelectedPost(undefined)
    }
    const handleOpenModalDelete = (post: IPost) => {
        setSelectedPostDelete(post)
    }
    const handleCloseModalDelete = () => {
        fetchPost()
        setSelectedPostDelete(undefined)
    }
    return (
        <Container>
            <h1>Post List</h1>
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
                        label="Search by UserId"
                        value={filterUserId}
                        onChange={(e) => setFilterUserId(e.target.value === '' ? null : parseInt(e.target.value))}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search by Title"
                        value={filterTitle}
                        onChange={(e) => setFilterTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search by Body"
                        value={filterBody}
                        onChange={(e) => setFilterBody(e.target.value)}
                    />
                </Grid>
                <Grid item xs={16}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button className="div-space" variant="contained" onClick={() => fetchPost()}>
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
                                <TableCell align="center">UserId</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Body</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts && posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.userId}</TableCell>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>{post.body}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" onClick={() => handleOpenModal(post)}>
                                            <EditIcon />
                                        </Button>
                                        <IconButton color='error' aria-label="delete" onClick={() => handleOpenModalDelete(post)}>
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
            {openModalCreate && !selectedPost
                ? <ModalEditPost titlePage="Add Post" data={selectedPost} isOpen={openModalCreate} onClose={handleCloseModalCreate} />
                : <ModalEditPost titlePage="Edit Post Profile" isOpen={openModalCreate} data={selectedPost} onClose={handleCloseModal} />
            }
            <ModalDeletePost data={selectedPostDelete} onClose={handleCloseModalDelete} />
        </Container>
    )
}

export default PostList
