/* eslint-disable no-undef */

/*
function insertUserIfNew(userId) {
  res = checkIfUserExists(userId);
}
*/

function checkIfUserExists(userId) {
  console.log("checkIfUserExists()");

  let data = {userId: userId};

  return fetch(`api/user/exists`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(res => console.log(res));
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
  console.log("PARSING JSON");
  return response.json();
}

const SaveEntryBackend = { checkIfUserExists };
export default SaveEntryBackend;
