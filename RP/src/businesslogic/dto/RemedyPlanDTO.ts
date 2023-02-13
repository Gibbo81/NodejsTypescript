export class RemedyPlanDTO{
    id: string 
    owner : string
    status: string
    priority: number
    divergences: rootcause[]
    conditions : condition[]
    disservice : disservice[]
    alternativeRemedyPlans : string[]
}


export class rootcause{
    type: string
    triggerName : string
    id : string
    detectionTime: string
    status: string
    areaId : number
    hidden: boolean
    primary : boolean
}

class condition{
    id : string
    correlation: string
}

class disservice{
    id : string
    correlation: string
}