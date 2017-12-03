const React = require('react')

class MessageBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages || [],
      username: '', 
      messageText: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.saveMessage = this.saveMessage.bind(this)
  }
  componentDidMount() {
    fetch('/messages')
      .then(response=>response.json())
      .then(json=>this.setState({messages: json}))
  }
  removeMessage(id, index) {
    fetch(`/messages/${id}`, {
      method: 'DELETE'
    })
      .then(response=>response.json())
      .then(json=>{
        console.log(json)
        // Keep an eye on this and maybe clone array. Beware of refences
        const oldArray = this.state.messages
        oldArray.splice(index, 1)        
        this.setState({messages: oldArray})
      })
  }
  editMessage(id, index) {
    fetch(`/messages/${id}`, {
     method: 'PUT'
    })
     .then(response=>response.json())
     .then(json=>{
       console.log(json)
       //code here
      const oldArray = this.state.messages
      //oldArray.editMessage
      this.toggleEditing.bind(null, oldArray)
      this.setstate( { messages: id } )
     })
      
  }
  saveMessage() {
    // console.log(this.state)
    fetch(`/messages`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },      
      body: JSON.stringify({
        name: this.state.username,
        message: this.state.messageText
      })
    })
      .then(response=>response.json())
      .then(json=>json.ops[0])
      .then(newMessage=>{
        console.log(newMessage)
        // Keep an eye on this and maybe clone array. Beware of refences
        const oldArray = this.state.messages
        oldArray.unshift(newMessage)
        // oldArray.splice(index, 1)        
        this.setState({messages: oldArray}, ()=>{
          this.setState({messageText: ''})
        })
      })    
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value})
  }
  handleTextChange(event) {
    this.setState({messageText: event.target.value})
  }
  render() {
    return (
      <div>
        <h1>Northwestern Mutual Message Board</h1>
        <div onKeyUp={((event)=>{
          if (event.keyCode === 13 || event.key === 'Enter') return this.saveMessage()
        }).bind(this)}>
        <form>
        <div className="row">
            <div className="large-4 columns md-text-field with-floating-label">
                <input type="text" placeholder="Enter your name:" value={this.state.username} onChange={this.handleUsernameChange} required/>
            </div>
            <div className="large-4 columns md-text-field with-floating-label">
              <input type="text"  placeholder="Post your message here" value={this.state.messageText} onChange={this.handleTextChange} required/>
            </div>
            <div className="large-4 columns md-text-field with-floating-label">
                <button className="button btn-cta" onClick={this.saveMessage}>Save</button>
            </div>
        </div>        
         </form>
          
          
        </div>
        <table className="table" summary="">
          <caption className="show-for-sr">Messages</caption>
              <thead>
                  <tr>
                      <th width="100">Username</th>
                      <th width="500" class="text-left">Text</th>
                      <th width="200">Actions</th>
                  </tr>
              </thead>
              <tbody>
              {(this.state.messages.length==0)?<tr><td><h2>Loading...</h2></td></tr>:false}
                    {this.state.messages.map((message, index)=>(
                      <tr key={index}><td>{message.name}</td><td> {message.message}</td><td>
                        <button onClick={()=>{
                          this.removeMessage(message._id, index)
                        }
                        }>x</button>
                        </td>
                        <td>
                        <button onClick={()=>{
                          this.editMessage(message._id, index)
                        }
                        }>Edit</button>
                        </td>
                      </tr>
                    ))}
                    
              </tbody>
          </table>
      </div>
    )
  }
}

module.exports = MessageBoard