import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface InvoiceEmailProps {
  customerName: string;
  planName: string;
  currency: string;
  amount: number;
}

export const InvoiceEmail: React.FC<InvoiceEmailProps> = ({
  customerName,
  planName,
  currency,
  amount,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your subscription for {planName} has renewed.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Service Renewal Invoice</Heading>
          <Text style={text}>Hello {customerName},</Text>
          <Text style={text}>
            Your subscription for <strong>{planName}</strong> has successfully
            renewed.
          </Text>
          <Text style={text}>
            Please find your official invoice attached to this email. Payment is
            due upon receipt.
          </Text>

          <Container style={amountContainer}>
            <Text style={amountText}>
              Total Due: {currency}{" "}
              {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Text>
          </Container>

          <Hr style={hr} />
          <Text style={footer}>
            Surge Innovations Ltd | Automated Billing System
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e6ebf1",
  borderRadius: "5px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "0 48px",
  margin: "30px 0",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 48px",
};

const amountContainer = {
  padding: "24px 48px",
  backgroundColor: "#f8f9fa",
  borderRadius: "4px",
  margin: "24px 48px",
};

const amountText = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#111827",
  margin: "0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  padding: "0 48px",
};
