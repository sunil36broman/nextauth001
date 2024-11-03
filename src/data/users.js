const users = [
  {
    email2: "atapas@email.com",
    password: "password"
  },
  {
    email2: "alex@email.com",
    password: "password"
  },
  {
    email2: "bob@email.com",
    password: "password"
  }
]

export const getUserByEmail = (email) => {
  const found = users.find(user => user.email2 === email);
  console.log("found", found)
  return found;
}