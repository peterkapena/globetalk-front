import { Box, Typography } from "@mui/joy";

export default function AboutUs() {
  return (
    <Box>
      <Typography component="h1" sx={{ fontSize: "2.5rem", mb: 3 }}>
        About Us
      </Typography>

      <Typography   sx={{ mb: 2 }}>
        Globetalk is dedicated to providing secure and easy-to-use video calls
        and meetings for everyone, supporting communication in over 200
        languages. Our platform ensures seamless translation capabilities,
        accessible directly from any device's browser.
      </Typography>

      <Typography component="p" sx={{ mb: 2 }}>
        At Globetalk, we believe in breaking down language barriers and
        enabling meaningful connections across the globe. Whether for personal
        use, educational purposes, or business meetings, our service is
        designed to be intuitive and reliable, offering a user-friendly
        experience that empowers individuals and organizations alike.
      </Typography>

      <Typography component="p" sx={{ mb: 2 }}>
        Our commitment to security is paramount. We prioritize safeguarding
        your privacy and data, implementing robust measures to protect every
        interaction on our platform. With Globetalk, you can communicate
        confidently, knowing that your conversations are safe and
        confidential.
      </Typography>

      <Typography component="p" sx={{ mb: 2 }}>
        Join us in transforming the way we connect, collaborate, and learn
        globally. Experience the simplicity and versatility of Globetalk's
        video communication tools today.
      </Typography>

      <Typography component="p" sx={{ mb: 2 }}>
        For inquiries or more information, please contact us at
        globetalk@infos.co.za.
      </Typography>

    </Box>
  );
}
