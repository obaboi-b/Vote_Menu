import { createElement as h, useState, useEffect } from "react";

export function SuggestedMenuList({ onBackToVote }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("chicken");

  // แยกฟังก์ชันดึงข้อมูลแบบรับ query
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลรายการอาหารได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลครั้งแรกเมื่อ Mount โดยใช้ AbortController ร่วมกับ Async Fetch ภายใน Effect
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`,
        );
        const data = await res.json();
        if (isMounted) {
          setRecipes(data.meals || []);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("ไม่สามารถโหลดข้อมูลรายการอาหารได้ กรุณาลองใหม่อีกครั้ง");
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchRecipes(searchTerm.trim());
    }
  };

  return h(
    "div",
    { className: "w-full space-y-6" },

    // Header ของหน้ารายการแนะนำพร้อมปุ่มย้อนกลับ
    h(
      "div",
      {
        className:
          "flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-slate-200",
      },
      h(
        "div",
        { className: "flex items-center gap-3" },
        h(
          "button",
          {
            onClick: onBackToVote,
            className:
              "bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95",
          },
          "← กลับไปหน้าโหวต",
        ),
        h(
          "div",
          null,
          h(
            "h2",
            { className: "text-xl font-black text-slate-900" },
            "💡 ไอเดียเมนูอาหารแนะนำ",
          ),
          h(
            "p",
            { className: "text-xs font-medium text-slate-500" },
            "สำรวจเมนูอาหารหลากหลายจาก TheMealDB สำหรับเป็นไอเดียมื้อกลางวัน",
          ),
        ),
      ),

      // ช่องค้นหาเมนู
      h(
        "form",
        {
          onSubmit: handleSearchSubmit,
          className: "flex items-center gap-2 w-full md:w-auto",
        },
        h("input", {
          type: "text",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          placeholder: "ค้นหาเมนู (ภาษาอังกฤษ เช่น beef, pasta)...",
          className:
            "bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        }),
        h(
          "button",
          {
            type: "submit",
            className:
              "bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer",
          },
          "ค้นหา",
        ),
      ),
    ),

    // แสดงสถานะ Loading
    loading
      ? h(
          "div",
          { className: "text-center py-16 space-y-3" },
          h("div", { className: "text-4xl animate-bounce" }, "🍱"),
          h(
            "p",
            { className: "text-sm font-semibold text-slate-600" },
            "กำลังดึงข้อมูลรายการอาหารแนะนำ...",
          ),
        )
      : error
        ? h(
            "div",
            {
              className:
                "bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl text-center space-y-2",
            },
            h("p", { className: "text-sm font-bold" }, error),
            h(
              "button",
              {
                onClick: () => fetchRecipes(searchTerm),
                className:
                  "text-xs font-semibold text-rose-600 underline cursor-pointer",
              },
              "ลองใหม่อีกครั้ง",
            ),
          )
        : recipes.length === 0
          ? h(
              "div",
              {
                className:
                  "bg-white border border-slate-200 p-12 rounded-2xl text-center space-y-2",
              },
              h(
                "p",
                { className: "text-base font-bold text-slate-700" },
                "ไม่พบเมนูอาหารที่ค้นหา",
              ),
              h(
                "p",
                { className: "text-xs text-slate-500" },
                "ลองค้นหาด้วยคำอื่น เช่น pork, rice, soup, curry",
              ),
            )
          : // แสดง Grid Cards รายการอาหารแนะนำ (3-4 คอลัมน์)
            h(
              "div",
              {
                className:
                  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
              },
              recipes.map((meal) =>
                h(
                  "div",
                  {
                    key: meal.idMeal,
                    className:
                      "bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group",
                  },
                  h(
                    "div",
                    null,
                    h(
                      "div",
                      {
                        className:
                          "relative aspect-video overflow-hidden bg-slate-100",
                      },
                      h("img", {
                        src: meal.strMealThumb,
                        alt: meal.strMeal,
                        className:
                          "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                        loading: "lazy",
                      }),
                      meal.strCategory
                        ? h(
                            "span",
                            {
                              className:
                                "absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md",
                            },
                            meal.strCategory,
                          )
                        : null,
                    ),
                    h(
                      "div",
                      { className: "p-4 space-y-1.5" },
                      h(
                        "h3",
                        {
                          className:
                            "font-bold text-slate-900 text-sm line-clamp-1",
                        },
                        meal.strMeal,
                      ),
                      h(
                        "p",
                        { className: "text-xs text-slate-500 font-medium" },
                        `สไตล์: ${meal.strArea || "ไม่ระบุ"}`,
                      ),
                    ),
                  ),
                ),
              ),
            ),
  );
}
