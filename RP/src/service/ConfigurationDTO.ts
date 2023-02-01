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
}

export class Condition {
    public Name: string 
    public Type: string 
    public Status: string
}

class ClosingAction {
    public Name: string 
}