const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({extended: false}));


const connectedUsers = [];

app.post('/sms', (req, res) => {
	const Body = req.body.Body;
	const From = req.body.From;
	const MediaUrl0 = req.body.MediaUrl0;

	const message = {
		body: Body,
		from: "Mobile User " + From.slice(8),
		img: MediaUrl0
	}
	io.emit('message', message);
	res.send(`
		<Response>
			<Message>Thanks for texting! Hope you like my projects! - Sergio V.</Message>
		</Response>
	`);
})

io.on('connection', socket => {

	socket.on('new_user', (data, callback) => {
		if (connectedUsers.indexOf(data) != -1){
			callback({isValidUser: false});
		}else{
			socket.nickname = data;
			connectedUsers.push(data);
			callback({isValidUser: true});
			io.emit("connected_users_update", connectedUsers);
		}
	});

	socket.on('message', body => {
		socket.broadcast.emit('message', {
			body,
			//from: socket.id.slice(8)
			from: socket.nickname,
			isOwnMessage: false
		});
	});

	socket.on('disconnect', data => {
		if (!socket.nickname) return;
		connectedUsers.splice(connectedUsers.indexOf(socket.nickname), 1);
		io.emit("connected_users_update", connectedUsers);
	});

});

server.listen(3000);