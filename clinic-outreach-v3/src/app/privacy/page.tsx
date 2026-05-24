import type { Metadata } from "next";
import LegalShell from "../_components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy — Dikhao",
  description: "How Dikhao collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="May 2026">
      <p>
        This Privacy Policy explains how Dikhao (&quot;Dikhao&quot;,
        &quot;we&quot;, &quot;us&quot;) collects, uses, and protects
        information when you use our website and services. By using Dikhao,
        you agree to the practices described here.
      </p>
      <p>
        Dikhao is operated by{" "}
        <span className="lg-placeholder">[Legal entity name — to be added]</span>
        . For any privacy-related questions, contact us at{" "}
        <span className="lg-placeholder">support@dikhao.in</span>.
      </p>

      <h2>1. Information we collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li>
          <strong>Business details you provide:</strong> business name,
          category, address, phone number, working hours, services, and any
          content you submit to build your digital presence.
        </li>
        <li>
          <strong>Account information:</strong> your name, email address, and
          phone number used to create and access your account.
        </li>
        <li>
          <strong>Payment information:</strong> subscription payments are
          processed by our payment partner. We do not store your full card or
          bank details on our own systems.
        </li>
        <li>
          <strong>Usage information:</strong> basic analytics such as pages
          visited and features used, to improve the service.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To build, publish, and maintain your website, Google listing, and WhatsApp catalog.</li>
        <li>To create marketing content such as social media posts on your behalf.</li>
        <li>To process payments and manage your subscription.</li>
        <li>To provide customer support and respond to your requests.</li>
        <li>To improve and secure our services.</li>
      </ul>

      <h2>3. Third-party services</h2>
      <p>
        To deliver our service, Dikhao connects with trusted third-party
        platforms, including Google (for business listings), Meta / WhatsApp
        (for business messaging and catalogs), and our payment processor (for
        subscription billing). When you use Dikhao, relevant information is
        shared with these platforms only as needed to provide the service.
        Each platform handles data under its own privacy policy.
      </p>

      <h2>4. Data sharing</h2>
      <p>
        We do not sell your personal information. We share information only
        with the third-party services described above, with service providers
        who help us operate Dikhao, or where required by law.
      </p>

      <h2>5. Data security</h2>
      <p>
        We take reasonable technical and organizational measures to protect
        your information. However, no method of transmission or storage is
        completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>6. Your choices</h2>
      <p>
        You can access and update your business and account information from
        your dashboard. You may request deletion of your account by contacting
        us. Some information may be retained where required for legal,
        accounting, or fraud-prevention purposes.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes
        will be communicated through the service or by email.
      </p>

      <h2>8. Contact</h2>
      <p>
        For any questions about this Privacy Policy, contact us at{" "}
        <span className="lg-placeholder">support@dikhao.in</span>.
      </p>
    </LegalShell>
  );
}
