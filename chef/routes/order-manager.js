var _ = require('lodash')

var _$manager;
class Orders{
    
    constructor(){
        this.orderList = {};
    }
    
    lsitAllOrder(){
        return this.orderList;
    }

    listOrderByUserId(userId){
        return this.orderList[userId];
    }

    addOrder(userId,item){
        if(!Array.isArray(this.orderList[userId])){
            this.orderList[userId] = [];
        }
        this.orderList[userId].push(item)
    }
    getOrder(userId,trans){
        let index = _.findIndex(this.orderList[userId],(o)=> o.trans == trans)
        return this.orderList[userId][index]
    }
    removeOrder(userId,trans){
        let index = _.findIndex(this.orderList[userId],(o)=> o.trans == trans)
        return this.orderList[userId].splice(index,1)
    }
    changeStatus(userId,trans,status){
        let index = _.findIndex(this.orderList[userId],(o)=> o.trans == trans)
        this.orderList[userId][index].status = status;
        return this.orderList[userId][index]
    }

    deleteOrderByUserId(userId){
        delete this.orderList[userId];
    }
}

function getInstance(){
    if(!_$manager) {
        _$manager = new Orders();
    }
    return _$manager
}

const Module = {
    getInstance
}

module.exports.manager = getInstance;