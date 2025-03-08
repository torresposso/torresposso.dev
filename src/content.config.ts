import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const articles = defineCollection({
	loader: glob({ base: "src/content/articles/", pattern: "**/*.mdoc" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			tags: z.array(reference("tags")),
			excerpt: z.string().optional(),
			pubDate: z.coerce.date(),
			status: z.enum(["draft", "published"]),
			coverImage: image(),
			author: reference("authors"),
		}),
});

const authors = defineCollection({
	loader: glob({ base: "src/content/authors", pattern: "**/*.json" }),
	schema: z.object({
		name: z.string(),
		avatarUrl: z.string().url(),
		bio: z.string(),
		socials: z.array(
			z.object({
				name: z.string(),
				url: z.string().url(),
			}),
		),
	}),
});
const tags = defineCollection({
	loader: glob({ base: "src/content/tags", pattern: "**/*.json" }),
	schema: z.object({
		name: z.string(),
	}),
});

export const collections = { articles, authors, tags };
