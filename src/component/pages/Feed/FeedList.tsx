import React, { useEffect, useState } from 'react'
import { Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import FeedCard from './FeedCard';
import { IFeed } from '../../../store/post/postType';
import { feed, user } from '../../../apis/api';
const FeedList: React.FC = () => {
    const [feeds, setFeeds] = useState<IFeed[]>([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchFeed()
        fetchUsers()
    }, [])

    useEffect(() => {
        if (selectedUserId)
            selectFeedByUserId()
    }, [selectedUserId])

    const fetchFeed = async () => {
        try {
            const response = await feed.getFeedList()
            if (response.status == 200)
                setFeeds(response.data.feeds)

        } catch (error) {
            console.error('Error fetching feeds:', error)
        }
    }
    const fetchUsers = async () => {
        try {
            const response = await user.getAllUser()
            if (response.status == 200)
                setUsers(response.data.users)

        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }
    const selectFeedByUserId = async () => {
        try {
            if (selectedUserId) {
                const response = await feed.getFeedList(selectedUserId)
                if (response.status == 200)
                    setFeeds(response.data.feeds)
            }
        } catch (error) {
            console.error('Error select feeds:', error)
        }
    }
    const handleUserChange = (event: any) => {
        setSelectedUserId(event.target.value);
    };

    return (
        <Container>
            <h1>Feed List</h1>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <FormControl style={{ minWidth: "200px" }}>
                    <InputLabel id="user-dropdown-label">Select By User</InputLabel>
                    <Select
                        labelId="user-dropdown-label"
                        id="user-dropdown"
                        value={selectedUserId}
                        onChange={handleUserChange}
                    >
                        {users && users.map((user: { id: any; name: any; }) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <Grid container spacing={5}>
                {feeds && feeds.map((feed) => (
                    <Grid item key={feed.id} xs={12}>
                        <FeedCard feed={feed} />
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
};

export default FeedList;
