import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const docs = await getCollection('docs');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: docs.map((doc) => ({
			...doc.data,
			link: `/docs/${doc.id}/`,
		})),
	});
}
