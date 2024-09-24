import { MatchCompleted, MatchDetailed } from "../match";

/**
 * Represents a Notion object for parsing and evaluating betting notations.
 */
export class NotionObject {
    private raw: string;

    /**
     * Creates a new NotionObject.
     * @param {string} code - The raw notation code.
     */
    constructor(code: string) {
        this.raw = code;
    }

    public code() {
        return this.raw;
    }

    /**
     * Checks if the notation is valid.
     * @returns {boolean} True if the notation is valid, false otherwise.
     */
    public isValid(): boolean {
        const regex = /^(?:([HA])_((?:>|>=?|<|<=?|=|!=|E|!E)\d*|OT|P|GLT|BTS|CS_\d+_\d+)_([HA])|AB)$/;
        return regex.test(this.raw);
    }


    /**
     * Checks if a match is complete with all required data.
     * @param {MatchDetailed} match - The match to check.
     * @returns {boolean} True if the match is complete, false otherwise.
     */
    private isMatchComplete(match: MatchDetailed): boolean {
        return (
            match.isCompleted &&
            match.homeScore !== undefined &&
            match.awayScore !== undefined &&
            match.isOverTime !== undefined &&
            match.isDraw !== undefined
        );
    }

    /**
     * Extracts the condition from the raw notation.
     * @returns {string} The extracted condition.
     * @throws {Error} If the notation is invalid.
     */
    private conditionFromRaw(): string {
        const parts = this.raw.split('_');
        if (parts.length === 3) return parts[1];
        if (parts.length === 5) return parts.slice(1, 4).join('_');
        throw new Error('Invalid Notion');
    }

    /**
     * Evaluates a match against the notion.
     * @param {MatchDetailed} match - The match to evaluate.
     * @returns {boolean} The result of the evaluation.
     */
    public evaluateMatch(match: MatchDetailed): boolean {
        if (!this.isMatchComplete(match)) return false;
        const completedMatch = match as unknown as MatchCompleted;

        const condition = this.conditionFromRaw();

        switch (condition) {
            case "OT":
                return completedMatch.isOverTime;
            case "P":
                return completedMatch.isOverTime && completedMatch.isDraw;
            case "GLT":
                // TODO: Implement logic to check if goal-line technology was used
                return false;
            case "BTS":
                return completedMatch.homeScore > 0 && completedMatch.awayScore > 0;
            default:
                return this.evaluateConditionally(condition, completedMatch);
        }
    }

    /**
 * Evaluates a conditional notation against a completed match.
 * @param {string} condition - The condition to evaluate.
 * @param {MatchCompleted} match - The completed match data.
 * @returns {boolean} The result of the condition evaluation.
 */
    private evaluateConditionally(condition: string, match: MatchCompleted): boolean {
        const [homeScore, awayScore] = [match.homeScore, match.awayScore];
        const totalScore = homeScore + awayScore;

        switch (true) {
            case condition.startsWith('CS'):
                const [expectedHome, expectedAway] = condition.substring(3).split("_").map(Number);
                return homeScore === expectedHome && awayScore === expectedAway;
            case condition.startsWith(">="):
                return homeScore >= parseInt(condition.substring(2));
            case condition.startsWith(">"):
                return condition === '>' ? homeScore > awayScore : homeScore > parseInt(condition.substring(1));
            case condition.startsWith("<="):
                return homeScore <= parseInt(condition.substring(2));
            case condition.startsWith("<"):
                return condition === '<' ? homeScore < awayScore : homeScore < parseInt(condition.substring(1));
            case condition === "=":
                return homeScore === awayScore;
            case condition.startsWith("="):
                const expectedScore = parseInt(condition.substring(1));
                return homeScore === expectedScore && awayScore === expectedScore;
            case condition.startsWith("!="):
                return homeScore !== awayScore;
            case condition.startsWith("E"):
                return totalScore === parseInt(condition.substring(1));
            case condition.startsWith("!E"):
                return totalScore !== parseInt(condition.substring(2));
            default:
                return false;
        }
    }


    public toReadable(): string {
        if (!this.isValid()) return '';

        const c = this.conditionFromRaw();
        if (c == "OT") return "Overtime"
        else if (c == "BTS") return "Both teams Score"
        else if (c == "P") return "Penalties"
        else if (c == "CS") return "Correct Score"
        else if (c.startsWith("CS") && c.length > 4) {
            const [expectedHome, expectedAway] = c.substring(3).split("_").map(Number);
            return `Correct Score: ${expectedHome} - ${expectedAway}`
        }
        else if (c.startsWith(">=")) return `Win with ${c.substring(2)}+ goals`
        else if (c.startsWith(">") && c.length > 1) return `Win with ${c.substring(1)} goals`
        else if (c.startsWith(">") && c.length === 1) return `Win`
        else if (c.startsWith("<=")) return `Lose with ${c.substring(1)}+ goals`
        else if (c.startsWith("<") && c.length > 1) return `Lose with ${c.substring(2)} goals`
        else if (c.startsWith("<") && c.length === 1) return `Lose`
        else if (c == "=") return "Draw"
        else if (c == "!=") return "NOT Draw"
        else if (c.startsWith("=")) return `Draw with ${c.substring(1)} goals`
        else if (c.startsWith("E")) return `Game Ends with ${c.substring(1)} goals`
        else if (c.startsWith("!E")) return `NOT End with ${c.substring(2)} goals`
        return ''
    }

    public toReadableWithTeams(home: string, away: string, supports: string): string {
        if (!this.isValid()) return '';
        const supportsHome = home == supports;
        const other = supportsHome ? away : home;

        const c = this.conditionFromRaw();
        if (c == "OT") return "Match ends Overtime"
        else if (c == "BTS") return `Both ${home} and ${away} score`
        else if (c == "P") return "Match ends with Penalties"
        else if (c == "CS") return "Correct Score"
        else if (c.startsWith("CS") && c.length > 4) {
            const [expectedHome, expectedAway] = c.substring(3).split("_").map(Number);
            return `Correct Score: ${home} (${expectedHome} - ${expectedAway}) ${away}`;
        }
        else if (c.startsWith(">=")) return `${supports} Win ${other} with ${c.substring(2)}+ goal(s)`
        else if (c.startsWith(">") && c.length > 1) return `${supports} Win ${other} with ${c.substring(1)} goal(s)`
        else if (c.startsWith(">") && c.length === 1) return `${supports} Win ${other}`
        else if (c.startsWith("<=")) return `${supports} lose to ${other} and concieve ${c.substring(1)}+ goal(s)`
        else if (c.startsWith("<") && c.length > 1) return `${supports} lose to ${other} and concieve ${c.substring(2)} goal(s)`
        else if (c.startsWith("<") && c.length === 1) return `${supports} lose to ${other}`
        else if (c == "=") return `${supports} draw with ${other}`
        else if (c == "!=") return `${supports} NOT draw with ${other}. one team must win`
        else if (c.startsWith("=")) return `${supports} draw with ${other}, ${c.substring(1)} goal(s) scored by each team`
        else if (c.startsWith("E")) return `Game Ends with ${c.substring(1)} goal(s)`
        else if (c.startsWith("!E")) return `NOT End with ${c.substring(2)} goal(s)`
        return ''
    }

    static generatePrimitiveCodes(): string[]{
        
        return []
    }

    /**
     * generate a list of notion codes
     * 
     * @example
     * ```
     * NotionObject.generateCodesFromGoalCount(1);
     * // ["H_>=1_A", "H_<=1_A", "H_>1_A", "H_<1_A", ...]
     * ```
     * 
     * @param goals number of goals to generate notions for
     * @returns string[] an array of strings (raw notion codes)
     */
    static generateCodesFromGoalCount(goals: number): string[] {
        return []
    }
}

const nots = NotionObject.generateCodesFromGoalCount(10)
console.log(nots);
