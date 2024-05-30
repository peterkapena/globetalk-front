import { MicOffOutlined, KeyboardVoiceOutlined } from '@mui/icons-material';
import { AspectRatio, Box, Card, CardContent, CardOverflow, IconButton, Typography } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';

interface Props {
	email: string;
	stream?: MediaStream;
	muted: boolean;
	videoRef?: React.RefObject<HTMLVideoElement>;
	isLocalStream?: boolean;
	toggleAudio: () => void
}

const Video = ({ email, stream, muted = false, videoRef, isLocalStream, toggleAudio }: Props) => {
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
		<Box sx={{ m: 1, position: 'relative',width:"100%"}}>
			<Box sx={{ position: 'relative', pb: '100%', overflow: 'hidden' }}>
				<Box
					component="video"
					muted={isLocalStream || isMuted}
					ref={usedRef}
					autoPlay
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						borderRadius: 20
					}}
				/>
				<IconButton
					size="md"
					variant="solid"
					color="neutral"
					sx={{
						position: 'absolute',
						zIndex: 2,
						borderRadius: '50%',
						right: '1rem',
						bottom: 30,
						transform: 'translateY(50%)',
					}}
					onClick={toggleAudio}
				>
					{isMuted ? <MicOffOutlined color='error' /> : <KeyboardVoiceOutlined />}
				</IconButton>
			</Box>
			<Box sx={{  }}>
				<Typography level="body-sm" textOverflow={'ellipsis'} overflow={'hidden'}>
					{email}
				</Typography>
			</Box>
		</Box>
	);
};

export default Video;
