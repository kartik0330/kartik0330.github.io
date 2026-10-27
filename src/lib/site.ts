import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Prefix a site-relative path with the configured base (works on GitHub Pages project sites). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Published projects, sorted by `order`. Set SHOW_DRAFTS=1 to preview drafts locally. */
export async function getProjects(): Promise<Project[]> {
  const showDrafts = Boolean(import.meta.env.SHOW_DRAFTS);
  const projects = await getCollection('projects', ({ data }) => showDrafts || !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export const categoryLabel: Record<Project['data']['category'], string> = {
  professional: 'Professional',
  personal: 'Personal',
  learning: 'Learning',
};

export const resumePdf = 'Kartik_Mangal_Resume_2026.pdf';
