import { MicOffOutlined, KeyboardVoiceOutlined, LocationOnRounded, CreateNewFolder, Favorite, Visibility, Fullscreen, FullscreenOutlined } from '@mui/icons-material';
import { AspectRatio, Avatar, Box, Card, CardContent, CardCover, CardOverflow, Chip, IconButton, Link, Typography } from '@mui/joy';
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

	function toggleFullScreen() {
		if (usedRef.current) {
			usedRef.current.requestFullscreen({ navigationUI: 'hide' })
		}
	}

	return (
		<Card
			variant="plain" 
			sx={{
				width: 1,
				bgcolor: 'initial',
				p: 0,
			}}
		>
			<Box sx={{ position: 'relative' }}>
				<AspectRatio ratio="1">
					<Box component={"video"}
						muted={isLocalStream || isMuted}
						ref={usedRef}
						autoPlay
						controls={false}
						loop />
				</AspectRatio>
				<CardCover
					className="gradient-cover"
					sx={{
						'&:hover, &:focus-within': {
							opacity: 1,
						},
						opacity: 0,
						transition: '0.1s ease-in',
						background:
							'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
					}}
				>
					{/* The first box acts as a container that inherits style from the CardCover */}
					<div>
						<Box
							sx={{
								p: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: "space-evenly",
								gap: 1,
								// flexGrow: 1,
								alignSelf: 'flex-end',
							}}
						>
							<Typography level="h2" noWrap
								sx={{
									width: "50%",
									fontSize: 'lg', color: '#fff',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									display: 'block',
								}}>
								{email}
							</Typography>
							<IconButton
								size="md"
								variant="solid"
								color="neutral"
								sx={{
									borderRadius: '50%',
								}}
								onClick={toggleAudio}
							>
								{isMuted ? <MicOffOutlined /> : <KeyboardVoiceOutlined />}
							</IconButton>
							<IconButton
								size="md"
								variant="solid"
								color="neutral"
								sx={{
									borderRadius: '50%',
								}}
								onClick={toggleFullScreen}
							>
								<FullscreenOutlined />
							</IconButton>
						</Box>
					</div>
				</CardCover>
			</Box>
		</Card>
	);
};

export default Video;
