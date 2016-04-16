module.exports = Persona

function Persona (nombre, apellido) {
  this.nombre = nombre
  this.apellido = apellido

  this.sayHelloWorld = function sayHelloWorld () {
    console.log('Hola viteh, soy ' + this.nombre + ' ' + this.apellido)
  }
}
