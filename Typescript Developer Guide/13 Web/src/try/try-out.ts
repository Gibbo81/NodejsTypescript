

export const testing = function(){

    //test is declered to accept only property having a key of type string (in teory ythe only possible):
    //  [key:string] --> all the key of type string accept only a number as value type
    var test : { [key:string] : number} ={} 

    test.appo = 10
    test[7]=34  //this is considered as a '7' string, for this reason is accepted
    test['appo2']=23
    
    //this gives an error: 'type string is not assignable to type number'
    //test['dos']= 'ttt'
    //test['dos']= {}

    console.log (test)

    var test2 : { [key:number] :string|number} ={} 
    test2[2217]="1 2 3 star"
    test2["221735"]= 89
    console.log (test2)
}

