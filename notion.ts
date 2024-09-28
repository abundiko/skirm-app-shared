import { NotionObject } from "./classes";

export type Notion = {
    _id: string;
    title: string;
    code: string;
}

export const dummmyNotionStrings = NotionObject.generateCodesFromGoalCount(3);

export const dummyNotions: Notion[] = dummmyNotionStrings.map(notion => {
    const n = new NotionObject(notion);
    return {
        title: n.toReadable(),
        _id: n.code(),
        code: n.code()
    }
})