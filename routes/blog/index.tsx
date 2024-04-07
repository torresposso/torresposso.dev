import { Handlers } from "$fresh/server.ts";
import { extract } from "$std/front_matter/yaml.ts";
import { join } from "$std/path/mod.ts";
import { PageProps } from "$fresh/server.ts";

interface Post {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
}

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

async function getPost(slug: string): Promise<Post> {
  const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
  const { attrs, body } = extract<Post>(text);
  return {
    slug,
    title: attrs.title,
    publishedAt: new Date(attrs.publishedAt),
    content: body,
    snippet: attrs.snippet,
  };
}

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="max-w-screen-lg mx-auto pb-20">
      <div className="space-y-12 bg-gray-900  pt-4 px-8 rounded-xl">
        <h1 class="text-4xl font-bold">
          Blog
        </h1>
        <section class="border rounded-2xl overflow-hidden">
          <a
            rel="noopener noreferrer"
            href="#"
            className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50"
          >
            <img
              src="https://source.unsplash.com/random/480x360"
              alt="Website Design System"
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500"
            />
            <div className="p-6 space-y-2 lg:col-span-5">
              <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                Noster tincidunt reprimique ad pro
              </h3>
              <span className="text-xs dark:text-gray-600">
                February 19, 2021
              </span>
              <p>
                Ei delenit sensibus liberavisse pri. Quod suscipit no nam. Est
                in graece fuisset, eos affert putent doctus id.
              </p>
            </div>
          </a>
        </section>
        <section>
          <div className="pb-8">
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <PostCard post={post} />)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PostCard(props: { post: Post }) {
  return (
    <div class="bg-gray-950 text-white  rounded-xl overflow-hidden">
      <a
        rel="noopener noreferrer"
        href="#"
        className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
      >
        <img
          role="presentation"
          className="object-cover w-full rounded h-44 dark:bg-gray-500"
          src="https://source.unsplash.com/random/480x360?1"
        />
        <div className="p-6 space-y-2">
          <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
            In usu laoreet repudiare legendos
          </h3>
          <span className="text-xs dark:text-gray-600">
            January 21, 2021
          </span>
          <p>
            Mei ex aliquid eleifend forensibus, quo ad dicta apeirian
            neglegentur, ex has tantas percipit perfecto. At per tempor albucius
            perfecto, ei probatus consulatu patrioque mea, ei vocent delicata
            indoctum pri.
          </p>
        </div>
      </a>
    </div>
  );
}
