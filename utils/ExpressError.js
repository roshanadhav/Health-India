class ExpressError extends Error{
    constructor(ststus,message){
        super()
        this.ststus = ststus ;
        this.message = message ;
    }
}

module.exports = ExpressError ;