import { MicOffOutlined, KeyboardVoiceOutlined } from '@mui/icons-material';
import { AspectRatio, Card, CardContent, CardOverflow, IconButton, Typography } from '@mui/joy';
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
		<Card sx={{ maxHeight: 350, width: 300, m: 1 }}>
			<CardOverflow>
				<AspectRatio ratio="1">
					<video muted={isMuted} ref={usedRef} autoPlay />
				</AspectRatio>
				<IconButton
					size="md"
					variant="solid"
					color="neutral"
					sx={{
						position: 'absolute',
						zIndex: 2,
						borderRadius: '50%',
						right: '1rem',
						bottom: 0,
						transform: 'translateY(50%)',
					}}
				>
					{isMuted ? <MicOffOutlined color='error' /> : <KeyboardVoiceOutlined />}
				</IconButton>
			</CardOverflow>
			<CardContent>
				<Typography level="body-sm">
					{email}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Video;
