import { Box, Typography, Button } from "@mui/joy";
import { Link } from "react-router-dom";

export default function StartPaying() {
  return (
    <Box sx={{ width: "1200px", margin: "0 auto", padding: 4 }}>
      <Box sx={{ my: 1, mx: 4, justifyContent: "center" }}>
        <Typography component="h1" sx={{ fontSize: "2.5rem", mb: 3 }}>
          Start Paying for Premium Features
        </Typography>
      </Box>

      <Box sx={{ my: 6, mx: 30 }}>
        <Typography component="p" sx={{ mb: 2 }}>
          Ready to unlock more with Globetalk? Subscribe to our premium services
          and gain access to exclusive features that enhance your video calling
          and meeting experience.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          Benefits of Premium Membership:
        </Typography>

        <Typography component="ul" sx={{ mb: 2 }}>
          <li>Ad-free video calls and meetings.</li>
          <li>Priority access to new features and updates.</li>
          <li>Extended meeting durations.</li>
          <li>Enhanced security and privacy settings.</li>
          <li>24/7 dedicated support.</li>
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          Join our growing community of premium members and experience the full
          potential of Globetalk.
        </Typography>

        <Button
          component={Link}
          to="/add-payment-method"
          variant="solid" // Use the appropriate variant here (e.g., outlined, solid, soft)
          color="primary"
          sx={{ mr: 2 }}
        >
          Add Payment Method
        </Button>
        <Button
          component={Link}
          to="/subscribe"
          variant="outlined" // Use a valid variant type here (e.g., outlined, solid, soft)
          color="primary"
        >
          Subscribe Now
        </Button>

        <Typography component="p" sx={{ mt: 3 }}>
          Not sure yet? <Link to="/features">Explore our features</Link> or{" "}
          <Link to="/support">contact our support team</Link> for more
          information.
        </Typography>
      </Box>
    </Box>
  );
}
