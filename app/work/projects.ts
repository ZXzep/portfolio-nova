export type ProjectCategory = 'CODE' | 'UX/UI' | 'DESIGN' | '3D';
type Bi = { en: string; th: string };
type BiList = { en: string[]; th: string[] };
export type Project = {
  slug: string; title: string; category: ProjectCategory; period: string; accent: string;
  hero: string; gallery: string[]; tools: string[];
  label: Bi; role: Bi; summary: Bi; overview: Bi; challenge: Bi; result: Bi;
  contribution: BiList; decisions: BiList;
  tracks?: { name: Bi; points: BiList }[];
  external?: { label: Bi; href: string };
  links?: { label: Bi; href: string }[];
};

const L = {
  live: { en: 'OPEN LIVE SYSTEM', th: 'เปิดระบบจริง' },
  site: { en: 'VISIT WEBSITE', th: 'เข้าเว็บไซต์' },
  source: { en: 'VIEW SOURCE', th: 'ดูซอร์สโค้ด' },
};

export const projects: Project[] = [
  {
    slug: 'potter-mobile-pawn', title: 'Potter Mobile Pawn', category: 'CODE', period: '2026', accent: '#8cffc1',
    hero: '', gallery: [], tools: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Puppeteer', 'PWA'],
    label: { en: 'Production pawn-management PWA', th: 'PWA ระบบจัดการรับจำนำที่ใช้งานจริง' },
    role: { en: 'Full-stack product development', th: 'พัฒนาโปรดักต์แบบ full-stack' },
    summary: {
      en: 'A production system covering the complete mobile-phone pawn contract lifecycle for staff, managers, and customers.',
      th: 'ระบบที่ใช้งานจริง ครอบคลุมวงจรสัญญารับจำนำมือถือทั้งหมด สำหรับพนักงาน ผู้จัดการ และลูกค้า',
    },
    overview: {
      en: 'Potter Mobile Pawn brings contract creation, digital signatures, interest and penalty calculations, redemption or sale, and public status checks into one operational system.',
      th: 'Potter Mobile Pawn รวมการสร้างสัญญา ลายเซ็นดิจิทัล การคำนวณดอกเบี้ยและค่าปรับ การไถ่ถอนหรือขายหลุด และการเช็คสถานะแบบสาธารณะ ไว้ในระบบปฏิบัติการเดียว',
    },
    challenge: {
      en: 'The product had to turn a multi-step financial workflow into something staff could use confidently while preserving role boundaries, branch records, and an auditable history.',
      th: 'ต้องเปลี่ยนกระบวนการทางการเงินหลายขั้นตอน ให้เป็นสิ่งที่พนักงานใช้ได้อย่างมั่นใจ พร้อมรักษาขอบเขตสิทธิ์ ข้อมูลแยกสาขา และประวัติที่ตรวจสอบย้อนหลังได้',
    },
    contribution: {
      en: [
        'Structured the contract lifecycle and back-office information architecture.',
        'Built role-based workflows tied to database security rules.',
        'Implemented server-generated PDF contracts, reporting, and branch dashboards.',
      ],
      th: [
        'วางโครงวงจรสัญญาและ information architecture ของหลังบ้าน',
        'สร้าง workflow ตามบทบาท ผูกกับกฎความปลอดภัยระดับฐานข้อมูล',
        'ทำสัญญา PDF ที่สร้างจากเซิร์ฟเวอร์ ระบบรายงาน และแดชบอร์ดรายสาขา',
      ],
    },
    decisions: {
      en: [
        'Used a three-tier access model backed by PostgreSQL Row-Level Security.',
        'Kept cash-ledger and contract state changes visible for operational review.',
        'Delivered the system as a PWA for use across shop devices.',
      ],
      th: [
        'ใช้โมเดลสิทธิ์ 3 ระดับ หนุนด้วย Row-Level Security ของ PostgreSQL',
        'เปิดให้เห็นบัญชีเงินสดและการเปลี่ยนสถานะสัญญา เพื่อการตรวจทานเชิงปฏิบัติการ',
        'ส่งมอบเป็น PWA ให้ใช้ได้กับอุปกรณ์หน้าร้านทุกเครื่อง',
      ],
    },
    result: {
      en: 'A working production platform connecting customer status checks with internal pawn, cash, reporting, and document workflows.',
      th: 'แพลตฟอร์มที่ใช้งานจริง เชื่อมการเช็คสถานะของลูกค้าเข้ากับงานรับจำนำ เงินสด รายงาน และเอกสารภายใน',
    },
    external: { label: L.live, href: 'https://potter-mobile-pawn.vercel.app/backoffice/reports' },
  },
  {
    slug: 'potter-mobile-plus', title: 'Potter Mobile Plus', category: 'CODE', period: '2026', accent: '#75aaff',
    hero: '', gallery: [], tools: ['Next.js 16', 'TypeScript', 'Supabase', 'PostgreSQL', 'Claude API'],
    label: { en: 'Full-stack recommerce platform', th: 'แพลตฟอร์ม recommerce แบบ full-stack' },
    role: { en: 'Product design & full-stack development', th: 'ออกแบบโปรดักต์ & พัฒนา full-stack' },
    summary: {
      en: 'A used-phone marketplace combining storefront, AI-assisted trade-in quotes, pickup booking, payments, inventory, and admin operations.',
      th: 'มาร์เก็ตเพลสมือถือมือสอง รวมหน้าร้าน ประเมินราคาเทิร์นด้วย AI จองรับเครื่อง ระบบชำระเงิน สต็อก และงานหลังบ้าน',
    },
    overview: {
      en: 'The platform supports both sides of recommerce: customers browse and buy devices or request a trade-in estimate, while the team manages inventory, orders, appointments, payments, and live support.',
      th: 'แพลตฟอร์มรองรับ recommerce ทั้งสองฝั่ง: ลูกค้าเลือกซื้อเครื่องหรือขอประเมินราคาเทิร์น ส่วนทีมงานจัดการสต็อก ออเดอร์ นัดหมาย การชำระเงิน และแชตซัพพอร์ต',
    },
    challenge: {
      en: 'Buying and selling used phones involves uncertain pricing and several handoffs. The experience needed to stay simple for customers without hiding operational complexity from staff.',
      th: 'การซื้อขายมือถือมือสองมีเรื่องราคาไม่แน่นอนและการส่งต่องานหลายทอด ประสบการณ์ต้องเรียบง่ายสำหรับลูกค้า โดยไม่ปิดบังความซับซ้อนเชิงปฏิบัติการจากพนักงาน',
    },
    contribution: {
      en: [
        'Designed the customer and back-office product flows.',
        'Built storefront, trade-in, booking, order, and inventory experiences.',
        'Integrated AI-assisted estimates, PromptPay QR payments, authentication, and realtime chat.',
      ],
      th: [
        'ออกแบบ flow ฝั่งลูกค้าและฝั่งหลังบ้าน',
        'สร้างประสบการณ์หน้าร้าน เทิร์นเครื่อง จองคิว ออเดอร์ และสต็อก',
        'เชื่อมการประเมินราคาด้วย AI, ชำระเงิน PromptPay QR, ระบบล็อกอิน และแชตเรียลไทม์',
      ],
    },
    decisions: {
      en: [
        'Separated the guided trade-in journey from the conventional storefront.',
        'Kept AI output as an assisted estimate inside a controlled business process.',
        'Connected customer actions to one operational back office.',
      ],
      th: [
        'แยกเส้นทางเทิร์นเครื่องแบบมีไกด์ ออกจากหน้าร้านซื้อขายปกติ',
        'ให้ผลลัพธ์ AI เป็นแค่ราคาประเมินช่วยตัดสินใจ ภายใต้กระบวนการธุรกิจที่ควบคุมได้',
        'เชื่อมทุกการกระทำของลูกค้าเข้ากับหลังบ้านเดียว',
      ],
    },
    result: {
      en: 'A production-ready commerce system spanning the customer journey and the daily workflows required to operate it.',
      th: 'ระบบ commerce พร้อมใช้งานจริง ครอบคลุมทั้ง customer journey และงานประจำวันที่ต้องใช้ดำเนินงาน',
    },
    external: { label: L.site, href: 'https://www.pottermobileplus.com' },
  },
  {
    slug: 'cinema-ticket-booking-system', title: 'Cinema Ticket Booking System', category: 'CODE', period: '2026', accent: '#ffb85c',
    hero: '', gallery: [], tools: ['Go', 'Vue 3', 'MongoDB', 'Redis', 'WebSocket', 'Docker'],
    label: { en: 'Concurrency-safe booking system', th: 'ระบบจองที่ปลอดภัยต่อการทำงานพร้อมกัน' },
    role: { en: 'Full-stack development', th: 'พัฒนา full-stack' },
    summary: {
      en: 'A cinema booking application designed to prevent double-booking during concurrent seat-selection attempts.',
      th: 'แอปจองตั๋วหนังที่ออกแบบมาเพื่อกันการจองซ้ำ เมื่อมีคนเลือกที่นั่งพร้อมกัน',
    },
    overview: {
      en: 'The system combines a Vue booking interface with a Go API, persistent booking state in MongoDB, temporary seat locks in Redis, realtime updates, authentication, and an administrative audit view.',
      th: 'ระบบรวมหน้าจอจองด้วย Vue เข้ากับ API ฝั่ง Go เก็บสถานะการจองถาวรใน MongoDB ล็อกที่นั่งชั่วคราวใน Redis อัปเดตเรียลไทม์ ระบบล็อกอิน และหน้าตรวจสอบสำหรับแอดมิน',
    },
    challenge: {
      en: 'Seat selection becomes a correctness problem when multiple customers choose the same seat at nearly the same moment. Temporary holds also need to expire safely when checkout is abandoned.',
      th: 'การเลือกที่นั่งกลายเป็นปัญหาความถูกต้อง เมื่อลูกค้าหลายคนเลือกที่นั่งเดียวกันในเวลาไล่เลี่ยกัน และการจองค้างไว้ต้องหมดอายุอย่างปลอดภัยเมื่อลูกค้าเลิกจ่ายเงินกลางคัน',
    },
    contribution: {
      en: [
        'Implemented the complete frontend and backend booking flow.',
        'Built token-owned locks with Redis SETNX, TTL, and atomic Lua release.',
        'Added realtime updates, authentication, audit events, and concurrency tests.',
      ],
      th: [
        'ทำ flow การจองครบทั้งฝั่งหน้าบ้านและหลังบ้าน',
        'สร้างล็อกที่ผูกกับ token ด้วย Redis SETNX, TTL และการปล่อยล็อกแบบ atomic ด้วย Lua',
        'เพิ่มอัปเดตเรียลไทม์ ระบบล็อกอิน audit event และเทสต์การทำงานพร้อมกัน',
      ],
    },
    decisions: {
      en: [
        'Used MongoDB for permanent availability and Redis for transient locked state.',
        'Made multi-seat locking all-or-nothing.',
        'Kept booking commits synchronous and used Pub/Sub only for audit delivery.',
      ],
      th: [
        'ใช้ MongoDB เก็บสถานะที่นั่งถาวร และ Redis เก็บสถานะล็อกชั่วคราว',
        'ล็อกหลายที่นั่งแบบทั้งหมดหรือไม่เอาเลย',
        'คอมมิตการจองแบบ synchronous ใช้ Pub/Sub เฉพาะการส่ง audit',
      ],
    },
    result: {
      en: 'A Docker-based system with a tested concurrency path that allows only one winner when simultaneous requests target the same seat.',
      th: 'ระบบบน Docker ที่มีเส้นทางการทำงานพร้อมกันซึ่งผ่านการทดสอบ อนุญาตให้มีผู้ชนะเพียงคนเดียวเมื่อคำขอพร้อมกันพุ่งไปที่นั่งเดียวกัน',
    },
    external: { label: L.source, href: 'https://github.com/ZXzep/cinema-booking-system' },
  },
  {
    slug: 'polaris', title: 'Polaris', category: 'CODE', period: '2026', accent: '#a8ff60',
    hero: '', gallery: [], tools: ['Next.js', 'TypeScript', 'Chrome Extension'],
    label: { en: 'Enterprise dashboard & browser extension', th: 'แดชบอร์ดองค์กร & ส่วนขยายเบราว์เซอร์' },
    role: { en: 'System design & development', th: 'ออกแบบระบบ & พัฒนา' },
    summary: {
      en: 'A realtime case-reporting dashboard connected to a legacy support system through the Polaris Link browser extension.',
      th: 'แดชบอร์ดรายงานเคสแบบเรียลไทม์ เชื่อมกับระบบซัพพอร์ตเดิมผ่านส่วนขยายเบราว์เซอร์ Polaris Link',
    },
    overview: {
      en: 'Polaris gives support teams a clearer operational view of cases while its companion extension bridges browser sessions and the existing enterprise workflow.',
      th: 'Polaris ให้ทีมซัพพอร์ตเห็นภาพเคสเชิงปฏิบัติการชัดขึ้น ขณะที่ส่วนขยายคู่กันทำหน้าที่เชื่อม session ของเบราว์เซอร์เข้ากับ workflow องค์กรเดิม',
    },
    challenge: {
      en: 'The new reporting experience needed to work alongside a legacy system rather than replace it, reducing manual context switching while keeping session data current.',
      th: 'ประสบการณ์รายงานใหม่ต้องทำงานร่วมกับระบบเดิม ไม่ใช่แทนที่ ลดการสลับหน้าจอด้วยมือ พร้อมทำให้ข้อมูล session เป็นปัจจุบันเสมอ',
    },
    contribution: {
      en: [
        'Designed the dashboard information hierarchy and reporting views.',
        'Built the web application and companion extension.',
        'Connected automatic refresh and session harvesting to the legacy workflow.',
      ],
      th: [
        'ออกแบบลำดับข้อมูลของแดชบอร์ดและหน้ารายงาน',
        'สร้างเว็บแอปพลิเคชันและส่วนขยายที่ใช้คู่กัน',
        'เชื่อมการรีเฟรชอัตโนมัติและการดึงข้อมูล session เข้ากับ workflow เดิม',
      ],
    },
    decisions: {
      en: [
        'Used an extension as a focused integration layer.',
        'Prioritized live operational visibility and fast case scanning.',
        'Preserved familiar support concepts inside a distinct product identity.',
      ],
      th: [
        'ใช้ส่วนขยายเป็นเลเยอร์เชื่อมต่อที่โฟกัสชัดเจน',
        'ให้ความสำคัญกับการเห็นสถานะเรียลไทม์และการสแกนเคสได้เร็ว',
        'คงคอนเซปต์งานซัพพอร์ตที่คุ้นเคยไว้ ภายใต้อัตลักษณ์โปรดักต์ใหม่',
      ],
    },
    result: {
      en: 'A working bridge between a modern realtime dashboard and the support team’s established enterprise environment.',
      th: 'สะพานเชื่อมที่ใช้งานได้จริง ระหว่างแดชบอร์ดเรียลไทม์สมัยใหม่กับสภาพแวดล้อมองค์กรเดิมของทีมซัพพอร์ต',
    },
    external: { label: L.live, href: 'https://ma-report-app.vercel.app' },
  },
  {
    slug: 'codelabs-tech', title: 'CodeLabs Tech', category: 'UX/UI', period: '2025', accent: '#6fa8ff',
    hero: '/work/codelabs.png',
    gallery: ['01.svg', '02.png', '03.png', '04.png', '05.png'].map((x) => `/case-studies/codelabs/${x}`),
    tools: ['Figma', 'Illustrator', 'Photoshop', 'Canva'],
    label: { en: 'UX/UI + graphic & brand design', th: 'UX/UI + งานกราฟิก & แบรนด์' },
    role: { en: 'Middle UX/UI Designer & Graphic Designer', th: 'Middle UX/UI Designer & Graphic Designer' },
    summary: {
      en: 'Two roles at one company — designing digital product experiences as a UX/UI designer while shaping the company visual identity as a graphic designer. Includes the AI Solutions Marketplace commerce experience.',
      th: 'สองบทบาทในบริษัทเดียว — ออกแบบประสบการณ์ดิจิทัลโปรดักต์ในฐานะ UX/UI designer พร้อมกับปั้นอัตลักษณ์ภาพของบริษัทในฐานะ graphic designer รวมงาน AI Solutions Marketplace ด้วย',
    },
    overview: {
      en: 'At CodeLabs Tech I held a product-design role and a brand-design role in parallel. On the UX/UI side I designed web and mobile interfaces — most notably the AI Solutions Marketplace, an end-to-end journey for discovering and evaluating AI tools, delivered as a full interactive prototype. On the graphic side I produced the brand assets, presentation decks, and event materials the company relied on day to day.',
      th: 'ที่ CodeLabs Tech ผมทำทั้งบทบาทออกแบบโปรดักต์และออกแบบแบรนด์ไปพร้อมกัน ฝั่ง UX/UI ผมออกแบบอินเทอร์เฟซเว็บและมือถือ ที่เด่นสุดคือ AI Solutions Marketplace เส้นทางค้นหาและประเมินเครื่องมือ AI แบบครบวงจร ส่งมอบเป็น interactive prototype เต็มรูปแบบ ส่วนฝั่งกราฟิก ผมทำ brand asset สไลด์นำเสนอ และสื่องานอีเวนต์ที่บริษัทใช้ทุกวัน',
    },
    challenge: {
      en: 'Running both roles at once meant switching between very different modes of thinking — interaction logic and user flows on one side, visual identity and campaign craft on the other — while keeping every output recognisably one company.',
      th: 'การทำสองบทบาทพร้อมกันคือการสลับโหมดคิดที่ต่างกันมาก — ฝั่งหนึ่งเป็นตรรกะการโต้ตอบและ user flow อีกฝั่งเป็นอัตลักษณ์ภาพและงานแคมเปญ — โดยทุกชิ้นงานต้องดูเป็นบริษัทเดียวกัน',
    },
    contribution: {
      en: [
        'Designed the AI Solutions Marketplace: navigation, discovery, comparison, and checkout flows, plus a full interactive prototype.',
        'Built web and mobile product UI backed by a reusable component system.',
        'Produced corporate and client-facing presentation decks.',
        'Developed logos, brand assets, and event materials for digital and print.',
      ],
      th: [
        'ออกแบบ AI Solutions Marketplace: navigation, การค้นหา, การเปรียบเทียบ และ flow checkout พร้อม interactive prototype เต็มรูปแบบ',
        'สร้าง UI โปรดักต์เว็บและมือถือ หนุนด้วย component system ที่นำกลับมาใช้ซ้ำได้',
        'ทำสไลด์นำเสนอสำหรับองค์กรและลูกค้า',
        'ออกแบบโลโก้ brand asset และสื่องานอีเวนต์ทั้งดิจิทัลและสิ่งพิมพ์',
      ],
    },
    decisions: {
      en: [
        'Used familiar marketplace patterns to make an unfamiliar product category approachable.',
        'Separated discovery, product detail, and action hierarchy in the marketplace flow.',
        'Adapted a single visual system across product screens, decks, and campaign assets.',
      ],
      th: [
        'ใช้แพทเทิร์นมาร์เก็ตเพลสที่คุ้นเคย เพื่อทำให้หมวดสินค้าที่ไม่คุ้นเข้าถึงง่าย',
        'แยกลำดับการค้นหา รายละเอียดสินค้า และปุ่ม action ใน flow มาร์เก็ตเพลส',
        'ปรับ visual system ชุดเดียวให้ใช้ได้ทั้งหน้าจอโปรดักต์ สไลด์ และสื่อแคมเปญ',
      ],
    },
    result: {
      en: 'A cross-disciplinary body of work: a complete interactive marketplace prototype alongside the product and brand design the company shipped and presented with.',
      th: 'ผลงานข้ามศาสตร์: interactive prototype มาร์เก็ตเพลสที่สมบูรณ์ คู่กับงานออกแบบโปรดักต์และแบรนด์ที่บริษัทนำไปใช้และนำเสนอจริง',
    },
    tracks: [
      {
        name: { en: 'UX/UI TRACK', th: 'สาย UX/UI' },
        points: {
          en: [
            'AI Solutions Marketplace — discovery, comparison, and checkout flows for AI products.',
            'Web and mobile product interfaces with a reusable component system.',
            'Wireframes, interactive prototypes, and design-system documentation.',
          ],
          th: [
            'AI Solutions Marketplace — flow การค้นหา เปรียบเทียบ และ checkout สำหรับสินค้า AI',
            'อินเทอร์เฟซโปรดักต์เว็บและมือถือ พร้อม component system ที่ใช้ซ้ำได้',
            'Wireframe, interactive prototype และเอกสาร design system',
          ],
        },
      },
      {
        name: { en: 'GRAPHIC & BRAND TRACK', th: 'สายกราฟิก & แบรนด์' },
        points: {
          en: [
            'Logos and brand assets applied across product and marketing.',
            'Corporate and client-facing presentation decks.',
            'Event and campaign materials for digital and print.',
          ],
          th: [
            'โลโก้และ brand asset ที่ใช้ทั้งฝั่งโปรดักต์และการตลาด',
            'สไลด์นำเสนอสำหรับองค์กรและลูกค้า',
            'สื่องานอีเวนต์และแคมเปญ ทั้งดิจิทัลและสิ่งพิมพ์',
          ],
        },
      },
    ],
    external: {
      label: { en: 'OPEN AI MARKETPLACE PROTOTYPE', th: 'เปิด prototype AI Marketplace' },
      href: 'https://www.figma.com/proto/866xE0q9aql8rdw6Snnrcw/ai.codelabsdev.co--Copy-?page-id=0%3A1&node-id=512-1331&viewport=-2244%2C287%2C0.13&t=sCAlYmFkWd87P9DS-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=512%3A1331',
    },
  },
  {
    slug: 'minddojo', title: 'MindDojo', category: 'DESIGN', period: '2025', accent: '#ff6e91',
    hero: '/work/minddojo-live.png',
    gallery: Array.from({ length: 25 }, (_, i) => `/case-studies/minddojo/${String(i + 1).padStart(2, '0')}.png`),
    tools: ['Illustrator', 'Canva'],
    label: { en: 'Graphic design for corporate events & media', th: 'งานกราฟิกสำหรับอีเวนต์องค์กรและสื่อ' },
    role: { en: 'Graphic Designer', th: 'Graphic Designer' },
    summary: {
      en: 'Corporate presentation, event, and promotional artwork created within the MindDojo brand.',
      th: 'งานสไลด์นำเสนอองค์กร งานอีเวนต์ และอาร์ตเวิร์กโปรโมต ภายใต้แบรนด์ MindDojo',
    },
    overview: {
      en: 'The work supported corporate communication across presentations, event environments, and promotional media.',
      th: 'งานนี้สนับสนุนการสื่อสารองค์กร ทั้งสไลด์นำเสนอ บรรยากาศงานอีเวนต์ และสื่อโปรโมต',
    },
    challenge: {
      en: 'Each asset needed to communicate quickly in a different context while still feeling recognizably part of the same company.',
      th: 'แต่ละชิ้นงานต้องสื่อสารได้เร็วในบริบทที่ต่างกัน แต่ยังต้องดูเป็นบริษัทเดียวกันชัดเจน',
    },
    contribution: {
      en: [
        'Created presentation and event artwork.',
        'Designed promotional materials for digital media.',
        'Applied the established brand across varied formats.',
      ],
      th: [
        'ทำอาร์ตเวิร์กสไลด์นำเสนอและงานอีเวนต์',
        'ออกแบบสื่อโปรโมตสำหรับสื่อดิจิทัล',
        'ปรับใช้แบรนด์ที่มีอยู่กับฟอร์แมตหลากหลาย',
      ],
    },
    decisions: {
      en: [
        'Used clear hierarchy for information-heavy communication.',
        'Adjusted composition for screen, stage, and promotional contexts.',
        'Maintained continuity across campaign assets.',
      ],
      th: [
        'ใช้ลำดับข้อมูลที่ชัด สำหรับการสื่อสารที่มีข้อมูลเยอะ',
        'ปรับองค์ประกอบให้เหมาะกับหน้าจอ เวที และบริบทโปรโมต',
        'รักษาความต่อเนื่องของสื่อในแคมเปญเดียวกัน',
      ],
    },
    result: {
      en: 'A broad set of consistent brand communications supporting company events, presentations, and promotional activity.',
      th: 'ชุดงานสื่อสารแบรนด์ที่สอดคล้องกันจำนวนมาก สนับสนุนงานอีเวนต์ การนำเสนอ และกิจกรรมโปรโมตของบริษัท',
    },
  },
  {
    slug: 'ta-recruitment', title: 'TA Recruitment', category: 'UX/UI', period: 'ARCHIVE', accent: '#7aa8ff',
    hero: '/case-studies/ta-recruitment/01.png',
    gallery: Array.from({ length: 29 }, (_, i) => `/case-studies/ta-recruitment/${String(i + 1).padStart(2, '0')}.png`),
    tools: ['Figma'],
    label: { en: 'Mobile recruitment application', th: 'แอปมือถือสำหรับงานสรรหาบุคลากร' },
    role: { en: 'Requirements, wireframes & UX/UI design', th: 'เก็บ requirement, ทำ wireframe & ออกแบบ UX/UI' },
    summary: {
      en: 'A mobile application concept for managing recruitment and candidate processes.',
      th: 'คอนเซปต์แอปมือถือสำหรับจัดการกระบวนการสรรหาและผู้สมัคร',
    },
    overview: {
      en: 'TA Recruitment supports candidates and administrators through a structured recruitment flow in a clear mobile interface.',
      th: 'TA Recruitment รองรับทั้งผู้สมัครและแอดมิน ผ่าน flow การสรรหาที่มีโครงสร้างชัด บนอินเทอร์เฟซมือถือที่อ่านง่าย',
    },
    challenge: {
      en: 'Different user roles, statuses, and administrative steps needed to remain understandable on a small screen.',
      th: 'บทบาทผู้ใช้ สถานะ และขั้นตอนของแอดมินที่ต่างกัน ต้องยังเข้าใจง่ายบนหน้าจอเล็ก',
    },
    contribution: {
      en: [
        'Gathered and translated requirements into product flows.',
        'Created wireframes for the recruitment journey.',
        'Designed the final mobile UX/UI.',
      ],
      th: [
        'เก็บ requirement และแปลงเป็น flow ของโปรดักต์',
        'ทำ wireframe ของเส้นทางการสรรหา',
        'ออกแบบ UX/UI มือถือฉบับสมบูรณ์',
      ],
    },
    decisions: {
      en: [
        'Made status and next actions prominent.',
        'Separated candidate tasks from administrative responsibilities.',
        'Resolved flow logic before visual refinement.',
      ],
      th: [
        'ทำให้สถานะและ action ถัดไปเด่นชัด',
        'แยกงานของผู้สมัครออกจากงานของแอดมิน',
        'เคลียร์ตรรกะ flow ให้จบก่อนค่อยเก็บงานภาพ',
      ],
    },
    result: {
      en: 'A complete mobile interface direction supporting both sides of the recruitment process.',
      th: 'ทิศทางอินเทอร์เฟซมือถือที่สมบูรณ์ รองรับกระบวนการสรรหาทั้งสองฝั่ง',
    },
  },
  {
    slug: 'kumi-shop', title: 'Kumi Shop', category: 'UX/UI', period: 'ARCHIVE', accent: '#ffbd66',
    hero: '/case-studies/kumi-shop/1.png',
    gallery: ['1', '2', '3', '4', '5'].map((x) => `/case-studies/kumi-shop/${x}.png`),
    tools: ['Figma', 'Photoshop'],
    label: { en: 'Beverage e-commerce experience', th: 'ประสบการณ์อีคอมเมิร์ซเครื่องดื่ม' },
    role: { en: 'UX/UI design & front-end development', th: 'ออกแบบ UX/UI & พัฒนา front-end' },
    summary: {
      en: 'An e-commerce website designed to make beverage discovery and purchasing direct and approachable.',
      th: 'เว็บอีคอมเมิร์ซที่ออกแบบให้การค้นหาและซื้อเครื่องดื่มตรงไปตรงมาและเข้าถึงง่าย',
    },
    overview: {
      en: 'Kumi Shop combines a visually inviting storefront with a straightforward shopping flow for beverage products.',
      th: 'Kumi Shop รวมหน้าร้านที่ดึงดูดสายตาเข้ากับ flow การช้อปที่เข้าใจง่ายสำหรับสินค้าเครื่องดื่ม',
    },
    challenge: {
      en: 'The experience needed to express the product personality while keeping browsing, selection, and purchase uncomplicated.',
      th: 'ประสบการณ์ต้องสื่อบุคลิกของสินค้า ขณะที่การเลือกดู เลือกซื้อ และจ่ายเงินต้องไม่ซับซ้อน',
    },
    contribution: {
      en: [
        'Designed the storefront and purchasing flow.',
        'Created the visual interface and product imagery.',
        'Implemented the front-end experience.',
      ],
      th: [
        'ออกแบบหน้าร้านและ flow การซื้อ',
        'ทำ visual interface และภาพสินค้า',
        'พัฒนาประสบการณ์ฝั่ง front-end',
      ],
    },
    decisions: {
      en: [
        'Kept product choices central to each screen.',
        'Used visual warmth without weakening clarity.',
        'Reduced friction across the shopping journey.',
      ],
      th: [
        'ให้ตัวเลือกสินค้าเป็นศูนย์กลางของทุกหน้าจอ',
        'ใช้โทนภาพที่อบอุ่นโดยไม่ลดความชัดเจน',
        'ลดจุดสะดุดตลอดเส้นทางการช้อป',
      ],
    },
    result: {
      en: 'A cohesive e-commerce concept joining brand expression with a practical customer flow.',
      th: 'คอนเซปต์อีคอมเมิร์ซที่กลมกล่อม เชื่อมการแสดงออกของแบรนด์เข้ากับ flow ที่ใช้งานได้จริง',
    },
  },
  {
    slug: 'tic-tactics', title: 'TIC-TACTICS', category: 'UX/UI', period: 'ARCHIVE', accent: '#ff745c',
    hero: '/work/ttt.png',
    gallery: Array.from({ length: 18 }, (_, i) => `/case-studies/tic-tactics/${String(i + 1).padStart(2, '0')}.png`),
    tools: ['Figma', 'Front-end Development'],
    label: { en: 'Game website UX/UI & front-end', th: 'UX/UI & front-end เว็บไซต์เกม' },
    role: { en: 'UX/UI design & front-end development', th: 'ออกแบบ UX/UI & พัฒนา front-end' },
    summary: {
      en: 'A game website project shaped from interface design through front-end implementation.',
      th: 'โปรเจกต์เว็บไซต์เกม ตั้งแต่ออกแบบอินเทอร์เฟซไปจนถึงพัฒนา front-end',
    },
    overview: {
      en: 'TIC-TACTICS presents game content through an energetic web experience designed for smooth browsing and player engagement.',
      th: 'TIC-TACTICS นำเสนอเนื้อหาเกมผ่านประสบการณ์เว็บที่มีพลัง ออกแบบให้เลื่อนดูลื่นและดึงผู้เล่นให้อยู่ต่อ',
    },
    challenge: {
      en: 'The interface needed a strong game identity while keeping navigation and promotional content easy to follow.',
      th: 'อินเทอร์เฟซต้องมีอัตลักษณ์เกมที่ชัด ขณะที่ navigation และเนื้อหาโปรโมตต้องตามง่าย',
    },
    contribution: {
      en: [
        'Designed the site structure and user experience.',
        'Created the visual interface in Figma.',
        'Implemented the designed layouts on the front end.',
      ],
      th: [
        'ออกแบบโครงสร้างเว็บและ user experience',
        'ทำ visual interface ใน Figma',
        'พัฒนาเลย์เอาต์ที่ออกแบบไว้บน front-end',
      ],
    },
    decisions: {
      en: [
        'Balanced expressive visuals with readable hierarchy.',
        'Designed interaction and layout as one experience.',
        'Carried the visual direction into implementation.',
      ],
      th: [
        'บาลานซ์ภาพที่จัดจ้านกับลำดับข้อมูลที่อ่านง่าย',
        'ออกแบบการโต้ตอบและเลย์เอาต์เป็นประสบการณ์เดียว',
        'คงทิศทางภาพไว้จนถึงขั้นตอนพัฒนา',
      ],
    },
    result: {
      en: 'A unified design-and-build project translating the game’s presentation into a working web interface.',
      th: 'โปรเจกต์ที่ออกแบบและสร้างเป็นหนึ่งเดียว แปลการนำเสนอของเกมให้เป็นอินเทอร์เฟซเว็บที่ใช้งานได้จริง',
    },
  },
  {
    slug: 'hoklong-metaverse', title: 'Hoklong Metaverse', category: '3D', period: 'ARCHIVE', accent: '#a98aff',
    hero: '/case-studies/hoklong-metaverse/01.png',
    gallery: Array.from({ length: 10 }, (_, i) => `/case-studies/hoklong-metaverse/${String(i + 1).padStart(2, '0')}.png`),
    tools: ['Maya', 'Substance 3D Painter'],
    label: { en: '3D modeling for metaverse tourism', th: 'งานโมเดล 3D สำหรับเมตาเวิร์สท่องเที่ยว' },
    role: { en: '3D modeling & asset creation', th: 'ทำโมเดล 3D & สร้าง asset' },
    summary: {
      en: 'Buildings, vehicles, and environmental assets modeled for a tourism-focused virtual world.',
      th: 'อาคาร ยานพาหนะ และ asset สภาพแวดล้อม ที่ทำโมเดลขึ้นสำหรับโลกเสมือนเชิงท่องเที่ยว',
    },
    overview: {
      en: 'Hoklong Metaverse translates recognizable real-world elements into assets intended for an interactive tourism environment.',
      th: 'Hoklong Metaverse แปลงองค์ประกอบจากโลกจริงที่จำได้ ให้เป็น asset สำหรับสภาพแวดล้อมท่องเที่ยวแบบโต้ตอบได้',
    },
    challenge: {
      en: 'The models needed to feel grounded in their references while remaining suitable as a consistent family of virtual assets.',
      th: 'โมเดลต้องดูอ้างอิงจากของจริงได้ ขณะเดียวกันก็ต้องเข้าชุดกันเป็น asset เสมือนที่สอดคล้อง',
    },
    contribution: {
      en: [
        'Modeled buildings, vehicles, and environment assets.',
        'Created materials and surface details.',
        'Maintained consistency across asset types.',
      ],
      th: [
        'ทำโมเดลอาคาร ยานพาหนะ และ asset สภาพแวดล้อม',
        'สร้าง material และรายละเอียดพื้นผิว',
        'รักษาความสอดคล้องระหว่าง asset แต่ละประเภท',
      ],
    },
    decisions: {
      en: [
        'Focused geometry on recognizable silhouettes.',
        'Used a shared material approach for cohesion.',
        'Designed models around their role in an interactive environment.',
      ],
      th: [
        'โฟกัส geometry ที่เงาโครงร่างที่จำได้',
        'ใช้แนวทาง material ร่วมกันเพื่อความเป็นชุด',
        'ออกแบบโมเดลรอบ ๆ บทบาทของมันในสภาพแวดล้อมแบบโต้ตอบ',
      ],
    },
    result: {
      en: 'A coordinated library of tourism-oriented 3D assets prepared as building blocks for the metaverse experience.',
      th: 'คลัง asset 3D เชิงท่องเที่ยวที่จัดชุดสอดคล้องกัน เตรียมไว้เป็นชิ้นส่วนประกอบของประสบการณ์เมตาเวิร์ส',
    },
  },
  {
    slug: 'university-3d-project', title: 'University 3D Project', category: '3D', period: 'UNIVERSITY', accent: '#8e6cff',
    hero: '/case-studies/university-3d-project/01.png',
    gallery: ['/case-studies/university-3d-project/01.png'],
    tools: ['Maya', 'Substance 3D Painter'],
    label: { en: '3D modeling & asset design', th: 'งานโมเดล 3D & ออกแบบ asset' },
    role: { en: '3D Artist', th: '3D Artist' },
    summary: {
      en: 'An academic collection of robots, vehicles, and interior environments focused on modeling and asset craft.',
      th: 'ชุดผลงานวิชาการ ทั้งหุ่นยนต์ ยานพาหนะ และฉากภายใน เน้นงานโมเดลและฝีมือการทำ asset',
    },
    overview: {
      en: 'The project developed practical 3D production skills through a varied set of hard-surface objects and environmental work.',
      th: 'โปรเจกต์นี้ฝึกทักษะการผลิตงาน 3D จริง ผ่านชุดงาน hard-surface และงานสภาพแวดล้อมที่หลากหลาย',
    },
    challenge: {
      en: 'Each subject required a different balance of proportion, construction detail, materials, and presentation.',
      th: 'แต่ละชิ้นงานต้องการสมดุลที่ต่างกัน ทั้งสัดส่วน รายละเอียดการประกอบ material และการนำเสนอ',
    },
    contribution: {
      en: [
        'Modeled robot, vehicle, and interior subjects.',
        'Created materials and texture detail.',
        'Prepared the assets for final presentation.',
      ],
      th: [
        'ทำโมเดลหุ่นยนต์ ยานพาหนะ และฉากภายใน',
        'สร้าง material และรายละเอียด texture',
        'เตรียม asset สำหรับการนำเสนอขั้นสุดท้าย',
      ],
    },
    decisions: {
      en: [
        'Prioritized readable form before surface detail.',
        'Used varied subjects to explore different modeling problems.',
        'Presented assets with attention to silhouette and material response.',
      ],
      th: [
        'ให้ความสำคัญกับรูปทรงที่อ่านออกก่อนรายละเอียดพื้นผิว',
        'ใช้ชิ้นงานหลากหลายเพื่อสำรวจโจทย์การโมเดลที่ต่างกัน',
        'นำเสนอ asset โดยใส่ใจเงาโครงร่างและการตอบสนองของ material',
      ],
    },
    result: {
      en: 'A foundational body of 3D work demonstrating asset modeling, texturing, and visual presentation skills.',
      th: 'ชุดผลงาน 3D พื้นฐานที่แสดงทักษะการโมเดล asset การทำ texture และการนำเสนอเชิงภาพ',
    },
  },
  {
    slug: 'freelance-graphic-design', title: 'Freelance Graphic Design', category: 'DESIGN', period: 'ARCHIVE', accent: '#ff668d',
    hero: '/case-studies/freelance-graphic-design/01.png',
    gallery: Array.from({ length: 12 }, (_, i) => `/case-studies/freelance-graphic-design/${String(i + 1).padStart(2, '0')}.png`),
    tools: ['Illustrator'],
    label: { en: 'Artwork for game promotions & events', th: 'อาร์ตเวิร์กสำหรับโปรโมตเกม & อีเวนต์' },
    role: { en: 'Graphic Designer', th: 'Graphic Designer' },
    summary: {
      en: 'Promotional artwork created for gaming events, campaigns, social media, and in-game communication.',
      th: 'อาร์ตเวิร์กโปรโมตสำหรับงานอีเวนต์เกม แคมเปญ โซเชียลมีเดีย และการสื่อสารในเกม',
    },
    overview: {
      en: 'The collection brings together campaign assets designed to attract attention and communicate event information to gaming audiences.',
      th: 'ชุดผลงานนี้รวม asset แคมเปญที่ออกแบบมาเพื่อดึงความสนใจและสื่อสารข้อมูลอีเวนต์ให้กลุ่มผู้เล่นเกม',
    },
    challenge: {
      en: 'Promotional artwork had to feel energetic while keeping dates, rewards, and campaign messages immediately readable.',
      th: 'อาร์ตเวิร์กโปรโมตต้องดูมีพลัง ขณะที่วันที่ ของรางวัล และข้อความแคมเปญต้องอ่านออกทันที',
    },
    contribution: {
      en: [
        'Designed social-media and campaign visuals.',
        'Created artwork for in-game events.',
        'Adapted visual concepts across formats.',
      ],
      th: [
        'ออกแบบภาพสำหรับโซเชียลมีเดียและแคมเปญ',
        'ทำอาร์ตเวิร์กสำหรับอีเวนต์ในเกม',
        'ปรับคอนเซปต์ภาพให้ใช้ได้หลายฟอร์แมต',
      ],
    },
    decisions: {
      en: [
        'Built hierarchy around the key message and action.',
        'Used contrast to remain readable in crowded channels.',
        'Adjusted each design to its event theme.',
      ],
      th: [
        'จัดลำดับข้อมูลรอบ ๆ ข้อความหลักและ action',
        'ใช้คอนทราสต์เพื่อให้อ่านออกในช่องทางที่มีคอนเทนต์แน่น',
        'ปรับแต่ละงานให้เข้ากับธีมอีเวนต์',
      ],
    },
    result: {
      en: 'A varied portfolio of game-focused communication work covering social, campaign, and event needs.',
      th: 'พอร์ตงานสื่อสารสายเกมที่หลากหลาย ครอบคลุมงานโซเชียล แคมเปญ และอีเวนต์',
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
// Retired slugs that now live inside another case study.
export const projectRedirects: Record<string, string> = { 'ai-solutions-marketplace': 'codelabs-tech' };
