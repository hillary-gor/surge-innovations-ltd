import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface AdminBroadcastEmailProps {
  userFirstname?: string;
  subject: string;
  message: string;
  antiClipId: string;
  heroImageUrl?: string;
}

export const AdminBroadcastEmail = ({ 
  userFirstname = "there", 
  subject = "Important Update from Surge Innovations",
  message = "Please check your dashboard for the latest updates.",
  antiClipId,
  heroImageUrl
}: AdminBroadcastEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://surgeinnovations.org";
  const unsubscribeUrl = `${baseUrl}/unsubscribe`; 
  const currentYear = new Date().getFullYear();

  const getDeterministicEntropy = (seed: string, offset: number) => {
    const spaceVariants = ["\u200C", "\u200D", "\u2060", "\u180E"];
    let mutationChain = "";
    
    for (let i = 0; i < 8; i++) {
      const charCode = seed.charCodeAt((i + offset) % seed.length) || i;
      const index = (charCode + i) % spaceVariants.length;
      mutationChain += spaceVariants[index];
    }
    
    return mutationChain;
  };

  const subjectEntropy = getDeterministicEntropy(antiClipId, 0);
  const signatureEntropy = getDeterministicEntropy(antiClipId, 5);
  const brandEntropy = getDeterministicEntropy(antiClipId, 10);
  const footerEntropy = getDeterministicEntropy(antiClipId, 15);

  return (
    <Html>
      <Tailwind>
        <Head>
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <style dangerouslySetInnerHTML={{ __html: `
            @media only screen and (max-width: 600px) {
              .mobile-block { display: block !important; width: 100% !important; box-sizing: border-box !important; }
              .mobile-padding { padding: 24px !important; }
              .mobile-center { text-align: center !important; }
              .mobile-hide { display: none !important; }
              .mobile-padding-y { padding-top: 8px !important; padding-bottom: 8px !important; }
            }
          `}} />
        </Head>
        
        <Preview>{subject}</Preview>
        
        <Body className="font-sans m-0 py-8 px-4" style={{ backgroundColor: "#f1f5f9" }}>
          <Container width="600" className="mx-auto bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ maxWidth: "600px", width: "100%" }}>
            
            <Section style={{ padding: "32px 0 16px 0", textAlign: "center" }}>
              <Img
                src="https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/surge-rectandular-logo.png"
                alt="Surge Innovations Logo"
                width="180"
                style={{ display: "block", margin: "0 auto", maxWidth: "100%", height: "auto" }}
              />
            </Section>

            {heroImageUrl && (
              <Section style={{ backgroundColor: "#0f172a" }}>
                <Img
                  src={heroImageUrl}
                  alt="Broadcast Hero Banner"
                  width="600"
                  style={{ display: "block", maxWidth: "100%", height: "auto", objectFit: "cover" }}
                />
              </Section>
            )}

            <Section style={{ padding: "40px 40px 20px 40px", backgroundColor: "#ffffff" }} className="mobile-padding">
              <Text style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a", margin: "0 0 16px 0", lineHeight: "1.3" }}>
                {subject}{subjectEntropy}
              </Text>
              
              <Text style={{ fontSize: "14px", lineHeight: "1.6", color: "#475569", margin: "0 0 24px 0", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <strong>About Surge Innovations Ltd:</strong> Embedded as a strategic technology partner based in Nairobi, Surge delivers Tech-as-a-Service (TaaS) through autonomous, cross-functional engineering pods. We combine fractional CTO leadership, product design, and dedicated engineering pipelines to empower corporate teams, non-profits, and regulatory institutions with reliable, high-availability software solutions eliminating the overhead of internal technical management.
              </Text>

              <Text style={{ fontSize: "16px", color: "#475569", margin: "0 0 24px 0" }}>
                Hi {userFirstname},
              </Text>

              <div 
                dangerouslySetInnerHTML={{ __html: message }} 
                style={{ fontSize: "16px", color: "#475569", lineHeight: "1.6", margin: "0 0 32px 0", fontFamily: "sans-serif" }} 
              />
              
              <table width="100%" border={0} cellPadding="0" cellSpacing="0" style={{ marginTop: "16px", marginBottom: "16px" }}>
                <tr>
                  <td align="left">
                    <Button 
                      href={`${baseUrl}/dashboard/client`}
                      style={{ backgroundColor: "#2563eb", color: "#ffffff", fontSize: "15px", fontWeight: "bold", padding: "14px 28px", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}
                    >
                      Visit Your Dashboard &rarr;
                    </Button>
                  </td>
                </tr>
              </table>
            </Section>

            <Section style={{ padding: "40px 40px", backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }} className="mobile-padding">
              <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                <tr>
                  <td valign="middle" className="mobile-center mobile-block">
                    <Text style={{ fontSize: "15px", color: "#64748b", margin: "0 0 6px 0", fontStyle: "italic" }}>
                      In pursuit of innovation,{signatureEntropy}
                    </Text>
                    <Text style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "0 0 2px 0", letterSpacing: "-0.5px" }}>
                      Hillary Gor
                    </Text>
                    <Text style={{ fontSize: "13px", fontWeight: "700", color: "#2563eb", margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
                      Founder & Managing Director
                    </Text>
                    <Text style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>
                      Surge Innovations Ltd
                    </Text>
                    
                    <table border={0} cellPadding="0" cellSpacing="0" className="mobile-center" style={{ margin: "0" }}>
                      <tr>
                        <td style={{ paddingRight: "16px", borderRight: "1px solid #cbd5e1" }} className="mobile-block mobile-padding-y">
                          <Link href="https://surgeinnovations.org" style={{ fontSize: "13px", fontWeight: "bold", color: "#475569", textDecoration: "none" }}>
                            surgeinnovations.org
                          </Link>
                        </td>
                        <td style={{ paddingLeft: "16px" }} className="mobile-block mobile-padding-y">
                          <Link href="https://instagram.com/hillary_se1" style={{ fontSize: "13px", fontWeight: "bold", color: "#64748b", textDecoration: "none" }}>
                            Executive Portfolio: <span style={{ color: "#2563eb" }}>@hillary_se1</span>
                          </Link>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" width="100" className="mobile-hide">
                    <Img 
                      src="https://zqgbqiousiqoyhcedsdr.supabase.co/storage/v1/object/public/profile-pictures/hillary_ticketszetu_ceo.jpeg" 
                      width="85" 
                      height="85" 
                      alt="Hillary Gor" 
                      style={{ borderRadius: "50%", display: "block", border: "3px solid #ffffff", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", objectFit: "cover" }} 
                    />
                  </td>
                </tr>
              </table>
            </Section>

            <Section style={{ padding: "40px 20px", backgroundColor: "#0f172a", textAlign: "center" }}>
              <Text style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 32px 0", lineHeight: "20px", padding: "0 20px" }}>
                <strong style={{ color: "#ffffff" }}>Need assistance?</strong> Just hit reply to this email or <Link href="mailto:support@surgeinnovations.org" style={{ color: "#38bdf8", textDecoration: "underline" }}>contact support</Link>. We read every response!
              </Text>

              <Text style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 24px 0" }}>
                SURGE INNOVATIONS {brandEntropy}
              </Text>
              
              <table width="240" border={0} cellPadding="0" cellSpacing="0" align="center" style={{ margin: "0 auto" }}>
                <tr>
                  <td align="center">
                    <Link href="https://instagram.com/surgeinnovations">
                      <Img src="https://img.icons8.com/fluency/96/instagram-new.png" width="36" height="36" alt="Instagram" style={{ display: "block" }} />
                    </Link>
                  </td>
                  <td align="center">
                    <Link href="https://x.com/surgeinnovations">
                      <Img src="https://img.icons8.com/ios-filled/100/ffffff/twitterx--v1.png" width="36" height="36" alt="X" style={{ display: "block" }} />
                    </Link>
                  </td>
                  <td align="center">
                    <Link href="https://youtube.com/@surgeinnovations">
                      <Img src="https://img.icons8.com/color/96/youtube-play.png" width="40" height="40" alt="YouTube" style={{ display: "block" }} />
                    </Link>
                  </td>
                  <td align="center">
                    <Link href="https://tiktok.com/@surgeinnovations">
                      <Img src="https://img.icons8.com/ios-filled/100/ffffff/tiktok.png" width="36" height="36" alt="TikTok" style={{ display: "block" }} />
                    </Link>
                  </td>
                </tr>
              </table>
              <Text style={{ fontSize: "12px", color: "#64748b", margin: "32px 0 0 0", lineHeight: "1.6" }}>
                © {currentYear} Surge Innovations Ltd. Nairobi, Kenya.<br/>
                Surge Innovations Ltd is a legally incorporated Private Limited Company registered under the Companies Act of Kenya (Reg No. PVT-AJUXAL3P).<br/>
                You are receiving this operational update as a registered user. <Link href={unsubscribeUrl} style={{ color: "#94a3b8", textDecoration: "underline" }}>Unsubscribe</Link>.
              </Text>
            </Section>

          </Container>
          
          <div style={{ display: "none", maxHeight: "0px", overflow: "hidden", opacity: 0, fontSize: "0px", lineHeight: "0px", color: "transparent" }}>
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            RefID: {antiClipId}-{footerEntropy}
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AdminBroadcastEmail;