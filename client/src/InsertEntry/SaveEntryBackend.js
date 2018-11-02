/* eslint-disable no-undef */

async function insertUserIfNew(userId) {
  const res = await userExists(userId);
  console.log(res);
}

function userExists(userId) {
  let data = { userId: userId };

  return fetch(`api/user/exists`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      if (res.users.length > 0) {
        return true;
      }else if (res.users.length === 0) {
        return false;
      }
    });
}

/*
function insertUser(userId) {
  console.log("insertUser()");

  let data = {userId: userId};

  return fetch(`api/user/insert`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(res => console.log(res));
}
*/

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const SaveEntryBackend = { insertUserIfNew };
export default SaveEntryBackend;
