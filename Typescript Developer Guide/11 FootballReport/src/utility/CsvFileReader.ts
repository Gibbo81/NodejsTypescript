import fs from 'fs';

export class CsvFileReader{
    private path: string;
    constructor(path: string) {
      this.path = path;
    }
    
    public Read(): string[][]{
        return fs.readFileSync(this.path, {encoding: 'utf-8'})
        .split('\n')
        .map((row: string): string[] => { return row.split(',')})
    }
}