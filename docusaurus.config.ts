// docusaurus.config.ts

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI: Humanoid Robotics',
  tagline: 'Deep Reinforcement Learning, Vision-Language-Action, and Isaac Sim',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // THEME CONFIGURATION BLOCK
  themeConfig: { 
    // Color Mode settings: Setting default to 'dark' for AI theme
    colorMode: {
      defaultMode: 'dark', // <-- UI design ke liye dark set kiya gaya
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    
    // Navbar settings (Syntax Fixed)
    navbar: {
      title: 'Physical AI Book', 
      logo: {
        alt: 'Animated Humanoid AI Logo',
        // Animated GIF logo path (static/img/ folder se)
        src: 'img/digitalization.gif', 
        srcDark: 'img/digitalization.gif',
      },
      items: [ // <-- Yeh items array ab sahi jagah par hai
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Book Chapters', // Label change kiya
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ], // <-- Navbar items yahan khatam
    }, // <-- Navbar object yahan sahi tareeqe se khatam

    // Footer settings
    footer: {
      style: 'dark', // Custom CSS se styling lega (dark background/neon links)
      links: [
        {
          title: 'Modules & Chapters',
          items: [
            {
              label: 'DRL & Isaac Sim',
              to: '/docs/module-3-nvidia-isaac/3.3-drl-basics', // DRL basics
            },
            {
              label: 'VLA Capstone',
              to: '/docs/module-4-vla-capstone/4.4-vla-pipeline', // VLA planning
            },
            {
              label: 'All Chapters',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community & Connect',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/YourGitHubUsername/YourRepoName', // <-- *Please Update This Link*
            },
            {
              label: 'Hackathon Project Page',
              href: 'https://your-hackathon-link.com', // <-- *Please Update This Link*
            },
            {
              label: 'Project Contact (Email)',
              href: 'mailto:your.email@example.com', // <-- *Please Update This Link*
            },
          ],
        },
        {
          title: 'About The Tech',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
            {
              label: 'NVIDIA Isaac Sim',
              href: 'https://developer.nvidia.com/isaac-sim',
            },
            {
              label: 'ROS 2 Documentation',
              href: 'https://docs.ros.org/en/humble/',
            },
          ],
        },
      ],
      copyright: `
        <span style="color: var(--ifm-font-color-secondary);">
          Built for the Hackathon 🚀 |created by ahmed | 
          Physical AI Book &copy; ${new Date().getFullYear()}
        </span>
      `,
    },
    
    // Prism settings
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig, // <-- ThemeConfig yahan sahi tareeqe se khatam
};

export default config;