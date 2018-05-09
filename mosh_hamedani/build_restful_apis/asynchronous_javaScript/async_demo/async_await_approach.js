console.log('Before');

// [ Promise approach ]
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('Commits:', commits))
//   .catch(err => console.log('Error:', err.message));

// [ Asycn & Await approach ] 語法糖果
// 1. use await when return Promise obj
// 2. 用一個 async function 包住 await statement
async function displayCommits() {
  try {
    // ＊＊ 讓撰寫 async code 就像是寫 sync code ㄧ樣 ＊＊
    const user = await getUser(1); // v8 會轉譯成類似 .then(user => getRepositories(user.gitHubUsername))
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    // holding promise err
    console.log('Error', err.message);
  }
}
displayCommits();

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
