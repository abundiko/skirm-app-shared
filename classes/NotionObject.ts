import { MatchCompleted, MatchDetailed } from "../match";


export class NotionObject {
    private raw: string;

    constructor(code: string) {
        this.raw = code;
    }

    public isValid(): boolean {
        // Regular expression to match a valid Notion code format
        const regex = /^([HA])_([>>=<<=!=E!E]=?\d*|E|!E|OT|P|GLT|BTS|CS_\d+_\d+)_([HA])$/;

        // Check if the code matches the regular expression
        return regex.test(this.raw);
    }

    private evaluateConditionally(condition: string, match: MatchCompleted): boolean {
        const _ = condition;
        if (_.startsWith('CS')) {
            const [homeScore, awayScore] = condition.substring(3).split("_");
            return match.homeScore === parseInt(homeScore) && match.awayScore === parseInt(awayScore);
        }
        else if (_.startsWith(">=")) {
            return match.homeScore >= parseInt(condition.substring(2));
        }
        else if (_.startsWith(">") ) {
            if(_ === '>') return match.homeScore > match.awayScore;
            return match.homeScore > parseInt(condition.substring(1))
        }
        else if (_.startsWith("<=")) {
            return match.homeScore <= parseInt(condition.substring(2));
        }
        else if (_.startsWith("<") ) {
            if(_ === '<') return match.homeScore < match.awayScore;
            return match.homeScore < parseInt(condition.substring(1))
        }
        else if (_.startsWith("=") && _.length === 1) {
            return match.homeScore === match.awayScore;
        }
        else if (_.startsWith("=") && _.length > 1) {
            return match.homeScore === parseInt(condition.substring(1)) && match.awayScore === parseInt(condition.substring(1));
        }
        else if (_.startsWith("!=")) {
            return match.homeScore !== match.awayScore;
        }
        else if (_.startsWith("E")) {
            return match.homeScore + match.awayScore === parseInt(condition.substring(1));
        }
        else if (_.startsWith("!E")) {
            return match.homeScore + match.awayScore !== parseInt(condition.substring(2));
        }

        return false;
    }

    private isMatchComplete(match: MatchDetailed): boolean {
        return (match.isCompleted &&
            match.homeScore !== undefined &&
            match.awayScore !== undefined &&
            match.isOverTime !== undefined &&
            match.isDraw !== undefined)
    }

    private conditionFromRaw(): string {
        if (this.raw.split("_").length === 3) return this.raw.split('_')[1]
        else if (this.raw.split("_").length === 5) return this.raw.split('_').slice(1, 3).join('');
        else throw new Error('Ivnalid Notion');
    }

    public evaluateMatch(match: MatchDetailed): boolean {
        // Check if the match is completed
        if (!this.isMatchComplete(match)) return false;
        const m = match as unknown as MatchCompleted;

        const condition = this.conditionFromRaw();

        // Evaluate the match based on the Notion code
        switch (condition) {

            case "OT":
                return m.isOverTime;
            case "P":
                return m.isOverTime && m.isDraw; // Assuming draw after OT implies penalties
            case "GLT":
                // Implement logic to check if goal-line technology was used
                return false; // Placeholder
            case "BTS":
                return m.homeScore > 0 && m.awayScore > 0;
            default:
                return this.evaluateConditionally(condition, m as unknown as MatchCompleted);
        }
    }
}