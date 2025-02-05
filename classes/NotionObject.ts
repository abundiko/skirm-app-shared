import { MatchCompleted, MatchDetailed } from '../match';

export type NotionString = `H${string}A` | `A${string}H`;

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
    const regex =
      /^(?:([HA])_((?:>|>=?|<|<=?|=|!=|E|!E)\d*(?:\.\d+)?|OT|P|GLT|CLEAN|BTS|CS_\d+_\d+|O\d+(?:\d+)?|U\d+(?:\d+)?)_([HA])|AB)$/;
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
      case 'OT':
        return completedMatch.isOverTime;
      case 'P':
        return completedMatch.isOverTime && completedMatch.isDraw;
      case 'GLT':
        // TODO: Implement logic to check if goal-line technology was used
        return false;
      case 'BTS':
        return completedMatch.homeScore > 0 && completedMatch.awayScore > 0;
      case 'CLEAN':
        return (
          (completedMatch.homeScore >= 0 && completedMatch.awayScore === 0) ||
          (completedMatch.awayScore >= 0 && completedMatch.homeScore === 0)
        );
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
        const [expectedHome, expectedAway] = condition.substring(3).split('_').map(Number);
        return homeScore === expectedHome && awayScore === expectedAway;
      case condition.startsWith('>='):
        return homeScore >= parseInt(condition.substring(2));
      case condition.startsWith('>'):
        return condition === '>'
          ? homeScore > awayScore
          : homeScore > parseInt(condition.substring(1));
      case condition.startsWith('<='):
        return homeScore <= parseInt(condition.substring(2));
      case condition.startsWith('<'):
        return condition === '<'
          ? homeScore < awayScore
          : homeScore < parseInt(condition.substring(1));
      case condition === '=':
        return homeScore === awayScore;
      case condition.startsWith('='):
        const expectedScore = parseInt(condition.substring(1));
        return homeScore === expectedScore && awayScore === expectedScore;
      case condition.startsWith('!='):
        return homeScore !== awayScore;
      case condition.startsWith('E'):
        return totalScore === parseInt(condition.substring(1));
      case condition.startsWith('!E'):
        return totalScore !== parseInt(condition.substring(2));
      case condition.startsWith('O'):
        return totalScore >= parseInt(condition.substring(1));
      case condition.startsWith('U'):
        return totalScore < parseInt(condition.substring(1));
      default:
        return false;
    }
  }

  public toReadable(): string {
    if (!this.isValid()) return '';

    const c = this.conditionFromRaw();
    if (c == 'OT') return 'Overtime';
    else if (c == 'BTS') return 'Both teams Score';
    else if (c == 'P') return 'Penalties';
    else if (c == 'CS') return 'Correct Score';
    else if (c.startsWith('CS') && c.length > 4) {
      const [expectedHome, expectedAway] = c.substring(3).split('_').map(Number);
      return `Correct Score: ${expectedHome} - ${expectedAway}`;
    } else if (c.startsWith('>=')) return `Win with ${c.substring(2)}+ goal(s)`;
    else if (c.startsWith('>') && c.length > 1) return `Win with ${c.substring(1)} goal(s)`;
    else if (c.startsWith('>') && c.length === 1) return `Win`;
    else if (c.startsWith('<=')) return `Lose with ${c.substring(2)}+ goal(s)`;
    else if (c.startsWith('<') && c.length > 1) return `Lose with ${c.substring(1)} goal(s)`;
    else if (c.startsWith('<') && c.length === 1) return `Lose`;
    else if (c == '=') return 'Draw';
    else if (c == '!=') return 'NOT Draw';
    else if (c.startsWith('=')) return `Draw with ${c.substring(1)} goal(s)`;
    else if (c.startsWith('E')) return `Game Ends with ${c.substring(1)} goal(s)`;
    else if (c.startsWith('!E')) return `NOT End with ${c.substring(2)} goal(s)`;
    else if (c.startsWith('O')) return `Over ${c.substring(1)}.5`;
    else if (c.startsWith('U')) return `Under ${c.substring(1)}.5`;
    return '';
  }

  public toReadableWithTeams(home: string, away: string): string {
    if (!this.isValid()) return '';
    const supports = home;
    const supportsHome = home == supports;
    const other = supportsHome ? away : home;

    const c = this.conditionFromRaw();
    if (c == 'OT') return 'Match ends Overtime';
    else if (c == 'BTS') return `Both ${home} and ${away} score`;
    else if (c == 'P') return 'Match ends with Penalties';
    else if (c == 'CS') return 'Correct Score';
    else if (c.startsWith('CS') && c.length > 4) {
      const [expectedHome, expectedAway] = c.substring(3).split('_').map(Number);
      return `Correct Score: ${home} (${expectedHome} - ${expectedAway}) ${away}`;
    } else if (c.startsWith('>='))
      return `${supports} Win ${other} with ${c.substring(2)}+ goal(s)`;
    else if (c.startsWith('>') && c.length > 1)
      return `${supports} Win ${other} with ${c.substring(1)} goal(s)`;
    else if (c.startsWith('>') && c.length === 1) return `${supports} Win ${other}`;
    else if (c.startsWith('<='))
      return `${supports} lose to ${other} and concieve ${c.substring(2)}+ goal(s)`;
    else if (c.startsWith('<') && c.length > 1)
      return `${supports} lose to ${other} and concieve ${c.substring(2)} goal(s)`;
    else if (c.startsWith('<') && c.length === 1) return `${supports} lose to ${other}`;
    else if (c == '=') return `${supports} draw with ${other}`;
    else if (c == '!=') return `${supports} NOT draw with ${other}. one team must win`;
    else if (c.startsWith('='))
      return `${supports} draw with ${other}, ${c.substring(1)} goal(s) scored by each team`;
    else if (c.startsWith('E')) return `Game Ends with ${c.substring(1)} goal(s)`;
    else if (c.startsWith('!E')) return `NOT End with ${c.substring(2)} goal(s)`;
    else if (c.startsWith('O')) return `At least ${c.substring(1)} goal(s) scored`;
    else if (c.startsWith('U')) return `At most ${c.substring(1)} goal(s) scored`;
    return '';
  }

  static generatePrimitiveCodes(): string[] {
    const list: string[] = ['BTS', 'OT', 'P'].map(this.withHA);
    return list;
  }

  private static withHA(condition: string): string {
    return `H_${condition}_A`;
  }

  private static generateWinCodes(count: number): string[] {
    const codes: string[] = [];

    for (let i = 0; i <= count; i++) {
      if (i == 0) {
        codes.push(this.withHA('>'));
        codes.push(this.withHA('<'));
      } else {
        codes.push(this.withHA(`>${i}`));
        codes.push(this.withHA(`>=${i}`));
        codes.push(this.withHA(`<${i}`));
        codes.push(this.withHA(`<=${i}`));
      }
    }
    return codes;
  }
  private static generateDrawCodes(count: number): string[] {
    const codes: string[] = [];

    codes.push(this.withHA('!='));
    for (let i = 0; i <= count; i++) {
      codes.push(this.withHA(`=${i == 0 ? '' : i}`));
    }

    return codes;
  }
  private static generateEndCodes(count: number): string[] {
    const codes: string[] = [];

    for (let i = 1; i <= count; i++) {
      codes.push(this.withHA(`E${i}`));
      codes.push(this.withHA(`!E${i}`));
    }

    return codes;
  }
  private static generateOverAndUnderCodes(count: number): string[] {
    const codes: string[] = [];

    for (let i = 1; i <= count; i++) {
      codes.push(this.withHA(`O${i}`));
      codes.push(this.withHA(`U${i}`));
    }

    return codes;
  }
  private static generateCorrectScoreCodes(count: number): string[] {
    const codes: string[] = [];

    for (let i = 0; i <= count; i++) {
      for (let j = 0; j <= count; j++) {
        codes.push(this.withHA(`CS_${i}_${j}`));
      }
    }

    return codes;
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
  static generateCodesFromGoalCount(goals: number, maxGoals = 15): string[] {
    if (goals > 15) goals = maxGoals;
    return [
      ...this.generatePrimitiveCodes(),
      ...this.generateWinCodes(goals),
      ...this.generateDrawCodes(goals),
      ...this.generateEndCodes(goals),
      ...this.generateOverAndUnderCodes(goals),
      ...this.generateCorrectScoreCodes(goals),
    ];
  }

  static groupIntoCategories(notions: string[]): NotionGroup[] {
    let groups: Record<NotionCategories, string[]> = [] as any;
    NOTION_CATEGORIES.forEach((cat) => {
      groups[cat] = [];
    });

    const primitiveCodes = this.generatePrimitiveCodes();

    notions.forEach((notion) => {
      if (!new NotionObject(notion).isValid()) return;
      if (primitiveCodes.includes(notion)) {
        groups['others'].push(notion);
        return;
      }
      let not = notion.replace('H_', '');
      not = not.replace('_A', '');
      if (not.startsWith('E') || not.startsWith('!E')) {
        groups['end_score'].push(notion);
      } else if (not.startsWith('>')) {
        groups['win'].push(notion);
      } else if (not.startsWith('<')) {
        groups['lose'].push(notion);
      } else if (not.startsWith('=') || not.startsWith('!=')) {
        groups['draw'].push(notion);
      } else if (not.startsWith('O') || not.startsWith('U')) {
        groups['over_under'].push(notion);
      } else if (not.startsWith('CS')) {
        groups['correct_score'].push(notion);
      } else {
        groups['others'].push(notion);
      }
    });

    return Object.entries(groups).map(([category, codes]: [string, string[]]) => ({
      notions: codes,
      title: NOTION_TITLES[category as NotionCategories],
      type: category as NotionCategories,
    }));
  }
}

const NOTION_CATEGORIES = [
  'win',
  'lose',
  'draw',
  'over_under',
  'correct_score',
  'end_score',
  'others',
] as const;
const NOTION_TITLES: Record<NotionCategories, string> = {
  correct_score: 'Correct Scores',
  draw: 'Draw',
  end_score: 'End Scores',
  over_under: 'Over / Under',
  lose: 'Lose',
  others: 'Others',
  win: 'Win',
};
export type NotionCategories = (typeof NOTION_CATEGORIES)[number];
export type NotionGroup = {
  title: string;
  notions: string[];
  type: NotionCategories;
};

// const nots = NotionObject.generateCodesFromGoalCount(2);
// console.log(
//   nots,
//   '\n\n',
//   NotionObject.groupIntoCategories(nots),
//   '\n\n',
//   nots.map((i) => {
//     return new NotionObject(i).toReadable();
//   })
// );

// console.log(new NotionObject('H_U2_A').toReadable(), new NotionObject('H_U2_A').isValid(), 'is it');
