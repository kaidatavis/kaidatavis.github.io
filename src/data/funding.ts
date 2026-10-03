/**
 * Grants and research funding, newest first.
 *
 * Ported from the funding archive on the previous WordPress site. `url` is only
 * set where a stable external project page exists — the old kaixu.me blog
 * permalinks will not survive the move to this site, so entries without a real
 * external target are rendered as plain text.
 */
export interface Grant {
  title: string;
  /** Human-readable funding period, e.g. "2021–2022". */
  period: string;
  /** Sort key: the year the grant started. */
  year: number;
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
    title: 'RAMP VIS – Visual Analytics for Covid-19',
    period: '2021–2022',
    year: 2021,
    funder: 'EPSRC',
    amount: '£430,000',
    description:
      'A collaborative effort with visualisation researchers across the UK, providing visual analytics support in the fight against Covid-19. It started as a volunteer response and grew into a funded network.',
  },
  {
    title:
      'God, the Oracle, and the Nightclub Bouncer: Can human dignity be modelled in an AI-based decision support system for post-Covid health certification',
    period: '2020–2021',
    year: 2020,
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
    funder: 'Defence Science and Technology Laboratory (Dstl), UK',
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
    funder: 'Microsoft Azure Research Award',
    amount: 'US$20,000',
    description:
      'Using Microsoft Azure to analyse over 1.5 billion tweets with an updated SAVI (Social Analytics VIsualisation) pipeline.',
  },
  {
    title:
      'VALCRI – Visual AnaLytics for sense-making in CRiminal Intelligence analysis',
    period: '2014–2018',
    year: 2014,
    funder: 'European Commission',
    amount: '€13 million',
    description:
      'A very large project with around 20 partners and 100 personnel across many EU countries, developing the next generation of visual analytics for criminal intelligence analysis.',
  },
  {
    title: 'TimeSets: timeline visualisation for provenance-based big data sensemaking',
    period: '2016',
    year: 2016,
    amount: '£100,000',
    description:
      'A data visualisation project addressing data quality and lineage issues in sensemaking using provenance, built on the TimeSet technique.',
  },
  {
    title: 'Patterns of Life Visualisation',
    period: 'Phase 1 (2014), Phase 2 (2014–2015)',
    year: 2014,
    amount: '£90,000 then £120,000',
    description:
      'Designing, implementing and evaluating a new visual analytics tool for Pattern-of-Life analysis, which tries to understand and predict movement patterns of individuals or small groups.',
  },
  {
    title: 'Open-source Big Data Insight',
    period: '2014–2015',
    year: 2014,
    amount: '£80,000',
    description:
      'Building the big data infrastructure and data lake for the visual analysis of open-source intelligence data.',
  },
  {
    title: 'High-dimensional visualisation for big data',
    period: '2014–2015',
    year: 2014,
    amount: '£20,000',
    description:
      'Investigating how interactive projection techniques can help users improve their understanding of data with very high dimensionality.',
  },
  {
    title: 'Multiple source information assimilation to support decision-making',
    period: '2013–2015',
    year: 2013,
    funder: 'Defence Human Capability Science & Technology Centre',
    amount: '£200,000',
    description:
      'A two-year project applying visual analytics techniques to support sense making in intelligence analysis.',
  },
  {
    title: 'Data Intensive Visual Analytics (DIVA)',
    period: '2012–2013',
    year: 2012,
    amount: '£220,000',
    description:
      'Co-investigator on a project jointly funded by EPSRC and Dstl, involving Middlesex University and three further partners.',
  },
  {
    title: 'UK Visual Analytics Consortium, phase 2',
    period: '2011–2012',
    year: 2011,
    funder: 'Ministry of Defence (UK) and Department of Homeland Security (US)',
    amount: '£720,000 (US$1.2M)',
    description:
      'Co-investigator on a consortium bringing together five leading UK universities including Bangor University, funded jointly by the UK and US defence and security agencies.',
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