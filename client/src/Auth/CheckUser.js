function checkIfUserExists(userId) {
  console.log("checkIfUserExists()");

  return fetch(`api/user/exists`, {
    method: "POST",
    body: { userId }
  }).then(res => console.log(res));
}
