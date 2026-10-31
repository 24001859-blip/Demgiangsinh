import { CardStyle, CharacterId, WishCard } from '../types/wish';

const STORAGE_KEY = 'christmas_wish_tree_v1';

/**
 * Các vị trí chuẩn trên các tầng lá của cây thông Noel (tính theo % khung cây thông)
 * giúp các tấm thiệp luôn nằm đẹp trên tán lá thông mà không bị lơ lửng ngoài rìa.
 */
export const TREE_BRANCH_SLOTS: Array<{ x: number; y: number }> = [
  // Tầng trên
  { x: 47, y: 27 },
  { x: 54, y: 31 },
  { x: 43, y: 34 },
  // Tầng giữa trên
  { x: 38, y: 42 },
  { x: 50, y: 43 },
  { x: 61, y: 44 },
  { x: 44, y: 48 },
  { x: 56, y: 49 },
  // Tầng giữa dưới
  { x: 33, y: 56 },
  { x: 45, y: 57 },
  { x: 55, y: 58 },
  { x: 66, y: 57 },
  { x: 39, y: 63 },
  { x: 51, y: 64 },
  { x: 62, y: 63 },
  // Tầng dưới rộng
  { x: 28, y: 71 },
  { x: 38, y: 72 },
  { x: 49, y: 73 },
  { x: 60, y: 72 },
  { x: 71, y: 71 },
  { x: 34, y: 78 },
  { x: 45, y: 79 },
  { x: 56, y: 79 },
  { x: 66, y: 77 },
];

const CARD_STYLES: CardStyle[] = ['red-gold', 'emerald', 'frost-blue', 'berry-pink'];

const INITIAL_DEMO_WISHES: WishCard[] = [
  {
    id: 'demo-wish-1',
    senderName: 'Minh Anh',
    message: 'Chúc gia đình mình một mùa Giáng sinh thật bình an, luôn ngập tràn tiếng cười và ấm áp bên nhau! 🎄✨',
    characterId: 'santa',
    visibility: 'public',
    cardStyle: 'red-gold',
    position: { x: 44, y: 35 },
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'demo-wish-2',
    senderName: 'Hoàng Nam',
    message: 'Mong năm mới mọi dự định đều thuận buồm xuôi gió, deadline qua nhẹ như bông tuyết rơi!',
    characterId: 'reindeer',
    visibility: 'public',
    cardStyle: 'emerald',
    position: { x: 59, y: 46 },
    createdAt: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
  },
  {
    id: 'demo-wish-3',
    senderName: 'Người Bạn Bí Ẩn',
    message: 'Gửi người đang đọc tấm thiệp này: Chúc bạn luôn rạng rỡ như ngôi sao trên đỉnh cây thông nhé!',
    characterId: 'snowman',
    visibility: 'public',
    cardStyle: 'frost-blue',
    position: { x: 36, y: 59 },
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'demo-wish-4',
    senderName: 'Lan Khuê',
    message: 'Điều ước bí mật đêm Noel: Mong kỳ thi sắp tới đạt kết quả thật tốt và có chuyến du lịch Đà Lạt cùng hội bạn thân!',
    characterId: 'elf',
    visibility: 'private',
    secretKey: 'NOEL2026',
    cardStyle: 'berry-pink',
    position: { x: 63, y: 69 },
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export function loadWishesFromStorage(): { wishes: WishCard[]; error: string | null } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_WISHES));
      return { wishes: INITIAL_DEMO_WISHES, error: null };
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return { wishes: INITIAL_DEMO_WISHES, error: 'Dữ liệu cũ không hợp lệ, đã khôi phục mặc định.' };
    }
    return { wishes: parsed, error: null };
  } catch (err) {
    console.error('Lỗi khi đọc localStorage:', err);
    return {
      wishes: INITIAL_DEMO_WISHES,
      error: 'Trình duyệt đang chặn hoặc không thể đọc localStorage. Đang hiển thị dữ liệu tạm thời.',
    };
  }
}

export function saveWishesToStorage(wishes: WishCard[]): { ok: boolean; error: string | null } {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    return { ok: true, error: null };
  } catch (err) {
    console.error('Lỗi khi lưu localStorage:', err);
    return {
      ok: false,
      error: 'Không thể lưu vào bộ nhớ trình duyệt (localStorage có thể đã đầy hoặc bị vô hiệu hóa).',
    };
  }
}

export function pickNextTreePosition(existingWishes: WishCard[]): { x: number; y: number } {
  // Tìm một slot chưa có thiệp nào đứng quá gần (khoảng cách > 6.5%)
  const availableSlots = TREE_BRANCH_SLOTS.filter((slot) =>
    existingWishes.every((w) => {
      const dx = w.position.x - slot.x;
      const dy = w.position.y - slot.y;
      return Math.hypot(dx, dy) > 6.5;
    })
  );

  const baseSlot =
    availableSlots.length > 0
      ? availableSlots[Math.floor(Math.random() * availableSlots.length)]
      : TREE_BRANCH_SLOTS[existingWishes.length % TREE_BRANCH_SLOTS.length];

  // Thêm độ lệch rất nhẹ để tự nhiên hơn
  const jitterX = (Math.random() - 0.5) * 3;
  const jitterY = (Math.random() - 0.5) * 2.5;

  return {
    x: Math.round((baseSlot.x + jitterX) * 10) / 10,
    y: Math.round((baseSlot.y + jitterY) * 10) / 10,
  };
}

export function generateSecretKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function pickCardStyle(characterId: CharacterId, index: number): CardStyle {
  const map: Record<CharacterId, CardStyle> = {
    santa: 'red-gold',
    reindeer: 'emerald',
    snowman: 'frost-blue',
    elf: 'berry-pink',
  };
  return map[characterId] ?? CARD_STYLES[index % CARD_STYLES.length];
}

export function buildDemoPrivateUrl(wishId: string, secretKey: string): string {
  const url = new URL(window.location.href);
  url.searchParams.set('wish', wishId);
  url.searchParams.set('key', secretKey);
  return url.toString();
}
