'use strict';

var configRoutes;
var crud = require('./crud');
var chat = require('./chat');
var makeMongoId = crud.ObjectID;

configRoutes=function(app,server){
	app.get('/', function (request, response){
		response.redirect('/spa.html');
	});
	
	app.all('/:obj_type/*?', function(request, response, next){
		response.contentType('json');
		next();
	});
	
	app.get('/:obj_type/list', function(request, response){
		crud.read(request.params.obj_type,{},{},function(map_list){
			response.send(map_list);
		});
	});
	
	app.post('/:obj_type/create', function(request,response){
		crud.construct(request.params.obj_type,request.body, function(result_map){
			response.send(result_map);
		});
	});
	
	app.get('/:obj_type/read/:id', function(request, response){
		crud.read(request.params.obj_type,{_id:makeMongoId(request.params.id)}, {}, function(map_list){
			response.send(map_list);
		});
	});
	
	app.post('/:obj_type/update/:id', function(request, response){
		crud.update(request.params.obj_type,{_id:makeMongoId(request.params.id)},request.body, function(result_map){
			response.send(result_map);
		});
	});

	app.get('/:obj_type/delete/:id', function(request, response){
		crud.destroy(request.params.obj_type, {_id: makeMongoId(request.params.id)},function(result_map){
			response.send(result_map);
		});
	});
	
	chat.connect(server);
};

module.exports = { configRoutes : configRoutes };

