const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

async function pushToGithub(options) {
  const {
    repoUrl,
    token,
    authorName = 'Ravetto Atelier',
    authorEmail = 'atelier@ravetto.com',
    branch = 'main',
  } = options;

  const dir = __dirname;

  console.log('1. Initializing Git repository...');
  await git.init({ fs, dir, defaultBranch: branch });

  console.log('2. Staging files (respecting .gitignore)...');
  // Read all files recursively ignoring node_modules, .git, dist, etc.
  const ignoredPatterns = ['node_modules', '.git', 'dist', 'dev.db', '.env', '.DS_Store'];

  async function addFilesRecursively(currentDir, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (ignoredPatterns.includes(entry.name)) continue;

      const fullPath = path.join(currentDir, entry.name);
      const rel = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        await addFilesRecursively(fullPath, rel);
      } else {
        await git.add({ fs, dir, filepath: rel });
      }
    }
  }

  await addFilesRecursively(dir);

  console.log('3. Creating commit...');
  const sha = await git.commit({
    fs,
    dir,
    author: { name: authorName, email: authorEmail },
    message: 'Initial commit: RAVETTO — Premium DTC Fashion E-Commerce Platform',
  });
  console.log('Committed SHA:', sha);

  console.log('4. Setting remote origin...');
  try {
    await git.removeRemote({ fs, dir, remote: 'origin' });
  } catch {}
  await git.addRemote({ fs, dir, remote: 'origin', url: repoUrl });

  console.log(`5. Pushing to GitHub (${branch})...`);
  const pushResult = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: branch,
    force: true,
    onAuth: () => ({ username: token, password: '' }),
  });

  console.log('✔ Push successfully completed to', repoUrl);
  return pushResult;
}

module.exports = { pushToGithub };

if (require.main === module) {
  const repoUrl = process.env.GITHUB_REPO_URL || process.argv[2];
  const token = process.env.GITHUB_TOKEN || process.argv[3];

  if (!repoUrl || !token) {
    console.error('Usage: node push-to-github.cjs <GITHUB_REPO_URL> <GITHUB_TOKEN>');
    console.error('Or set GITHUB_REPO_URL and GITHUB_TOKEN environment variables.');
    process.exit(1);
  }

  pushToGithub({ repoUrl, token })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Push failed:', err);
      process.exit(1);
    });
}
