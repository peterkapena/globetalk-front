import { MicOffOutlined, KeyboardVoiceOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, CardCover, Typography } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';

interface Props {
	email: string;
	stream?: MediaStream;
	muted?: boolean;
	videoRef?: React.RefObject<HTMLVideoElement>;
}

const Video = ({ email, stream, muted = false, videoRef }: Props) => {
	const internalRef = useRef<HTMLVideoElement>(null);
	const usedRef = videoRef || internalRef;

	useEffect(() => {
		if (usedRef.current && stream) {
			usedRef.current.srcObject = stream;
		}
	}, [stream, usedRef]);

	useEffect(() => {
		setIsMuted(muted);
	}, [muted]);

	const [isMuted, setIsMuted] = useState<boolean>(muted);

	return (
		<Card sx={{ minHeight: '280px', width: 300, m: 1 }}>
			<CardCover>
				<video muted={isMuted} ref={usedRef} autoPlay />
			</CardCover>
			<CardCover
				sx={{
					background:
						'linear-gradient(to top, rgba(0,0,0,0.0), rgba(0,0,0,0) 50px), linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0) 50px)',
				}}
			/>
			<CardContent sx={{ justifyContent: 'flex-end' }}>
				<Box sx={{ display: "flex", justifyContent: "start" }}>
					<Typography color='neutral'
						startDecorator={isMuted ? <MicOffOutlined color='error' /> : <KeyboardVoiceOutlined />}
					>
						{email}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default Video;
