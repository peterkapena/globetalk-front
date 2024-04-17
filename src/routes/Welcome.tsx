import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Box, Button, Divider, Grid, Input, Typography } from '@mui/joy';
import { VideoCallOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../helpers/common';
// import { gql, useMutation } from "@apollo/client";

function Welcome() {
  const { t } = useTranslation();
  const [code_or_link, setCode_or_link] = useState<string>()
  const navigate = useNavigate()
  // const [createRoom] = useMutation(CREATE_ROOM);

  function joinMeeting() {
    let code = code_or_link;

    if (code_or_link) {
      let codeIndex = code_or_link.lastIndexOf("/");
      if (codeIndex > 0) {
        code = code_or_link.substring(codeIndex + 1);
      }

      navigate(`${ROUTES.MEETING}${code}`);
    }
  }

  async function generateRoom() {
    let counter = Math.floor(Math.random() * 16777216); // Initialize counter with random value
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const machineIdentifier = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const processIdentifier = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
    counter = (counter + 1) % 16777216; // Ensure the counter wraps around

    const counterBytes = counter.toString(16).padStart(6, '0'); // Ensure the counter is 3 bytes long
    return (
      timestamp.toString(16).padStart(8, '0') +
      machineIdentifier +
      processIdentifier +
      counterBytes
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "70vw",
        justifyContent: "center"
      }}
    >
      <Box sx={{ width: "600px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ my: 1 }}>
          <Typography textAlign={"center"} level='h2'>
            {t("welcome.vide_calls_for_all")}
          </Typography>
        </Box>
        <Box sx={{ my: 1 }}>
          <Typography textAlign={"center"} >
            {t("welcome.provide_vid_calls")}
          </Typography>
        </Box>

        <form>
          <Grid container spacing={2} justifyContent="center" textAlign="center" sx={{ my: 1 }}>
            <Grid>
              <Input placeholder={t("welcome.enter_code_or_link")} onChange={(event) => setCode_or_link(event.target.value)} />
            </Grid>
            <Grid>
              <Button color="primary" variant='outlined' sx={{ cursor: "pointer" }} disabled={!Boolean(code_or_link)} onClick={() => joinMeeting()}>
                {t("welcome.join")}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Divider>Or</Divider>

        <Grid container spacing={2} justifyContent="center" textAlign="center" sx={{ my: 1 }}>
          <Grid>
            <Button color="primary" startDecorator={<VideoCallOutlined />} onClick={() => generateRoom().then(room => navigate(`${ROUTES.MEETING}${room}`))}>
              {t("welcome.new_meeting")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Welcome;

// const CREATE_ROOM = gql(`
// mutation Mutation {
//   createRoom
// }
// `);
