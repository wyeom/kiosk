class Item{
    constructor(name,price,img){
        this.name   = name;
        this.price  = price;
        this.img    = img;
        this.status = 0;
        this.trans  = '';
    }
}

function getInstance(name,price,img){
    return new Item(name,price,img);
}

export default getInstance