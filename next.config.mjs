/** @type {import('next').NextConfig} */
const nextConfig = {
    // This is for the require.extensions warning in handlebars 
    turbopack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'handlebars': 'handlebars/dist/handlebars.js',
        };

        return config;
    },
};

export default nextConfig;