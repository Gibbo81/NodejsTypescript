import { PlannedCheckFactory } from "../../service/PlannedCheckFactory";
import { ConfigurationDTO } from "../../service/ConfigurationDTO";
import { BrokenTdTAlreadyInsideARemedyPlan } from "../../businesslogic/plannedCheck/BrokenTdTAlreadyInsideARemedyPlan";
import { BrokenTdTAlreadyInsideIp } from "../../businesslogic/plannedCheck/BrokenTdTAlreadyInsideIp";

test('Read configuration for BrokenTdTAlreadyInsideARemedyPlan', async () => {    
    var conf = getEmptyConfiguration();
    conf.Unplanned_checks.push({Name: 'BrokenTdTAlreadyInsideARemedyPlan'})
    var factory = new PlannedCheckFactory('')

    var result = factory.create(conf)

    expect(result[0]).toBeInstanceOf(BrokenTdTAlreadyInsideARemedyPlan)
    expect(result.length).toBe(1)
})

test('Read configuration for BrokenTdTAlreadyInsideIp', async () => {    
    var conf = getEmptyConfiguration();
    conf.Unplanned_checks.push({Name: 'BrokenTdTAlreadyInsideIp'})
    var factory = new PlannedCheckFactory('')

    var result = factory.create(conf)

    expect(result[0]).toBeInstanceOf(BrokenTdTAlreadyInsideIp)
    expect(result.length).toBe(1)
})

test('Read configuration with two checks', async () => {    
    var conf = getEmptyConfiguration();
    conf.Unplanned_checks.push({Name: 'BrokenTdTAlreadyInsideIp'})
    conf.Unplanned_checks.push({Name: 'BrokenTdTAlreadyInsideARemedyPlan'})
    var factory = new PlannedCheckFactory('')

    var result = factory.create(conf)

    expect(result[0]).toBeInstanceOf(BrokenTdTAlreadyInsideIp)
    expect(result[1]).toBeInstanceOf(BrokenTdTAlreadyInsideARemedyPlan)
    expect(result.length).toBe(2)
})

test('Read invalid configuration, throw exception', async () => {    
    var conf = getEmptyConfiguration();
    conf.Unplanned_checks.push({Name: 'BROKEN'})
    var factory = new PlannedCheckFactory('')

    try{
        var result = factory.create(conf)
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe('invalid UnplannedChecks: BROKEN')
        expect(e).toBeInstanceOf(Error)
    }
})

function getEmptyConfiguration() {
    var conf = new ConfigurationDTO;
    conf.Unplanned_checks = [];
    return conf;
}
