export type CharacterId = 'santa' | 'reindeer' | 'snowman' | 'elf';

export type WishVisibility = 'public' | 'private';

export type CardStyle = 'red-gold' | 'emerald' | 'frost-blue' | 'berry-pink';

export interface CharacterInfo {
  id: CharacterId;
  name: string;
  role: string;
  description: string;
  accentColor: string;
  greeting: string;
}

export interface WishCard {
  id: string;
  senderName: string;
  message: string;
  characterId: CharacterId;
  visibility: WishVisibility;
  secretKey?: string;
  cardStyle: CardStyle;
  /** Vị trí treo trên tán cây thông (% theo khung cây thông) */
  position: {
    x: number;
    y: number;
  };
  createdAt: string;
}

export const CHARACTERS: CharacterInfo[] = [
  {
    id: 'santa',
    name: 'Ông Già Noel',
    role: 'Sứ giả điều ước',
    description: 'Ấm áp, hào sảng với túi phép màu đỏ rực đêm Giáng sinh.',
    accentColor: '#ff4d5a',
    greeting: 'Ho Ho Ho! Để ta mang điều ước của bạn lên cành thông cao nhất nhé!',
  },
  {
    id: 'reindeer',
    name: 'Tuần Lộc Rudolph',
    role: 'Mũi đỏ dẫn đường',
    description: 'Nhanh nhẹn, đáng yêu với chiếc mũi phát sáng lấp lánh.',
    accentColor: '#f59e0b',
    greeting: 'Lộc cộc! Mũi đỏ sáng rồi, mình chạy đi treo thiệp ngay đây!',
  },
  {
    id: 'snowman',
    name: 'Người Tuyết Frosty',
    role: 'Bạn nhỏ mùa đông',
    description: 'Tròn trịa, vui tươi cùng chiếc khăn choàng len ấm áp.',
    accentColor: '#38bdf8',
    greeting: 'Tuyệt quá! Lời chúc ấm áp thế này cũng không làm mình tan chảy đâu!',
  },
  {
    id: 'elf',
    name: 'Yêu Tinh Noel',
    role: 'Thợ thủ công phép thuật',
    description: 'Tinh nghịch, khéo léo rắc bụi tiên lấp lánh lên từng tấm thiệp.',
    accentColor: '#34d399',
    greeting: 'Ting ting! Mình đã rắc thêm bụi phép thuật vào thiệp của bạn rồi!',
  },
];
