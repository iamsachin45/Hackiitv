   
var socket = io()
var x;
var y;
let mousedown = false;
let c = document.getElementById("myCanvas");
// console.log("hello");
let ctx = c.getContext("2d");
socket.on('ondraw', ({ x, y }) => {
    ctx.lineTo(x, y);
    // socket.emit('draw',(x,y))
    ctx.stroke();

});
socket.on('ondown', ({ x, y }) => {
    ctx.moveTo(x, y);

});

c.addEventListener('mousedown', (e) => {
    // console.log('hey there')

    ctx.moveTo(x, y);
    socket.emit('down', { x, y });
    mousedown = true;

});
c.addEventListener('mouseup', (e) => {
    mousedown = false;
});
c.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    if (mousedown) {
        socket.emit('draw', { x, y });
        // io.emit('draw',(x,y))
        ctx.lineTo(x, y);
        // socket.emit('draw',(x,y))
        ctx.stroke();
        var st = "X coordinate is " + x + " and y coordinate is " + y;
        console.log(st);
    }
});

// function myfunction(event) {

//     window.onmousedown = (e) => {
//         ctx.moveTo(x, y);
//         mousedown = true;

//     }
//     window.onmouseup = (e) => {
//         mousedown = false;
//     }

//     window.onmousemove = (e) => {


//         x = event.clientX;
//         y = event.clientY;
//         if (mousedown) {
//             // io.emit('draw',(x,y))
//             ctx.lineTo(x, y);
//             // socket.emit('draw',(x,y))
//             ctx.stroke();
//             var st = "X coordinate is " + x + " and y coordinate is " + y;
//             console.log(st);
//         }
//     }

// }
// }