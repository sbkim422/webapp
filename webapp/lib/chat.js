'use strict';

var emitUserList, signIn, chatObj;
var socket = require('socket.io');
var crud = require('./crud');
var makeMongoId = crud.makeMongoId;
var chatterMap = {};

emitUserList = function (io){
	crud.read('user', {is_online:true},{},function(result_list){
		io.of('/chat')
		.emit('listchange', result_list);
	});
};

signIn= function(io, user_map, socket){
	crud.update('user',{'_id': user_map._id},{is_online:true},function(result_map){
		emitUserList(io);
		user_map.is_online=true;
		socket.emit('userupdate',user_map);
	});
	
	chatterMap[user_map._id] = socket;
	socket.user_id = user_map._id;
};

chatObj = {
	connect : function (server){
		var io = socket.listen(server);
		io.set('blacklist', [])
		.of('/chat')
		.on('connection', function(socket){
			socket.on('adduser', function(){});
			socket.on('updatechat', function(){});
			socket.on('leavechat', function(){});
			socket.on('disconnect', function(){});
			socket.on('updateavatar', function(){});
		});
		return io;
	}
};

module.exports = chatObj;