/**
 * Awards and honours, newest first.
 *
 * Ported from the Awards section of the 2026 CV. The VAST Challenge entries all
 * carry the same note because the CV repeats it for each.
 */
export interface Award {
  title: string;
  year: number;
  /** Awarding body, conference or institution. */
  venue: string;
  note?: string;
}

/** Shared note for the IEEE VAST Challenge entries. */
const vastNote =
  'Organised by the IEEE Computer Society and the Technical Community on Visualization and Graphics (VGTC), with dozens of international entries each year from leading data visualisation and machine learning companies and research groups.';

export const awards: Award[] = [
  {
    title: 'Best Paper Award',
    year: 2025,
    venue: 'Eurographics Conference on Visualization (EuroVis)',
    note: 'The largest European conference on data visualisation.',
  },
  {
    title: 'Honourable Mention (2nd place)',
    year: 2024,
    venue: 'IEEE Visual Analytics Science and Technology (VAST) Challenge',
    note: vastNote,
  },
  {
    title: 'Project of the Year Award',
    year: 2018,
    venue: 'Middlesex University, London',
    note: 'Only one research project is selected across the entire university for its outstanding contribution to the University and wider research community.',
  },
  {
    title: 'Honourable mention (2nd place)',
    year: 2014,
    venue: 'IEEE Visual Analytics Science and Technology (VAST) Challenge',
    note: vastNote,
  },
  {
    title: 'Subject Matter Expert’s Award',
    year: 2012,
    venue: 'IEEE Visual Analytics Science and Technology (VAST) Challenge',
    note: vastNote,
  },
  {
    title: 'Winner, History of the World Cup category',
    year: 2006,
    venue: 'International Graph Drawing Contest',
    note: 'Organised by the Graph Drawing conference, where the winner is selected by leaders in the field and industry experts on the basis of algorithmic performance and real-world impact.',
  },
];