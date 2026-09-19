import React, { useState } from "react";
import { compressAndConvertToBase64 } from "../utils/imageCompressor.js";

const h = React.createElement;

export default function MenuForm({ onAddMenu }) {
  const [formState, setFormState] = useState({ name: "", price: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      return;
    }

    try {
      setIsProcessing(true);
      const compressedBase64 = await compressAndConvertToBase64(file);
      setImagePreview(compressedBase64);
      setFormState((prev) => ({ ...prev, image: compressedBase64 }));
      setErrorMsg("");
    } catch {
      setErrorMsg("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = formState.name.trim();
    const parsedPrice = parseFloat(formState.price);

    if (!trimmedName) {
      setErrorMsg("กรุณากรอกชื่อเมนูอาหาร");
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMsg("กรุณากรอกราคาให้ถูกต้อง (0 บาทขึ้นไป)");
      return;
    }

    const newMenu = {
      id: `menu_${Date.now()}`,
      name: trimmedName,
      price: parsedPrice,
      image: formState.image,
      votes: 0,
      createdAt: Date.now(),
    };

    onAddMenu(newMenu);

    setFormState({ name: "", price: "", image: null });
    setImagePreview(null);
    setErrorMsg("");
  };

  return h(
    "section",
    { className: "bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6" },
    h("h2", { className: "text-lg font-bold text-slate-900 mb-4" }, "➕ เพิ่มตัวเลือกเมนูใหม่"),
    errorMsg
      ? h("div", { className: "mb-4 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg" }, errorMsg)
      : null,
    h(
      "form",
      { onSubmit: handleSubmit, className: "space-y-4" },
      h(
        "div",
        null,
        h("label", { className: "block text-xs font-bold text-slate-700 mb-1" }, "ชื่อเมนู *"),
        h("input", {
          type: "text",
          value: formState.name,
          onChange: (e) => setFormState({ ...formState, name: e.target.value }),
          placeholder: "เช่น ข้าวกะเพราหมูกรอบ, ชาไทยปั่น",
          className: "w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        })
      ),
      h(
        "div",
        null,
        h("label", { className: "block text-xs font-bold text-slate-700 mb-1" }, "ราคาโดยประมาณ (บาท) *"),
        h("input", {
          type: "number",
          value: formState.price,
          onChange: (e) => setFormState({ ...formState, price: e.target.value }),
          placeholder: "0",
          min: "0",
          className: "w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
        })
      ),
      h(
        "div",
        null,
        h("label", { className: "block text-xs font-bold text-slate-700 mb-1" }, "รูปภาพ (ตัวเลือกเสริม)"),
        h(
          "div",
          { className: "flex items-center gap-3" },
          h("input", {
            type: "file",
            accept: "image/*",
            onChange: handleImageChange,
            disabled: isProcessing,
            className: "text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer w-full disabled:opacity-50",
          }),
          imagePreview
            ? h("img", {
                src: imagePreview,
                alt: "Preview",
                className: "w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0",
              })
            : null
        )
      ),
      h(
        "button",
        {
          type: "submit",
          disabled: isProcessing,
          className: "w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm py-2.5 rounded-lg transition shadow-sm cursor-pointer disabled:opacity-50",
        },
        isProcessing ? "กำลังประมวลผลรูป..." : "+ ส่งเมนูเข้าประชัน"
      )
    )
  );
}