import { BrokenTdTAlreadyInsideARemedyPlan } from "../../businesslogic/plannedCheck/BrokenTdTAlreadyInsideARemedyPlan";
//import { ILogger } from "../../businesslogic/plugIn/Ilogger";
import { IReadRemedyPlan } from "../../businesslogic/plugIn/IReadRemedy";
import { ITdT } from "../../businesslogic/plugIn/ITdT";
import { LoggerMock } from "../utility/LoggerMock";


test('Broken TdT is not included in an active RP, the check return false', async () => {    
    var brokenTdt = 'TdT99'
    var remedyPlanReader = new IReadRemedyPlanMock([10, 56])
    var TdTreader = new ITdTMock([['Tdt1','Tdt2'],['Tdt3','Tdt4','Tdt5']])
    var toTests = new BrokenTdTAlreadyInsideARemedyPlan(new LoggerMock(), remedyPlanReader, TdTreader)

    var result = await toTests.isAlreadyPlanned({'TdT':brokenTdt})

    expect(result).toBe(false)
    expect(remedyPlanReader.calledParameters).toStrictEqual(['Operational','Assigned', 'Milestone Missed'])
    expect(remedyPlanReader.called).toBe(true)
    expect(TdTreader.callCount).toBe(2)
    expect(TdTreader.callParameters[0]).toBe(10)
    expect(TdTreader.callParameters[1]).toBe(56)
})

test('Broken TdT is included in an active RP, the check return true', async () => {    
    var brokenTdt = 'TdT99'
    var remedyPlanReader = new IReadRemedyPlanMock([10, 56])
    var TdTreader = new ITdTMock([['Tdt1', brokenTdt],['Tdt3','Tdt4','Tdt5']])
    var toTests = new BrokenTdTAlreadyInsideARemedyPlan(new LoggerMock(), remedyPlanReader, TdTreader)

    var result = await toTests.isAlreadyPlanned({'TdT':brokenTdt})

    expect(result).toBe(true)
    expect(remedyPlanReader.calledParameters).toStrictEqual(['Operational','Assigned', 'Milestone Missed'])
    expect(remedyPlanReader.called).toBe(true)
    expect(TdTreader.callCount).toBe(1)
    expect(TdTreader.callParameters[0]).toBe(10)
})

test('An error occurs, the check return an exception', async () => {    
    var brokenTdt = 'TdT99'
    var tooManyuAreas = [10, 56, 9999, 9965625]
    var remedyPlanReader = new IReadRemedyPlanMock(tooManyuAreas)
    var TdTreader = new ITdTMock([['Tdt1', brokenTdt],['Tdt3','Tdt4','Tdt5']])
    var toTests = new BrokenTdTAlreadyInsideARemedyPlan(new LoggerMock(), remedyPlanReader, TdTreader)

    try{
        await toTests.isAlreadyPlanned({'TdT':brokenTdt})
        expect(2).toBe(1)
    }
    catch(e){
        expect(e).toBeInstanceOf(Error)  
    }
})

class IReadRemedyPlanMock implements IReadRemedyPlan{
    public calledParameters: string[] = []
    public called: boolean=false 
    constructor(private returningAreas: number[]){}
    
    async readRPsAreaByStates(states: string[]): Promise<number[]> {
        this.called= true
        this.calledParameters = states
        return this.returningAreas
    }
}

class ITdTMock implements ITdT{
    public callCount: number =0
    public callParameters: number[]=[]

    constructor(private returningTdTs : string[][]){}

    async getTdTByArea(area: number): Promise<string[]> {
        var result = this.returningTdTs[this.callCount]
        this.callParameters.push(area)
        this.callCount += 1
        return result
    }
}
