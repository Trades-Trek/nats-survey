/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/core',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid'
  ],
  experimental: {
    esmExternals: false
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  env: {
    baseApiUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000' // development api
    : 'https://nat-survey.onrender.com',
  },
  publicRuntimeConfig: {
    apiUrl:
    process.env.NODE_ENV === 'development'
    ? 'http://localhost:7000' // development api
    : 'https://nat-survey.onrender.com', // production api
  },
}
