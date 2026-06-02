// faq-data.js
// Pre-built FAQ dataset for the chatbot knowledge base
// Each entry has a question and its corresponding answer

const FAQ_DATA = [
  {
    q: "How do I reset my password?",
    a: "To reset your password, click 'Forgot Password' on the login page. You'll receive an email with a reset link valid for 24 hours. Click it and set your new password."
  },
  {
    q: "What are the pricing plans?",
    a: "We offer three plans: Free (basic features, up to 5 projects), Pro ($12/month, unlimited projects + priority support), and Enterprise (custom pricing with dedicated support and SLA guarantees)."
  },
  {
    q: "How do I contact support?",
    a: "Reach our support team via live chat on the website (Mon–Fri, 9 AM–6 PM IST), email at support@company.com, or by submitting a ticket through your dashboard."
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes! Cancel anytime from Settings → Billing → Cancel Subscription. Your access continues until the end of the current billing period with no extra charges."
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use AES-256 encryption for stored data, TLS 1.3 for data in transit, and undergo regular third-party security audits. We are SOC 2 Type II certified."
  },
  {
    q: "How do I upgrade my plan?",
    a: "Go to Settings → Billing → Upgrade Plan. You'll be charged a prorated amount for the current period, and new features activate immediately."
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes! The Pro plan comes with a 14-day free trial. No credit card required. You'll be notified before the trial ends."
  },
  {
    q: "How many users can I add?",
    a: "Free plans support 1 user. Pro plans support up to 10 team members. Enterprise plans have unlimited seats. Manage from Settings → Team."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, Amex, UPI, net banking, and PayPal. Enterprise plans also support invoicing and bank transfers."
  },
  {
    q: "How do I export my data?",
    a: "Go to Settings → Data Management → Export. Choose CSV, JSON, or PDF formats. Large exports are emailed to you within 30 minutes."
  },
  {
    q: "Is there a mobile app?",
    a: "Yes! Available on iOS (App Store) and Android (Google Play). Supports all core features including real-time notifications and offline mode."
  },
  {
    q: "How do I integrate with third-party tools?",
    a: "We support 50+ integrations including Slack, Zapier, Google Workspace, GitHub, and Jira. Go to Settings → Integrations to connect with one click."
  },
  {
    q: "What happens if I exceed my storage limit?",
    a: "You'll get email alerts at 80% and 95% usage. Once the limit is hit, uploads pause. Free up space by deleting old files or upgrade your plan."
  },
  {
    q: "Can I use the service offline?",
    a: "The mobile app supports offline mode for viewing and editing previously loaded content. Changes sync automatically when you reconnect."
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings → Account → Delete Account. This is irreversible and removes all your data within 30 days per our data retention policy."
  },
  {
    q: "How do I change my email address?",
    a: "Go to Settings → Profile → Change Email. A verification link will be sent to your new email address. The change takes effect once you verify."
  },
  {
    q: "Do you have an API?",
    a: "Yes! We provide a REST API with full documentation at docs.company.com/api. API keys can be generated from Settings → Developer → API Keys."
  },
  {
    q: "How do I invite team members?",
    a: "Go to Settings → Team → Invite Members. Enter their email addresses and assign roles (Admin, Editor, Viewer). They'll receive an invite email."
  },
  {
    q: "What browsers are supported?",
    a: "We support Chrome, Firefox, Safari, and Edge (latest 2 versions). For best performance, we recommend Chrome or Firefox."
  },
  {
    q: "How do I report a bug?",
    a: "Use the feedback button (bottom-right of the app) or email bugs@company.com. Include your browser, steps to reproduce, and a screenshot if possible."
  }
];
