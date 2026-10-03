import React, { useState, useEffect, useMemo } from "react";
import MenuForm from "./components/MenuForm.js";
import VoteBoard from "./components/VoteBoard.js";

const h = React.createElement;
const STORAGE_KEY = "office_meal_votes_v2";
const USER_VOTES_KEY = "office_user_voted_menus_v2";
const MAX_VOTES_PER_USER = 3;

export default function App() {
  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userVotedIds, setUserVotedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_VOTES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [randomWinner, setRandomWinner] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  }, [menus]);

  useEffect(() => {
    localStorage.setItem(USER_VOTES_KEY, JSON.stringify(userVotedIds));
  }, [userVotedIds]);

  const sortedMenus = useMemo(() => {
    return [...menus].sort((a, b) => b.votes - a.votes || b.createdAt - a.createdAt);
  }, [menus]);

  const remainingQuota = MAX_VOTES_PER_USER - userVotedIds.length;

  const handleAddMenu = (newMenu) => {
    setMenus((prev) => [newMenu, ...prev]);
  };

  const handleToggleVote = (id) => {
    const hasVoted = userVotedIds.includes(id);

    if (!hasVoted) {
      if (remainingQuota <= 0) {
        alert(`คุณใช้สิทธิ์โหวตครบ ${MAX_VOTES_PER_USER} สิทธิ์แล้ว!`);
        return;
      }
      setUserVotedIds((prev) => [...prev, id]);
      setMenus((prev) =>
        prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
      );
    } else {
      setUserVotedIds((prev) => prev.filter((itemMenuId) => itemMenuId !== id));
      setMenus((prev) =>
        prev.map((item) => (item.id === id ? { ...item, votes: Math.max(0, item.votes - 1) } : item))
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("ต้องการลบเมนูนี้ใช่หรือไม่?")) {
      setMenus((prev) => prev.filter((item) => item.id !== id));
      setUserVotedIds((prev) => prev.filter((itemMenuId) => itemMenuId !== id));
    }
  };

  const handleResetVotes = () => {
    if (window.confirm("ต้องการล้างผลโหวตทั้งหมดเพื่อเริ่มรอบใหม่หรือไม่?")) {
      setMenus((prev) => prev.map((item) => ({ ...item, votes: 0 })));
      setUserVotedIds([]);
      setRandomWinner(null);
    }
  };

  const handleRandomize = () => {
    if (menus.length === 0) return;
    const topMenus = menus.filter((m) => m.votes === sortedMenus[0].votes && m.votes > 0);
    const pool = topMenus.length > 1 ? topMenus : menus;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setRandomWinner(pick);
  };

  return h(
    "div",
    // ปรับเป็น w-full min-h-screen ขยายเต็มบราวเซอร์ 100%
    { className: "w-full min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased" },

    // Navbar บนสุด ชิดขอบซ้ายขวา
    h(
      "header",
      { className: "w-full bg-white border-b border-slate-200 px-6 py-4 shadow-xs sticky top-0 z-30" },
      h(
        "div",
        { className: "w-full flex flex-wrap items-center justify-between gap-4" },
        h(
          "div",
          { className: "flex items-center gap-3" },
          h("span", { className: "text-3xl" }, "🍱"),
          h(
            "div",
            null,
            // แก้ให้เป็น text-slate-900 ชัดเจน ไม่จม
            h("h1", { className: "text-2xl font-black tracking-tight text-slate-900" }, "OFFICE MEAL BATTLE"),
            h("p", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider" }, "ระบบเปิดโหวตมื้อกลางวันประจำออฟฟิศ")
          )
        ),
        h(
          "div",
          { className: "flex items-center gap-3" },
          h(
            "div",
            { className: "flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs" },
            h("span", { className: "text-slate-600 font-medium" }, "สิทธิ์โหวตของคุณ:"),
            h("span", { className: `font-bold ${remainingQuota > 0 ? "text-indigo-600" : "text-rose-600"}` }, `${remainingQuota} / ${MAX_VOTES_PER_USER}`)
          ),
          h(
            "button",
            {
              onClick: handleRandomize,
              className: "bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer",
            },
            "🎲 สุ่มเมนูชี้ชะตา"
          ),
          menus.length > 0
            ? h(
                "button",
                {
                  onClick: handleResetVotes,
                  className: "text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1 cursor-pointer",
                },
                "ล้างรอบโหวต"
              )
            : null
        )
      )
    ),

    // Main Content: w-full ขยายเต็มจอ มี padding เหมาะสม
    h(
      "main",
      { className: "w-full flex-1 p-6 md:p-8 space-y-6" },

      randomWinner
        ? h(
            "div",
            { className: "bg-amber-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between" },
            h(
              "div",
              { className: "flex items-center gap-3" },
              h("span", { className: "text-3xl" }, "🎯"),
              h(
                "div",
                null,
                h("div", { className: "text-xs font-bold uppercase tracking-wider text-amber-100" }, "วงล้อสุ่มเลือกได้เมนูนี้!"),
                h("div", { className: "text-lg font-black" }, `${randomWinner.name} (ราคาประมาณ ${randomWinner.price} บาท)`)
              )
            ),
            h(
              "button",
              {
                onClick: () => setRandomWinner(null),
                className: "bg-black/20 hover:bg-black/30 text-white rounded-lg px-3 py-1 text-xs font-bold cursor-pointer",
              },
              "ปิด"
            )
          )
        : null,

      // Grid 2 ฝั่งเต็มพื้นที่
      h(
        "div",
        { className: "w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" },
        h("div", { className: "lg:col-span-4 sticky top-24" }, h(MenuForm, { onAddMenu: handleAddMenu })),
        h(
          "div",
          { className: "lg:col-span-8" },
          h(VoteBoard, {
            menus: sortedMenus,
            userVotedIds: userVotedIds,
            onToggleVote: handleToggleVote,
            onDelete: handleDelete,
          })
        )
      )
    )
  );
}