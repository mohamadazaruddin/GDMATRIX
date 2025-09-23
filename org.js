const routes = [
  {
    name: "Teams",
    content: "Analyst List",
    description: "List of all analyst working on cases",
    slug: "Teams",
  },
  {
    name: "Tools",
    content: "Tools Content",
    description: "List of all analyst working on cases",
    slug: "Tools",
  },
  {
    name: "Operations",
    content: "Operations Content",
    description: "List of all analyst working on cases",
    slug: "Operations",
  },
  {
    name: "Research",
    content: "Research Content",
    description: "List of all analyst working on cases",
    slug: "Research",
  },
  {
    name: "Documents",
    content: "Documents Content",
    description: "List of all analyst working on cases",
    slug: "Documents",
  },
  {
    name: "Narations",
    content: "Narations Content",
    description: "List of all analyst working on cases",
    slug: "Narations",
  },
];
const dueDiligenceLinks = {
  individuals: [
    {
      "Site Name": "True People Search",
      Website: "https://www.truepeoplesearch.com/",
    },
    {
      "Site Name": "Fast People Search",
      Website: "https://www.fastpeoplesearch.com/",
    },
    {
      "Site Name": "OFAC",
      Website: "https://sanctionssearch.ofac.treas.gov/",
    },
    { "Site Name": "Radaris", Website: "https://radaris.com/" },
    { "Site Name": "My Life", Website: "https://www.mylife.com/" },
    {
      "Site Name": "Cyber Background Checks",
      Website: "https://www.cyberbackgroundchecks.com/",
    },
    { "Site Name": "White Pages", Website: "https://www.whitepages.com/" },
    { "Site Name": "LinkedIn", Website: "https://www.linkedin.com/" },
    { "Site Name": "Facebook", Website: "https://www.facebook.com/" },
    { "Site Name": "Instagram", Website: "https://www.instagram.com/" },
    { "Site Name": "Zoom Info", Website: "https://www.zoominfo.com/" },

    { "Site Name": "Spokeo", Website: "https://www.spokeo.com/" },
    { "Site Name": "Venmo", Website: "https://www.venmo.com/" },
  ],
  businesses: [
    { "Site Name": "Bizapedia", Website: "https://www.bizapedia.com/" },
    {
      "Site Name": "Open Corporates",
      Website: "https://opencorporates.com/",
    },
    {
      "Site Name": "Forbes",
      Website: "https://www.forbes.com/advisor/business/free-ein-lookup/",
    },
    {
      "Site Name": "Better Business Bureau",
      Website: "https://www.bbb.org/",
    },
    { "Site Name": "Manta", Website: "https://www.manta.com/" },
    { "Site Name": "IRS", Website: "https://apps.irs.gov/app/eos/" },
    { "Site Name": "Dun and Bradstreet", Website: "https://www.dnb.com/" },
    { "Site Name": "Bloomberg", Website: "https://www.bloomberg.com/" },
    { "Site Name": "Archive.org", Website: "https://archive.org/" },
    { "Site Name": "Yahoo Finance", Website: "https://finance.yahoo.com/" },
  ],
  nonprofits: [
    { "Site Name": "Guidestar", Website: "https://www.guidestar.org/" },
    { "Site Name": "Charity Check", Website: "https://charitycheck101.org/" },
    {
      "Site Name": "Charity Watch",
      Website: "https://www.charitywatch.org/",
    },
    { "Site Name": "ICIJ", Website: "https://offshoreleaks.icij.org/" },
  ],
};
const Narrations = {
  OFAC: [
    {
      title: "No Sanction Found",
      description: "No OFAC Sanction Found For The Focal Entity",
    },
    {
      title: "Sanction Found",
      description: "OFAC Sanction Detected for the Focal Entity",
    },
    {
      title: "Potential Name Match",
      description: "Partial OFAC Name Match for the Focal Entity",
    },
  ],
  GoogleScreening: [
    {
      title: "No match",
      description: "No Matches found for the focal entity",
    },
    {
      title: "No match",
      description: "No Adverse media found for the focal entity",
    },
    {
      title: "Adverse Media Detected",
      description: "Adverse media identified in screening for the focal entity",
    },
    {
      title: "Positive News Found",
      description: "Focal entity associated with positive media coverage",
    },
    {
      title: "Screening Pending",
      description: "Google screening results pending for the focal entity",
    },
  ],
  ECM: [
    {
      title: "Entity Cleared",
      description: "No compliance issues detected for the focal entity",
    },
    {
      title: "Further Investigation Required",
      description: "Further investigation recommended based on ECM results",
    },
    {
      title: "Entity Flagged",
      description: "Focal entity flagged for ECM compliance review",
    },
  ],
};
const documents = [
  {
    title: "WealthFront Non-Esc",
    desc: "Q2 risk analysis for the organization.",
    file: "GD Investigations Procedures Training_DRAFT.pptx",
  },
  {
    title: "WealthFront Esclation",
    desc: "Checklist required for Q1 compliance verification.",
    file: "GD Lookback Case Review Process Outline V1.3_June 2025.docx",
  },
  {
    title: "Apple Cash Non-Esc",
    desc: "Summary of third-party vendor risks for FY24.",
    file: "GreenDot Onboarding Updated 6-3.pptx",
  },
  {
    title: "Apple Cash Esclation",
    desc: "Summary of third-party vendor risks for FY24.",
    file: "GreenDot_Project Overview.pptx",
  },
  {
    title: "WealthFront Non-Esc",
    desc: "Q2 risk analysis for the organization.",
    file: "GD Investigations Procedures Training_DRAFT.pptx",
  },
  {
    title: "WealthFront Esclation",
    desc: "Checklist required for Q1 compliance verification.",
    file: "GD Lookback Case Review Process Outline V1.3_June 2025.docx",
  },
  {
    title: "Apple Cash Non-Esc",
    desc: "Summary of third-party vendor risks for FY24.",
    file: "GreenDot Onboarding Updated 6-3.pptx",
  },
  {
    title: "Apple Cash Esclation",
    desc: "Summary of third-party vendor risks for FY24.",
    file: "GreenDot_Project Overview.pptx",
  },
];
