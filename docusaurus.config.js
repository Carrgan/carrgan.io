// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lightCodeTheme = require("prism-react-renderer/themes/github");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const darkCodeTheme = require("prism-react-renderer/themes/nightOwl");

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "Carrgan universe",
  tagline: "Congratulations, you're in my universe",
  url: "https://carrgan.github.io",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "carrgan", // Usually your GitHub org/user name.
  projectName: "carrgan.github.io", // Usually your repo name.
  deploymentBranch: "main",

  i18n: {
    defaultLocale: "zh-Hans",
    // locales: ["en", "zh-cn"]
    locales: ["zh-Hans"]
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: "https://github.com/facebook/docusaurus/edit/main/website/blog/"
          readingTime: ({ content, frontMatter, defaultReadingTime }) => {
            return frontMatter["reading_time"]
              ? frontMatter["reading_time"]
              : defaultReadingTime({ content, options: { wordsPerMinute: 500 } });
          }
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      })
    ]
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity: "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous"
    }
  ],

  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: "Carrgan Universe",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg"
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Doc',
          // },
          {
            to: "notes/",
            label: "Notes"
          },
          {
            to: "/tech-blog",
            label: "Tech Blog"
          },
          {
            to: "/life",
            label: "Life"
          },
          {
            to: "/blog",
            label: "Blog"
          },
          {
            type: "dropdown",
            label: "Tools",
            items: [
              {
                to: "/tools/password-generator",
                label: "Random password"
              },
              {
                to: "/tools/text-file-split",
                label: "Text file split"
              }
            ]
          },
          {
            type: "localeDropdown",
            position: "right"
          },
          {
            href: "https://github.com/Carrgan",
            label: "GitHub",
            position: "right"
          },
          {
            label: "v3.0.0(2024.8)",
            position: "right",
            to: "/"
          }
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Notes",
            items: [
              {
                label: "Notes",
                to: "/Notes/"
              },
              {
                label: "SSL/TSL",
                to: "/notes/Network/SSL-TSL"
              }
            ]
          },
          {
            title: "Community",
            items: [
              {
                label: "Weibo",
                href: "https://weibo.com/u/3602696930?nick=Carrgan"
              },
              {
                label: "NetEase Music",
                href: "https://music.163.com/#/artist?id=12236222"
              },
              {
                label: "Bilibili",
                href: "https://space.bilibili.com/72913460"
              }
            ]
          },
          {
            title: "Useful site",
            items: [
              {
                label: "Tech roadmap",
                href: "https://roadmap.sh"
              }
            ]
          },
          {
            title: "More",
            items: [
              {
                label: "Tech Blog",
                to: "/blog"
              },
              {
                label: "Life",
                to: "/life"
              },
              {
                label: "GitHub",
                href: "https://github.com/Carrgan"
              },
              {
                label: "CSDN",
                href: "https://blog.csdn.net/Carrgan"
              },
              {
                label: "Docusaurus",
                href: "https://docusaurus.io/"
              },
              {
                label: "React-Spring",
                href: "https://react-spring.dev/"
              }
            ]
          }
        ],
        logo: {
          alt: "Carrgan Universe Logo",
          src: "img/logo-with-text.svg",
          width: 160,
          height: 51
        },
        copyright: `Copyright © ${new Date().getFullYear()} Carrgan. All Rights Reserved`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp", "java"]
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: true,
        respectPrefersColorScheme: false
      }
    }),
  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "notes",
        path: "notes",
        routeBasePath: "notes",
        sidebarPath: require.resolve("./sidebars.js"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        sidebarItemsGenerator: async function ({ defaultSidebarItemsGenerator, ...args }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);

          sidebarItems.forEach(item => {
            item.label = capitalizeFirstLetter(item.label);
            // if (item.type === "category") {
            //   item.label = capitalizeFirstLetter(item.label);
            // }
          });

          return sidebarItems;
        }
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "life",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "life",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "./life"
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "tech-blog",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "tech-blog",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "./tech-blog"
      }
    ]
  ]
};

module.exports = config;
