export function dateStringToDate (s : string):Date{
    const parts= s.split('/').map((x: string): number => parseInt(x))
    return new Date(parts[2],  parts[1]-1, parts[0]  )
}

export const dateStringToDate2 =(s: string) => {
    const parts= s.split('/').map((x: string): number => parseInt(x))
    return new Date(parts[2],  parts[1]-1, parts[0]  )
}