import React from "react";
import MenuCard from "./MenuCard.js";

const h = React.createElement;

export default function VoteBoard({ menus, userVotedIds, onToggleVote, onDelete }) {
  return h(
    "div",
    { className: "space-y-4" },
    h(
      "div",
      { className: "flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200" },
      h(
        "div",
        null,
        h("h2", { className: "text-base font-bold text-slate-900" }, `🔥 เมนูที่ลงแข่งขัน (${menus.length})`),
        h("p", { className: "text-xs text-slate-500 mt-0.5" }, "เมนูคะแนนสูงสุดจะขึ้นมาอยู่อันดับ 1 แบบเรียลไทม์")
      ),
      h("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider" }, "Leaderboard")
    ),

    menus.length === 0
      ? h(
          "div",
          { className: "text-center py-16 bg-white rounded-xl border-2 border-dashed border-slate-200" },
          h("span", { className: "text-4xl block mb-2" }, "🍱"),
          h("p", { className: "text-sm font-bold text-slate-700" }, "ยังไม่มีใครส่งเมนูเข้าประชัน"),
          h("p", { className: "text-xs text-slate-400 mt-1" }, "กรอกฟอร์มด้านซ้ายเพื่อเพิ่มตัวเลือกแรกได้เลย")
        )
      : h(
          "div",
          { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" },
          menus.map((menu, index) =>
            h(MenuCard, {
              key: menu.id,
              menu: menu,
              rank: index + 1,
              isVotedByMe: userVotedIds.includes(menu.id),
              onToggleVote: onToggleVote,
              onDelete: onDelete,
            })
          )
        )
  );
}