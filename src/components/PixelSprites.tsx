import React from 'react';
import { CardStyle, CharacterId, WishVisibility } from '../types/wish';

interface CharacterSpriteProps {
  characterId: CharacterId;
  size?: number;
  isHoldingCard?: boolean;
  className?: string;
}

/**
 * Sprite 2D Pixel Art 16x18 cho 4 nhân vật Giáng sinh:
 * Ông già Noel, Tuần lộc, Người tuyết, Yêu tinh
 */
export const PixelCharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  size = 64,
  isHoldingCard = false,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 18"
      shapeRendering="crispEdges"
      className={`pixel-sprite ${className}`}
      aria-hidden="true"
    >
      {/* Bóng đổ dưới chân */}
      <rect x="3" y="16" width="10" height="1" fill="rgba(7, 15, 34, 0.45)" />
      <rect x="4" y="17" width="8" height="1" fill="rgba(7, 15, 34, 0.25)" />

      {characterId === 'santa' && (
        <g>
          {/* Chóp mũ & cục bông trắng */}
          <rect x="5" y="1" width="6" height="1" fill="#dc2626" />
          <rect x="4" y="2" width="7" height="1" fill="#ef4444" />
          <rect x="11" y="2" width="2" height="2" fill="#ffffff" />
          {/* Viền mũ trắng */}
          <rect x="3" y="3" width="8" height="2" fill="#f8fafc" />
          <rect x="4" y="4" width="7" height="1" fill="#e2e8f0" />
          {/* Khuôn mặt & mắt */}
          <rect x="4" y="5" width="7" height="3" fill="#fed7aa" />
          <rect x="5" y="6" width="1" height="1" fill="#1e293b" />
          <rect x="9" y="6" width="1" height="1" fill="#1e293b" />
          <rect x="4" y="7" width="1" height="1" fill="#fb7185" />
          <rect x="10" y="7" width="1" height="1" fill="#fb7185" />
          <rect x="7" y="6" width="1" height="1" fill="#f87171" />
          {/* Bộ râu trắng dày */}
          <rect x="3" y="7" width="9" height="2" fill="#ffffff" />
          <rect x="4" y="9" width="7" height="2" fill="#f1f5f9" />
          <rect x="5" y="11" width="5" height="1" fill="#e2e8f0" />
          {/* Áo đỏ & thắt lưng */}
          <rect x="3" y="10" width="9" height="4" fill="#dc2626" />
          <rect x="2" y="10" width="1" height="3" fill="#ef4444" />
          <rect x="12" y="10" width="1" height="3" fill="#ef4444" />
          <rect x="7" y="11" width="1" height="2" fill="#ffffff" />
          {/* Thắt lưng đen khóa vàng */}
          <rect x="3" y="13" width="9" height="1" fill="#1e293b" />
          <rect x="6" y="13" width="3" height="1" fill="#fbbf24" />
          {/* Viền áo trắng & ủng */}
          <rect x="3" y="14" width="9" height="1" fill="#f8fafc" />
          <rect x="4" y="15" width="3" height="2" fill="#1e293b" />
          <rect x="8" y="15" width="3" height="2" fill="#1e293b" />
        </g>
      )}

      {characterId === 'reindeer' && (
        <g>
          {/* Sừng tuần lộc */}
          <rect x="2" y="1" width="1" height="3" fill="#78350f" />
          <rect x="3" y="2" width="2" height="1" fill="#92400e" />
          <rect x="4" y="1" width="1" height="3" fill="#78350f" />
          <rect x="12" y="1" width="1" height="3" fill="#78350f" />
          <rect x="10" y="2" width="2" height="1" fill="#92400e" />
          <rect x="10" y="1" width="1" height="3" fill="#78350f" />
          {/* Tai & đầu */}
          <rect x="2" y="4" width="2" height="1" fill="#b45309" />
          <rect x="11" y="4" width="2" height="1" fill="#b45309" />
          <rect x="4" y="4" width="7" height="5" fill="#b45309" />
          <rect x="5" y="5" width="5" height="3" fill="#d97706" />
          {/* Mắt & Mũi đỏ phát sáng */}
          <rect x="5" y="6" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="6" width="1" height="1" fill="#0f172a" />
          <rect x="6" y="7" width="3" height="2" fill="#fde68a" />
          <rect x="7" y="7" width="2" height="2" fill="#ef4444" />
          <rect x="7" y="7" width="1" height="1" fill="#fca5a5" />
          {/* Vòng cổ đỏ & chuông vàng */}
          <rect x="4" y="9" width="7" height="1" fill="#dc2626" />
          <rect x="7" y="9" width="2" height="2" fill="#fbbf24" />
          {/* Thân tuần lộc */}
          <rect x="3" y="10" width="9" height="5" fill="#b45309" />
          <rect x="5" y="11" width="5" height="3" fill="#fde68a" />
          {/* Chân & móng */}
          <rect x="4" y="15" width="2" height="2" fill="#451a03" />
          <rect x="9" y="15" width="2" height="2" fill="#451a03" />
        </g>
      )}

      {characterId === 'snowman' && (
        <g>
          {/* Mũ chóp đen + lá thông đỏ */}
          <rect x="5" y="1" width="5" height="2" fill="#1e293b" />
          <rect x="5" y="3" width="5" height="1" fill="#dc2626" />
          <rect x="8" y="2" width="1" height="1" fill="#22c55e" />
          <rect x="3" y="4" width="9" height="1" fill="#0f172a" />
          {/* Đầu người tuyết */}
          <rect x="4" y="5" width="7" height="4" fill="#ffffff" />
          <rect x="4" y="8" width="7" height="1" fill="#e0f2fe" />
          {/* Mắt & Mũi cà rốt */}
          <rect x="5" y="6" width="1" height="1" fill="#0f172a" />
          <rect x="9" y="6" width="1" height="1" fill="#0f172a" />
          <rect x="7" y="7" width="3" height="1" fill="#f97316" />
          {/* Khăn quàng đỏ sọc vàng */}
          <rect x="3" y="9" width="9" height="2" fill="#ef4444" />
          <rect x="5" y="9" width="1" height="2" fill="#fbbf24" />
          <rect x="9" y="9" width="2" height="4" fill="#dc2626" />
          <rect x="9" y="12" width="2" height="1" fill="#fbbf24" />
          {/* Thân người tuyết tròn + cúc áo */}
          <rect x="3" y="11" width="9" height="5" fill="#ffffff" />
          <rect x="2" y="12" width="11" height="3" fill="#f8fafc" />
          <rect x="3" y="15" width="9" height="1" fill="#bae6fd" />
          <rect x="6" y="12" width="1" height="1" fill="#1e293b" />
          <rect x="6" y="14" width="1" height="1" fill="#1e293b" />
          {/* Cành cây làm tay */}
          <rect x="1" y="10" width="2" height="1" fill="#78350f" />
          <rect x="12" y="10" width="2" height="1" fill="#78350f" />
        </g>
      )}

      {characterId === 'elf' && (
        <g>
          {/* Mũ yêu tinh xanh lá + chuông vàng */}
          <rect x="6" y="1" width="5" height="1" fill="#16a34a" />
          <rect x="11" y="1" width="2" height="2" fill="#fbbf24" />
          <rect x="4" y="2" width="6" height="2" fill="#22c55e" />
          {/* Viền mũ đỏ vàng */}
          <rect x="3" y="4" width="9" height="1" fill="#ef4444" />
          <rect x="4" y="4" width="1" height="1" fill="#fbbf24" />
          <rect x="7" y="4" width="1" height="1" fill="#fbbf24" />
          <rect x="10" y="4" width="1" height="1" fill="#fbbf24" />
          {/* Khuôn mặt & đôi tai nhọn */}
          <rect x="2" y="6" width="2" height="2" fill="#fed7aa" />
          <rect x="11" y="6" width="2" height="2" fill="#fed7aa" />
          <rect x="4" y="5" width="7" height="4" fill="#fed7aa" />
          <rect x="5" y="6" width="1" height="1" fill="#1e293b" />
          <rect x="9" y="6" width="1" height="1" fill="#1e293b" />
          <rect x="4" y="7" width="1" height="1" fill="#fb7185" />
          <rect x="10" y="7" width="1" height="1" fill="#fb7185" />
          <rect x="6" y="8" width="3" height="1" fill="#f43f5e" />
          {/* Áo yêu tinh xanh lục & cổ áo vàng */}
          <rect x="3" y="9" width="9" height="1" fill="#fbbf24" />
          <rect x="3" y="10" width="9" height="4" fill="#16a34a" />
          <rect x="2" y="10" width="1" height="3" fill="#22c55e" />
          <rect x="12" y="10" width="1" height="3" fill="#22c55e" />
          {/* Thắt lưng */}
          <rect x="3" y="13" width="9" height="1" fill="#1e293b" />
          <rect x="6" y="13" width="3" height="1" fill="#fbbf24" />
          {/* Giày mũi cong */}
          <rect x="3" y="15" width="3" height="2" fill="#dc2626" />
          <rect x="2" y="15" width="1" height="1" fill="#fbbf24" />
          <rect x="9" y="15" width="3" height="2" fill="#dc2626" />
          <rect x="12" y="15" width="1" height="1" fill="#fbbf24" />
        </g>
      )}

      {/* Khi nhân vật đang cầm thiệp chạy đi treo */}
      {isHoldingCard && (
        <g className="held-card-pixel">
          <rect x="11" y="8" width="5" height="6" fill="#fef08a" />
          <rect x="12" y="9" width="3" height="4" fill="#ef4444" />
          <rect x="13" y="10" width="1" height="2" fill="#fbbf24" />
        </g>
      )}
    </svg>
  );
};

interface WishTagProps {
  cardStyle: CardStyle;
  visibility: WishVisibility;
  isNew?: boolean;
}

const STYLE_PALETTE: Record<
  CardStyle,
  { main: string; border: string; ribbon: string; glow: string }
> = {
  'red-gold': {
    main: '#ef4444',
    border: '#fef08a',
    ribbon: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.8)',
  },
  emerald: {
    main: '#10b981',
    border: '#fef08a',
    ribbon: '#f43f5e',
    glow: 'rgba(52, 211, 153, 0.8)',
  },
  'frost-blue': {
    main: '#0ea5e9',
    border: '#e0f2fe',
    ribbon: '#facc15',
    glow: 'rgba(56, 189, 248, 0.8)',
  },
  'berry-pink': {
    main: '#ec4899',
    border: '#fce7f3',
    ribbon: '#fde047',
    glow: 'rgba(244, 114, 182, 0.8)',
  },
};

/**
 * Tấm thiệp Pixel Art treo trên cành cây thông
 */
export const PixelWishTagSvg: React.FC<WishTagProps> = ({
  cardStyle,
  visibility,
  isNew = false,
}) => {
  const palette = STYLE_PALETTE[cardStyle] || STYLE_PALETTE['red-gold'];

  return (
    <svg
      width="34"
      height="42"
      viewBox="0 0 12 15"
      shapeRendering="crispEdges"
      className={`pixel-wish-tag ${isNew ? 'pixel-wish-tag--new' : ''}`}
      style={{ filter: `drop-shadow(0 2px 6px ${palette.glow})` }}
    >
      {/* Dây treo vàng */}
      <rect x="5" y="0" width="2" height="3" fill="#fbbf24" />
      {/* Nơ trên đầu thiệp */}
      <rect x="3" y="2" width="2" height="2" fill={palette.ribbon} />
      <rect x="7" y="2" width="2" height="2" fill={palette.ribbon} />
      <rect x="5" y="3" width="2" height="1" fill="#ffffff" />

      {/* Khung viền tấm thiệp */}
      <rect x="1" y="4" width="10" height="10" fill={palette.border} />
      <rect x="2" y="5" width="8" height="8" fill={palette.main} />

      {/* Hoạ tiết bên trong: nếu riêng tư thì hiện ổ khoá vàng, nếu công khai thì hiện trái tim/ngôi sao */}
      {visibility === 'private' ? (
        <g>
          <rect x="5" y="6" width="2" height="2" fill="#fde047" />
          <rect x="4" y="8" width="4" height="4" fill="#fbbf24" />
          <rect x="5" y="9" width="2" height="2" fill="#78350f" />
        </g>
      ) : (
        <g>
          <rect x="5" y="6" width="2" height="1" fill="#ffffff" />
          <rect x="3" y="8" width="6" height="1" fill="#fef08a" />
          <rect x="4" y="10" width="4" height="1" fill="#ffffff" />
        </g>
      )}
    </svg>
  );
};

/**
 * Cây thông Noel 2D Pixel Art cỡ lớn với ngôi sao đỉnh cây, tuyết đọng trên tán lá,
 * dây đèn nhấp nháy và các hộp quà dưới gốc cây.
 */
export const PixelChristmasTreeSvg: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 140"
      shapeRendering="crispEdges"
      className="pixel-tree-svg"
      aria-label="Cây thông điều ước Giáng sinh"
    >
      {/* Hào quang ấm áp quanh ngôi sao */}
      <rect x="52" y="2" width="16" height="16" fill="rgba(250, 204, 21, 0.16)" />
      <rect x="48" y="6" width="24" height="8" fill="rgba(250, 204, 21, 0.12)" />

      {/* Bóng cây trên nền tuyết */}
      <rect x="20" y="128" width="80" height="6" fill="rgba(15, 23, 42, 0.45)" />
      <rect x="28" y="134" width="64" height="3" fill="rgba(15, 23, 42, 0.25)" />

      {/* Thân cây gỗ */}
      <rect x="51" y="106" width="18" height="22" fill="#5c2d0c" />
      <rect x="54" y="106" width="10" height="22" fill="#78350f" />
      <rect x="57" y="108" width="4" height="18" fill="#92400e" />

      {/* TẦNG LÁ 4 (Dưới cùng - rộng nhất) */}
      <polygon
        points="60,64 14,110 106,110"
        fill="#064e3b"
      />
      <polygon
        points="60,66 18,108 102,108"
        fill="#047857"
      />
      <polygon
        points="60,68 24,104 96,104"
        fill="#059669"
      />
      {/* Tuyết đọng tầng 4 */}
      <rect x="16" y="106" width="14" height="3" fill="#e2e8f0" />
      <rect x="34" y="107" width="16" height="3" fill="#f8fafc" />
      <rect x="56" y="106" width="16" height="3" fill="#f8fafc" />
      <rect x="76" y="107" width="14" height="3" fill="#e2e8f0" />
      <rect x="92" y="106" width="12" height="3" fill="#f8fafc" />

      {/* TẦNG LÁ 3 (Giữa dưới) */}
      <polygon
        points="60,46 22,88 98,88"
        fill="#065f46"
      />
      <polygon
        points="60,48 26,86 94,86"
        fill="#059669"
      />
      <polygon
        points="60,50 32,82 88,82"
        fill="#10b981"
      />
      {/* Tuyết đọng tầng 3 */}
      <rect x="24" y="84" width="12" height="3" fill="#f8fafc" />
      <rect x="42" y="85" width="14" height="3" fill="#e2e8f0" />
      <rect x="64" y="85" width="14" height="3" fill="#f8fafc" />
      <rect x="82" y="84" width="14" height="3" fill="#e2e8f0" />

      {/* TẦNG LÁ 2 (Giữa trên) */}
      <polygon
        points="60,29 30,66 90,66"
        fill="#047857"
      />
      <polygon
        points="60,31 34,64 86,64"
        fill="#10b981"
      />
      <polygon
        points="60,33 40,60 80,60"
        fill="#34d399"
      />
      {/* Tuyết đọng tầng 2 */}
      <rect x="32" y="62" width="12" height="3" fill="#f8fafc" />
      <rect x="50" y="63" width="18" height="3" fill="#f8fafc" />
      <rect x="74" y="62" width="14" height="3" fill="#e2e8f0" />

      {/* TẦNG LÁ 1 (Chóp cây thông) */}
      <polygon
        points="60,15 38,44 82,44"
        fill="#059669"
      />
      <polygon
        points="60,17 42,42 78,42"
        fill="#10b981"
      />
      <polygon
        points="60,19 46,39 74,39"
        fill="#34d399"
      />
      {/* Tuyết đọng tầng 1 */}
      <rect x="40" y="41" width="12" height="3" fill="#f8fafc" />
      <rect x="56" y="42" width="12" height="2" fill="#e2e8f0" />
      <rect x="70" y="41" width="10" height="3" fill="#f8fafc" />

      {/* Dây kim tuyến vàng uốn lượn */}
      <rect x="44" y="34" width="6" height="2" fill="#fbbf24" />
      <rect x="50" y="36" width="10" height="2" fill="#f59e0b" />
      <rect x="60" y="35" width="10" height="2" fill="#fbbf24" />
      <rect x="36" y="52" width="10" height="2" fill="#fbbf24" />
      <rect x="46" y="55" width="14" height="2" fill="#f59e0b" />
      <rect x="60" y="56" width="14" height="2" fill="#fbbf24" />
      <rect x="74" y="53" width="8" height="2" fill="#f59e0b" />
      <rect x="28" y="74" width="12" height="2" fill="#fbbf24" />
      <rect x="40" y="77" width="18" height="2" fill="#f59e0b" />
      <rect x="58" y="78" width="18" height="2" fill="#fbbf24" />
      <rect x="76" y="75" width="14" height="2" fill="#f59e0b" />
      <rect x="22" y="96" width="16" height="2" fill="#fbbf24" />
      <rect x="38" y="99" width="22" height="2" fill="#f59e0b" />
      <rect x="60" y="98" width="20" height="2" fill="#fbbf24" />
      <rect x="80" y="95" width="16" height="2" fill="#f59e0b" />

      {/* Đèn LED lung linh trên cây */}
      <g className="tree-lights-group tree-lights-group--a">
        <rect x="55" y="26" width="3" height="3" fill="#fde047" />
        <rect x="45" y="47" width="3" height="3" fill="#fb7185" />
        <rect x="71" y="49" width="3" height="3" fill="#38bdf8" />
        <rect x="36" y="69" width="3" height="3" fill="#fde047" />
        <rect x="63" y="71" width="3" height="3" fill="#f43f5e" />
        <rect x="82" y="70" width="3" height="3" fill="#a78bfa" />
        <rect x="28" y="92" width="3" height="3" fill="#38bdf8" />
        <rect x="53" y="91" width="3" height="3" fill="#fde047" />
        <rect x="75" y="93" width="3" height="3" fill="#fb7185" />
        <rect x="91" y="91" width="3" height="3" fill="#4ade80" />
      </g>
      <g className="tree-lights-group tree-lights-group--b">
        <rect x="64" y="29" width="3" height="3" fill="#38bdf8" />
        <rect x="58" y="48" width="3" height="3" fill="#fde047" />
        <rect x="39" y="56" width="3" height="3" fill="#4ade80" />
        <rect x="50" y="68" width="3" height="3" fill="#fb7185" />
        <rect x="74" y="66" width="3" height="3" fill="#fde047" />
        <rect x="38" y="93" width="3" height="3" fill="#f43f5e" />
        <rect x="66" y="90" width="3" height="3" fill="#38bdf8" />
        <rect x="85" y="98" width="3" height="3" fill="#fde047" />
      </g>

      {/* NGÔI SAO ĐỈNH CÂY PHÁT SÁNG */}
      <g className="tree-top-star">
        <rect x="58" y="3" width="4" height="14" fill="#facc15" />
        <rect x="53" y="8" width="14" height="4" fill="#facc15" />
        <rect x="55" y="5" width="10" height="10" fill="#fde047" />
        <rect x="57" y="7" width="6" height="6" fill="#fef9c3" />
      </g>

      {/* CÁC HỘP QUÀ PIXEL DƯỚI GỐC CÂY */}
      {/* Hộp quà đỏ bên trái */}
      <rect x="28" y="114" width="16" height="14" fill="#dc2626" />
      <rect x="27" y="112" width="18" height="3" fill="#ef4444" />
      <rect x="35" y="112" width="3" height="16" fill="#fbbf24" />
      <rect x="28" y="119" width="16" height="3" fill="#fbbf24" />
      <rect x="33" y="109" width="7" height="3" fill="#fde047" />

      {/* Hộp quà xanh dương bên phải */}
      <rect x="72" y="113" width="18" height="15" fill="#0284c7" />
      <rect x="71" y="111" width="20" height="3" fill="#38bdf8" />
      <rect x="80" y="111" width="3" height="17" fill="#f43f5e" />
      <rect x="72" y="119" width="18" height="3" fill="#f43f5e" />
      <rect x="78" y="108" width="7" height="3" fill="#fb7185" />

      {/* Hộp quà nhỏ tím phía trước */}
      <rect x="45" y="118" width="12" height="11" fill="#7c3aed" />
      <rect x="50" y="118" width="2" height="11" fill="#fde047" />
      <rect x="45" y="123" width="12" height="2" fill="#fde047" />
    </svg>
  );
};
