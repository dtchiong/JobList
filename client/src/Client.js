/* eslint-disable no-undef */
function search(query, cb) {
  console.log(query);

  return fetch(`api/food?q=${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  console.log("checkStatus response: "+JSON.stringify(response));
  
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

/*
function insertUser(user) {
  console.log("insert users");

  return fetch(`api/user/new`, {
    method: 'POST',
    body: {user}
  })
    .then(res => console.log(res));
}
*/
function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
