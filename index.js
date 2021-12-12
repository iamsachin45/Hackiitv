const express = require('express');
const app = express();
var path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use('/',express.static(__dirname+'/public'))
app.get('/', (req, res) => {
  // res.send("hello ")
  res.sendFile(__dirname + '\\public\\canva.html');
});

// console.log(__dirname);

// app.get('/profile', (req, res) => {
//   res.send(req.query.id);
// });
// app.use(express.static(path.join(__dirname, 'public')));
// app.use("/public", express.static('./public/'));

var sac = "sachin here";
app.use(express.static("public"))
io.on('connection', (socket) => 
{
    console.log('a user connected');
    // socket.emit('check',sac);
    socket.on('draw',function(data)
    { 
      x = data.x;
      y = data.y;
      socket.broadcast.emit('ondraw',{x,y});
      // console.log(x + " " + y);
    });
    socket.on('down',function(data)
    {
      x = data.x;
      y = data.y;
      socket.broadcast.emit('ondown',{x,y});
    });
});


server.listen(3000 ,() => {
  console.log('listening on *:3000');
});
// console.log("hello");