import { NotionObject } from "./classes";

export type Notion = {
    _id: string;
    title: string;
    code: string;
}

export const dummmyNotionStrings = ["H_>_A", "H_=_A", "H_>2_A", "H_CS_3_2_A"];

export const dummyNotions:Notion[] = dummmyNotionStrings.map(notion=>{
    const n = new NotionObject(notion);
    return {
        title: n.toReadable(),
        _id: n.code(),
        code: n.code()
    }
})