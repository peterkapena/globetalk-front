import React from "react";
import { Box, Typography } from "@mui/joy";
import { t } from "i18next";

export default function TermsOfUse() {
  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 4 }}>
      <Typography component="h1" sx={{ fontSize: "2rem", mb: 3 }}>
        {t("settings.terms_of_use")}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Introduction
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Welcome to GlobaTalk. These Terms of Use ("Terms") govern your use of
          our services. By using our services, you agree to be bound by these
          Terms. If you do not agree to these Terms, please do not use our
          services.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Eligibility
        </Typography>
        <Typography sx={{ mb: 1 }}>
          You must be at least 18 years old to use our services. By using our
          services, you represent and warrant that you are at least 18 years
          old.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Account Responsibilities
        </Typography>
        <Typography sx={{ mb: 1 }}>
          You are responsible for maintaining the confidentiality of your
          account information, including your password, and for all activities
          that occur under your account. You agree to notify us immediately of
          any unauthorized use of your account.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Prohibited Activities
        </Typography>
        <Typography sx={{ mb: 1 }}>
          You agree not to engage in any of the following prohibited activities:
        </Typography>
        <ul>
          <li>
            Using the service for any unlawful purpose or in violation of any
            local, state, national, or international law.
          </li>
          <li>
            Impersonating any person or entity or otherwise misrepresenting your
            affiliation with a person or entity.
          </li>
          <li>
            Interfering with or disrupting the service or servers or networks
            connected to the service.
          </li>
          <li>
            Attempting to gain unauthorized access to any portion of the service
            or any other accounts, computer systems, or networks connected to
            the service.
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Intellectual Property
        </Typography>
        <Typography sx={{ mb: 1 }}>
          The service and its entire contents, features, and functionality are
          owned by [Your Company Name], its licensors, or other providers of
          such material and are protected by copyright, trademark, patent, trade
          secret, and other intellectual property or proprietary rights laws.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Termination
        </Typography>
        <Typography sx={{ mb: 1 }}>
          We may terminate or suspend your account and access to the service at
          our sole discretion, without prior notice or liability, for any
          reason, including if you breach these Terms.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Disclaimer of Warranties
        </Typography>
        <Typography sx={{ mb: 1 }}>
          The service is provided on an "AS IS" and "AS AVAILABLE" basis. We
          make no warranties, express or implied, regarding the service,
          including but not limited to implied warranties of merchantability,
          fitness for a particular purpose, and non-infringement.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Limitation of Liability
        </Typography>
        <Typography sx={{ mb: 1 }}>
          In no event shall [Your Company Name], its directors, employees, or
          agents be liable for any indirect, incidental, special, consequential,
          or punitive damages, including without limitation, loss of profits,
          data, use, goodwill, or other intangible losses, resulting from (i)
          your use or inability to use the service; (ii) any unauthorized access
          to or use of our servers and/or any personal information stored
          therein; (iii) any interruption or cessation of transmission to or
          from the service; (iv) any bugs, viruses, trojan horses, or the like
          that may be transmitted to or through our service by any third party;
          (v) any errors or omissions in any content or for any loss or damage
          incurred as a result of the use of any content posted, emailed,
          transmitted, or otherwise made available through the service; and/or
          (vi) the defamatory, offensive, or illegal conduct of any third party.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Governing Law
        </Typography>
        <Typography sx={{ mb: 1 }}>
          These Terms shall be governed and construed in accordance with the
          laws of [Your Country/State], without regard to its conflict of law
          provisions.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Changes to Terms
        </Typography>
        <Typography sx={{ mb: 1 }}>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material, we will provide at
          least 30 days' notice prior to any new terms taking effect. What
          constitutes a material change will be determined at our sole
          discretion.
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.5rem", mb: 1 }}>
          Contact Us
        </Typography>
        <Typography sx={{ mb: 1 }}>
          If you have any questions about these Terms, please contact us at
          [Your Contact Information].
        </Typography>
      </Box>
    </Box>
  );
}
