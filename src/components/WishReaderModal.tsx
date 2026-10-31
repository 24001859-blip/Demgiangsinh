import React, { useEffect, useState } from 'react';
import { CHARACTERS, WishCard } from '../types/wish';
import { buildDemoPrivateUrl } from '../utils/storage';
import { PixelCharacterSprite, PixelWishTagSvg } from './PixelSprites';

interface WishReaderModalProps {
  wish: WishCard | null;
  initiallyUnlocked?: boolean;
  onClose: () => void;
  onDeleteWish?: (id: string) => void;
}

export const WishReaderModal: React.FC<WishReaderModalProps> = ({
  wish,
  initiallyUnlocked = false,
  onClose,
  onDeleteWish,
}) => {
  const [enteredKey, setEnteredKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!wish) return;
    if (wish.visibility === 'public' || initiallyUnlocked) {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
    setEnteredKey('');
    setKeyError(null);
    setCopied(false);
  }, [wish, initiallyUnlocked]);

  if (!wish) return null;

  const character =
    CHARACTERS.find((c) => c.id === wish.characterId) || CHARACTERS[0];

  const formattedTime = new Date(wish.createdAt).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = enteredKey.trim().toUpperCase();
    const targetKey = (wish.secretKey || '').toUpperCase();

    if (cleanInput && cleanInput === targetKey) {
      setIsUnlocked(true);
      setKeyError(null);
    } else {
      setKeyError('Mã bí mật chưa đúng. Hãy kiểm tra lại mã trên liên kết nhé!');
    }
  };

  const handleCopyDemoLink = async () => {
    if (!wish.secretKey) return;
    const url = buildDemoPrivateUrl(wish.id, wish.secretKey);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback nếu trình duyệt chặn clipboard
      setCopied(true);
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-wish-title"
      onClick={onClose}
    >
      <div
        className="wish-reader-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Đóng cửa sổ đọc thiệp"
        >
          ✕
        </button>

        {/* Phần đầu tấm thiệp */}
        <div className="reader-card-top">
          <div className="reader-ornament-preview">
            <PixelWishTagSvg
              cardStyle={wish.cardStyle}
              visibility={wish.visibility}
              isNew
            />
          </div>
          <div className="reader-meta">
            <span
              className={`reader-vis-badge ${
                wish.visibility === 'private'
                  ? 'reader-vis-badge--private'
                  : 'reader-vis-badge--public'
              }`}
            >
              {wish.visibility === 'private'
                ? '🔒 Thiệp Riêng Tư (Demo)'
                : '✨ Thiệp Công Khai'}
            </span>
            <h3 id="modal-wish-title">Thiệp từ {wish.senderName}</h3>
            <span className="reader-timestamp">Treo lúc {formattedTime}</span>
          </div>
        </div>

        {/* Nội dung: nếu thiệp riêng tư chưa mở khoá thì hiện form nhập mã bí mật */}
        {!isUnlocked && wish.visibility === 'private' ? (
          <div className="private-lock-box">
            <div className="lock-icon-large" aria-hidden="true">
              🔐
            </div>
            <h4>Thiệp Giáng Sinh Riêng Tư</h4>
            <p>
              Tấm thiệp này được bảo vệ bằng mã bí mật. Trong phiên bản có backend,
              chỉ người có liên kết bí mật mới truy cập được nội dung.
            </p>

            <form onSubmit={handleUnlockSubmit} className="unlock-form">
              <input
                type="text"
                placeholder="Nhập mã bí mật (VD: NOEL2026)..."
                value={enteredKey}
                onChange={(e) => {
                  setEnteredKey(e.target.value);
                  if (keyError) setKeyError(null);
                }}
                aria-label="Mã bí mật mở thiệp"
              />
              <button type="submit" className="pixel-btn pixel-btn--primary">
                🔓 Mở Thiệp
              </button>
            </form>

            {keyError && <p className="unlock-error-msg">⚠️ {keyError}</p>}

            {wish.id === 'demo-wish-4' && (
              <div className="demo-key-hint">
                <span>💡 Thiệp mẫu demo có mã là: </span>
                <button
                  type="button"
                  className="hint-fill-btn"
                  onClick={() => setEnteredKey('NOEL2026')}
                >
                  NOEL2026 (Bấm để điền thử)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="reader-unlocked-body">
            {/* Nội dung lời chúc trên nền giấy kem ấm áp */}
            <div className="greeting-letter-sheet">
              <p className="greeting-message-text">“{wish.message}”</p>
              <div className="greeting-signature">
                <div className="signature-char">
                  <PixelCharacterSprite characterId={character.id} size={42} />
                  <div>
                    <small>Sứ giả treo thiệp:</small>
                    <strong>{character.name}</strong>
                  </div>
                </div>
                <div className="signature-sender">
                  <small>Thân gửi từ</small>
                  <strong>{wish.senderName}</strong>
                </div>
              </div>
            </div>

            {/* Nếu là thiệp riêng tư đã mở khoá, hiện thông tin liên kết bí mật Demo */}
            {wish.visibility === 'private' && wish.secretKey && (
              <div className="private-share-demo-box">
                <div className="private-share-header">
                  <span>🔑 Mã bí mật cục bộ: <strong>{wish.secretKey}</strong></span>
                  <button
                    type="button"
                    className="relock-btn"
                    onClick={() => setIsUnlocked(false)}
                  >
                    🔒 Khoá lại để thử mở
                  </button>
                </div>
                <p className="private-share-disclaimer">
                  Lưu ý: Dữ liệu đang lưu trên <code>localStorage</code> của trình
                  duyệt này để demo. Liên kết dưới đây chỉ hoạt động trên thiết bị
                  hiện tại (chưa có backend chia sẻ giữa nhiều máy hay bảo mật máy chủ).
                </p>
                <div className="private-link-row">
                  <input
                    type="text"
                    readOnly
                    value={buildDemoPrivateUrl(wish.id, wish.secretKey)}
                    aria-label="Liên kết bí mật demo trên thiết bị này"
                  />
                  <button
                    type="button"
                    className="pixel-btn pixel-btn--secondary"
                    onClick={handleCopyDemoLink}
                  >
                    {copied ? '✓ Đã chép' : 'Sao chép link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chân modal */}
        <div className="reader-footer-actions">
          {onDeleteWish && (
            <button
              type="button"
              className="delete-wish-btn"
              onClick={() => onDeleteWish(wish.id)}
            >
              🗑️ Gỡ thiệp này khỏi cây
            </button>
          )}
          <button
            type="button"
            className="pixel-btn pixel-btn--secondary"
            onClick={onClose}
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};
