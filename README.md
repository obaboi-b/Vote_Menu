# 🍽️ KinRaiDee (กินไรดี? - Food Voting App)

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> หมดปัญหาโลกแตกตอนพักเที่ยงกับคำถามว่า **"วันนี้กินอะไรดี?"**  
> เว็บแอปพลิเคชันสำหรับสร้างโพลโหวตเมนูอาหาร ให้ทุกคนเสนอร้าน โหวตเสียงข้างมาก หรือกดสุ่มจบปัญหาได้ในไม่กี่คลิก!

---

## 📸 ภาพตัวอย่างหน้าจอ (Screenshots)

<!-- นำภาพแคปเจอร์หน้าจอมาใส่ในโฟลเดอร์ assets/screenshots แล้วเปิดคอมเมนต์บรรทัดล่างนี้ -->
<!-- ![App Screenshot](./assets/screenshot.png) -->
*(ใส่รูป Preview หรือ GIF สาธิตการใช้งานที่นี่)*

---

## ✨ ฟีเจอร์หลัก (Features)

- 🗳️ **สร้างห้องโพล (Create Room):** สร้างหัวข้อโหวตมื้ออาหาร พร้อมแชร์ลิงก์ให้เพื่อนเข้ามาร่วมได้ทันที
- ➕ **เสนอเมนู/ร้านอาหาร (Add Options):** ทุกคนในห้องสามารถพิมพ์เสนอร้านโปรดของตัวเองเข้ามาได้
- 📊 **โหวตแบบเรียลไทม์ (Live Voting):** กดโหวตแล้วเห็นคะแนนขยับทันที ไม่ต้องคอยกด Refresh
- 🎡 **วงล้อสุ่มตัดสิน (Food Roulette / Randomizer):** กรณีคะแนนเท่ากัน หรือขี้เกียจคิดทั้งกลุ่ม กดหมุนวงล้อให้ระบบตัดสินให้ได้เลย
- 📱 **รองรับมือถือเต็มรูปแบบ (Mobile-friendly):** ออกแบบ Responsive ใช้งานผ่านสมาร์ตโฟนได้ลื่นไหล

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend:** React / Vite
- **Styling:** Tailwind CSS *(หรือ CSS Modules ตามที่ใช้จริง)*
- **Icons:** Lucide React / React Icons *(ถ้ามี)*
- **Linter:** ESLint

---

## 🚀 เริ่มต้นใช้งาน (Getting Started)

ทำตามขั้นตอนด้านล่างเพื่อโคลนและรันโปรเจกต์ในเครื่องของคุณ (Local Environment):

### ข้อกำหนดเบื้องต้น (Prerequisites)
- [Node.js](https://nodejs.org/) (เวอร์ชัน 18 ขึ้นไป แนะนำเวอร์ชัน LTS)
- Package Manager: `npm`, `pnpm` หรือ `yarn`

### การติดตั้ง (Installation)

1. **Clone repository:**
   ```bash
   git clone https://github.com/your-username/food-voting-app.git
   cd food-voting-app
   ```

2. **ติดตั้ง dependencies:**
   ```bash
   npm install
   ```

---

## ⚙️ Available Scripts

ในโปรเจกต์นี้คุณสามารถรันคำสั่งต่างๆ ผ่าน `npm` ได้ดังนี้:

| คำสั่ง | คำอธิบาย |
| :--- | :--- |
| `npm run dev` | รันโปรเจกต์ใน Development Mode ผ่าน Vite (ปกติเปิดที่ `http://localhost:5173`) |
| `npm run build` | ทำการคอมไพล์โค้ดและสร้างโฟลเดอร์ `dist/` สำหรับนำขึ้น Production |
| `npm run lint` | ตรวจสอบคุณภาพโค้ดและ Syntax ด้วย ESLint |
| `npm run preview` | พรีวิวไฟล์ Build จาก `dist/` เพื่อทดสอบก่อน Deploy จริง |

---

## 💡 วิธีการใช้งาน (User Flow)

1. เข้าหน้าเว็บแล้วกด **"สร้างห้องโหวต"**
2. ตั้งชื่อมื้ออาหาร (เช่น *มื้อเที่ยงทีม Dev*, *ปาร์ตี้วันศุกร์*)
3. เพิ่มตัวเลือกเมนู หรือกดแชร์ URL ให้เพื่อนๆ เข้ามาร่วมพิมพ์ตัวเลือก
4. ให้ทุกคนกดโหวตเมนูที่อยากกิน
5. ประกาศผลเมนูชนะโหวต พร้อมลุยร้านอาหารได้ทันที!

---

## 🤝 การมีส่วนร่วม (Contributing)

ยินดีต้อนรับทุกคนที่สนใจเข้ามาช่วยปรับปรุงโปรเจกต์นี้:

1. **Fork** โปรเจกต์นี้ไปที่บัญชีของคุณ
2. สร้าง Branch ใหม่ (`git checkout -b feature/NewFeature`)
3. ทำการ Commit การเปลี่ยนแปลง (`git commit -m 'Add some NewFeature'`)
4. ตรวจสอบโค้ดด้วย `npm run lint`
5. Push ขึ้น Branch ของคุณ (`git push origin feature/NewFeature`)
6. กดสร้าง **Pull Request**

---

## 📝 ไลเซนส์ (License)

โปรเจกต์นี้เผยแพร่ภายใต้ลิขสิทธิ์ [MIT License](LICENSE) - สามารถนำไปศึกษา ดัดแปลง และต่อยอดได้ฟรีครับ
