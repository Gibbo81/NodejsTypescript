class C1{
    constructor(x,y){
        this.x=x
        this.y=y
    }

    f1(){
        return this.x+this.y
    }
    
    f2(){
        return this.x-this.y
    }
    
    f3Async(){
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.x * this.y), 500)
        })
    }
}

module.exports= C1