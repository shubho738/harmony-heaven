
const validateEmail = (email: string): boolean => {
  const regex = /^[\w.+-]{1,64}@\S+\.\S+$/
  return regex.test(email)
}

export default validateEmail
