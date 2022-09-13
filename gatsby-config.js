module.exports = {
  siteMetadata: {
    siteUrl: 'https://github.nnsnico.io/',
    title: 'nnsnico',
    description: "nnsnico's website" ,
    image: './src/images/favicon.png',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `nnsnico.github.io`,
        short_name: `nnsnico`,
        display: `standalone`,
        start_url: `/`,
        background_color: `#E2E8F0`,
        icon: `src/images/favicon.png`,
        icons: [
          {
            src: `src/images/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/reducer/index.ts',
      },
    },
    '@chakra-ui/gatsby-plugin',
  ],
};
