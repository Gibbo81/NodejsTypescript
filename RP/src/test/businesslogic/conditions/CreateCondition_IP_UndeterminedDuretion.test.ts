import { LoggerMock } from "../../utility/LoggerMock";
import { ICreateTasksChain } from "../../../businesslogic/plugIn/ICreateTasksChain";
import { IInfrastructureProvisionMock } from "./CreateCondition_IP_FixedDuretion.test";
import { IUpdateRemedyPlanConditionMock } from "./CreateCondition_IP_FixedDuretion.test";
import { CreateCondition_IP_UndeterminedDuretion } from "../../../businesslogic/conditions/CreateCondition_IP_UndeterminedDuretion";

test('Create new infrastructure provision', async () => {    
    var logger = new LoggerMock()
    var ipCreator = new IInfrastructureProvisionMock(100)
    var conditionMock = new IUpdateRemedyPlanConditionMock()
    var tasksMock = new ICreateTasksChainMock()
    var cc = new CreateCondition_IP_UndeterminedDuretion(7,1,600,logger, ipCreator, conditionMock, tasksMock)

    var result = await cc.execute({
        trigger: 'qui-quo-qua',
        divergenceType : "ooooooooiiiii",
        parameters:{ }        
    },{
        name: 'RemedyPlan_Pippo',
        conditions: [{'actionName': 'CreateRemediPlan', 'areaId':'88', 'id':'63eb512debc264655d578acc'}]
    })

    expect(result.id).toBe('100')
    expect(ipCreator.kindId).toBe(7)
    expect(ipCreator.topologyId).toBe(1)
    expect(conditionMock.parameter.duration).toBe(600)
    expect(conditionMock.parameter.conditionUndetermined).toBeTruthy()
    expect(tasksMock.chainType).toBe('undetermined')
    expect(tasksMock.ipId).toBe(100)
    expect(conditionMock.parameter.remedyplanKey).toBe('63eb512debc264655d578acc')
})

test('Create new infrastructure provision but missing a previous create remedy Plan throws an exception', async () => {    
    var logger = new LoggerMock()
    var ipCreator = new IInfrastructureProvisionMock(100)
    var conditionMock = new IUpdateRemedyPlanConditionMock()
    var tasksMock = new ICreateTasksChainMock()
    var cc = new CreateCondition_IP_UndeterminedDuretion(7,1,600,logger, ipCreator, conditionMock, tasksMock)

    try{
        await cc.execute({
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
    var conditionMock = new IUpdateRemedyPlanConditionMock()
    var tasksMock = new ICreateTasksChainMock()
    var cc = new CreateCondition_IP_UndeterminedDuretion(7,1,600,logger, ipCreator, conditionMock, tasksMock)

    try{
        await cc.execute({
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

class ICreateTasksChainMock implements ICreateTasksChain{
    chainType: string 
    ipId: number
    
    async createTasksChain(chainType: string, ipId: number): Promise<void> {
        this.chainType = chainType
        this.ipId = ipId
    }
}