 const adminAuth = (req, res, next) => {
  console.log("Admin auth is being checked");

  // Example token for authorization logic
  const token = "xyz";
  const isAdminAuthorized = token === "xyz"; 

  if (!isAdminAuthorized) {
    return res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
    console.log("User auth is being checked");
  
    // Example token for authorization logic
    const token = "xyz";
    const isAdminAuthorized = token === "xyz"; 
  
    if (!isAdminAuthorized) {
      return res.status(401).send("Unauthorized request");
    } else {
      next();
    }
  };

module.exports = {
    adminAuth,
    userAuth
}