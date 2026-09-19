import React from "react";

const h = React.createElement;

export default function MenuCard({ menu = {}, rank = 1, isVotedByMe = false, onToggleVote, onDelete }) {
  // Safe Guard ป้องกัน crash ถ้าไม่มีข้อมูล menu
  if (!menu || !menu.id) return null;

  const isTopLeader = rank === 1 && (menu.votes || 0) > 0;

  const handleImageError = (e) => {
    e.target.style.display = "none";
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = "flex";
    }
  };

  return h(
    "div",
    {
      className: `relative bg-white rounded-xl border flex flex-col justify-between transition-all duration-200 overflow-hidden ${
        isTopLeader
          ? "border-amber-400 shadow-md ring-2 ring-amber-400/30"
          : isVotedByMe
          ? "border-indigo-400 shadow-xs ring-1 ring-indigo-300"
          : "border-slate-200 hover:shadow-sm"
      }`,
    },
    h(
      "div",
      null,
      h(
        "div",
        { className: "relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100" },
        menu.image
          ? h("img", {
              src: menu.image,
              alt: menu.name || "",
              className: "w-full h-full object-cover",
              onError: handleImageError,
            })
          : null,
        h(
          "div",
          {
            className: `w-full h-full flex flex-col items-center justify-center text-slate-300 ${
              menu.image ? "hidden" : "flex"
            }`,
          },
          h("span", { className: "text-3xl" }, "🍲"),
          h("span", { className: "text-[11px] font-medium text-slate-400 mt-1" }, "ไม่มีรูปภาพ")
        ),
        h(
          "div",
          {
            className: `absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider ${
              isTopLeader
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-slate-900/80 text-white backdrop-blur"
            }`,
          },
          `#${rank}`
        ),
        h(
          "button",
          {
            onClick: () => onDelete && onDelete(menu.id),
            title: "ลบเมนูนี้",
            className: "absolute top-2 right-2 bg-slate-900/60 hover:bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs transition cursor-pointer",
          },
          "✕"
        )
      ),
      h(
        "div",
        { className: "p-4" },
        h("h3", { className: "font-black text-slate-900 text-base line-clamp-1 leading-snug", title: menu.name }, menu.name),
        h(
          "div",
          { className: "flex items-center justify-between mt-2 text-xs" },
          h("span", { className: "font-bold text-slate-700" }, `${menu.price || 0} ฿`),
          h("span", { className: "text-slate-400" }, "ราคาโดยประมาณ")
        )
      )
    ),
    h(
      "div",
      { className: "p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2" },
      h(
        "div",
        { className: "flex items-baseline gap-1 pl-1" },
        h("span", { className: "text-2xl font-black text-slate-900" }, menu.votes || 0),
        h("span", { className: "text-xs font-semibold text-slate-500" }, "โหวต")
      ),
      h(
        "button",
        {
          onClick: () => onToggleVote && onToggleVote(menu.id),
          className: `px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
            isVotedByMe
              ? "bg-indigo-600 hover:bg-rose-600 text-white shadow-xs group"
              : "bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200"
          }`,
        },
        isVotedByMe
          ? [
              h("span", { key: "icon", className: "inline group-hover:hidden" }, "✓ โหวตแล้ว"),
              h("span", { key: "cancel", className: "hidden group-hover:inline" }, "✕ ยกเลิก"),
            ]
          : "+1 โหวต"
      )
    )
  );
}