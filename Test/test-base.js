const assert = require('assert')
const deleteFile = require('./index')

// Eliminar un archivo que no existe
deleteFile("no-existe",(err,result)=>{
    assert.ok(err) // verificamos se existe el error
    assert.ok(err instanceof Error) // verificamos que sea realmente un error
    assert.match(err.message,/does not exist/)
})