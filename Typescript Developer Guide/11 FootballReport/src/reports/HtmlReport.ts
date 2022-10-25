import fs from 'fs';
import {Ipublisher} from '../MatchsAnalysis'

export class HtmlPublisher implements Ipublisher{
    print(report: string): void {
        const html = `
        <div>
            <h1>Analysis output</h1>
            <div>${report}</div>
        </div>`
        fs.writeFileSync('report.html', html)
    }

}