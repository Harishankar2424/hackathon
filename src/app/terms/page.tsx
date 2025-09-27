
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
                <p>Welcome to SynergyChain ("Company", "we", "our", "us")! These Terms of Service ("Terms") govern your use of our website located at synergychain.com (together or individually "Service") operated by SynergyChain.</p>
                <p>Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here.</p>
                <p>Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">2. Use of Our Service</h2>
                <p>You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service in any way that violates any applicable national or international law or regulation.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">3. Accounts</h2>
                <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property</h2>
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of SynergyChain and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">5. Termination</h2>
                <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
                <p>In no event shall SynergyChain, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">7. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is established, without regard to its conflict of law provisions.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">8. Changes to These Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at contact@synergychain.com.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
