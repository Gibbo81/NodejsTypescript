import { CreateRemedyplanTask } from "../../../businesslogic/conditions/CreateRemedyplanTask";
import { ICreateTasksChainMock } from "./CreateCondition_IP_UndeterminedDuration.test";
import { LoggerMock } from "../../utility/LoggerMock";
import { IUpdateRemedyPlanTasks } from "../../../businesslogic/plugIn/IUpdateRemedyPlanTasks";

test('Create remedy plan task happy path', async () => {    
    var logger = new LoggerMock()
    var taskChainMock = new ICreateTasksChainMock()
    var updateRPMock = new IUpdateRemedyPlanTasksMock()
    var toTests = new CreateRemedyplanTask(taskChainMock, logger, 'pippus', updateRPMock)

    var result = await toTests.execute({
        trigger: 'qui-quo-qua',
        divergenceType : "ooooooooiiiii",
        parameters:{
            'status': 'totally fine',
            'priority' : '100'
        }        
    },{
        name: 'RemedyPlan_Pippo',
        conditions: [
            {'actionName': 'CreateRemediPlan', 'id':'63eb512debc264655d578acc'},
            {'actionName': 'CreateCondition_IP', 'id':'86'}
        ]
    })

    expect(result.actionName).toBe('CreateRemedyplanTask')
    expect(updateRPMock.remedyPlanKey).toBe('63eb512debc264655d578acc')
    expect(taskChainMock.chainType).toBe('pippus')
    expect(taskChainMock.ipId).toBe(86)
})

test('Create remedy plan task with missing action CreateRemediPlan returns an error', async () => {    
    var logger = new LoggerMock()
    var taskChainMock = new ICreateTasksChainMock()
    var updateRPMock = new IUpdateRemedyPlanTasksMock()
    var toTests = new CreateRemedyplanTask(taskChainMock, logger, 'pippus', updateRPMock)

    try{
        await toTests.execute({
            trigger: 'qui-quo-qua',
            divergenceType : "ooooooooiiiii",
            parameters:{
                'status': 'totally fine',
                'priority' : '100'
            }        
        },{
            name: 'RemedyPlan_Pippo',
            conditions: [
                {'actionName': 'CreateCondition_IP', 'id':'86'}
            ]
        })
        expect(1).toBe(2)
    }
    catch(e){
        expect(e).toBeInstanceOf(Error)        
        expect(e.message).toBe('CreateConditionIP impossible without a previous CreateRemedyPlan action: {"name":"RemedyPlan_Pippo","conditions":[{"actionName":"CreateCondition_IP","id":"86"}]}')    
    }
})

test('Create remedy plan task with missing action CreateCondition_IP returns an error', async () => {    
    var logger = new LoggerMock()
    var taskChainMock = new ICreateTasksChainMock()
    var updateRPMock = new IUpdateRemedyPlanTasksMock()
    var toTests = new CreateRemedyplanTask(taskChainMock, logger, 'pippus', updateRPMock)

    try{
        await toTests.execute({
            trigger: 'qui-quo-qua',
            divergenceType : "ooooooooiiiii",
            parameters:{
                'status': 'totally fine',
                'priority' : '100'
            }        
        },{
            name: 'RemedyPlan_Pippo',
            conditions: [
                {'actionName': 'CreateRemediPlan', 'id':'63eb512debc264655d578acc'}                
            ]
        })
        expect(1).toBe(2)
    }
    catch(e){
        expect(e).toBeInstanceOf(Error)        
        expect(e.message).toBe('CreateConditionIP impossible without a previous CreateIp action: {"name":"RemedyPlan_Pippo","conditions":[{"actionName":"CreateRemediPlan","id":"63eb512debc264655d578acc"}]}')
    }
})

class IUpdateRemedyPlanTasksMock implements IUpdateRemedyPlanTasks{
    public remedyPlanKey: string
    public taskChainGuid: string
    
    async insert(remedyPlanKey: string, taskChainGuid: string): Promise<void> {
        this.remedyPlanKey = remedyPlanKey
        this.taskChainGuid = taskChainGuid
    }

}