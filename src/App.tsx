import React, { useEffect, useState } from 'react';
import {
  ActiveDelivery,
  ChristmasTreeScene,
} from './components/ChristmasTreeScene';
import { Snowfall } from './components/Snowfall';
import { WishComposerPanel } from './components/WishComposerPanel';
import { WishReaderModal } from './components/WishReaderModal';
import { CharacterId, WishCard, WishVisibility } from './types/wish';
import {
  generateSecretKey,
  loadWishesFromStorage,
  pickCardStyle,
  pickNextTreePosition,
  saveWishesToStorage,
} from './utils/storage';
import './App.css';

export const App: React.FC = () => {
  const [wishes, setWishes] = useState<WishCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storageWarning, setStorageWarning] = useState<string | null>(null);

  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterId>('santa');
  const [activeDelivery, setActiveDelivery] = useState<ActiveDelivery | null>(
    null
  );
  const [newlyAddedWishId, setNewlyAddedWishId] = useState<string | null>(null);

  const [readingWish, setReadingWish] = useState<WishCard | null>(null);
  const [readingUnlocked, setReadingUnlocked] = useState<boolean>(false);
  const [isComposerOpenMobile, setIsComposerOpenMobile] =
    useState<boolean>(false);
  const [toastBanner, setToastBanner] = useState<{
    text: string;
    wish?: WishCard;
  } | null>(null);

  // Khởi tạo dữ liệu từ localStorage & kiểm tra URL query (?wish=...&key=...)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const { wishes: loaded, error } = loadWishesFromStorage();
      setWishes(loaded);
      if (error) {
        setStorageWarning(error);
      }

      const params = new URLSearchParams(window.location.search);
      const targetWishId = params.get('wish');
      const targetKey = params.get('key');

      if (targetWishId) {
        const found = loaded.find((w) => w.id === targetWishId);
        if (found) {
          const keyMatches =
            found.visibility === 'public' ||
            (Boolean(targetKey) &&
              targetKey?.toUpperCase() === found.secretKey?.toUpperCase());
          setReadingWish(found);
          setReadingUnlocked(keyMatches);
        } else {
          setStorageWarning(
            'Không tìm thấy tấm thiệp từ liên kết trên trình duyệt này (Do bản MVP hiện lưu dữ liệu cục bộ trên từng thiết bị).'
          );
        }
      }

      setIsLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  const handleHangWish = (payload: {
    senderName: string;
    message: string;
    characterId: CharacterId;
    visibility: WishVisibility;
  }) => {
    const newPosition = pickNextTreePosition(wishes);
    const secretKey =
      payload.visibility === 'private' ? generateSecretKey() : undefined;

    const newWish: WishCard = {
      id: `wish-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      senderName: payload.senderName,
      message: payload.message,
      characterId: payload.characterId,
      visibility: payload.visibility,
      secretKey,
      cardStyle: pickCardStyle(payload.characterId, wishes.length),
      position: newPosition,
      createdAt: new Date().toISOString(),
    };

    setToastBanner(null);

    // Bước 1: Nhân vật bắt đầu di chuyển từ trạm đến gốc cây
    setActiveDelivery({
      wish: newWish,
      phase: 'walking',
    });

    // Bước 2: Nhân vật nhảy lên cành cây treo tấm thiệp
    window.setTimeout(() => {
      setActiveDelivery({
        wish: newWish,
        phase: 'hanging',
      });
    }, 1350);

    // Bước 3: Thiệp xuất hiện trên cây + hiệu ứng nổ hạt lấp lánh
    window.setTimeout(() => {
      setWishes((prev) => {
        const updated = [newWish, ...prev];
        const saveRes = saveWishesToStorage(updated);
        if (!saveRes.ok && saveRes.error) {
          setStorageWarning(saveRes.error);
        }
        return updated;
      });
      setNewlyAddedWishId(newWish.id);
      setActiveDelivery({
        wish: newWish,
        phase: 'sparkling',
      });
    }, 2200);

    // Bước 4: Kết thúc hoạt ảnh, hiển thị thông báo chúc mừng
    window.setTimeout(() => {
      setActiveDelivery(null);
      setToastBanner({
        text:
          newWish.visibility === 'private'
            ? `✨ Đã treo thiệp riêng tư của ${newWish.senderName}! Mã bí mật: ${newWish.secretKey}`
            : `✨ Đã treo thiệp của ${newWish.senderName} lên cây thông!`,
        wish: newWish,
      });
    }, 3500);
  };

  const handleSelectWishOnTree = (wish: WishCard) => {
    const unlockedByDefault =
      wish.visibility === 'public' || wish.id === newlyAddedWishId;
    setReadingWish(wish);
    setReadingUnlocked(unlockedByDefault);
  };

  const handleDeleteWish = (wishId: string) => {
    const updated = wishes.filter((w) => w.id !== wishId);
    setWishes(updated);
    saveWishesToStorage(updated);
    setReadingWish(null);
    if (newlyAddedWishId === wishId) {
      setNewlyAddedWishId(null);
    }
  };

  const publicCount = wishes.filter((w) => w.visibility === 'public').length;
  const privateCount = wishes.filter((w) => w.visibility === 'private').length;

  if (isLoading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="loading-pixel-box">
          <div className="loading-tree-icon" aria-hidden="true">
            🎄
          </div>
          <h1>Đang thắp đèn Cây Thông Điều Ước...</h1>
          <p>Chuẩn bị tuyết rơi và đánh thức các sứ giả Giáng sinh</p>
        </div>
      </div>
    );
  }

  return (
    <div className="christmas-app-shell">
      <Snowfall />

      {/* Thanh Header ấm áp */}
      <header className="top-festival-bar">
        <div className="brand-block">
          <span className="brand-pixel-star" aria-hidden="true">
            ★
          </span>
          <div>
            <h1>CÂY THÔNG ĐIỀU ƯỚC</h1>
            <p className="brand-subtitle">
              Chọn sứ giả 2D • Viết thiệp Giáng sinh • Bấm vào thiệp trên cây để đọc
            </p>
          </div>
        </div>

        <div className="stats-pill-group" aria-label="Thống kê thiệp trên cây">
          <div className="stat-pill">
            <span>🎄 Đang treo:</span>
            <strong>{wishes.length} thiệp</strong>
          </div>
          <div className="stat-pill">
            <span>✨ Công khai:</span>
            <strong>{publicCount}</strong>
          </div>
          <div className="stat-pill">
            <span>🔒 Riêng tư:</span>
            <strong>{privateCount}</strong>
          </div>
        </div>
      </header>

      {/* Banner cảnh báo lỗi lưu trữ hoặc thông báo Demo */}
      {storageWarning && (
        <div className="global-warning-bar" role="alert">
          <span>ℹ️ {storageWarning}</span>
          <button
            type="button"
            onClick={() => setStorageWarning(null)}
            aria-label="Đóng thông báo"
          >
            ✕
          </button>
        </div>
      )}

      {/* Thông báo nhanh sau khi vừa treo thiệp xong */}
      {toastBanner && (
        <div className="celebration-toast" role="status" aria-live="polite">
          <span>{toastBanner.text}</span>
          <div className="toast-actions">
            {toastBanner.wish && (
              <button
                type="button"
                className="toast-open-btn"
                onClick={() => {
                  setReadingWish(toastBanner.wish!);
                  setReadingUnlocked(true);
                }}
              >
                Mở xem thiệp vừa treo
              </button>
            )}
            <button
              type="button"
              className="toast-dismiss-btn"
              onClick={() => setToastBanner(null)}
              aria-label="Đóng thông báo"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bố cục chính: Sân khấu Cây Thông trung tâm + Bảng gỗ viết thiệp */}
      <main className="festival-main-grid">
        <ChristmasTreeScene
          wishes={wishes}
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
          onSelectWish={handleSelectWishOnTree}
          activeDelivery={activeDelivery}
          newlyAddedWishId={newlyAddedWishId}
          onOpenComposer={() => setIsComposerOpenMobile(true)}
        />

        <WishComposerPanel
          selectedCharacter={selectedCharacter}
          onSelectCharacter={setSelectedCharacter}
          onSubmitWish={handleHangWish}
          isDelivering={Boolean(activeDelivery)}
          isOpenMobile={isComposerOpenMobile}
          onCloseMobile={() => setIsComposerOpenMobile(false)}
        />
      </main>

      {/* Chân trang ghi chú minh bạch về bản MVP localStorage */}
      <footer className="festival-footer">
        <p>
          🎄 <strong>Phiên bản MVP Demo:</strong> Dữ liệu thiệp đang được lưu trên{' '}
          <code>localStorage</code> của trình duyệt này. Tính năng chia sẻ thiệp công
          khai cho nhiều người dùng và bảo mật liên kết riêng tư trên máy chủ sẽ hoạt
          động khi kết nối Backend.
        </p>
      </footer>

      {/* Modal đọc nội dung thiệp khi bấm vào thiệp trên cây */}
      <WishReaderModal
        wish={readingWish}
        initiallyUnlocked={readingUnlocked}
        onClose={() => setReadingWish(null)}
        onDeleteWish={handleDeleteWish}
      />
    </div>
  );
};

export default App;
