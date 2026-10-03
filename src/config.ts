/**
 * Single source of truth for site-wide profile data.
 * Edit this file to update your details across every page.
 */

export const profile = {
  name: 'Kai Xu',
  nameLocal: '徐凯',
  title: 'Associate Professor',
  role: 'Co-director, Visualization, Text Analytics, and Graphics Group (VisTAG)',
  vistag: {
    name: 'The Visualization, Text Analytics, and Graphics Group',
    url: 'https://www.nottingham.ac.uk/computerscience/research/visualization-and-computer-graphics/visualization-and-computer-graphics.aspx',
  },
  institution: 'University of Nottingham',
  institutionUrl: 'https://www.nottingham.ac.uk/',
  // Shown under your name in the site header. Separate from `institution`, which
  // stays the university for the meta description, the intro and schema.org.
  headerSubtitle: 'Human-AI Collaboration',
  school: 'School of Computer Science',
  schoolUrl: 'https://www.nottingham.ac.uk/computerscience/',
  profileUrl: 'https://www.nottingham.ac.uk/computerscience/people/kai.xu',
  location: 'Nottingham, UK',
  email: 'kai.xu@nottingham.ac.uk',
  tagline: 'Human-AI collaboration',
  photo: {
    src: '/images/kai.jpg',
    alt: 'Kai Xu',
  },
} as const;

export const socials = [
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=sTfJNSIAAAAJ&hl=en', icon: 'scholar' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kaidatavis/', icon: 'linkedin' },
] as const;

export const nav = [
  { href: '/highlights', label: 'Highlights' },
  { href: '/funding', label: 'Funding' },
  { href: '/papers', label: 'Papers' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/bio', label: 'Bio' },
] as const;