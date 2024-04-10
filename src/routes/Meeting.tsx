import { AspectRatio, Card, Grid, Sheet, Skeleton, Typography } from '@mui/joy';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MeetingBottomControl } from './MeetingBottomControl';

const Meeting = () => {
    let { roomId } = useParams();
    const [micIsOn, setMicIsOn] = useState(false)

    return (
        <Sheet sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            m: 4,
        }}>
            <Grid container spacing={2}            >
                {Array.from(Array(6)).map((_, index) => (
                    <Grid xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ maxWidth: 343, display: 'flex',   }}>
                          <video></video>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <MeetingBottomControl setMicIsOn={setMicIsOn} micIsOn={micIsOn} roomId={roomId} />
        </Sheet >
    )
}

export default Meeting


