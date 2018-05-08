const getUser = (id, callback) => {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, gitHubUsername: 'Steven' });
  }, 2000);
};

const getRepositories = (username, callback) => {
  setTimeout(() => {
    console.log('Calling GitHub API...');
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
};

// 三種解法
// Callbacks
// Promises
// Async/await

console.log('Before');

getUser(1, user => {
  getRepositories(user.gitHubUsername, repos => {
    console.log(`Repos: ${repos}`);
  });
});

console.log('After');
