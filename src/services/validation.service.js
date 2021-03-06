export default {
  email,
  phone,
  required,
  url,
}

function email(val, required = false) {
  if (!required && !val) return true
  if (required && !val) return 'Email is required.'
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return pattern.test(val) || 'Invalid e-mail format.'
}

function phone(val, required = false) {
  if (!required && !val) return true
  if (required && !val) return 'Phone Number is required.'
  const pattern = /\d{3}-\d{3}-\d{4}/
  return pattern.test(val) || 'Invalid Phone Number: 555-555-5555'
}

function required(val) {
  return !!val || 'This field is required.'
}

function url(val, required = false) {
  if (!required && !val) return true
  if (required && !val) return 'URL is required.'
  const pattern = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
  return pattern.test(val) || 'Invalid URL format.'
}
