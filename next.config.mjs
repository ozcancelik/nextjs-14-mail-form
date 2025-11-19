/** @type {import('next').NextConfig} */
const nextConfig = {
    // This is for the require.extensions warning in handlebars
    turbopack: {
        resolveAlias: {
            'handlebars': 'handlebars/dist/handlebars.js',
        },
    },
};

export default nextConfig;