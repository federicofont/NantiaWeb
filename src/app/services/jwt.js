'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var pass = 'pass'
export.createToken = funcion(usuario){
	var payload={
		id: usuario._id,
		nombre: usuario.nombre,
		rol:usuario.rol,
		iat: moment().unix(),
		exp: moment().add(10,'dat').unix
	};

return jwt.encode(payload, pass);

}
