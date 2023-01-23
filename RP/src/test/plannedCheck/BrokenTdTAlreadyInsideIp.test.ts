import { BrokenTdTAlreadyInsideIp } from "../../businesslogic/plannedCheck/BrokenTdTAlreadyInsideIp";
import { IReadInfrastructionProvision } from "../../businesslogic/plugIn/IReadInfrastructionProvision";
import { LoggerMock } from "../utility/LoggerMock";

test('TdT is not in an active Ip, the check return false', async () => {    
    var reader = new IReadInfrastructionProvisionMock([10, 66], [['a','b'],['c','d', 'e']])
    var check = new BrokenTdTAlreadyInsideIp(reader, new LoggerMock())

    var result = await check.isAlreadyPlanned({TdT: 'z'})

    expect(result).toBe(false)
    expect(reader.readIP).toBe(true)
    expect(reader.readTdTCount).toBe(2)
    expect(reader.readTdTParameters[0]).toBe(10)
    expect(reader.readTdTParameters[1]).toBe(66)
})

test('TdT is inside the first IP, the check return true', async () => {    
    var TdT = 'z'
    var reader = new IReadInfrastructionProvisionMock([10, 66], [['a',TdT],['c','d', 'e']])
    var check = new BrokenTdTAlreadyInsideIp(reader, new LoggerMock())

    var result = await check.isAlreadyPlanned({TdT})

    expect(result).toBe(true)
    expect(reader.readIP).toBe(true)
    expect(reader.readTdTCount).toBe(1)    
    expect(reader.readTdTParameters[0]).toBe(10)
})

test('TdT information is missing, the check throws an exception', async () => {    
    var TdT = 'z'
    var reader = new IReadInfrastructionProvisionMock([10, 66], [['a',TdT],['c','d', 'e']])
    var check = new BrokenTdTAlreadyInsideIp(reader, new LoggerMock())

    try{
        await check.isAlreadyPlanned({})
        expect(2).toBe(1)
    }
    catch(e){
        expect(e.message).toBe('BrokenTdTAlreadyInsideIp check: missing TdT value')
        expect(e).toBeInstanceOf(Error)
        expect(reader.readIP).toBe(false)
        expect(reader.readTdTCount).toBe(0)    
    }
})

class  IReadInfrastructionProvisionMock implements IReadInfrastructionProvision{
    constructor(private IPRead:number[], private readTdT:string[][] ){}
    private count =0
    public readIP = false 
    public readTdTCount = 0
    public readTdTParameters : number[] = []

    async readAllActivePossessionAndTsa(): Promise<number[]> {
        this.readIP = true
        return this.IPRead
    }

    async readTdTByIp(ipId: number): Promise<string[]> {
        this.readTdTCount++
        this.readTdTParameters.push(ipId)
        return this.readTdT[this.count++]
    }
}