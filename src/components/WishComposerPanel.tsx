import React, { useState } from 'react';
import {
  CHARACTERS,
  CharacterId,
  WishVisibility,
} from '../types/wish';
import { PixelCharacterSprite } from './PixelSprites';

interface WishComposerPanelProps {
  selectedCharacter: CharacterId;
  onSelectCharacter: (id: CharacterId) => void;
  onSubmitWish: (payload: {
    senderName: string;
    message: string;
    characterId: CharacterId;
    visibility: WishVisibility;
  }) => void;
  isDelivering: boolean;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const SAMPLE_PROMPTS = [
  'Chúc mùa Giáng sinh an lành, ấm áp và ngập tràn niềm vui bên những người thân yêu! 🎄✨',
  'Ước mong năm mới thật nhiều sức khoẻ, bình an và mọi dự định đều thành hiện thực! 🌟',
  'Gửi ngàn lời chúc tốt đẹp nhất tới người đọc được tấm thiệp nhỏ này! 🎅🎁',
];

export const WishComposerPanel: React.FC<WishComposerPanelProps> = ({
  selectedCharacter,
  onSelectCharacter,
  onSubmitWish,
  isDelivering,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState<WishVisibility>('public');
  const [formError, setFormError] = useState<string | null>(null);

  const activeChar =
    CHARACTERS.find((c) => c.id === selectedCharacter) || CHARACTERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDelivering) return;

    const trimmedName = senderName.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      setFormError('Bạn ơi, hãy nhập tên hoặc biệt danh trước khi treo thiệp nhé!');
      return;
    }
    if (trimmedName.length > 32) {
      setFormError('Tên hiển thị tối đa 32 ký tự để thiệp trông đẹp nhất nhé!');
      return;
    }
    if (!trimmedMsg) {
      setFormError('Hãy viết đôi lời chúc hoặc điều ước Giáng sinh vào thiệp nhé!');
      return;
    }
    if (trimmedMsg.length < 5) {
      setFormError('Lời chúc hơi ngắn, bạn hãy viết ít nhất 5 ký tự nhé!');
      return;
    }
    if (trimmedMsg.length > 260) {
      setFormError('Lời chúc tối đa 260 ký tự thôi nhé!');
      return;
    }

    setFormError(null);
    onSubmitWish({
      senderName: trimmedName,
      message: trimmedMsg,
      characterId: selectedCharacter,
      visibility,
    });

    setMessage('');
    onCloseMobile();
  };

  const applySamplePrompt = (sample: string) => {
    setMessage(sample);
    setFormError(null);
  };

  return (
    <aside
      className={`composer-panel ${isOpenMobile ? 'composer-panel--mobile-open' : ''}`}
      aria-label="Bàn viết thiệp điều ước Giáng sinh"
    >
      <div className="composer-wood-frame">
        {/* Thanh tiêu đề bảng gỗ Pixel */}
        <div className="composer-header">
          <div className="composer-title-group">
            <span className="composer-badge">XƯỞNG ĐIỀU ƯỚC NOEL</span>
            <h2>Viết Thiệp Giáng Sinh</h2>
          </div>
          <button
            type="button"
            className="composer-mobile-close"
            onClick={onCloseMobile}
            aria-label="Đóng bảng viết thiệp"
          >
            ✕
          </button>
        </div>

        {/* Hộp nhân vật sứ giả đang được chọn */}
        <div className="selected-envoy-banner">
          <div className="envoy-avatar-box">
            <PixelCharacterSprite characterId={selectedCharacter} size={54} />
          </div>
          <div className="envoy-dialogue">
            <div className="envoy-name-row">
              <strong>{activeChar.name}</strong>
              <span className="envoy-role-pill">{activeChar.role}</span>
            </div>
            <p>“{activeChar.greeting}”</p>
          </div>
        </div>

        {/* Bộ chọn 4 nhân vật trực tiếp ngay trong bảng */}
        <div className="mini-char-selector" role="radiogroup" aria-label="Chọn nhân vật">
          {CHARACTERS.map((char) => {
            const active = char.id === selectedCharacter;
            return (
              <button
                key={char.id}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={isDelivering}
                onClick={() => onSelectCharacter(char.id)}
                className={`mini-char-option ${
                  active ? 'mini-char-option--selected' : ''
                }`}
              >
                <PixelCharacterSprite characterId={char.id} size={34} />
                <span>{char.name.replace('Ông Già ', '').replace('Tuần Lộc ', '').replace('Người Tuyết ', '').replace(' Noel', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Tờ giấy viết thiệp phong cách cuộn thư Giáng sinh */}
        <form onSubmit={handleSubmit} className="parchment-card-form" noValidate>
          <div className="parchment-field">
            <label htmlFor="wish-sender-input">Người gửi điều ước</label>
            <input
              id="wish-sender-input"
              type="text"
              maxLength={32}
              placeholder="Nhập tên hoặc biệt danh của bạn..."
              value={senderName}
              disabled={isDelivering}
              onChange={(e) => {
                setSenderName(e.target.value);
                if (formError) setFormError(null);
              }}
            />
          </div>

          <div className="parchment-field">
            <div className="field-label-row">
              <label htmlFor="wish-message-input">Lời chúc / Điều ước trên thiệp</label>
              <span className="char-counter">{message.length}/260</span>
            </div>
            <textarea
              id="wish-message-input"
              rows={4}
              maxLength={260}
              placeholder="Viết điều ước ấm áp của bạn để sứ giả mang lên cây thông..."
              value={message}
              disabled={isDelivering}
              onChange={(e) => {
                setMessage(e.target.value);
                if (formError) setFormError(null);
              }}
            />
            <div className="sample-wishes-bar">
              <span className="sample-label">Gợi ý nhanh:</span>
              {SAMPLE_PROMPTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="sample-chip"
                  disabled={isDelivering}
                  onClick={() => applySamplePrompt(sample)}
                >
                  Mẫu #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn chế độ Công khai / Riêng tư */}
          <div className="visibility-toggle-section">
            <span className="visibility-label">Chế độ hiển thị thiệp</span>
            <div className="visibility-grid">
              <button
                type="button"
                disabled={isDelivering}
                onClick={() => setVisibility('public')}
                className={`visibility-card ${
                  visibility === 'public' ? 'visibility-card--active' : ''
                }`}
              >
                <span className="vis-icon">✨</span>
                <div>
                  <strong>Công khai</strong>
                  <small>Mọi người bấm vào cây đều đọc được</small>
                </div>
              </button>

              <button
                type="button"
                disabled={isDelivering}
                onClick={() => setVisibility('private')}
                className={`visibility-card ${
                  visibility === 'private' ? 'visibility-card--active' : ''
                }`}
              >
                <span className="vis-icon">🔒</span>
                <div>
                  <strong>Riêng tư</strong>
                  <small>Tạo mã &amp; liên kết bí mật để mở</small>
                </div>
              </button>
            </div>

            {visibility === 'private' && (
              <p className="demo-privacy-notice">
                💡 <strong>Lưu ý bản MVP Demo:</strong> Mã &amp; liên kết bí mật hiện chỉ
                mô phỏng luồng mở khoá trên trình duyệt này (<code>localStorage</code>).
                Chưa có backend bảo mật hay chia sẻ sang thiết bị khác.
              </p>
            )}
          </div>

          {formError && (
            <div className="pixel-error-banner" role="alert">
              ⚠️ {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={isDelivering}
            className="pixel-btn pixel-btn--hang-wish"
          >
            {isDelivering ? (
              <span>🎄 Sứ giả đang chạy đi treo thiệp...</span>
            ) : (
              <span>🎄 Treo lời chúc lên cây</span>
            )}
          </button>
        </form>
      </div>
    </aside>
  );
};
