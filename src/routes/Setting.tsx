"use client";

import { Box, Divider, IconButton, Typography } from "@mui/joy";
import { t } from "i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Setting() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          minWidth: "70vw",
        }}
      >
        <Box sx={{ width: "600px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ my: 1, justifyContent: "center" }}>
            <Typography
              textAlign={"left"}
              level="h2"
              sx={{ color: "text.secondary" }}
            >
              {t("sidebar.settings")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <form>
              <Box sx={{ my: 6}}>
                <Typography level="h4">{t("settings.account_settings")}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "75% 80%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.edit_profile")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "100% 55%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.change_password")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "120% 35%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.add_a_payment_method")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "100% 55%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.push_notifications")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>
            </form>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Divider />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <form>
              <Box sx={{ my: 6 }}>
                <Typography level="h4">{t("settings.More")}</Typography>
              </Box>
              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "50% 155%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.about_us")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "75% 130%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.privacy_policy")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>

              <Box
                sx={{
                  mb: 1,
                  display: "grid",
                  placeItems: "center",
                  gridTemplateColumns: "60% 143%",
                }}
              >
                <div>
                  <Typography sx={{ mb: 2 }}>{t("settings.terms_of_use")}</Typography>
                </div>
                <div style={{ justifySelf: "end" }}>
                  <IconButton>
                    {" "}
                    <ChevronRightIcon />
                  </IconButton>
                </div>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
