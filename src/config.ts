/**
 * Single source of truth for site-wide profile data.
 * Edit this file to update your details across every page.
 */

export const profile = {
  name: 'Kai Xu',
  nameLocal: '徐凯',
  title: 'Associate Professor in Computer Science',
  role: 'Co-director, Visualisation Research Group (VisTAG)',
  institution: 'University of Nottingham',
  institutionUrl: 'https://www.nottingham.ac.uk/',
  school: 'School of Computer Science',
  schoolUrl: 'https://www.nottingham.ac.uk/computerscience/',
  location: 'Nottingham, UK',
  email: 'kai.xu@nottingham.ac.uk',
  tagline: 'Human-AI collaboration for machine learning and data visualisation.',
  photo: {
    src: '/images/kai.jpg',
    alt: 'Kai Xu',
  },
} as const;

export const socials = [
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=sTfJNSIAAAAJ&hl=en', icon: 'scholar' },
  { label: 'GitHub', href: 'https://github.com/kaidatavis/', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kaidatavis/', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCWIz8NDGqybv1ywKqTSHUnQ', icon: 'youtube' },
  { label: 'Bluesky', href: 'https://bsky.app/profile/kaidatavis.bsky.social', icon: 'bluesky' },
  { label: 'University Profile', href: 'https://www.nottingham.ac.uk/computerscience/people/kai.xu', icon: 'university' },
] as const;

export const nav = [
  { href: '/funding', label: 'Funding' },
  { href: '/papers', label: 'Papers' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/bio', label: 'Bio' },
] as const;