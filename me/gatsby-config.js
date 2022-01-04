module.exports = {
  siteMetadata: {
    siteUrl: 'https://github.nnsnico.io/',
    title: 'nnsnico',
  },
  plugins: [
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
