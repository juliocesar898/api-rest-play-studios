const parseUserProfile = (user) => ({
  username: user.username,
  email: user.email,
  phone: user.phone
})

module.exports = {
  parseUserProfile
}