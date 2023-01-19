import { RemedyPlan, executeParameters } from "../../businesslogic/RemedyPlan";
import { LoggerMock } from "../utility/LoggerMock";
import { Iaction } from "../../businesslogic/conditions/Iaction";
import { IPlanned } from "../../businesslogic/plannedCheck/IPlanned";

test('Remedy plan does not respond to the trigger and returns an empty result', async () => {    
    var trigger ='trigger'
    var name = 'rp_name'
    var data : executeParameters = {
        trigger : trigger,
        divergenceType : "ooooooooiiiii",
        parameters :{}
    }
    var rpDoesNotUseAnyTrigger= []
    var rp = new RemedyPlan(name, rpDoesNotUseAnyTrigger, [], [], new LoggerMock())
    
    var result = await rp.invoke(data)

    expect(result.name).toBe(name)
    expect(result.conditions.length).toBe(0)
})

test('Remedy plan responds to the trigger and returns the executed conditions', async () => {    
    var trigger ='trigger'
    var name = 'rp_name'
    var data : executeParameters = {
        trigger : trigger,
        divergenceType : "ooooooooiiiii",
        parameters :{}
    }
    var condition1 = new conditionMock(false, {'cond1':'done1'})
    var condition2 = new conditionMock(false, {'cond2':'done2'})
    var rpUseTheTrigger= ['a', 'b', trigger, 'c']
    var rp = new RemedyPlan(name, rpUseTheTrigger, [], [condition1, condition2], new LoggerMock())
    
    var result = await rp.invoke(data)

    expect(result.name).toBe(name)
    expect(result.conditions.length).toBe(2)
    expect(condition1.executed).toBe(true)
    expect(condition2.executed).toBe(true)
    expect(result.conditions[0].cond1).toBe('done1')
    expect(result.conditions[1].cond2).toBe('done2')
})

test('Remedy plan responds to the trigger but it is already planned: actions skipped', async () => {    
    var isplanned_1 = new isPlannedMock(false)
    var isplanned_2 = new isPlannedMock(true)
    var isplanned_3 = new isPlannedMock(false)
    var trigger ='trigger'
    var name = 'rp_name'
    var data : executeParameters = { 
        trigger : trigger,
        divergenceType : "ooooooooiiiii",
        parameters :{}
    }
    var condition1 = new conditionMock(false, {'cond1':'done1'})
    var condition2 = new conditionMock(false, {'cond2':'done2'})
    var rpUseTheTrigger= ['a', 'b', trigger, 'c']
    var rp = new RemedyPlan(name, 
                            rpUseTheTrigger, 
                            [isplanned_1, isplanned_2, isplanned_3],
                            [condition1, condition2], 
                            new LoggerMock())
    
    var result = await rp.invoke(data)

    expect(result.name).toBe(name)
    expect(result.conditions.length).toBe(0)
    expect(condition1.executed).toBe(false)
    expect(condition2.executed).toBe(false)
    expect(isplanned_1.called).toBe(true)
    expect(isplanned_2.called).toBe(true)
    expect(isplanned_3.called).toBe(false)
})

test('A condiont fails, RP returns an exception', async () => {    
    var trigger ='trigger'
    var name = 'rp_name'
    var data : executeParameters = {
        trigger : trigger,
        divergenceType : "ooooooooiiiii",
        parameters :{}
    }
    var condition1 = new conditionMock(true, {'cond1':'done1'})
    var condition2 = new conditionMock(false, {'cond2':'done2'})
    var rpUseTheTrigger= ['a', 'b', trigger, 'c']
    var rp = new RemedyPlan(name, rpUseTheTrigger, [], [condition1, condition2], new LoggerMock())
    
    try{
        var result = await rp.invoke(data)
        expect(1).toBe(2)
    }
    catch(e){
        expect(condition1.executed).toBe(true)
        expect(condition2.executed).toBe(false)
    }
})

class conditionMock implements Iaction{
    executed : boolean = false
    
    constructor(private errorDuringExecution: boolean, private result: { [key: string]: string; }){}
    
    async execute(data: executeParameters): Promise<{ [key: string]: string; }> {
        this.executed = true
        if (this.errorDuringExecution)
            throw new Error('Failed')        
        return this.result
    }
}

class isPlannedMock implements IPlanned{
    called : boolean = false

    constructor(private isAlreadyPlannedResult: boolean){}
    
    isAlreadyPlanned(data: { [key: string]: string; }): boolean {
        this.called = true
        return this.isAlreadyPlannedResult
    }

}