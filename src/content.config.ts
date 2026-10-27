import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      category: z.enum(['professional', 'personal', 'learning']),
      org: z.string(),
      role: z.string().optional(),
      period: z.string(), // "Jul 2026 – Sep 2026"
      year: z.number(),
      stack: z.array(z.string()),
      highlights: z.array(z.string()),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z.array(z.object({ src: image(), caption: z.string() })).default([]),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      featured: z.boolean().default(false),
      // Lower numbers sort first.
      order: z.number().default(100),
      // Drafts are never published. Flip to false to show a project.
      draft: z.boolean().default(false),
      // Employer work: described generically, no screenshots.
      confidential: z.boolean().default(false),
    }),
});

export const collections = { projects };
