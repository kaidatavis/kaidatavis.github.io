import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Student project ideas.
 *
 * Each file in src/content/projects/ is one project. The `status` field
 * controls whether it appears under "Open" or "Closed" on /projects, and
 * `order` lets you pin items to the top regardless of date.
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(220).optional(),
    /** Machine-learning and engineering topics a student would work with. */
    stack: z.array(z.string()).default([]),
    /** `open` = recruiting students, `closed` = no longer recruiting. */
    status: z.enum(['open', 'closed']).default('open'),
    /** Sort key; lower numbers appear first. Defaults to the date. */
    order: z.number().optional(),
    /** ISO date the project was first offered. */
    date: z.coerce.date().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.url(),
        }),
      )
      .default([]),
    /** Marks the project as a PhD topic rather than a shorter placement. */
    phd: z.boolean().default(false),
  }),
});

export const collections = { projects };