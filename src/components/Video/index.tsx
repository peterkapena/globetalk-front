import { Box } from '@mui/joy';
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
		<Box sx={{ position: "relative", display: "inline-block", width: "240px", height: "270px", margin: "5px" }}>
			<video
				style={{
					width: "240px",
					height: "240px",
					backgroundColor: "black"
				}}
				muted={isMuted}
				ref={usedRef}
				autoPlay
			/>
			<p style={{ position: "absolute", top: "230px", left: "0px", width: "100%", textAlign: "center" }}>
				{email}
			</p>
		</Box>
	);
};

export default Video;
