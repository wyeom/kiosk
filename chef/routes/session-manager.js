var ord  = require('./order-manager');
var _$manager;
class socketMananger{
    
    constructor(io){
        this.$io = io
        this.$uid_s = {};
        this.$sid_u = {};
        this.adminSocket = "";
    }

    isSocketId   = (id) => (this.$sid_u[id])? true:false;
    getUserId    = (id) => (this.$uid_s[id])? id:this.$sid_u[id];
    getSocketId  = (id) => (this.$sid_u[id])? id:this.$uid_s[id];

    connect = (userId,socketId)=>{
        this.$uid_s[userId]   = socketId;
        this.$sid_u[socketId] = userId;
        console.log('socketManager connect uid_s',this.$uid_s)
        console.log('socketManager connect sid_u',this.$sid_u)
    }
    connectAdmin = (socketId)=>{
        this.adminSocket = socketId;
        
        console.log('socketManager connectAdmin adminSocket',socketId)
    }
    
    disconnect = (id)=>{
        
        let socketId = this.getSocketId(id);
        let userId   = this.getUserId(id)

        delete this.$uid_s[userId];
        delete this.$sid_u[socketId];
        delete ord.manager().deleteOrderByUserId(userId)
        
        if(this.$io.sockets.sockets.get(socketId)){
            this.$io.sockets.sockets.get(socketId).disconnect();
        }
    }

    listSocketIds = ()=>{
        let rtn=[]
        Object.keys(this.$sid_u).forEach(e=>{
            rtn.push({socketId:e,userId:this.$sid_u[e]})
        })
        return rtn;
    }

    listUserIds = ()=>{
        let rtn=[]
        Object.keys(this.$uid_s).forEach(e=>{
            rtn.push({userId:e,socketId:this.$uid_s[e]})
        })
        return rtn;
    }

    listAllSockets = async ()=>{
        let val = [];
        await this.$io.allSockets()
        .then(e=>{
            val = Array.from(e)
            for(let i=0; i<val.length; i++){
                if(val[i]==this.adminSocket){
                    val[i] = val[i]+'(admin)'
                }
            }
        })
        .catch(e=>{
            console.log(e);
            val = [];
        })
        return val
    }
    
    emitTo = (data) => {
        let id        = this.getSocketId(data.id)
        let eventName = data.eventName
        let message   = data.message
        let socketId  = this.getSocketId(id);
        this.$io.to(socketId).emit(eventName,message)
    }
    emitToAdmin = (event) => {
        let eventName = event
        let message   = event
        let socketId  = this.adminSocket;
        this.$io.to(socketId).emit(eventName,message)
    }

    emitToUser = (user_id,eventName,message) => {
        let socketId  = this.getSocketId(user_id);
        this.$io.to(socketId).emit(eventName,message)
    }
}

function init(io){
    if(!_$manager) {
        console.log("init Socket manager")
        _$manager = new socketMananger(io);
    }
    return _$manager
}

function getInstance(){
    if(!_$manager) {
        return null;
    }
    return _$manager
}

const smModule = {
    init,
    getInstance
}
module.exports.init = smModule.init;
module.exports.manager = smModule.getInstance;