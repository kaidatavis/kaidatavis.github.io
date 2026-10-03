import rss from '@astrojs/rss';
import { doiUrl, getPublicationCategories, getPublications, pubAnchor } from '../lib/publications';
import { profile } from '../config';

export async function GET(context: { site: URL }) {
  const pubs = getPublications();

  return rss({
    title: `${profile.name} – Publications`,
    description: `Publications on data visualisation, visual analytics and human-AI collaboration, including ${getPublicationCategories().join(', ').toLowerCase()}.`,
    site: context.site,
    customData: '<language>en-gb</language>',
    items: pubs.map((pub) => {
      const authors = pub.authors.map((a) => (a.given ? `${a.given} ${a.family}` : a.family));
      const external = pub.doi ? doiUrl(pub.doi) : pub.url;

      // BibTeX dates are year/month precision, so day is always the 1st.
      const month = pub.month >= 1 && pub.month <= 12 ? pub.month - 1 : 0;

      return {
        title: pub.title,
        description: [authors.join(', '), pub.venue, String(pub.year), external]
          .filter(Boolean)
          .join(' · '),
        pubDate: pub.year ? new Date(Date.UTC(pub.year, month, 1)) : undefined,
        link: `/papers/#${pubAnchor(pub)}`,
        categories: [pub.category, ...pub.keywords],
      };
    }),
  });
}