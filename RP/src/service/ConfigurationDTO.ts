export class ConfigurationDTO{
    public Name: string
    public Triggers:TriggerDTO[] 
    public Unplanned_checks:UnplannedChecks[] 
    public Conditions:Condition[] 
    public ClosingAction:ClosingAction[]
}

class UnplannedChecks {
    public name: string 
}

class TriggerDTO {
    public name: string 
}

class Condition {
    public name: string 
    public Type: string 
}

class ClosingAction {
    public name: string 
}