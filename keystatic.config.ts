import { collection, config, fields } from "@keystatic/core";

export default config({
    storage: {
        kind: "local",
    },
    collections: {
        authors: collection({
            format: { data: "json" },
            label: "Authors",
            slugField: "name",
            path: "src/content/authors/*",
            schema: {
                name: fields.slug({
                    name: {
                        label: "Name",
                        validation: { isRequired: true },
                    },
                }),
                avatarUrl: fields.url({
                    label: "Avatar URL",
                    validation: { isRequired: true },
                }),
                bio: fields.text({
                    label: "Bio",
                    validation: { isRequired: true },
                }),
                socials: fields.array(
                    fields.object({
                        name: fields.text({
                            label: "Name",
                            validation: { isRequired: true },
                        }),
                        url: fields.url({
                            label: "URL",
                            validation: { isRequired: true },
                        }),
                    }),
                    {
                        label: "Socials",
                        itemLabel: (props) => props.fields.name.value,
                    },
                ),
            },
        }),
        tags: collection({
            label: "Tags",
            slugField: "name",
            path: "src/content/tags/*",
            format: { data: "json" },
            schema: {
                name: fields.slug({
                    name: {
                        label: "Name",
                        validation: { isRequired: true },
                    },
                }),
            },
        }),
        articles: collection({
            label: "Articles",
            slugField: "title",
            entryLayout: "content",
            path: "src/content/articles/*/",
            format: { contentField: "content" },
            schema: {
                title: fields.slug({
                    name: {
                        label: "Title",
                        validation: { isRequired: true },
                    },
                }),
                author: fields.relationship({
                    label: "Author",
                    collection: "authors",
                    validation: { isRequired: true },
                }),
                pubDate: fields.date({
                    label: "Published Date",
                    validation: { isRequired: true },
                }),
                status: fields.select({
                    label: "Status",
                    options: [
                        { label: "Draft", value: "draft" },
                        { label: "Published", value: "published" },
                    ],
                    defaultValue: "draft",
                }),
                coverImage: fields.image({
                    label: "Cover Image",
                    directory: "src/assets/articles/",
                    publicPath: "@assets/articles/",
                    validation: { isRequired: true },
                }),
                excerpt: fields.text({ label: "Excerpt", multiline: true }),
                tags: fields.array(
                    fields.relationship({
                        label: "Tags",
                        collection: "tags",
                    }),
                    { itemLabel: (field) => field.value!, label: "Tags" },
                ),
                content: fields.markdoc({
                    label: "Content",
                    options: {
                        image: {
                            directory: "src/assets/articles/",
                            publicPath: "@assets/articles/",
                        },
                    },
                }),
            },
        }),
    },
});
