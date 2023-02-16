import fs from "fs/promises";
import { ConditionFactory } from "../../service/ConditionFactory";
import { ConfigurationReader } from "../../service/ConfigurationReader";
import { LoggerMock } from "../utility/LoggerMock";
import { PlannedCheckFactory } from "../../service/PlannedCheckFactory";

test('Two Json files present -> two remedy plan loaded', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['a.json','b.txt','c.json','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetRemedyPlan1())
    readFileMock.mockResolvedValueOnce(GetRemedyPlan2())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder, new ConditionFactory(''), new PlannedCheckFactory(''), new LoggerMock())

    var result = await reader.load()

    expect(result.length).toBe(2)
    expect(result[0].name).toBe('Remedy_pippo')
    expect(result[1].name).toBe('Remedy_pluto')
    expect(fs.readdir).toHaveBeenCalledTimes(1);
    expect(fs.readdir).toHaveBeenCalledWith(folder);
    expect(fs.readFile).toHaveBeenCalledTimes(2);
    expect(fs.readFile).toHaveBeenCalledWith(folder+'a.json', 'utf8');
    expect(fs.readFile).toHaveBeenCalledWith(folder+'c.json', 'utf8');
})

test('One invalid JsonFile "missing trigger" -> ThrowException', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['a.json','b.txt','c.json','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetBrokenRemedyMisingTriggers())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder, new ConditionFactory(''), new PlannedCheckFactory(''), new LoggerMock())

    try{
        await reader.load()
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe('missing trigger - pippusFolder/a.json ***')
        expect(e).toBeInstanceOf(Error)
    }
})

test('One invalid JsonFile "broken condition" -> ThrowException', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['a.json','b.txt','c.json','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetRemedyPlanWithBrokenCreateRemedyPlanCondiution())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder, new ConditionFactory(''), new PlannedCheckFactory(''), new LoggerMock())

    try{
        await reader.load()
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe('Status is null for condition CreateRemedyPlan - configuration data: {\"Name\":\"CreateRemedyPlan\"}')
        expect(e).toBeInstanceOf(Error)
    }
})

test('No JsonFile inside the folder -> ThrowException', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['b.txt','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetBrokenRemedyMisingTriggers())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder, new ConditionFactory(''), new PlannedCheckFactory(''), new LoggerMock())

    try{
        await reader.load()
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe(`Load configuration from ${folder} 0 Remedy plan found`)
        expect(e).toBeInstanceOf(Error)
    }
})

function GetBrokenRemedyMisingTriggers():string{
    return `{
        "Name" : "Remedy_pluto",
        "Unplanned_checks":[
            {
                "Name": "BrokenTdTAlreadyInsideARemedyPlan"
            }	
        ],
        "Conditions":[
            {
                "Name": "CreateRemedyPlan",
                "Status": "Just-Created"
            }
        ],
        "ClosingAction"	:[]
    }`
}

function GetRemedyPlan1():string{
    return `{
        "Name" : "Remedy_pippo",
        "Triggers":[
            {
                "name": "API_POST_input1",
                "Priority" : 10
            }
        ],
        "Unplanned_checks":[
            {
                "Name": "BrokenTdTAlreadyInsideARemedyPlan"
            }	
        ],
        "Conditions":[
            {
                "Name": "CreateRemedyPlan",
                "Status": "Just-Created"
            },
            {
                "Name": "CreateInfrastructureProvision",
                "KindId": 7,
                "TopologyId": 1,
                "Duration": 7
            }
        ],
        "ClosingAction"	:[]
    }`
}

function GetRemedyPlan2():string{
    return `{
        "Name" : "Remedy_pluto",
        "Triggers":[
            {
                "name": "API_POST_input1",
                "Priority" : 23
            },
            {
                "name": "API_POST_input2",
                "Priority" : 239
            }
        ],
        "Unplanned_checks":[
            {
                "Name": "BrokenTdTAlreadyInsideARemedyPlan"
            }	
        ],
        "Conditions":[
            {
                "Name": "CreateRemedyPlan",
                "Status": "Just-Created"
            }
        ],
        "ClosingAction"	:[]
    }`
}

function GetRemedyPlanWithBrokenCreateRemedyPlanCondiution():string{
    return `{
        "Name" : "Remedy_pluto",
        "Triggers":[
            {
                "name": "API_POST_input1"
            }
        ],
        "Unplanned_checks":[
            {
                "Name": "BrokenTdTAlreadyInsideARemedyPlan"
            }	
        ],
        "Conditions":[
            {
                "Name": "CreateRemedyPlan"
            }
        ],
        "ClosingAction"	:[]
    }`
}