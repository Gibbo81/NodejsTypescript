import { CreateCondition_IP } from "../../../businesslogic/conditions/CreateCondition_IP";
import { IInfrastructureProvision } from "../../../businesslogic/plugIn/IInfrastructureProvision";
import { LoggerMock } from "../../utility/LoggerMock";

test('Create new infrastructure provision', async () => {    
    var logger = new LoggerMock()
    var ipCreator = new IInfrastructureProvisionMock(100)
    var cc = new CreateCondition_IP(7,1,600,logger, ipCreator)

    var result = await cc.execute({
        trigger: 'qui-quo-qua',
        divergenceType : "ooooooooiiiii",
        parameters:{ }        
    },{
        name: 'RemedyPlan_Pippo',
        conditions: [{'actionName': 'CreateRemediPlan', 'areaId':'88'}]
    })

    expect(result.id).toBe('100')
    expect(ipCreator.kindId).toBe(7)
    expect(ipCreator.topologyId).toBe(1)
})

test('Create new infrastructure provision but missing a previous create remedy Plan throws an exception', async () => {    
    var logger = new LoggerMock()
    var ipCreator = new IInfrastructureProvisionMock(100)
    var cc = new CreateCondition_IP(7,1,600,logger, ipCreator)

    try{
        var result = await cc.execute({
            trigger: 'qui-quo-qua',
            divergenceType : "ooooooooiiiii",
            parameters:{ }        
        },{
            name: 'RemedyPlan_Pippo',
            conditions: [{'actionName': 'NOTACreateRemediPlan', 'areaId':'88'}]
        })
        expect(1).toBe(2)
    }
    catch(e){
        expect(ipCreator.topologyId).toBeUndefined()
        expect(ipCreator.kindId).toBeUndefined()
        expect(e).toBeInstanceOf(Error)    
        expect(e.message).toBe('CreateConditionIP impossible without a previous CreateRemediPlan action: {"name":"RemedyPlan_Pippo","conditions":[{"actionName":"NOTACreateRemediPlan","areaId":"88"}]}')    
    }
})

test('Create new infrastructure provision but missing a previous create areaID, throws exception', async () => {    
    var logger = new LoggerMock()
    var ipCreator = new IInfrastructureProvisionMock(100)
    var cc = new CreateCondition_IP(7,1,600,logger, ipCreator)

    try{
        var result = await cc.execute({
            trigger: 'qui-quo-qua',
            divergenceType : "ooooooooiiiii",
            parameters:{ }        
        },{
            name: 'RemedyPlan_Pippo',
            conditions: [{'actionName': 'NOTACreateRemediPlan'}]
        })
        expect(1).toBe(2)
    }
    catch(e){
        expect(ipCreator.topologyId).toBeUndefined()
        expect(ipCreator.kindId).toBeUndefined()
        expect(e).toBeInstanceOf(Error)    
        expect(e.message).toBe('CreateConditionIP impossible without a previous CreateRemediPlan action: {"name":"RemedyPlan_Pippo","conditions":[{"actionName":"NOTACreateRemediPlan"}]}')    
    }
})

class IInfrastructureProvisionMock implements IInfrastructureProvision{
    constructor(private IPId: number){}
    public kindId:number
    public topologyId:number

    async createIP(kindId: number, topologyId: number, areaId: number, startTime: Date, endTime: Date): Promise<number> {
        this.topologyId=topologyId
        this.kindId=kindId
        return this.IPId
    }

}



