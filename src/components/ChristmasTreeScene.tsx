import React from 'react';
import { CHARACTERS, CharacterId, WishCard } from '../types/wish';
import {
  PixelCharacterSprite,
  PixelChristmasTreeSvg,
  PixelWishTagSvg,
} from './PixelSprites';

export type DeliveryPhase = 'idle' | 'walking' | 'hanging' | 'sparkling';

export interface ActiveDelivery {
  wish: WishCard;
  phase: DeliveryPhase;
}

interface ChristmasTreeSceneProps {
  wishes: WishCard[];
  selectedCharacter: CharacterId;
  onSelectCharacter: (id: CharacterId) => void;
  onSelectWish: (wish: WishCard) => void;
  activeDelivery: ActiveDelivery | null;
  newlyAddedWishId: string | null;
  onOpenComposer: () => void;
}

export const ChristmasTreeScene: React.FC<ChristmasTreeSceneProps> = ({
  wishes,
  selectedCharacter,
  onSelectCharacter,
  onSelectWish,
  activeDelivery,
  newlyAddedWishId,
  onOpenComposer,
}) => {
  const currentCharInfo =
    CHARACTERS.find((c) => c.id === selectedCharacter) || CHARACTERS[0];

  const deliveringCharId = activeDelivery?.wish.characterId || selectedCharacter;
  const targetPos = activeDelivery?.wish.position || { x: 50, y: 55 };

  // Tính toán toạ độ nhân vật trong hoạt ảnh di chuyển đến cây và treo thiệp
  const getRunnerStyle = (): React.CSSProperties => {
    if (!activeDelivery || activeDelivery.phase === 'idle') {
      return {
        left: '14%',
        top: '82%',
      };
    }
    if (activeDelivery.phase === 'walking') {
      return {
        left: `${targetPos.x}%`,
        top: '82%',
        transition: 'left 1.35s cubic-bezier(0.25, 0.9, 0.35, 1), top 0.4s ease',
      };
    }
    if (activeDelivery.phase === 'hanging') {
      return {
        left: `${targetPos.x}%`,
        top: `${targetPos.y + 4}%`,
        transition: 'top 0.85s cubic-bezier(0.22, 1.25, 0.36, 1), left 0.3s ease',
      };
    }
    // Phase 'sparkling' -> Nhân vật đáp xuống gốc cây ăn mừng
    return {
      left: `${targetPos.x}%`,
      top: '81%',
      transition: 'top 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <section className="tree-stage-wrapper" aria-label="Sân khấu Cây Thông Điều Ước">
      {/* Mặt trăng pixel & biển hiệu gỗ nhỏ phía trên */}
      <div className="night-sky-decor" aria-hidden="true">
        <div className="pixel-moon" />
      </div>

      {/* Khung chứa cây thông trung tâm và hệ toạ độ % cho các tấm thiệp */}
      <div className="tree-canvas-box">
        <PixelChristmasTreeSvg />

        {/* Danh sách các tấm thiệp đang treo trên cây */}
        <div className="tree-ornaments-layer">
          {wishes.map((wish) => {
            const isNewlyAdded = wish.id === newlyAddedWishId;
            return (
              <button
                key={wish.id}
                type="button"
                className={`wish-ornament-btn ${
                  isNewlyAdded ? 'wish-ornament-btn--highlight' : ''
                }`}
                style={{
                  left: `${wish.position.x}%`,
                  top: `${wish.position.y}%`,
                }}
                onClick={() => onSelectWish(wish)}
                aria-label={`Xem thiệp của ${wish.senderName} (${
                  wish.visibility === 'private' ? 'Riêng tư' : 'Công khai'
                })`}
              >
                <PixelWishTagSvg
                  cardStyle={wish.cardStyle}
                  visibility={wish.visibility}
                  isNew={isNewlyAdded}
                />
                <span className="wish-ornament-tooltip">
                  <strong>{wish.senderName}</strong>
                  <small>
                    {wish.visibility === 'private' ? '🔒 Riêng tư' : '✨ Công khai'}
                  </small>
                </span>
              </button>
            );
          })}
        </div>

        {/* Hiệu ứng nổ hạt lấp lánh (Sparkles) tại vị trí vừa treo thiệp */}
        {activeDelivery &&
          (activeDelivery.phase === 'hanging' ||
            activeDelivery.phase === 'sparkling') && (
            <div
              className="sparkle-explosion"
              style={{
                left: `${targetPos.x}%`,
                top: `${targetPos.y}%`,
              }}
              aria-hidden="true"
            >
              <span className="sparkle-pixel s1">✦</span>
              <span className="sparkle-pixel s2">★</span>
              <span className="sparkle-pixel s3">✦</span>
              <span className="sparkle-pixel s4">✧</span>
              <span className="sparkle-pixel s5">★</span>
              <span className="sparkle-pixel s6">✦</span>
              <div className="sparkle-ring" />
            </div>
          )}

        {/* Nhân vật thực hiện hoạt ảnh di chuyển đến cây & treo thiệp */}
        <div
          className={`character-actor character-actor--${
            activeDelivery ? activeDelivery.phase : 'idle'
          }`}
          style={getRunnerStyle()}
        >
          <div className="actor-speech-bubble">
            {activeDelivery ? (
              activeDelivery.phase === 'walking' ? (
                <span>Đang mang thiệp của {activeDelivery.wish.senderName}... 🏃</span>
              ) : activeDelivery.phase === 'hanging' ? (
                <span>Treo lên cành thông đẹp nhất! 🎄</span>
              ) : (
                <span>Lung linh quá! Điều ước đã được treo! ✨</span>
              )
            ) : (
              <span>{currentCharInfo.name} sẵn sàng!</span>
            )}
          </div>
          <PixelCharacterSprite
            characterId={deliveringCharId}
            size={68}
            isHoldingCard={
              activeDelivery?.phase === 'walking' ||
              activeDelivery?.phase === 'hanging'
            }
          />
        </div>
      </div>

      {/* Đồi tuyết dưới chân cây + Trạm chọn nhanh 4 nhân vật */}
      <div className="snow-ground-bar">
        <div className="character-dock" role="group" aria-label="Chọn nhân vật sứ giả">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharacter;
            return (
              <button
                key={char.id}
                type="button"
                disabled={Boolean(activeDelivery)}
                onClick={() => onSelectCharacter(char.id)}
                className={`dock-char-card ${
                  isSelected ? 'dock-char-card--active' : ''
                }`}
                style={
                  {
                    '--char-accent': char.accentColor,
                  } as React.CSSProperties
                }
              >
                <div className="dock-char-sprite-wrap">
                  <PixelCharacterSprite characterId={char.id} size={46} />
                </div>
                <div className="dock-char-meta">
                  <span className="dock-char-name">{char.name}</span>
                  <span className="dock-char-role">{char.role}</span>
                </div>
                {isSelected && <span className="dock-selected-badge">Đang chọn</span>}
              </button>
            );
          })}
        </div>

        {/* Nút kêu gọi mở bảng viết thiệp trên mobile / màn hình nhỏ */}
        <button
          type="button"
          className="mobile-compose-trigger pixel-btn pixel-btn--primary"
          onClick={onOpenComposer}
          disabled={Boolean(activeDelivery)}
        >
          ✍️ Viết &amp; Treo Thiệp Ngay
        </button>
      </div>
    </section>
  );
};
