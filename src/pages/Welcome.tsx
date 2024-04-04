import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Input, Sheet, Typography } from '@mui/joy';
import { VideoCallOutlined } from '@mui/icons-material';

function Welcome() {
  const { t } = useTranslation();
  const [code_or_link, setCode_or_link] = useState<string>()

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
              <Button color="primary" variant='outlined' sx={{ cursor: "pointer" }} disabled={!Boolean(code_or_link)}>
                {t("welcome.join")}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Divider>Or</Divider>

        <Grid container spacing={2} justifyContent="center" textAlign="center" sx={{ my: 1 }}>
          <Grid>
            <Button color="primary" startDecorator={<VideoCallOutlined />}>
              {t("welcome.new_meeting")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Welcome;
