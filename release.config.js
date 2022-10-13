module.exports = {
  branches: [
    "master",
    {
      name: "next",
      prerelease: true,
    },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
  ]
};
