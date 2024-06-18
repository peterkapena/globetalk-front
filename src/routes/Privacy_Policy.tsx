import React from "react";
import { Box, Typography } from "@mui/joy";

export default function PrivacyPolicy() {
  return (
    <Box sx={{ width: "1300px", margin: "0 auto", padding: 4 }}>
      <Box sx={{ my: 1, mx: 4, justifyContent: "center" }}>
        <Typography component="h1" sx={{ fontSize: "2rem", mb: 3 }}>
          Privacy Policy
        </Typography>
      </Box>

      <Box sx={{ my: 6, mx: 30 }}>
        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            Introduction
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Welcome to Globetalk. This Privacy Policy describes how we collect,
            use, and disclose information about you when you visit our website
            or use our services. By accessing or using our services, you agree
            to the terms of this Privacy Policy.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            Information We Collect
          </Typography>
          <Typography sx={{ mb: 1 }}>
            We may collect personal information that you voluntarily provide to
            us when you:
          </Typography>
          <ul>
            <li>Register for an account</li>
            <li>Use our services or make purchases</li>
            <li>Subscribe to newsletters or marketing communications</li>
            <li>Contact us through our website or customer support channels</li>
          </ul>
          <Typography sx={{ mb: 1 }}>
            The types of personal information we may collect include:
          </Typography>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Payment information (e.g., credit card details)</li>
            <li>Shipping and billing addresses</li>
            <li>
              Preferences and interests related to our products and services
            </li>
            <li>
              Technical data such as IP address, browser type, and device
              information
            </li>
          </ul>
          <Typography sx={{ mb: 1 }}>
            We may also collect non-personal information about your interactions
            with our website, such as pages visited and actions taken, using
            cookies and similar technologies.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            How We Use Your Information
          </Typography>
          <Typography sx={{ mb: 1 }}>
            We use the information we collect for various purposes, including:
          </Typography>
          <ul>
            <li>Providing and personalizing our services</li>
            <li>Processing transactions and fulfilling orders</li>
            <li>Sending promotional emails and marketing communications</li>
            <li>Improving our website and services</li>
            <li>Responding to customer inquiries and support requests</li>
            <li>Complying with legal obligations</li>
          </ul>
          <Typography sx={{ mb: 1 }}>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties unless we provide users with advance
            notice. This does not include website hosting partners and other
            parties who assist us in operating our website, conducting our
            business, or serving our users, so long as those parties agree to
            keep this information confidential.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            Your Rights and Choices
          </Typography>
          <Typography sx={{ mb: 1 }}>You have the right to:</Typography>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of receiving marketing communications</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
          <Typography sx={{ mb: 1 }}>
            Please note that disabling cookies may affect your experience on our
            website.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            Security of Your Information
          </Typography>
          <Typography sx={{ mb: 1 }}>
            We implement security measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet or electronic
            storage is completely secure.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            Changes to This Privacy Policy
          </Typography>
          <Typography sx={{ mb: 1 }}>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices and legal requirements. We encourage you to
            review this page periodically for the latest information on our
            privacy practices.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
            Contact Us
          </Typography>
          <Typography sx={{ mb: 1 }}>
            If you have any questions about this Privacy Policy, please contact
            us at globetalk@email.co.za.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
