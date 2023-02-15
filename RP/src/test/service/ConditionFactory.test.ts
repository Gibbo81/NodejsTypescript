import { ConditionFactory } from "../../service/ConditionFactory";
import { Condition, ConfigurationDTO } from "../../service/ConfigurationDTO";
import { CreateCondition_IP } from "../../businesslogic/conditions/CreateCondition_IP";
import { CreateRemediPlan } from "../../businesslogic/conditions/CreateRemedyPlan";


test('single condition of type CreateCondition_IP', async () => {    
    var configuration = getEmptyConfiguration()
    var condition = new Condition()
    condition.Name = 'CreateInfrastructureProvision'
    condition.Duration = 98
    condition.KindId =2
    condition.TopologyId = 9
    configuration.Conditions.push(condition)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(CreateCondition_IP)
})

test('single condition of type CreateRemediPlan', async () => {    
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

test('two conditions one of type CreateRemediPlan and one of type CreateRemediPlan', async () => {    
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
    configuration.Conditions.push(condition2)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(2)
    expect(result[0]).toBeInstanceOf(CreateRemediPlan)
    expect(result[1]).toBeInstanceOf(CreateCondition_IP)
})

test('two conditions one of type CreateRemediPlan and one of type CreateRemediPlan', async () => {    
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
    configuration.Conditions.push(condition2)
    var factory = new ConditionFactory('')

    var result = factory.create(configuration)

    expect(result.length).toBe(2)
    expect(result[0]).toBeInstanceOf(CreateRemediPlan)
    expect(result[1]).toBeInstanceOf(CreateCondition_IP)
})

test('single condition of type CreateCondition_IP but duration is missing, factory throws exception', async () => {    

    expect(1).toBe(2)
})


function getEmptyConfiguration() {
    var conf = new ConfigurationDTO;
    conf.Conditions= []
    return conf;
}