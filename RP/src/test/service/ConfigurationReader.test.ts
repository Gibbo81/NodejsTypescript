import fs from "fs/promises";
import { ConfigurationReader } from "../../service/ConfigurationReader";


test('Two Json files present -> two remedy plan loaded', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['a.json','b.txt','c.json','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetRemedyPlan1())
    readFileMock.mockResolvedValueOnce(GetRemedyPlan2())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder)

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

test('One invalid JsonFile -> ThrowException', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['a.json','b.txt','c.json','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetBrokenRemedy())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder)

    try{
        await reader.load()
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe('missing trigger - pippusFolder/a.json ***')
        expect(e).toBeInstanceOf(Error)
    }
})

test('No JsonFile inside the folder -> ThrowException', async () => {    
    jest.mock("fs/promises");
    fs.readdir =jest.fn().mockResolvedValueOnce(['b.txt','d.7zip']) 
    var readFileMock = jest.fn()
    readFileMock.mockResolvedValueOnce(GetBrokenRemedy())
    fs.readFile =readFileMock
    var folder ="pippusFolder/"
    var reader = new ConfigurationReader(folder)

    try{
        await reader.load()
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe(`Load configuration from ${folder} 0 Remedy plan found`)
        expect(e).toBeInstanceOf(Error)
    }
})

function GetBrokenRemedy():string{
    return `{
        "Name" : "Remedy_pluto",
        "Unplanned_checks":[
            {
                "name": "AlreadyPresent"
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

function GetRemedyPlan1():string{
    return `{
        "Name" : "Remedy_pippo",
        "Triggers":[
            {
                "name": "API_POST_input1"
            }
        ],
        "Unplanned_checks":[
            {
                "name": "AlreadyPresent"
            }	
        ],
        "Conditions":[
            {
                "Name": "CreateRemedyPlan"
            },
            {
                "Name": "CreateIP",
                "Type": "Possession"
            },
            {
                "Name": "CreateTaskChain",
                "Type": "RemedyBase"
            },
            {
                "Name": "CreateTaskChain",
                "Type": "RemedyConditionUnknowDuration"
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
                "name": "API_POST_input1"
            }
        ],
        "Unplanned_checks":[
            {
                "name": "AlreadyPresent"
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