"use client";

import Card from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Cat } from "@/types";

interface Props {
    cats: Cat[];
    onSelect: (cat: Cat) => void;

    getRarityColor: (rarity: string) => string;
    getTargetColor: (target: string | undefined) => string;
    getEffectColor: (effect: string | undefined) => string;
}

export default function CatsTable({
    cats,
    onSelect,
    getRarityColor,
    getTargetColor,
    getEffectColor,
}: Props) {
    return (
        <Card className="p-6">
            <div className="overflow-x-auto">
                <Table className="w-full table-fixed text-left">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">ID</TableHead>
                            <TableHead className="w-40">이름</TableHead>
                            <TableHead className="w-32">등급</TableHead>
                            <TableHead className="w-48">타겟</TableHead>
                            <TableHead className="w-48">효과</TableHead>
                            <TableHead className="w-60">특수능력</TableHead>
                        </TableRow>
                    </TableHeader>


                    <TableBody>
                        {cats.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={12} className="text-center text-gray-500 py-8">
                                    검색 결과가 없습니다
                                </TableCell>
                            </TableRow>
                        ) : (
                            cats.map((cat) => (
                                <TableRow
                                    key={cat.id}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => onSelect(cat)}
                                >
                                    <TableCell>{cat.id}</TableCell>

                                    <TableCell>
                                        <div>
                                            <div>{cat.nameKo}</div>
                                            <div className="text-gray-500">{cat.name}</div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge className={getRarityColor(cat.rarity)}>
                                            {cat.rarity}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {(cat.targetAttributes || ["없음"]).map((t, idx) => (
                                                <Badge key={idx} className={getTargetColor(t)}>
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {(cat.effects || ["없음"]).map((e, idx) => (
                                                <Badge key={idx} className={getEffectColor(e)}>
                                                    {e}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {cat.abilities.map((ability, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">
                                                    {ability}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
