import { RemedyPlan } from "../../businesslogic/RemedyPlan";
import { LoggerMock } from "../utility/LoggerMock";
import { Icondition } from "../../businesslogic/conditions/Icondition";
import exp from "constants";


test('Remedy plan does not respond to the trigger and returns an empty result', async () => {    
    var trigger ='trigger'
    var name = 'rp_name'
    var rpDoesNotUseAnyTrigger= []
    var rp = new RemedyPlan(name, rpDoesNotUseAnyTrigger, [], new LoggerMock())
    
    var result = await rp.invoke(trigger)

    expect(result.name).toBe(name)
    expect(result.conditions.length).toBe(0)
})

test('Remedy plan responds to the trigger and returns the executed conditions', async () => {    
    var trigger ='trigger'
    var name = 'rp_name'
    var condition1 = new conditionMock(false, {'cond1':'done1'})
    var condition2 = new conditionMock(false, {'cond2':'done2'})
    var rpUseTheTrigger= ['a', 'b', trigger, 'c']
    var rp = new RemedyPlan(name, rpUseTheTrigger, [condition1, condition2], new LoggerMock())
    
    var result = await rp.invoke(trigger)

    expect(result.name).toBe(name)
    expect(result.conditions.length).toBe(2)
    expect(condition1.executed).toBe(true)
    expect(condition2.executed).toBe(true)
    expect(result.conditions[0].cond1).toBe('done1')
    expect(result.conditions[1].cond2).toBe('done2')
})

test('A condiont fails, RP returns an exception', async () => {    
    var trigger ='trigger'
    var name = 'rp_name'
    var condition1 = new conditionMock(true, {'cond1':'done1'})
    var condition2 = new conditionMock(false, {'cond2':'done2'})
    var rpUseTheTrigger= ['a', 'b', trigger, 'c']
    var rp = new RemedyPlan(name, rpUseTheTrigger, [condition1, condition2], new LoggerMock())
    
    try{
        var result = await rp.invoke(trigger)
        expect(1).toBe(2)
    }
    catch(e){
        expect(condition1.executed).toBe(true)
        expect(condition2.executed).toBe(false)
    }
})

class conditionMock implements Icondition{
    executed : boolean = false
    
    constructor(private errorDuringExecution: boolean, private result: { [key: string]: string; }){}
    
    async execute(data: { [key: string]: string; }): Promise<{ [key: string]: string; }> {
        this.executed = true
        if (this.errorDuringExecution)
            throw new Error('Failed')        
        return this.result
    }
}