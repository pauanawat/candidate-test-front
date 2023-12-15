import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';


interface dataProps {
    feed: any
}
const FeedCard: React.FC<dataProps> = ({ feed }) => {
    return (
        <Card style={{ width: "100%", margin: 'auto' }}>
            <CardContent style={{ textAlign: 'left' }}>
                <Typography variant="h5" component="div">
                    {feed.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {feed.body}
                </Typography>
            </CardContent>
            <CardContent style={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                    Author: {feed.author.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeedCard;