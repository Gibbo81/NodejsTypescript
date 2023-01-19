import { CreateRemediPlan } from "../../../businesslogic/conditions/CreateRemedyPlan";
import { ISaveNewRemedy } from "../../../businesslogic/plugIn/ISaveNewRemedy";
import { LoggerMock } from "../../utility/LoggerMock";
import { RemedyPlanDTO } from "../../../businesslogic/dto/RemedyPlanDTO";


test('Create new ramedy plan', async () => {    
    const returnedId : string = 'ooooopooooooo'    
    var saver = new ISaveNewRemedyMock(returnedId, false)
    var logger = new LoggerMock()
    var rpc = new CreateRemediPlan('', saver, logger)

    var result = await rpc.execute({
        trigger: 'qui-quo-qua',
        divergenceType : "ooooooooiiiii",
        parameters:{
            'owner': 'pippus',
            'status': 'totally fine',
            'priority' : '100'
        }        
    })

    expect(result.id).toBe(returnedId)
    expect(saver.count).toBe(1)
})

test('Try to create new ramedy plan but there is an error', async () => {      
    var saver = new ISaveNewRemedyMock("", false)
    var logger = new LoggerMock()
    var rpc = new CreateRemediPlan('', saver, logger)


    try{
        var result = await rpc.execute({
            trigger: 'qui-quo-qua',
            divergenceType : "ooooooooiiiii",
            parameters:{
                'owner': 'pippus',
                'status': 'totally fine',
                'priority' : '100'
            }        
        })
        expect(1).toBe(2)
    }
    catch(e){
        expect(saver.count).toBe(1)
        expect(e).toBeInstanceOf(Error)
    }
})


class ISaveNewRemedyMock implements ISaveNewRemedy{
    public count : number = 0
    
    constructor(private id : string, private dbError: boolean){}


    insert(rp: RemedyPlanDTO): Promise<string> {
        this.count +=1 
        return new Promise((resolve, reject) => { 
            if (!this.dbError)    
                resolve(this.id)  
            else
                reject("Error")
        });
    }
}