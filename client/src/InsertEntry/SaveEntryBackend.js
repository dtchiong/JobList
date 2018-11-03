/* eslint-disable no-undef */

/* Checks if the user with userId exists in the DB, if not, then it's inserted */
async function insertUserIfNew(userId) {
  const exists = await userExists(userId);
  console.log("user exists: " + exists);
  if (!exists) {
    insertUser(userId);
  }
}

/* Calls a fetch request to check if the user with userId exists in the DB 
 * Returns true if user exists, else false
 */
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
      } else if (res.users.length === 0) {
        return false;
      }
    });
}

/* Calls a fetch post request to insert a user with userId into the DB
 * Returns true if successful
 */
function insertUser(userId) {
  let data = { userId: userId };

  return fetch(`api/user/insert`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      if (res.count > 0) {
        return true;
      }
      return false;
    });
}

function updateUser(user) {

  let data = {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName
  };

  console.log(data);

  return fetch(`api/user/update`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res=> {
      if (res.status >= 200 && res.status < 300) {
        return ({status: res.status, message: "Success"});
      }else if (res.status === 400) {
        return ({status: res.status, message: "First and last name must be less than 50 characters"});
      }else if (res.status === 401) {
        return ({status: res.status, message: "User unauthorized" });
      }else {
        return ({status: res.status, message: "Unknown error"});
      }
    });
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

const SaveEntryBackend = { insertUserIfNew, updateUser };
export default SaveEntryBackend;
