export const SITE = {
  name: "Emotional Ledger",
  tagline: "A book on the hidden cost of unprocessed emotions.",
  author: "The Author",
  authorShort: "Author",
  email: "emotionalledger@gmail.com",
  phone: "+91 93668 42735",
  phoneHref: "+919366842735",
  sampleUrl: "/emotional-ledger-sample.pdf",
  developer: "Mannu",
  url: "https://emotionalledger.com",
  yearFounded: 2025,
};

export type NavItem = { label: string; to: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "The Book", to: "/book" },
  { label: "Author", to: "/author" },
  { label: "Sample Chapter", to: "/sample-chapter" },
  { label: "Workshops", to: "/workshops" },
  { label: "Speaking", to: "/speaking" },
  { label: "Journal", to: "/articles" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "The Book",
    items: [
      { label: "About the Book", to: "/book" },
      { label: "Sample Chapter", to: "/sample-chapter" },
      { label: "Buy the Book", to: "/buy" },
      { label: "Bulk & Corporate", to: "/corporate" },
    ],
  },
  {
    title: "Work with the Author",
    items: [
      { label: "Workshops", to: "/workshops" },
      { label: "Speaking", to: "/speaking" },
      { label: "Events", to: "/events" },
      { label: "Media", to: "/media" },
    ],
  },
  {
    title: "Read & Reflect",
    items: [
      { label: "Journal", to: "/articles" },
      { label: "About the Author", to: "/author" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  },
];

export const THEMES = [
  { n: "01", t: "The Unseen Ledger", d: "Every unspoken emotion is quietly recorded — in the body, in habits, in decisions we cannot explain." },
  { n: "02", t: "The Cost of Carrying", d: "What we refuse to feel, we pay for elsewhere — in leadership, in relationships, in the quality of our attention." },
  { n: "03", t: "Decisions in Disguise", d: "Most choices are not rational. They are emotional entries dressed up as logic." },
  { n: "04", t: "The Art of Reconciliation", d: "Emotional awareness is not a soft skill. It is the audit that clears the ledger." },
  { n: "05", t: "A Quieter Kind of Power", d: "Leaders who process their emotions lead with clarity. Everyone else leads with residue." },
  { n: "06", t: "The Return", d: "Nothing settled is ever wasted. What we reconcile within, we return to the world as capacity." },
];

export const CHAPTERS = [
  { n: "I", t: "The Debts We Don't See" },
  { n: "II", t: "How Emotions Compound" },
  { n: "III", t: "The Cost of Suppression" },
  { n: "IV", t: "Leadership as Ledger" },
  { n: "V", t: "Relationships & Reconciliation" },
  { n: "VI", t: "The Audit of the Self" },
  { n: "VII", t: "Clarity as Currency" },
  { n: "VIII", t: "Closing the Ledger" },
];

export const QUOTES = [
  { q: "We do not think our way into wisdom. We feel our way there — and then we account for it.", a: "Emotional Ledger" },
  { q: "The unfelt does not disappear. It is deposited.", a: "Chapter II" },
  { q: "A leader's calm is not composure. It is a balanced ledger.", a: "Chapter IV" },
];

export const ENDORSEMENTS = [
  { q: "A rare book that reads like a mirror and works like a mentor.", by: "Executive Coach, Fortune 500" },
  { q: "Quietly radical. It reframes what we call intelligence.", by: "Founder, Leadership Institute" },
  { q: "The most human business book I've read in years.", by: "Editor, Business Review" },
];

export const FAQ = [
  { q: "Who is this book for?", a: "Anyone who suspects their inner life is shaping their outer decisions — professionals, leaders, parents, coaches, students, and readers of literary non-fiction." },
  { q: "Is this a self-help book?", a: "No. It is a work of thought leadership. It offers frameworks, not affirmations." },
  { q: "How long is it?", a: "Around 240 pages, structured as eight chapters that can be read as essays or as a whole." },
  { q: "Do you run private workshops for teams?", a: "Yes. See the Workshops page or send a corporate enquiry — most engagements are booked 6–8 weeks in advance." },
  { q: "Do you accept speaking invitations?", a: "Selectively. Priority is given to conferences, leadership summits, and educational institutions." },
  { q: "Can I order copies in bulk for my organisation?", a: "Yes. Bulk pricing is available from 25 copies onwards. Use the Bulk & Corporate page." },
];