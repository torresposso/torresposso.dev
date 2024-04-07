import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "jsr:@deno/gfm@0.6";
import { defineRoute } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { BackgroundGradient } from "@/islands/ui/background-gradient.tsx";

export default defineRoute(async (_req, ctx) => {
  const post = await getPost(ctx.params.slug);

  return post
    ? (
      <>
        <Head>
          <title>{post!.title}</title>
          <style dangerouslySetInnerHTML={{ __html: CSS }} />
        </Head>
        <div className="max-w-screen-md mx-auto rounded-xl">
          <BackgroundGradient className="rounded-2xl">
            <div className="mx-auto text-gray-800 rounded-2xl bg-gray-950">
              <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded-2xl">
                <img
                  src="https://source.unsplash.com/random/480x360"
                  alt=""
                  className="w-full h-60 sm:h-96 dark:bg-gray-500"
                />
                <div>
                  <div className="z-10">
                    <div className="-mt-16 flex items-center justify-center">
                      <div className="w-full max-w-xs lg:max-w-xl bg-white p-4 border rounded-lg">
                        <h1 class="text-5xl font-bold">{post!.title}</h1>
                        <time class="text-gray-500">
                          {new Date(post!.publishedAt).toLocaleDateString(
                            "en-us",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                  <main
                    data-color-mode="dark"
                    data-dark-theme="dark"
                    class="mt-5 px-2 markdown-body "
                  >
                    <div
                      class="bg-gray-950"
                      dangerouslySetInnerHTML={{
                        __html: render(post!.content),
                      }}
                    />
                  </main>
                </div>
              </div>
            </div>
            {
              /* <main
              data-color-mode="dark"
              data-dark-theme="dark"
              class="p-4 markdown-body rounded-xl "
            >
              <h1 class="text-5xl font-bold">{post!.title}</h1>
              <time class="text-gray-500">
                {new Date(post!.publishedAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div
                class="mt-8  "
                dangerouslySetInnerHTML={{ __html: render(post!.content) }}
              />
            </main> */
            }
          </BackgroundGradient>
        </div>
      </>
    )
    : ctx.renderNotFound();
});
