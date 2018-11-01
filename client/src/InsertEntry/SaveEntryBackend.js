/* eslint-disable no-undef */
/*
function search(query, cb) {
  console.log(query);

  return fetch(`api/food?q=${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
*/
function print(string) {
  alert(string);
}

function checkIfUserExists(userId) {
  console.log("checkIfUserExists()");

  let obj = {data1: 1, data2: 2};

  console.log(obj);

  return fetch(`api/user/exists`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(checkStatus)
    .then(parseJSON)
    .then(res => console.log(res));
}

function insertNewUser(userId) {
  console.log("insert users");

  return fetch(`api/user/new`, {
    method: "POST",
    body: { userId }
  }).then(res => console.log(res));
}

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

const SaveEntryBackend = { checkIfUserExists };
export default SaveEntryBackend;
