// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Carrgan',
  tagline: 'Congratulations, you\'re in my universe',
  url: 'https://carrgan.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'carrgan', // Usually your GitHub org/user name.
  projectName: 'carrgan.github.io', // Usually your repo name.

  i18n: {
    defaultLocale: 'zh-cn',
    // locales: ['en', 'zh-cn'],
    locales: ['zh-cn'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ( {
      navbar: {
        title: 'Carrgan Universe',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Doc',
          },
          {
            to: 'notes/',
            label: "Notes"
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Carrgan',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Technical',
            items: [
              {
                label: 'Technical',
                to: '/technical/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Weibo',
                href: 'https://weibo.com/u/3602696930?nick=Carrgan',
              },
              {
                label: 'NetEase Music',
                href: 'https://music.163.com/#/artist?id=12236222',
              },
              {
                label: 'BiLiBiLi',
                href: 'https://space.bilibili.com/72913460',
              },
            ],
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/Carrgan',
              },
              {
                label: 'CSDN',
                href: 'https://blog.csdn.net/Carrgan',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Carrgan Universe, Inc. Built with Docusaurus react-three/fiber.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
        switchConfig: {
          darkIcon: '🌙',
          lightIcon: '\u2600',
          // React 内联样式对象
          // 参见 https://zh-hans.reactjs.org/docs/dom-elements.html#style
          darkIconStyle: {
            marginLeft: '2px',
          },
          lightIconStyle: {
            marginLeft: '1px',
          },
        },
      },
    }),

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'notes',
        path: 'notes',
        routeBasePath: 'notes',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ]
  ],
};

module.exports = config;
