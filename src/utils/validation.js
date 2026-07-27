const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please fill all the fields");
  } else if (firstName.length < 3 || firstName.length > 50) {
    throw new Error("First name should be atleast 3 to 50 characters long");
  } else if (lastName.length < 3 || lastName.length > 50) {
    throw new Error("Last name should be atleast 3 to 50 characters long");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please fill all the fields");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "gender", "age"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = { validateSignUpData,
  validateProfileEditData
 };
