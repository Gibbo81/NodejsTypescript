export class RemedyPlanDTO{
    id: string 
    owner : string
    status: string
    priority: number
    rootCouses: rootcause[]
    conditions : condition[]
    disservice : disservice[]
    alternativeRemedyPlans : string[]
}


class rootcause{
    type: string
    id : string
    correlation: string
}

class condition{
    id : string
    correlation: string
}

class disservice{
    id : string
    correlation: string
}