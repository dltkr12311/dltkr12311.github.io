module.exports = {
  siteMetadata: {
    title: `프론트엔드 개발자의 이것저것`,
    description: `변화하는 즐거음을 느끼자`,
    author: `Sak Lee`,
    siteUrl: 'https://dltkr12311.github.io/',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
          {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
              siteUrl: 'https://dltkr12311.github.io/',
              stripQueryString: true,
            },
          },
          {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
              policy: [{ userAgent: '*', allow: '/' }],
            },
          },
        ],
      },
    },
  ],
};
