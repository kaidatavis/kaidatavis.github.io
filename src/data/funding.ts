/**
 * Grants and research funding, newest first.
 *
 * Amounts, periods and roles follow the 2026 CV, which is the authoritative
 * record. `url` is only set where a stable external project page exists — the
 * old kaixu.me blog permalinks will not survive the move to this site, so
 * entries without a real external target are rendered as plain text.
 */
export interface Grant {
  title: string;
  /** Human-readable funding period, e.g. "2021–2022". */
  period: string;
  /** Sort key: the year the grant started. */
  year: number;
  /** Your role on the grant. Omitted where the CV does not record one. */
  role?: string;
  /** Featured on /highlights. Mirrors the bold entries in the 2026 CV. */
  highlight?: boolean;
  /** Funding body, when it is recorded. */
  funder?: string;
  amount?: string;
  partners?: string;
  description: string;
  url?: string;
  urlLabel?: string;
}

export const grants: Grant[] = [
  {
    title: 'Inclusive Floor Plan Design with Generative AI',
    period: '2026',
    year: 2026,
    role: 'Co-investigator',
    funder: 'University of Nottingham, UK',
    amount: '£30,000',
    description:
      'Applying generative AI to the design of accessible and inclusive floor plans.',
  },
  {
    highlight: true,
    title:
      'Decoding the Vindolanda tablets: Generative AI to reassemble, read and restore Roman handwritten texts',
    period: '2025–2029',
    year: 2025,
    role: 'Co-investigator',
    funder: 'Arts and Humanities Research Council (AHRC), UK',
    amount: '£116,000',
    partners: 'The British Museum',
    description:
      'Using generative AI to reassemble, read and restore the Vindolanda tablets, working with the British Museum.',
  },
  {
    title: 'Human-Centred Text-to-Image Generation',
    period: '2025',
    year: 2025,
    role: 'Principal investigator',
    funder: 'REF Enhancement Fund, University of Nottingham, UK',
    amount: '£5,000',
    description: 'Human-centred approaches to text-to-image generation.',
  },
  {
    title: 'Human-AI Collaboration for Scientific Discovery',
    period: '2024–2026',
    year: 2024,
    role: 'Principal investigator',
    funder: 'International Research Collaboration Fund, University of Nottingham, UK',
    amount: '£15,000',
    description:
      'An internal collaboration fund award supporting human-AI collaboration for scientific discovery.',
  },
  {
    highlight: true,
    title: 'Cognitive Engineering for Human-Centred AI Design',
    period: '2021–2024',
    year: 2021,
    role: 'Co-investigator',
    funder: 'Genetec Inc., Montreal, Canada',
    amount: '£450,000',
    description:
      'An industry collaboration with Genetec on cognitive engineering for human-centred AI design.',
  },
  {
    highlight: true,
    title:
      'RAMP VIS: Making Visual Analytics an Integral Part of the Technological Infrastructure for Combating Covid-19',
    period: '2021–2022',
    year: 2021,
    role: 'Co-investigator',
    funder: 'Engineering and Physical Sciences Research Council (EPSRC), UK',
    amount: '£430,000',
    description:
      'A collaborative effort with visualisation researchers across the UK, providing visual analytics support in the fight against Covid-19. It started as a volunteer response and grew into a funded network.',
  },
  {
    title:
      'God, the Oracle, and the Nightclub Bouncer: Can human dignity be modelled in an AI-based decision support system for post-Covid health certification',
    period: '2020–2021',
    year: 2020,
    role: 'Co-investigator',
    funder: 'EPSRC Network Plus SPRITE+',
    amount: '£50,000',
    partners: 'Birmingham City University, King’s College London, Cardiff University, University of Exeter, Trilateral Research Ltd',
    description:
      'Exploring whether human dignity can be modelled in an AI-based decision support system for post-Covid health certification — and what it means to build such a system responsibly.',
  },
  {
    title: 'Behaviour analytics for defence and security',
    period: '2019',
    year: 2019,
    role: 'Principal investigator',
    funder: 'Defence Science and Technology Laboratory (Dstl), Ministry of Defence (MOD), UK',
    amount: '£80,000',
    partners: 'MASS Ltd',
    description:
      'Using the human-machine teaming approach to design a new visual analytics method for behaviour analysis in defence and security settings.',
  },
  {
    title:
      'Combining data visualisation with machine learning to make sense of large social media data',
    period: '2018–2019',
    year: 2018,
    role: 'Principal investigator',
    funder: 'Microsoft Azure Research Award',
    amount: 'US$20,000',
    description:
      'Using Microsoft Azure to analyse over 1.5 billion tweets with an updated SAVI (Social Analytics VIsualisation) pipeline.',
  },
  {
    title: 'The Connected Vehicles',
    period: '2018–2019',
    year: 2018,
    role: 'Co-investigator',
    funder: 'Department for Transport and City of York Council, UK',
    amount: '£50,000',
    description: 'A connected vehicles project with the Department for Transport.',
  },
  {
    title:
      'Providing data analysis insights into real to-the-second timing patterns of passenger rail services using Machine Learning techniques',
    period: '2017–2018',
    year: 2017,
    role: 'Co-investigator',
    funder: 'Rail Safety and Standards Board (RSSB) and the Rail Research UK Association (RRUKA)',
    amount: '£80,000',
    description:
      'Applying machine learning to the real to-the-second timing patterns of passenger rail services.',
  },
  {
    title: 'TimeSets: timeline visualisation for provenance-based big data sensemaking',
    period: '2016',
    year: 2016,
    role: 'Principal investigator',
    funder: 'Defence Science and Technology Laboratory (Dstl), Ministry of Defence (MOD), UK',
    amount: '£100,000',
    description:
      'A data visualisation project addressing data quality and lineage issues in sensemaking using provenance, built on the TimeSet technique.',
  },
  {
    title: 'Open-source Big Data Insight',
    period: '2015',
    year: 2015,
    role: 'Principal investigator',
    funder: 'Defence Science and Technology Laboratory (Dstl), Ministry of Defence (MOD), UK',
    amount: '£50,000',
    description:
      'Building the big data infrastructure and data lake for the visual analysis of open-source intelligence data.',
  },
  {
    highlight: true,
    title:
      'VALCRI – Visual AnaLytics for sense-making in CRiminal Intelligence analysis',
    period: '2014–2018',
    year: 2014,
    role: 'Co-investigator',
    funder: 'European Commission (EU FP7 integration project)',
    amount: '€13,000,000',
    description:
      'A very large project with around 20 partners and 100 personnel across many EU countries, developing the next generation of visual analytics for criminal intelligence analysis.',
  },
  {
    title: 'Patterns of Life Visualisation Experimentation, Pt. II',
    period: '2014–2015',
    year: 2014,
    role: 'Co-investigator',
    funder: 'Defence Science and Technology Laboratory (Dstl), Ministry of Defence (MOD), UK',
    amount: '£120,000',
    description:
      'Designing, implementing and evaluating a new visual analytics tool for Pattern-of-Life analysis, which tries to understand and predict movement patterns of individuals or small groups.',
  },
  {
    title: 'Pattern of Life Visualisation Experimentation',
    period: '2014',
    year: 2014,
    role: 'Co-investigator',
    funder: 'Defence Science and Technology Laboratory (Dstl), Ministry of Defence (MOD), UK',
    amount: '£89,000',
    description:
      'First phase of the Pattern-of-Life visualisation experimentation programme.',
  },
  {
    title: 'High-dimensional visualisation for big data',
    period: '2014–2015',
    year: 2014,
    role: 'Principal investigator',
    funder: 'CGI Group, UK',
    amount: '£20,000',
    description:
      'Investigating how interactive projection techniques can help users improve their understanding of data with very high dimensionality.',
  },
  {
    highlight: true,
    title: 'Multiple source information assimilation to support decision-making',
    period: '2013–2015',
    year: 2013,
    role: 'Co-investigator',
    funder: 'Defence Science and Technology Laboratory (Dstl), Ministry of Defence (MOD), UK',
    amount: '£195,000',
    description:
      'A two-year project applying visual analytics techniques to support sense making in intelligence analysis.',
  },
  {
    highlight: true,
    title: 'Data Intensive Visual Analytics (DIVA)',
    period: '2012–2013',
    year: 2012,
    role: 'Co-investigator',
    funder:
      'Engineering and Physical Sciences Research Council (EPSRC) and Defence Science and Technology Laboratory (Dstl), UK',
    amount: '£215,000',
    description:
      'A project jointly funded by EPSRC and Dstl, involving Middlesex University and three further partners.',
  },
  {
    highlight: true,
    title: 'UK Visual Analytics Consortium Joint Research Project',
    period: '2011–2013',
    year: 2011,
    role: 'Co-investigator',
    funder:
      'Ministry of Defence (UK) and Department of Homeland Security (US)',
    amount: '£870,000',
    description:
      'A consortium bringing together five leading UK universities including Bangor University, funded jointly by the UK and US defence and security agencies.',
  },
  {
    title: 'ARC Research Network in Enterprise Information Infrastructure',
    period: '2007–2008',
    year: 2007,
    funder: 'National ICT Australia (NICTA)',
    amount: 'A$100,000',
    description: 'NICTA representative on the ARC research network.',
  },
  {
    title: 'Network Analysis and Visualisation Taskforce',
    period: '2005–2006',
    year: 2005,
    funder: 'ARC Research Network in Enterprise Information Infrastructure',
    amount: 'A$33,000',
    description: 'Co-investigator on the taskforce.',
  },
];