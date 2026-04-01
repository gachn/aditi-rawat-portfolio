import type { HomePageData } from "./types";

export const fallbackHomePageData: HomePageData = {
  siteSettings: {
    siteTitle: "Aditi Rawat",
    siteTagline: "animator & illustrator",
    navLinks: [
      { label: "work", href: "#work" },
      { label: "about", href: "#about" },
      { label: "contact", href: "#contact" }
    ],
    footerCopy: "india - © 2026"
  },
  homeHero: {
    dateline: "India, 2026 - a letter to the work I make",
    salutation: "dear world,",
    headlineTop: "I bring",
    headlineEmphasis: "things",
    headlineBottom: "to life.",
    headlineSubline: "frame by frame, feeling by feeling",
    opening:
      "My name is Aditi. I'm an animator and illustrator from India - self-taught, always learning, never boring.",
    ctaPrimaryLabel: "read my work",
    ctaPrimaryHref: "#work",
    ctaSecondaryLabel: "write back",
    ctaSecondaryHref: "#contact",
    annotation: "relentlessly curious"
  },
  workTitle: "things I've",
  workEmphasizedTitle: "made move",
  workViewAllHref: "https://www.aditirawat.com/projects",
  projects: [
    {
      _id: "project-1",
      title: "Trinidad and Tobago",
      slug: "trinidad-and-tobago",
      category: "rotoscope",
      note: "movement as identity",
      projectUrl: "https://www.aditirawat.com/animations/trinidad-and-tobago",
      featured: true,
      washColor: "rose",
      order: 1
    },
    {
      _id: "project-2",
      title: "The Nest",
      slug: "youtube-opener",
      category: "channel opener",
      note: "a home for stories",
      projectUrl: "https://www.aditirawat.com/animations/youtube-opener",
      featured: false,
      washColor: "sage",
      order: 2
    },
    {
      _id: "project-3",
      title: "Enchanting Cinderella",
      slug: "enchanting-cinderella-intro",
      category: "animated intro",
      note: "once upon a frame",
      projectUrl:
        "https://www.aditirawat.com/animations/enchanting-cinderella-intro",
      featured: false,
      washColor: "gold",
      order: 3
    },
    {
      _id: "project-4",
      title: "Campaign Videos",
      slug: "2d-rotoscope-animation",
      category: "2D rotoscope",
      note: "motion with purpose",
      projectUrl: "https://www.aditirawat.com/animations/2d-rotoscope-animation",
      featured: false,
      washColor: "ink",
      order: 4
    },
    {
      _id: "project-5",
      title: "Take On Me",
      slug: "take-on-me-inspired-animation",
      category: "inspired animation",
      note: "pencil lines, full heart",
      projectUrl:
        "https://www.aditirawat.com/animations/take-on-me-inspired-animation",
      featured: false,
      washColor: "rose",
      order: 5
    },
    {
      _id: "project-6",
      title: "Cherri Lips",
      slug: "cherri-lips-ad",
      category: "ad animation",
      note: "short, sweet, moving",
      projectUrl: "https://www.aditirawat.com/animations/cherri-lips-ad",
      featured: false,
      washColor: "sage",
      order: 6
    }
  ],
  about: {
    label: "about the artist",
    titleTop: "Hello, I'm",
    titleEmphasis: "Aditi.",
    marginNote:
      "when I'm not animating, I'm probably researching weird facts, snoring, or bingeing good drama.",
    portraitCaption: "Aditi Rawat - India - 2026",
    portraitPlaceholder: "your photo goes here",
    paragraphs: [
      "I'm a freelance animator and illustrator from India, with a bachelor's degree in design.",
      "My work spans mixed media animation, rotoscoping, and After Effects compositing.",
      "Versatile and well-rounded, though not a specialist. Self-taught in more ways than one."
    ],
    postscript:
      "Common sense isn't really my thing. But when I'm interested in something, I go far beyond just knowing it.",
    skills: [
      "After Effects",
      "Rotoscoping",
      "2D Animation",
      "Mixed Media",
      "Illustration",
      "Compositing"
    ]
  },
  contact: {
    closing: "yours sincerely,",
    headlineTop: "let's make",
    headlineBottom: "something",
    headlineEmphasis: "worth watching.",
    body: "Open to freelance animation, illustration, and motion design projects.",
    links: [
      {
        type: "animation",
        label: "View animation portfolio",
        href: "https://www.aditirawat.com/projects"
      },
      {
        type: "illustration",
        label: "View illustration work",
        href: "https://www.aditirawat.com/illustration"
      },
      {
        type: "write back",
        label: "Send a message",
        href: "https://www.aditirawat.com/contact"
      }
    ],
    signoff: "with love and frame rates,",
    signature: "Aditi"
  },
  seo: {
    title: "Aditi Rawat - Animator & Illustrator",
    description:
      "Freelance animator and illustrator specializing in rotoscoping, mixed media, and storytelling."
  }
};
