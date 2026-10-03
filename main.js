document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       1. 全画面メニューの開閉制御
       ========================================== */
    const trigger = document.getElementById('menuTrigger');
    const closeBtn = document.getElementById('menuCloseBtn');
    const overlay = document.getElementById('menuOverlay');

    if (trigger && closeBtn && overlay) {
        function openMenu() {
            overlay.classList.add('active');
        }

        function closeMenu() {
            overlay.classList.remove('active');
        }

        trigger.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
    }

    /* ==========================================
       2. 花びら舞い落ちエフェクト
       ========================================== */
    const container = document.querySelector('.shooting-stars');
    if (!container) return;

    // 花びら画像のパス
    const petalImagePath = 'petal.png';

    function createPetal() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('petal-wrapper');

        const petal = document.createElement('img');
        petal.src = petalImagePath;
        petal.classList.add('petal');
        petal.alt = "";

        // パラメータのランダム生成
        const randomLeft = Math.random() * 100;           // 出現位置 (0%〜100%)
        const fallDuration = Math.random() * 5 + 7;       // 落下速度 (7s〜12s)
        const swayDuration = Math.random() * 1.5 + 2.5;   // 左右の揺れ (2.5s〜4s)
        const randomScale = Math.random() * 0.4 + 0.8;    // サイズ (80%〜120%)
        const flip = Math.random() > 0.5 ? -1 : 1;        // 左右反転 (50%の確率)

        wrapper.style.left = `${randomLeft}%`;
        wrapper.style.animationDuration = `${fallDuration}s`;

        petal.style.animationDuration = `${swayDuration}s`;
        petal.style.transform = `scaleX(${flip}) scale(${randomScale})`;

        wrapper.appendChild(petal);
        container.appendChild(wrapper);

        // 落ちきったら要素を削除
        setTimeout(() => {
            wrapper.remove();
        }, fallDuration * 1000);
    }

    // 初期化：最初に4枚生成
    for (let i = 0; i < 4; i++) {
        setTimeout(createPetal, i * 1000);
    }

    // 1.8秒ごとに1枚追加
    setInterval(createPetal, 1800);
});

/* ==========================================
       3. キャラクター切り替え処理
       ========================================== */
    const hexBtns = document.querySelectorAll('.hex-item');
    const charaCards = document.querySelectorAll('.chara-card');

    if (hexBtns.length > 0 && charaCards.length > 0) {
        hexBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-chara');

                // すべてのボタンのアクティブを解除して、クリックされたものをアクティブに
                hexBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // すべてのカードを非表示にして、該当キャラだけ表示
                charaCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.id === `chara-${targetId}`) {
                        card.classList.add('active');
                    }
                });
            });
        });
    }

/* ==========================================
       4. Cast & Staff アコーディオン処理
       ========================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                
                // クリックされたアイテムの開閉をトグル
                item.classList.toggle('active');
            });
        });
    }