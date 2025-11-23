"use client";

import { useState } from "react";
import type { ability, cat as Cat } from "@/types/cat";

import CatDetailDialog from "./CatDetailDialog";
import CatsTable from "./CatsTable";
import FiltersPanel from "./FiltersPanel";

export default function AllyCatsPage({ cats }: { cats: Cat[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedRarity, setSelectedRarity] = useState<string[]>(["all"]);
    const [selectedTargets, setSelectedTargets] = useState<string[]>(["all"]);
    const [targetFilterMode, setTargetFilterMode] = useState<"OR" | "AND">("OR");

    const [selectedEffects, setSelectedEffects] = useState<string[]>(["all"]);
    const [effectFilterMode, setEffectFilterMode] = useState<"OR" | "AND">("OR");

    const [selectedAbilities, setSelectedAbilities] = useState<string[]>(["all"]);
    const [abilityFilterMode, setAbilityFilterMode] = useState<"OR" | "AND">(
        "OR"
    );

    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(30);

    /* --------------------------- 필터 옵션 (그대로 유지) --------------------------- */

    const rarities = [
        { value: "all", label: "전체", color: "gray" },
        { value: "Normal", label: "기본", color: "red" },
        { value: "Ex", label: "Ex", color: "orange" },
        { value: "Rare", label: "레어", color: "yellow" },
        { value: "Super Rare", label: "슈퍼레어", color: "green" },
        { value: "Uber Super Rare", label: "울트라슈퍼레어", color: "blue" },
        { value: "Legend Rare", label: "레전드레어", color: "purple" },
    ];

    const targets = [
        { value: "all", label: "전체", color: "gray" },
        { value: "red", label: "빨간적", color: "red" },
        { value: "float", label: "떠있는적", color: "green" },
        { value: "black", label: "검은적", color: "black" },
        { value: "metal", label: "메탈적", color: "slate" },
        { value: "angel", label: "천사", color: "yellow" },
        { value: "alien", label: "에이리언", color: "sky" },
        { value: "zombie", label: "좀비", color: "purple" },
        { value: "ancient", label: "고대종", color: "emerald" },
        { value: "devil", label: "악마", color: "blue-900" },
        { value: "none", label: "무속성", color: "stone" },
    ];


    const effects = [
        { group: "1", value: "all", label: "전체" },
        { group: "1", value: "none", label: "없음" },
        { group: "1", value: "slow", label: "움직임을 느리게 한다" },
        { group: "1", value: "stop", label: "움직임을 멈춘다" },
        { group: "1", value: "knockback", label: "날려버린다" },
        { group: "1", value: "weaken", label: "공격력다운" },

        { group: "2", value: "massive", label: "초 데미지" },
        { group: "2", value: "insane", label: "극 데미지" },
        { group: "2", value: "strong", label: "엄청 강하다" },
        { group: "2", value: "tough", label: "맷집이 좋다" },
        { group: "2", value: "resistant", label: "초 맷집이 좋다" },
        { group: "2", value: "curse", label: "저주" },
        { group: "2", value: "shieldbreak", label: "공격 무효" },
        { group: "2", value: "targetonly", label: "공격 타겟 한정" },
        { group: "2", value: "warp", label: "워프" },
    ];


    const abilities = [
        { group: "1", value: "all", label: "전체" },
        { group: "1", value: "none", label: "없음" },
        { group: "1", value: "atk_up", label: "공격력 업" },
        { group: "1", value: "survive", label: "살아남는다" },
        { group: "1", value: "base_destroy", label: "성 파괴가 특기" },

        { group: "2", value: "critical", label: "크리티컬" },
        { group: "2", value: "metal_killer", label: "메탈 킬러" },
        { group: "2", value: "zombie_killer", label: "좀비 킬러" },
        { group: "2", value: "soul_attack", label: "영혼 공격" },
        { group: "2", value: "barrier_breaker", label: "베리어 브레이커" },
        { group: "2", value: "shield_breaker", label: "쉴드 브레이커" },
        { group: "2", value: "last_attack", label: "혼신의 일격" },
        { group: "2", value: "money_up", label: "격파시 머니 up" },
        { group: "2", value: "metal", label: "메탈" },

        { group: "3", value: "wave_small", label: "소파동" },
        { group: "3", value: "wave", label: "파동 공격" },
        { group: "3", value: "mini_wave", label: "소열파" },
        { group: "3", value: "wave_attack", label: "열파 공격" },
        { group: "3", value: "wave_counter", label: "열파 카운터" },
        { group: "3", value: "explode", label: "폭파 공격" },
        { group: "3", value: "wave_stop", label: "파동스토퍼" },
        { group: "3", value: "summon", label: "소환" },

        { group: "3", value: "single", label: "개체공격" },
        { group: "3", value: "aoe", label: "범위공격" },
        { group: "3", value: "ld", label: "원거리공격" },
        { group: "3", value: "omni", label: "전방위공격" },

        { group: "4", value: "anti_beast", label: "초생명체 특효" },
        { group: "4", value: "anti_ancient", label: "초수 특효" },
        { group: "4", value: "anti_relic", label: "초현자 특효" },

        { group: "5", value: "weaken_immunity", label: "공격력 다운 무효" },
        { group: "5", value: "knockback_immunity", label: "날려버린다 무효" },
        { group: "5", value: "stop_immunity", label: "움직임을 멈춘다 무효" },
        { group: "5", value: "slow_immunity", label: "움직임을 느리게 한다 무효" },
        { group: "5", value: "warp_immunity", label: "워프 무효" },
        { group: "5", value: "curse_immunity", label: "고대의 저주 무효" },
        { group: "5", value: "poison_immunity", label: "독 데미지 무효" },
        { group: "5", value: "wave_immunity", label: "파동 데미지 무효" },
        { group: "5", value: "mini_wave_immunity", label: "열파 데미지 무효" },
        { group: "5", value: "explode_immunity", label: "폭파 데미지 무효" },

        { group: "6", value: "weaken_resist", label: "공격력 다운 저항" },
        { group: "6", value: "stop_resist", label: "움직임을 멈춘다 저항" },
        { group: "6", value: "slow_resist", label: "움직임을 느리게 한다 저항" },
        { group: "6", value: "knockback_resist", label: "날려버린다 저항" },
        { group: "6", value: "wave_resist", label: "파동 데미지 저항" },
        { group: "6", value: "mini_wave_resist", label: "열파 데미지 저항" },
        { group: "6", value: "warp_resist", label: "워프 저항" },
        { group: "6", value: "curse_resist", label: "고대의 저주 저항" },
        { group: "6", value: "poison_resist", label: "독 데미지 저항" },

        { group: "7", value: "hp_up", label: "기본 체력 업" },
        { group: "7", value: "atk_base_up", label: "기본 공격력 업" },
        { group: "7", value: "speed_up", label: "이동 속도 업" },
        { group: "7", value: "knockback_up", label: "넉백 횟수 증가" },
        { group: "7", value: "cost_down", label: "생산 코스트 할인" },
        { group: "7", value: "production_up", label: "생산 스피드 업" },
        { group: "7", value: "tba_down", label: "공격 간격 단축" },
    ];


    /* --------------------------- 필터 토글 --------------------------- */
    const toggleMulti = (value: string, setter: any) => {
        setter((prev: string[]) => {
            if (value === "all") return ["all"];

            const withoutAll = prev.filter((v) => v !== "all");

            if (withoutAll.includes(value)) {
                const next = withoutAll.filter((v) => v !== value);
                return next.length === 0 ? ["all"] : next;
            }

            return [...withoutAll, value];
        });
    };

    /* --------------------------- 필터 통과 로직 --------------------------- */

    /* --------------------------- 필터 적용 로직 --------------------------- */

    const filteredCats = cats.filter((cat) => {
        // 검색: 이름(한글/영문)
        const matchesSearch =
            cat.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (cat.Descriptiont ?? "").includes(searchTerm);

        // 등급
        const matchesRarity =
            selectedRarity.includes("all") ||
            selectedRarity.includes(cat.Rarity);

        // 타겟 속성 (Targets[])
        const matchesTarget = 
            selectedTargets.includes("all") ||
            (targetFilterMode === "OR"
                ? selectedTargets.some((t) => cat.Targets.includes(t as any))
                : selectedTargets.every((t) => cat.Targets.includes(t as any)));

        // 효과 (Affects[])
        const matchesEffect =
            selectedEffects.includes("all") ||
            (effectFilterMode === "OR"
                ? selectedEffects.some((e) => cat.Affects.includes(e as any))
                : selectedEffects.every((e) => cat.Affects.includes(e as any)));

        // 능력 (Abilities[])
        const matchesAbility =
            selectedAbilities.includes("all") ||
            (abilityFilterMode === "OR"
                ? selectedAbilities.some((ab) => cat.Abilities.includes(ab as any))
                : selectedAbilities.every((ab) => cat.Abilities.includes(ab as any)));

        return (
            matchesSearch &&
            matchesRarity &&
            matchesTarget &&
            matchesEffect &&
            matchesAbility
        );
    });


    /* --------------------------- 색상 유틸 — 실제 코드 다시 삽입 --------------------------- */

    const getColorClasses = (color: string, isSelected: boolean) => {
        const colorMap: Record<string, { selected: string; hover: string }> = {
            gray: {
                selected: "bg-gray-500 text-white border-gray-500",
                hover: "hover:bg-gray-100 hover:border-gray-400",
            },
            red: {
                selected: "bg-red-500 text-white border-red-500",
                hover: "hover:bg-red-100 hover:border-red-400",
            },
            orange: {
                selected: "bg-orange-500 text-white border-orange-500",
                hover: "hover:bg-orange-100 hover:border-orange-400",
            },
            yellow: {
                selected: "bg-yellow-500 text-white border-yellow-500",
                hover: "hover:bg-yellow-100 hover:border-yellow-400",
            },
            green: {
                selected: "bg-green-500 text-white border-green-500",
                hover: "hover:bg-green-100 hover:border-green-400",
            },
            blue: {
                selected: "bg-blue-500 text-white border-blue-500",
                hover: "hover:bg-blue-100 hover:border-blue-400",
            },
            purple: {
                selected: "bg-purple-500 text-white border-purple-500",
                hover: "hover:bg-purple-100 hover:border-purple-400",
            },
            sky: {
                selected: "bg-sky-500 text-white border-sky-500",
                hover: "hover:bg-sky-100 hover:border-sky-400",
            },
            slate: {
                selected: "bg-slate-500 text-white border-slate-500",
                hover: "hover:bg-slate-100 hover:border-slate-400",
            },
            zinc: {
                selected: "bg-zinc-800 text-white border-zinc-800",
                hover: "hover:bg-zinc-100 hover:border-zinc-400",
            },
            stone: {
                selected: "bg-stone-400 text-white border-stone-400",
                hover: "hover:bg-stone-100 hover:border-stone-400",
            },
            black: {
                selected: "bg-black text-white border-black",
                hover: "hover:bg-zinc-100 hover:border-zinc-400",
            },
            emerald: {
                selected: "bg-emerald-600 text-white border-emerald-600",
                hover: "hover:bg-emerald-100 hover:border-emerald-400",
            },
            "blue-900": {
                selected: "bg-blue-900 text-white border-blue-900",
                hover: "hover:bg-blue-100 hover:border-blue-400",
            },
        };

        const colors = colorMap[color] || colorMap.gray;
        return isSelected
            ? colors.selected
            : `bg-white border-gray-300 ${colors.hover}`;
    };

    const getRarityColor = (rarity: string) => {
        const colors: Record<string, string> = {
            Normal: "bg-gray-500",
            Special: "bg-blue-500",
            Rare: "bg-yellow-500",
            "Super Rare": "bg-purple-500",
            "Uber Super Rare": "bg-red-500",
            "Legend Rare": "bg-pink-500",
        };
        return colors[rarity] || "bg-gray-500";
    };

    const getTargetColor = (target: string | undefined) => {
        const colors: Record<string, string> = {
            빨간적: "bg-red-500 text-white",
            떠있는적: "bg-green-500 text-white",
            검은적: "bg-black text-white",
            메탈적: "bg-slate-400 text-white",
            천사: "bg-yellow-300 text-black",
            에이리언: "bg-sky-400 text-white",
            좀비: "bg-purple-600 text-white",
            고대종: "bg-emerald-700 text-white",
            악마: "bg-blue-900 text-white",
            무속성: "bg-stone-400 text-black",
            전체: "bg-gray-300 text-black",
            없음: "bg-gray-200 text-gray-600",
        };
        return colors[target || "없음"] || "bg-gray-200 text-gray-600";
    };

    const getEffectColor = (effect: string | undefined) => {
        const colors: Record<string, string> = {
            느리게한다: "bg-blue-500 text-white",
            멈추게한다: "bg-red-500 text-white",
            공격력다운: "bg-orange-500 text-white",
            없음: "bg-gray-200 text-gray-600",
        };
        return colors[effect || "없음"] || "bg-gray-200 text-gray-600";
    };

    /* --------------------------- 렌더 --------------------------- */

    return (
        <div className="space-y-6">
            <FiltersPanel
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                rarities={rarities}
                selectedRarity={selectedRarity}
                setSelectedRarity={setSelectedRarity}
                targets={targets}
                selectedTargets={selectedTargets}
                setSelectedTargets={setSelectedTargets}
                targetFilterMode={targetFilterMode}
                setTargetFilterMode={setTargetFilterMode}
                effects={effects}
                selectedEffects={selectedEffects}
                setSelectedEffects={setSelectedEffects}
                effectFilterMode={effectFilterMode}
                setEffectFilterMode={setEffectFilterMode}
                abilities={abilities}
                selectedAbilities={selectedAbilities}
                setSelectedAbilities={setSelectedAbilities}
                abilityFilterMode={abilityFilterMode}
                setAbilityFilterMode={setAbilityFilterMode}
                getColorClasses={getColorClasses}
                toggleMulti={toggleMulti}
            />

            <CatsTable
                cats={filteredCats}
                onSelect={(cat) => {
                    setSelectedCat(cat);
                    setCurrentLevel(30);
                    setIsDialogOpen(true);
                }}
                getRarityColor={getRarityColor}
                getTargetColor={getTargetColor}
                getEffectColor={getEffectColor}
            />

            <CatDetailDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                selectedCat={selectedCat}
                currentLevel={currentLevel}
                setCurrentLevel={setCurrentLevel}
                getRarityColor={getRarityColor}
                getTargetColor={getTargetColor}
                getEffectColor={getEffectColor}
            />
        </div>
    );
}
