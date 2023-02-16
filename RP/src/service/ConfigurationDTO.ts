export class ConfigurationDTO{
    public Name: string
    public Triggers:TriggerDTO[] 
    public Unplanned_checks:UnplannedChecks[] 
    public Conditions:Condition[] 
    public ClosingAction:ClosingAction[]
}

export class UnplannedChecks {
    public Name: string 
}

class TriggerDTO {
    public Name: string
    public Priority: number 
}

export class Condition {
    public Name: string 
    public Type: string | undefined
    public Status: string | undefined
    public KindId: number | undefined
    public TopologyId: number | undefined
    public Duration: number | undefined
    public DeterminedDuration: boolean | undefined
}

class ClosingAction {
    public Name: string 
}