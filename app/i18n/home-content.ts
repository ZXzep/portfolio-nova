// Thai for the homepage's featured-project and archive data (kept as plain
// arrays in page.tsx). English lives there; this file supplies the TH side.
import type { Lang } from './lang';

const projTh: Record<string, { kind: string; outcome: string; role: string }> = {
  'Potter Mobile+': {
    kind: 'คอมเมิร์ซ FULL-STACK',
    outcome:
      'แพลตฟอร์มคอมเมิร์ซที่ใช้งานจริง ครอบคลุมหน้าร้าน เทิร์นเครื่อง สต็อก จองคิว ชำระเงิน PromptPay แชตซัพพอร์ต ประเมินราคาด้วย AI และหลังบ้านครบชุด',
    role: 'ออกแบบโปรดักต์ · พัฒนา full-stack',
  },
  'Potter Mobile Pawn': {
    kind: 'PWA ใช้งานจริง',
    outcome:
      'ระบบจัดการรับจำนำที่ใช้งานจริง ครอบคลุมสัญญา ลายเซ็น ดอกเบี้ย การไถ่ถอน บัญชีเงินสด สิทธิ์ตามบทบาท และ audit trail หลายสาขา',
    role: 'พัฒนาโปรดักต์แบบ full-stack',
  },
  Polaris: {
    kind: 'ระบบ + ส่วนขยาย',
    outcome:
      'แดชบอร์ดรายงานเคสแบบเรียลไทม์ พร้อมส่วนขยายเบราว์เซอร์ที่เชื่อม workflow ซัพพอร์ตเข้ากับระบบองค์กรเดิม',
    role: 'ออกแบบระบบ · พัฒนา',
  },
};

const catTh: Record<string, string> = { CODE: 'โค้ด', 'UX/UI': 'UX/UI', DESIGN: 'ดีไซน์', '3D': '3D' };

const archDescTh: Record<string, string> = {
  'Potter Mobile Pawn': 'พัฒนาโปรดักต์แบบ full-stack',
  'Potter Mobile Plus': 'ออกแบบโปรดักต์ & พัฒนา full-stack',
  'Cinema Ticket Booking System': 'พัฒนา full-stack',
  Polaris: 'ออกแบบระบบ & พัฒนา',
  'CodeLabs Tech': 'UX/UI + งานกราฟิก & แบรนด์ · รวม AI Solutions Marketplace',
  MindDojo: 'งานกราฟิกสำหรับอีเวนต์และสื่อ',
  'TA Recruitment': 'เก็บ requirement, ทำ wireframe & ออกแบบ UX/UI',
  'Kumi Shop': 'ออกแบบ UX/UI & พัฒนา front-end',
  'TIC-TACTICS': 'ออกแบบ UX/UI & พัฒนา front-end',
  'Hoklong Metaverse': 'งานโมเดล 3D สำหรับเมตาเวิร์สท่องเที่ยว',
  'University 3D Project': 'งานโมเดล 3D & ออกแบบ asset',
  'Freelance Graphic Design': 'อาร์ตเวิร์กสำหรับโปรโมตเกม & อีเวนต์',
};

export function homeProj(lang: Lang, title: string, field: 'kind' | 'outcome' | 'role', fallback: string) {
  return lang === 'th' ? projTh[title]?.[field] ?? fallback : fallback;
}

export function homeArchCat(lang: Lang, cat: string) {
  return lang === 'th' ? catTh[cat] ?? cat : cat;
}

export function homeArchDesc(lang: Lang, name: string, fallback: string) {
  return lang === 'th' ? archDescTh[name] ?? fallback : fallback;
}
