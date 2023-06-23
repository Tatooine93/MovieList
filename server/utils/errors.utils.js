module.exports.registerErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("username")) {
    errors.username = "Incorrect Username or already used";
  }

  if (err.message.includes("email")) {
    errors.email = "Incorrect Email";
  }

  if (err.message.includes("password")) {
    errors.password = "Password must be at least 6 characters";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username")) {
    errors.username = "This Username is already used";
  }

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "This Email is already used";
  }
  console.log("register errors", errors);
  return errors;
};

module.exports.loginErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.message.includes("username")) {
    errors.username = "Incorrect username";
  }

  if (err.message.includes("password")) {
    errors.password = "Incorrect passsword";
  }
  console.log("login errors", err.message);
  return errors;
};
