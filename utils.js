module.exports = {
    isValid(body) {
      const {name, message} = body
      // name message
      let isValid 
      if (name && message && name.trim() !== '' && name.length > 2 && (/[A-Za-z0-9]/).test(name) && 
      message.trim() !== '' && message.length > 2 && (/[A-Za-z0-9]/).test(message) ) {
        isValid = true
      } else isValid = false
  
      return isValid
    }
  }