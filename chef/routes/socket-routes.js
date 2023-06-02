var session = require('./session-manager');
var order  = require('./order-manager');

function router(io){

    io.on('connection', (socket) => {
        
        let socketId = socket.id;
        let userId   = socket.handshake.headers.userid;
        // console.log("📜 : io.on : userId", socket.handshake.headers)
        
        console.log('Websocket Ready Socket Id is ',socketId,userId)
        
        if(userId=='admin#chef'){
            session.manager().connectAdmin(socketId)
        }
        else if(userId) {
            session.manager().connect(userId,socketId)
            session.manager().emitToAdmin('status-changed')
        }
        
        socket.emit('connection-back',{data:socketId})

        //connection
        socket.on('connection', (userid) => {
            console.log("connection",userid,socketId)
            session.manager().emitToAdmin('status-changed')
            
        }); 
        //disconnection
        socket.on('disconnect', () => {
            session.manager().disconnect(socketId);
            session.manager().emitToAdmin('status-changed')
            console.log("disconnect",socketId)
        }); 

        socket.on('usercount', (msg) => {
            console.log("msg",msg)  
            socket.emit('connection-back',17)
            session.manager().emitToAdmin('status-changed')
        });

        socket.on('order', (item) => {
            // console.log("msg",msg)  
            let userId = session.manager().getUserId(socketId);
            order.manager().addOrder(userId,item)
            socket.emit('order-back',order.manager().listOrderByUserId(userId))
            session.manager().emitToAdmin('status-changed')
            console.log(order.manager().listOrderByUserId(userId));
        });
        socket.on('order-cancel', (item) => {
            let userId = session.manager().getUserId(socketId);
            order.manager().removeOrder(userId,item.trans)
            socket.emit('order-cancel-back',order.manager().listOrderByUserId(userId))
            socket.emit('chef-listen',order.manager().listOrderByUserId(userId))
            session.manager().emitToAdmin('status-changed')
            console.log(order.manager().listOrderByUserId(userId));
        });
    });
  }

  const Module = {
    router
  }

  module.exports.router = router;