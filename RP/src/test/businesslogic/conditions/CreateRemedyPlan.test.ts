import { CreateRemediPlan } from "../../../businesslogic/conditions/CreateRemedyPlan";
import { ISaveNewRemedy } from "../../../businesslogic/plugIn/ISaveNewRemedy";
import { LoggerMock } from "../../utility/LoggerMock";
import { RemedyPlanDTO } from "../../../businesslogic/dto/RemedyPlanDTO";
import { CreateAreaWithIFMO } from "../../../api/CreateArea";
import { IOwners } from "../../../businesslogic/plugIn/IOwners";

test('Create new ramedy plan', async () => {    
    const returnedId : string = 'ooooopooooooo'    
    var saver = new ISaveNewRemedyMock(returnedId, false)
    var logger = new LoggerMock()
    var owner = new OwnerMock()
    var rpc = new CreateRemediPlan('', saver, new CreateAreaWithIFMO(), logger, owner)

    var result = await rpc.execute({
        trigger: 'qui-quo-qua',
        divergenceType : "ooooooooiiiii",
        parameters:{
            'status': 'totally fine',
            'priority' : '100'
        }        
    }, getEmptyPreviousActionsResults())

    expect(result.id).toBe(returnedId)
    expect(saver.count).toBe(1)
    expect(owner.trigger).toBe('qui-quo-qua')
})

test('Try to create new ramedy plan but there is an error', async () => {      
    var saver = new ISaveNewRemedyMock("", false)
    var logger = new LoggerMock()
    var owner = new OwnerMock()
    var rpc = new CreateRemediPlan('', saver, new CreateAreaWithIFMO(), logger, owner)

    try{
        var result = await rpc.execute({
            trigger: 'qui-quo-qua',
            divergenceType : "ooooooooiiiii",
            parameters:{
                'owner': 'pippus',
                'status': 'totally fine',
                'priority' : '100'
            }        
        }, getEmptyPreviousActionsResults())
        expect(1).toBe(2)
    }
    catch(e){
        expect(saver.count).toBe(1)
        expect(e).toBeInstanceOf(Error)        
    }
})

function getEmptyPreviousActionsResults() {
    return {
        name: 'RemedyPlan_Pippo',
        conditions: []
    };
}

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

class OwnerMock implements IOwners{
    public trigger:string

    async getOwner(trigger: string): Promise<string> {
        this.trigger=trigger
        return ''
    }
}