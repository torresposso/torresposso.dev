// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://torresposso.dev',
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'server',
  server: {
    host: '0.0.0.0',
  },

  adapter: netlify(),
});