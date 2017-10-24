// Return true if the message starts with "!" and contains 3 or less arguments
exports.validMessage = (message) => {
  if(message != '' && message.substr(0,1) === '!' && message.split(' ').length <= 4)
  return true;
}
