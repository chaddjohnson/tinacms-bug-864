module.exports = {
  siteMetadata: {
    title: 'TinaCMS Bug 864'
  },
  plugins: [
    'gatsby-plugin-eslint',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utilities/typography'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        sidebar: {
          hidden: process.env.NODE_ENV === 'production',
          position: 'overlay'
        },
        plugins: ['gatsby-tinacms-git', 'gatsby-tinacms-remark']
      }
    }
  ]
};
