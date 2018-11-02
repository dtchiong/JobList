/* eslint-disable no-undef */

/*
function insertUserIfNew(userId) {
  res = userExists(userId);
}
*/

function userExists(userId) {
  console.log("userExists()");

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
      console.log("hi");
      console.log(res);
      console.log(res.length);
      if (res === []) {
        console.log("user doesn't exist");
        return false;
      }else {
        console.log("user exists");
        return true;
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
  console.log("PARSING JSON");
  return response.json();
}

const SaveEntryBackend = { userExists };
export default SaveEntryBackend;
