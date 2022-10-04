// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
//
// var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
// server.listen(port, () => console.log('Server running in port ' + port));
//
//
//
// io.on('connection', function (socket) { //Bắt sự kiện một client kết nối đến server
//     console.log(socket.id)
//     socket.on('all client', function (data) { //lắng nghe event 'all client'
//         console.log(socket.id)
//         io.sockets.emit('news', socket.id + ' send all client: ' + data); // gửi cho tất cả client
//     });
//
//     socket.on('broadcast', function (data) { //lắng nghe event 'broadcast'
//         console.log(socket.id)
//         socket.broadcast.emit('news',  socket.id + ' send broadcast: ' + data); // gửi event cho tất cả các client từ client hiện tại
//     });
//
//     socket.on('private', function (data) { //lắng nghe event 'private'
//         socket.emit('news', ' You send private message: ' + data); // chỉ gửi event cho client hiện tại
//     });
//
// });
//
// app.get('/', (req, res) => {
//     res.sendFile('test-socket-client.html', { "root": __dirname });
// })

const io = require('socket.io')(3000);


const getClientRoom = () => {
    let index = 0;
    while (true) {
        if(!io.sockets.adapter.rooms[index] || io.sockets.adapter.rooms[index].length < 2) {
            return index;
        }
        index ++;
    }
}

io.on('connect', socket => {
    const clientRoom = getClientRoom(); // Lấy room thỏa mãn điều kiện

    socket.join(clientRoom);
    console.log(clientRoom)

    if(io.sockets.adapter.rooms[clientRoom].length < 2) { //kiểm tra xem phòng có dưới 2 ng trong phòng không
        io.in(clientRoom).emit('statusRoom', 'Đang chờ người lạ vào phòng ' + clientRoom); // emit cho tất cả client trong phòng
    } else {
        io.in(clientRoom).emit('statusRoom', 'Người lạ đã vào phòng '+ clientRoom); // emit cho tất cả client trong phòng
    }

    socket.on('disconnect', (reason) => { // Khi client thoát thì emit cho người cùng phòng biết
        socket.to(clientRoom).emit('statusRoom', 'Người lạ đã thoát. Đang chờ người tiếp theo ....');
    });

    socket.on('sendMessage', function (message) { // nhận message từ client
        socket.to(clientRoom).emit('receiveMessage', message); // emit message ấy cho người trong room ngoại trừ người gửi
    })
});
