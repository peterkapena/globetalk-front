/* eslint-disable react-hooks/exhaustive-deps */
import { MicOffOutlined, KeyboardVoiceOutlined, FullscreenOutlined } from '@mui/icons-material';
import { AspectRatio, Box, Card, CardCover, Typography, IconButton } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';

interface Props {
  email: string;
  stream?: MediaStream;
  muted: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isLocalStream?: boolean;
  toggleAudio: () => void;
}

const Video = ({ email, stream, muted = false, videoRef, isLocalStream, toggleAudio }: Props) => {
  const internalRef = useRef<HTMLVideoElement>(null);
  const usedRef = videoRef || internalRef;
  const [isMuted, setIsMuted] = useState<boolean>(muted);

  useEffect(() => {
    if (usedRef.current && stream) {
      usedRef.current.srcObject = stream;
    }
  }, [stream, usedRef]);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  useEffect(() => {
    setIsMuted(isLocalStream ? false : isMuted); 
  }, [isLocalStream]);

  const handleToggleAudio = () => {
    setIsMuted(prev => {
      const newMutedState = !prev;
      toggleAudio(); 
      return newMutedState;
    });
  };

  const toggleFullScreen = () => {
    if (usedRef.current) {
      const element = usedRef.current as HTMLElement;
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen({ navigationUI: 'hide' });
      }
    }
  };

  return (
    <Card
      variant="plain"
      sx={{
        width: 1,
        bgcolor: 'initial',
        p: 0,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <AspectRatio ratio="1">
          <Box
            component="video"
            muted={isLocalStream || isMuted}
            ref={usedRef}
            autoPlay
            controls={false}
            loop
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AspectRatio>
        <CardCover
          className="gradient-cover"
          sx={{
            '&:hover, &:focus-within': {
              opacity: 1,
            },
            opacity: 0,
            transition: '0.1s ease-in',
            background: 'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <Typography
              level="h2"
              noWrap
              sx={{
                flex: 1,
                fontSize: 'lg',
                color: '#fff',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              {email}
            </Typography>
            <IconButton
              size="md"
              variant="solid"
              color="neutral"
              sx={{
                borderRadius: '50%',
              }}
              onClick={handleToggleAudio}
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
        </CardCover>
      </Box>
    </Card>
  );
};

export default Video;
