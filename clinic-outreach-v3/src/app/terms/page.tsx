import type { Metadata } from "next";
import LegalShell from "../_components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service — Dikhao",
  description: "The terms that govern your use of Dikhao's services.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="May 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of Dikhao
        and its services. By creating an account or using Dikhao, you agree to
        these Terms. If you do not agree, please do not use the service.
      </p>
      <p>
        Dikhao is operated by{" "}
        <span className="lg-placeholder">[Legal entity name — to be added]</span>
        .
      </p>

      <h2>1. The service</h2>
      <p>
        Dikhao helps small and medium businesses build a digital presence,
        including a website, Google Business listing, WhatsApp Business
        catalog, and marketing content. Features available to you depend on
        your chosen subscription plan.
      </p>

      <h2>2. Your account</h2>
      <p>
        You are responsible for the accuracy of the information you provide
        and for keeping your login credentials secure. You must ensure you
        have the right to use any business name, logo, images, or content you
        submit to Dikhao.
      </p>

      <h2>3. Subscriptions and billing</h2>
      <ul>
        <li>Dikhao is offered on a monthly (or annual) subscription basis.</li>
        <li>Subscription fees are billed in advance for each billing period.</li>
        <li>Payments are processed by our payment partner. By subscribing, you authorize recurring charges until you cancel.</li>
        <li>Prices may change; we will give reasonable notice of any change before it applies to you.</li>
      </ul>

      <h2>4. Cancellation and refunds</h2>
      <p>
        You may cancel your subscription at any time from your dashboard. When
        you cancel, your plan remains active until the end of the current
        billing period, and you will not be billed again after that.
      </p>
      <p>
        Payments already made for the current billing period are
        non-refundable, except where required by applicable law.{" "}
        <span className="lg-placeholder">
          [Refund terms to be confirmed before launch]
        </span>
      </p>

      <h2>5. Third-party platforms</h2>
      <p>
        Dikhao relies on third-party platforms such as Google and Meta /
        WhatsApp. Verification timelines on these platforms are controlled by
        them — for example, a Google Business listing can take several days to
        be verified. Dikhao is not responsible for delays, changes, or
        decisions made by these third-party platforms.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to use Dikhao to:</p>
      <ul>
        <li>Publish false, misleading, illegal, or harmful content.</li>
        <li>Infringe the intellectual property or rights of others.</li>
        <li>Misrepresent a business or impersonate another party.</li>
        <li>Interfere with or disrupt the service.</li>
      </ul>
      <p>
        We may suspend or terminate accounts that violate these Terms.
      </p>

      <h2>7. Service availability</h2>
      <p>
        We work to keep Dikhao available and reliable, but the service is
        provided on an &quot;as is&quot; basis. We do not guarantee
        uninterrupted or error-free operation.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Dikhao is not liable for
        indirect, incidental, or consequential losses arising from your use of
        the service. Our total liability is limited to the amount you paid for
        the service in the three months preceding the claim.
      </p>

      <h2>9. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of Dikhao
        after changes take effect means you accept the updated Terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions about these Terms, contact us at{" "}
        <span className="lg-placeholder">support@dikhao.in</span>.
      </p>
    </LegalShell>
  );
}
