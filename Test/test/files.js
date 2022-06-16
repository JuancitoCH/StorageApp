const chai = require('chai')
const { createFile } = require('../index')
const assert = chai.assert
const expect = chai.expect
chai.should()


describe('Files',function(){
    this.timeout(6000)
    it('shold sucessfully create the file',async function(){
        try{
            const file = await createFile('fileName.txt',"file.txt")
            // assert.exists(file)
            // assert.isObject(file)
            // assert.equal(file.success,true)
            // assert.match(file.message,/File created successfully/)

            // file.should.exist
            // file.should.be.a("object")
            // file.success.should.equal(true)
            // file.message.should.match(/File created successfully/)
            
            expect(file).exist
            expect(file).be.a("object")
            expect(file.success).equal(true)
            expect(file.message).match(/File created successfully/)

        }catch(err){
            console.log(err)
            throw err
        }
    })
})