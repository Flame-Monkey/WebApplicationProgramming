"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Cat } from "@/types";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCat: Cat | null;
  currentLevel: number;
  setCurrentLevel: (v: number) => void;
  getRarityColor: (rarity: string) => string;
  getTargetColor: (target: string | undefined) => string;
  getEffectColor: (effect: string | undefined) => string;
}

export default function CatDetailDialog({
  isOpen,
  onOpenChange,
  selectedCat,
  currentLevel,
  setCurrentLevel,
  getRarityColor,
  getTargetColor,
  getEffectColor
}: Props) {
  if (!selectedCat) return null;

  const baseLevel = selectedCat.baseLevel || 1;
  const levelDiff = currentLevel - baseLevel;
  const calculatedHP = selectedCat.hp + (levelDiff * (selectedCat.hpPerLevel || 0));
  const calculatedAttack = selectedCat.attack + (levelDiff * (selectedCat.attackPerLevel || 0));

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-blue-600">
                {selectedCat.nameKo} ({selectedCat.name})
              </DialogTitle>
              <DialogDescription>캐릭터 상세 정보</DialogDescription>
            </div>

            {/* Level Control */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">레벨</span>

              <button
                onClick={() => setCurrentLevel(Math.max(1, currentLevel - 10))}
                className="w-10 h-8 rounded bg-white border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors flex items-center justify-center text-xs"
              >
                -10
              </button>

              <button
                onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
                className="w-8 h-8 rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
              >
                -
              </button>

              <Input
                type="number"
                min="1"
                max="999"
                value={currentLevel}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setCurrentLevel(Math.max(1, Math.min(999, value)));
                  }
                }}
                className="w-16 h-8 text-center px-2"
              />

              <button
                onClick={() => setCurrentLevel(Math.min(999, currentLevel + 1))}
                className="w-8 h-8 rounded-full bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
              >
                +
              </button>

              <button
                onClick={() => setCurrentLevel(Math.min(999, currentLevel + 10))}
                className="w-10 h-8 rounded bg-white border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors flex items-center justify-center text-xs"
              >
                +10
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-1">ID</p>
              <p>{selectedCat.id}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">등급</p>
              <Badge className={getRarityColor(selectedCat.rarity)}>
                {selectedCat.rarity}
              </Badge>
            </div>
          </div>

          {/* Target Attributes */}
          <div>
            <p className="text-gray-600 mb-2">타겟 속성</p>
            <div className="flex flex-wrap gap-2">
              {(selectedCat.targetAttributes || ["없음"]).map((target, idx) => (
                <Badge key={idx} className={getTargetColor(target)}>
                  {target}
                </Badge>
              ))}
            </div>
          </div>

          {/* Effects */}
          <div>
            <p className="text-gray-600 mb-2">효과</p>
            <div className="flex flex-wrap gap-2">
              {(selectedCat.effects || ["없음"]).map((effect, idx) => (
                <Badge key={idx} className={getEffectColor(effect)}>
                  {effect}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="border-t pt-4">
            <h4 className="mb-4">스탯 정보 (레벨 {currentLevel})</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">HP</p>
                <p className="text-red-600">{Math.round(calculatedHP).toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">공격력</p>
                <p className="text-orange-600">{Math.round(calculatedAttack).toLocaleString()}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">사거리</p>
                <p className="text-blue-600">{selectedCat.range}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">속도</p>
                <p className="text-green-600">{selectedCat.speed}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">코스트</p>
                <p className="text-yellow-600">{selectedCat.cost}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600">재사용 시간</p>
                <p className="text-purple-600">{selectedCat.recharge}초</p>
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="border-t pt-4">
            <h4 className="mb-3">특수능력</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCat.abilities.map((ability, idx) => (
                <Badge key={idx} variant="outline" className="px-3 py-1">
                  {ability}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
