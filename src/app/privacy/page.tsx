
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
                <p>Welcome to SynergyChain. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at privacy@synergychain.com.</p>
                <p>This Privacy Policy applies to all information collected through our website and/or any related services, sales, marketing or events.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
                <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.</p>
                <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following: name, email address, phone number, company information, and other similar data.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
                <p>We use the information we collect or receive to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Facilitate account creation and logon process.</li>
                  <li>Send administrative information to you.</li>
                  <li>Fulfill and manage your orders.</li>
                  <li>Post testimonials with your consent.</li>
                  <li>Request feedback and to contact you about your use of our website.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">4. Will Your Information Be Shared With Anyone?</h2>
                <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
                <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">6. Your Privacy Rights</h2>
                <p>In some regions (like the European Economic Area), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">7. Changes to This Policy</h2>
                <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
                <p>If you have questions or comments about this policy, you may email us at privacy@synergychain.com.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
