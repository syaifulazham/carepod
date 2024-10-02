module.exports = {
    apps: [
      {
        name: 'carepod',
        script: 'npm',
        args: 'start', // This will run `next start`
        env: {
          NODE_ENV: 'production',
          PORT: 3001, // Specify your custom port here
        },
      },
    ],
  };
  