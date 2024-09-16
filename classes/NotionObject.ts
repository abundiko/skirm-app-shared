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

    /**
     * Checks if the notation is valid.
     * @returns {boolean} True if the notation is valid, false otherwise.
     */
    public isValid(): boolean {
        const regex = /^(?:([HA])_((?:>|>=?|<|<=?|=|!=|E|!E)\d*|OT|P|GLT|BTS|CS_\d+_\d+)_([HA])|AB)$/;
        return regex.test(this.raw);
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
}