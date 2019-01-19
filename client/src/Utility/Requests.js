/* eslint-disable no-undef */

//TODO: Refactor status checking to 1 or 2 methods to be used for all functions

/* Checks if the user with userId exists in the DB, if not, then it's inserted */
async function insertUserIfNew(user) {
  const fetchedUser = await userExists(user.userId);
  if (fetchedUser == null) {
    console.log("user doesn't exist: inserting");
    insertUser(user.userId);
    return;
  }
  //console.log(fetchedUser[0].user_id);
  //console.log("user exists");
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
    .then(checkStatus2)
    .then(parseJSON)
    .then(res => {
      if (res.users.length > 0) {
        return res.users;
      } else if (res.users.length === 0) {
        return null;
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
    .then(checkStatus2)
    .then(parseJSON)
    .then(res => {
      if (res.count > 0) {
        return true;
      }
      return false;
    });
}

/* Calls a fetch post to update the user's information in the DB 
 * returns true on successful update, false otherwise 
 */
function updateUser(user) {
  let data = {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName
  };

  return fetch(`api/user/update`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then( (res)=> {
    try {
      checkStatus2(res);
      return true;
    }catch(err) {
      return false;
    }
  });
}

/* Calls a fetch post to insert a new entry into the user's list in the DB */
function insertEntry(user, entry) {
  let data = {
    userId: user.userId,
    entry: entry
  };

  return fetch(`api/user/entry/insert`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

/* Calls a fetch post to update an entry in the user's list in the DB */
function updateEntry(user, entry, oldEntry) {
  let data = {
    userId: user.userId,
    entry: entry,
    oldEntry: oldEntry
  };

  return fetch(`api/user/entry/update`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

/* Calls a fetch post to delete an entry in the user's list in the DB */
function deleteEntry(user, entry) {
  let data = {
    userId: user.userId,
    entry: entry,
  };

  return fetch(`api/user/entry/delete`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

/* Calls a fetch post to get all entries from a user's list in the DB */
function getAllEntries(user) {
  let data = { userId: user.userId };

  return fetch(`api/user/entry/getAll`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then( (res) => {
    try {
      checkStatus2(res);
      return parseJSON(res);
    }catch(err) {
      return null;
    }
  });
}

/*
function checkStatus(res) {
  let obj = { status: res.status, message: null };
  if (res.status >= 200 && res.status < 300) {
    obj.message = "Success";
  } else if (res.status === 400) {
    obj.message = "Bad request";
  } else if (res.status === 401) {
    obj.message = "Unauthorized user";
  } else {
    obj.message = "Unknown error";
  }
  return obj;
}
*/

function checkStatus2(response) {
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

const BackendRequests = { insertUserIfNew, userExists, updateUser, insertEntry, updateEntry, deleteEntry, getAllEntries };
export default BackendRequests;
