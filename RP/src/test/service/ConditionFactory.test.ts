import { ConditionFactory } from "../../service/ConditionFactory";
import { Condition, ConfigurationDTO } from "../../service/ConfigurationDTO";
import { CreateCondition_IP_FixedDuretion } from "../../businesslogic/conditions/CreateCondition_IP_FixedDuretion";
import { CreateRemediPlan } from "../../businesslogic/conditions/CreateRemedyPlan";


test('Single condition of type CreateCondition_IP', async () => {    
    var configuration = getEmptyConfiguration()
    var condition = new Condition()
    condition.Name = 'CreateInfrastructureProvision'
    condition.Duration = 98
    condition.KindId =2
    condition.TopologyId = 9
    condition.DeterminedDuration = true
    configuration.Conditions.push(condition)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(CreateCondition_IP_FixedDuretion)
})

test('Single condition of type CreateRemediPlan', async () => {    
    var configuration = getEmptyConfiguration()
    var condition = new Condition()
    condition.Name = 'CreateRemedyPlan'
    condition.Status = 'Pippo'
    configuration.Conditions.push(condition)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(CreateRemediPlan)
})

test('Two conditions one of type CreateRemediPlan and one of type CreateInfrastructureProvision', async () => {    
    var configuration = getEmptyConfiguration()
    var condition1 = new Condition()
    condition1.Name = 'CreateRemedyPlan'
    condition1.Status = 'Pippo'
    configuration.Conditions.push(condition1)
    var condition2 = new Condition()
    condition2.Name = 'CreateInfrastructureProvision'
    condition2.Duration = 98
    condition2.KindId =2
    condition2.TopologyId = 9
    condition2.DeterminedDuration = true
    configuration.Conditions.push(condition2)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(2)
    expect(result[0]).toBeInstanceOf(CreateRemediPlan)
    expect(result[1]).toBeInstanceOf(CreateCondition_IP_FixedDuretion)
})

test('Two conditions one of type CreateRemediPlan and one of type CreateRemediPlan', async () => {    
    var configuration = getEmptyConfiguration()
    var condition1 = new Condition()
    condition1.Name = 'CreateRemedyPlan'
    condition1.Status = 'Pippo'
    configuration.Conditions.push(condition1)
    var condition2 = new Condition()
    condition2.Name = 'CreateInfrastructureProvision'
    condition2.Duration = 98
    condition2.KindId =2
    condition2.TopologyId = 9
    condition2.DeterminedDuration = true
    configuration.Conditions.push(condition2)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(2)
    expect(result[0]).toBeInstanceOf(CreateRemediPlan)
    expect(result[1]).toBeInstanceOf(CreateCondition_IP_FixedDuretion)
})

test('Single condition of type CreateCondition_IP but duration and KindId are missing, factory throws exception', async () => {    
    var configuration = getEmptyConfiguration()
    var condition = new Condition()
    condition.Name = 'CreateInfrastructureProvision'
    condition.TopologyId = 9
    condition.DeterminedDuration = true
    configuration.Conditions.push(condition)
    var factory = new ConditionFactory('')

    try{
        factory.create(configuration)
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe('ConditionFactory invalid data ["Duration is null for condition CreateInfrastructureProvision","KindId is null for condition CreateInfrastructureProvision"] - configuration data: {"Name":"CreateInfrastructureProvision","TopologyId":9,"DeterminedDuration":true}')
        expect(e).toBeInstanceOf(Error)
    }
})

test('Single condition of type CreateRemedyPlan but status is missing, factory throws exception', async () => {    
    var configuration = getEmptyConfiguration()
    var condition = new Condition()
    condition.Name = 'CreateRemedyPlan'
    configuration.Conditions.push(condition)
    var factory = new ConditionFactory('')

    try{
        factory.create(configuration)
        expect(1).toBe(2)
    }
    catch(e){
        expect(e.message).toBe('Status is null for condition CreateRemedyPlan - configuration data: {"Name":"CreateRemedyPlan"}')
        expect(e).toBeInstanceOf(Error)
    }
})


function getEmptyConfiguration() {
    var conf = new ConfigurationDTO;
    conf.Conditions= []
    return conf;
}