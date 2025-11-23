import * as fs from "fs";
import * as path from "path";
import { cat, trait, attackType, affect, ability } from "@/types/cat";

// 경로 설정
const UNIT_DIR = "./data/unit";
const NAME_FILE = "./data/UnitName.txt";
const DESC_FILE = "./data/UnitExplanation.txt";

// ──────────────────────────────────────────────
// 유닛 설명 로드
// ──────────────────────────────────────────────
function loadDescriptions(): Map<number, string[]> {
    const txt = fs.readFileSync(DESC_FILE, "utf8").replace(/\r/g, "");
    const map = new Map<number, string[]>();

    const lines = txt
        .split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 0);

    for (const line of lines) {
        const cols = line.split("\t");

        if (cols.length < 2) continue;

        const num = parseInt(cols[0]);
        const descList = cols.slice(1).map(s => s.trim());

        map.set(num, descList);
    }

    return map;
}

// ──────────────────────────────────────────────
// 유닛 이름 로드
// ──────────────────────────────────────────────
function loadUnitNames(): Map<number, string[]> {
    const txt = fs.readFileSync(NAME_FILE, "utf8").replace(/\r/g, "");
    const map = new Map<number, string[]>();

    const lines = txt.split("\n").filter(l => l.trim().length > 0);

    for (const line of lines) {
        const cols = line.split("\t");
        if (cols.length < 2) continue;

        const num = parseInt(cols[0]);
        const names = cols.slice(1).filter(n => n.length > 0);

        map.set(num, names);
    }

    return map;
}

// ──────────────────────────────────────────────
// trait / ability / affect / attackType (기존 그대로)
// ──────────────────────────────────────────────
const traitMap: Record<number, trait> = {
    10: "Red",
    16: "Floating",
    17: "Black",
    18: "Metal",
    19: "White",
    20: "Angel",
    21: "Alien",
    22: "Zombie",
    78: "Relic",
    96: "Demon",
};

function getAbilities(values: number[]): ability[] {
    const out: ability[] = [];
    const add = (c: boolean, a: ability) => { if (c) out.push(a); };
    add(values[40] > 0, "AtkUp");
    add(values[42] > 0, "LETHAL");
    add(values[34] > 0, "BaseDestroyer");
    add(values[31] > 0, "Critical");
    add(values[112] > 0, "MetalKiller");
    return out;
}

function getAffects(values: number[]): affect[] {
    const out: affect[] = [];
    const add = (c: boolean, a: affect) => { if (c) out.push(a); };
    add(values[27] > 0, "Slow");
    add(values[25] > 0, "Stop");
    return out;
}

function getAttackTypes(values: number[]): attackType[] {
    const out: attackType[] = [];
    if (values[12] === 1) out.push("range");

    const ldr = values[45];
    if (ldr !== 0) out.push(ldr < 0 ? "omni" : "long");

    if (out.length === 0) out.push("single");

    return out;
}

// ──────────────────────────────────────────────
// CSV 하나 파싱
// ──────────────────────────────────────────────
function loadOneCSV(num: number, form: number, name: string, descMap: Map<number, string[]>): cat | null {
    const dir = path.join(UNIT_DIR, num.toString().padStart(3, "0"));
    const csvPath = path.join(dir, `unit${num.toString().padStart(3, "0")}.csv`);

    if (!fs.existsSync(csvPath)) return null;

    const lines = fs
        .readFileSync(csvPath, "utf8")
        .replace(/\r/g, "")
        .split("\n")
        .filter(l => l.trim().length > 0);

    if (form >= lines.length) return null;

    const line = lines[form];
    const pure = line.split("//")[0].trim();
    const values = pure.split(",").map(v => parseInt(v.trim()));

    while (values.length < 120) values.push(0);

    const traits: trait[] = [];
    for (const idx in traitMap) {
        const i = parseInt(idx);
        if (values[i] === 1) traits.push(traitMap[i]);
    }

    // ⬇⬇⬇ 설명 필드 할당
    const descList = descMap.get(num) ?? [];
    const description = descList[form] ?? "";

    return {
        Id: num,
        Name: name,
        Formt: form,
        Descriptiont: description,   // ⭐추가⭐
        Image: null,
        Rarity: "unknown",

        Targets: traits,
        AttackType: getAttackTypes(values),
        Affects: getAffects(values),
        Abilities: getAbilities(values),

        Price: values[6],
        Hp: values[0],
        Atk: values[3],
        Speed: values[2],
        Heatback: values[1],
        Tba: values[4] * 2,
        PreAttackframe: values[13],
        RespawnHalf: values[7] * 2,
        Range: values[5],
        Width: values[9],
    };
}

// ──────────────────────────────────────────────
// 전체 유닛 로드
// ──────────────────────────────────────────────
export function loadAllCats(): cat[] {
    const nameMap = loadUnitNames();
    const descMap = loadDescriptions();

    const arr: cat[] = [];

    for (const [num, names] of nameMap.entries()) {
        for (let form = 0; form < names.length; form++) {
            const c = loadOneCSV(num, form, names[form], descMap);
            if (c) arr.push(c);
        }
    }

    return arr;
}
