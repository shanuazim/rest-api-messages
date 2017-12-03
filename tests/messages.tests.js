// integrational testing
const {expect} = require('chai')
const axios = require('axios')
const port = 3000
const url = `http://localhost:${port}`
const testObject = {name:'testing script', message: 'testing text'}

describe('messages API', ()=>{
  let app 
  let id
  const testName2 = 'test name 2'
  
  before(()=>{
    // app = require('../index.js')
    // app.listen(port)
  })
 
  it('responds with 200 on homepage', async () => {
    const response = await axios(url)
    // console.log(response)
    expect(response.status).to.equal(200)
  })

  it('responds with 200 on /messages', async () => {
    const response = await axios(`${url}/messages`)
    // console.log(response)
    expect(response.status).to.equal(200)
  })

  it('creates a new message on POST /messages', async () => {
    const response = await axios.post(`${url}/messages`, testObject)
    // console.log(response)
    expect(response.status).to.equal(200)
    expect(response.data.ops[0]._id).to.be.ok
    expect(response.data.ops[0].name).to.be.ok
    expect(response.data.ops[0].name).to.eql(testObject.name)
    expect(response.data.ops[0].message).to.be.ok
    expect(response.data.ops[0].message).to.eql(testObject.message)
    expect(response.data.ops[0]._id.length).to.equal(24)
    id = response.data.ops[0]._id
  })

  it('update PUT /messages', async () => {
    const response = await axios.put(`${url}/messages/${id}`, {name: testName2})
    // console.log(response)
    expect(response.status).to.equal(200)
    expect(response.data.n).to.be.equal(1)
  })
  it('updated message has correct name and responds with 200 on /messages/id', async () => {
    const response = await axios(`${url}/messages/${id}`)
    // console.log(response)
    expect(response.status).to.equal(200)
    expect(response.data[0].name).to.eql(testName2)
    expect(response.data[0]._id).to.eql(id)
  })
  it('deletes with  DELETE /messages', async () => {
    const response = await axios.delete(`${url}/messages/${id}`)
    // console.log(response)
    expect(response.status).to.equal(200)
    expect(response.data.n).to.be.equal(1)
  })

  after(()=>{

    // app.close()
  })
})