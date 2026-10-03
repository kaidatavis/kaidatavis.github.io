/**
 * Professional service: networks, editorial work, workshops organised, programme
 * committees and reviewing.
 *
 * Ported from the services archive on the previous WordPress site. Reviewing
 * duties that repeat across many years are aggregated into a single entry with
 * a `years` range rather than listed once per year.
 */
export interface ServiceItem {
  /** The role held, e.g. "Co-chair". Omitted when the entry is just a venue. */
  role?: string;
  venue: string;
  /** A year, or a range like "2010–2015". */
  years?: string;
  note?: string;
  url?: string;
}

export interface ServiceGroup {
  title: string;
  blurb: string;
  items: ServiceItem[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    title: 'Networks and professional leadership',
    blurb: 'Ongoing roles with learned societies, research networks and funding bodies.',
    items: [
      {
        role: 'Director',
        venue: 'UK Chapter of the EuroGraphics Association (EGUK)',
        years: '2020–present',
        note: 'The leading UK professional organisation for computer graphics, including games, AR/VR and data visualisation.',
      },
      {
        role: 'Founding member',
        venue:
          'VizTIG, the visualisation interest group at the Alan Turing Institute',
        years: '2023',
        url: 'https://www.turing.ac.uk/research/interest-groups/visualization',
      },
      {
        role: 'Expert Fellow',
        venue: 'EPSRC SPRITE+ network',
        years: '2021',
        note: 'A research network funded by EPSRC covering security, privacy, identity and trust.',
      },
      {
        role: 'Member',
        venue: 'EPSRC Peer Review College',
        years: '2017–present',
        note: 'EPSRC is the main UK funding body for engineering, mathematics and physics, including computer science.',
      },
    ],
  },
  {
    title: 'Workshops and seminars',
    blurb: 'Conferences and events I have organised or co-chaired.',
    items: [
      {
        role: 'Organiser',
        venue:
          '1st IEEE Workshop on Visualization and Provenance Across Domains',
        years: '2023',
        note: 'Held at IEEE VIS in Melbourne, with the ambition of becoming an annual series targeting a different research community each year.',
        url: 'https://visxprov.github.io/',
      },
      {
        role: 'Organiser',
        venue:
          'Dagstuhl Seminar 23372: Human-Centered Approaches for Provenance in Automated Data Science',
        years: '2023',
        url: 'https://www.dagstuhl.de/23372',
      },
      {
        role: 'Organiser',
        venue: 'Dagstuhl Seminar 18462: Provenance and Logging for Sense Making',
        years: '2018',
      },
      {
        role: 'Co-chair',
        venue: 'Workshop on Provenance and Visualization (ProvViz)',
        years: '2021',
        note: 'Part of Provenance Week, the leading international venue on provenance theory, application and practice.',
      },
      {
        role: 'Co-chair',
        venue:
          'Machine Learning from User Interactions for Visualization and Analytics (MLUI)',
        years: '2020',
        note: 'Part of VisWeek 2020.',
      },
      {
        role: 'Programme co-chair',
        venue: 'Computer Graphics and Visual Computing (CGVC)',
        years: '2020, 2021',
        note: 'The annual conference of the Eurographics UK chapter, covering visualisation, graphics, games and AR/VR.',
      },
      {
        role: 'Co-chair',
        venue:
          'Visualizations and User Interfaces for Knowledge Engineering and Linked Data Analytics (VISUAL)',
        years: '2014',
        note: 'Part of the 19th International Conference on Knowledge Engineering and Knowledge Management.',
      },
      {
        role: 'Co-chair',
        venue: 'Provenance and Sensemaking workshop, IEEE VIS',
        years: '2014',
        note: 'Held during conference week in Paris.',
      },
      {
        role: 'Co-chair',
        venue: 'Visual Analytics Workshop',
        years: '2011',
      },
      {
        role: 'Co-chair',
        venue:
          'First International Workshop on Graph Techniques for Biomedical Networks (GTBN)',
        years: '2009',
        note: 'In conjunction with IEEE BIBM 2009 in Washington, D.C.',
      },
      {
        role: 'Workshop co-chair',
        venue:
          'Sustain the Engagement — Information Technology Design Meets Information Science Research',
        years: '2009',
        note: 'Co-sponsored by the CSIRO ICT Centre and the ARC Research Network in Enterprise Information Infrastructure.',
      },
    ],
  },
  {
    title: 'Editorial',
    items: [
      {
        role: 'Guest editor',
        venue:
          'IEEE Computer Graphics and Applications, special issue on “Provenance analysis for sensemaking”',
        years: '2019',
        note: 'Covered research that analyses provenance to better understand how users make sense of data through information triage, foraging, reasoning, and hypothesis forming and testing.',
      },
    ],
    blurb: 'Special issues and guest editorial work.',
  },
  {
    title: 'Programme committees',
    blurb: 'Conferences where I have served on the programme or organising committee.',
    items: [
      { role: 'Programme committee member', venue: 'IVAPP', years: '2014' },
      {
        role: 'Programme committee member',
        venue:
          'International Workshop on Internet-based Virtual Computing Environment (iVCE)',
        years: '2014',
      },
      { role: 'Programme committee member', venue: 'IV', years: '2012' },
      { role: 'Programme committee member', venue: 'SIGRAD', years: '2012' },
      { role: 'Programme committee member', venue: 'VAST', years: '2012' },
      {
        role: 'Programme committee member',
        venue: 'Fifth International Workshop on Data Quality in Integration Systems (DQIS)',
        years: '2012',
        note: 'In conjunction with DASFAA 2012.',
      },
      {
        role: 'Programme committee member',
        venue: 'Fourth International Workshop on Data Quality in Integration Systems (DQIS)',
        years: '2011',
      },
      { role: 'Programme committee member', venue: 'ICDKE', years: '2010' },
      { role: 'Programme committee member', venue: 'APweb', years: '2005, 2006' },
      {
        role: 'Programme committee member',
        venue: 'CoMoGIS (Conceptual Modeling for Geographic Information Systems)',
        years: '2004',
        note: 'In conjunction with the International Conference on Conceptual Modeling (ER) 2004.',
      },
      {
        role: 'Organising committee member',
        venue: 'AWOCA (Australasian Workshop on Combinatorial Algorithms)',
        years: '2004',
      },
      {
        role: 'Organising committee member',
        venue: 'APVIS (Asia Pacific Symposium on Information Visualization)',
        years: '2005, 2007',
        note: 'The conference later became the IEEE Pacific Visualization Symposium.',
      },
      {
        role: 'Organising committee member',
        venue: 'Publicity and publication chair, WDPP (Workshop on Data and Process Provenance)',
        years: '2009',
        note: 'In conjunction with DASFAA 2009.',
      },
      {
        role: 'Co-organiser',
        venue: 'EII-NICTA Workshop on Large-scale Network Analysis',
        years: '2005',
        note: 'Sponsored by National ICT Australia and the ARC Research Network in Enterprise Information Infrastructure.',
      },
    ],
  },
  {
    title: 'Journal reviewing',
    blurb: 'Journals reviewed for as a reviewer.',
    items: [
      { venue: 'IEEE Transactions on Visualization and Computer Graphics', years: '2012' },
      { venue: 'IBM Journal of Research and Development', years: '2012' },
      { venue: 'Journal of Systems and Software', years: '2008' },
      { venue: 'IEEE Transactions on Knowledge and Data Engineering', years: '2011' },
      { venue: 'ACM Transactions on Information Systems', years: '2007' },
      { venue: 'Information Processing Letters', years: '2009' },
      { venue: 'Proteomics', years: '2010, 2011' },
    ],
  },
  {
    title: 'Conference reviewing',
    blurb: 'Conference programme committees reviewed for.',
    items: [
      { venue: 'IEEE Pacific Visualization Symposium (PacificVis)', years: '2007, 2008, 2011, 2012, 2013' },
      { venue: 'IEEE VIS / EuroVis', years: '2011, 2012' },
      { venue: 'VAST', years: '2010, 2012' },
      { venue: 'Information Visualization Conference (InfoVis / IV)', years: '2008, 2010, 2012' },
      { venue: 'IFIP TC13 International Conference on Human-Computer Interaction (INTERACT)', years: '2009' },
      { venue: 'ACM Conference on Computer Supported Cooperative Work (CSCW)', years: '2013' },
      { venue: 'International World Wide Web Conference (WWW)', years: '2009' },
      { venue: 'International Conference on Data Engineering (ICDE)', years: '2006' },
      { venue: 'International Conference on Extending Database Technology (EDBT)', years: '2008' },
      { venue: 'International Conference on Bioinformatics (InCoB)', years: '2009' },
      { venue: 'Master of Philosophy, University of Sydney', years: '2010' },
      { venue: 'Engineering and Physical Sciences Research Council (EPSRC) funding proposals', years: '2011' },
    ],
  },
];