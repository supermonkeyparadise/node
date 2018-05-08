console.log('Before');
// getUser(1, user => {
//   getRepositories(user.gitHubUsername, repos => {
//     getCommits(repos[0], commits => {
//       console.log(commits);
//     });
//   });
// });

getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits:', commits))
  .catch(err => console.log('Error:', err.message));

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
  });
}

function getRepositories(username) {
  // kick off some async work
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  // kick off some async work
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
  });
}
