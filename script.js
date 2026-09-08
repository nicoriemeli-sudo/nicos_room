

window.addEventListener("load", () => {
  const doorContainer = document.getElementById("door-container");
  const home = document.getElementById("home-content");
  const backToTop = document.getElementById('back-to-top');

  backToTop.style.display = 'none';
  let doorOpened = false;

  // 3秒後にドアをフェードアウト
  setTimeout(() => {
    doorContainer.style.transition = "opacity 1s ease";
    doorContainer.style.opacity = 0;

    // 1秒後に完全に非表示にしてホームを表示
    setTimeout(() => {
      doorContainer.style.display = "none";

      // ホームを表示
      home.style.display = "block";    // display:block にする
      setTimeout(() => {
        home.style.opacity = 1;        // フェードイン
      }, 50); // 少し遅延を入れるとスムーズ
      backToTop.style.display = 'block';
      doorOpened = true;
    }, 1000);
  }, 3000);

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (!doorOpened) return;
    backToTop.style.display = window.scrollY > 100 ? 'block' : 'none';
  });
});

// --------------------
// Works ギャラリー
// 自動スクロール ＋ マウス・指で操作
// --------------------

const worksSlider = document.querySelector('.works-slider');
const worksTrack = document.querySelector('.works-track');
const worksSet = document.querySelector('.works-set');

if (worksSlider && worksTrack && worksSet) {

  let position = 0;
  let isDragging = false;
  let startX = 0;
  let startPosition = 0;
  let moved = false;

  const speed = 0.35;

  // 1セット分の幅
  let setWidth = worksSet.getBoundingClientRect().width;


  // --------------------
  // 無限ループ
  // --------------------

  function normalizePosition() {

    if (position <= -setWidth) {
      position += setWidth;
    }

    if (position > 0) {
      position -= setWidth;
    }

  }


  // --------------------
  // 表示位置を更新
  // --------------------

  function updatePosition() {

    normalizePosition();

    worksTrack.style.transform =
      `translate3d(${position}px, 0, 0)`;

  }


  // --------------------
  // 自動スクロール
  // --------------------

  function autoScroll() {

    if (!isDragging) {
      position -= speed;
      updatePosition();
    }

    requestAnimationFrame(autoScroll);

  }

  autoScroll();


  // --------------------
  // マウス・指でつかむ
  // --------------------

  worksSlider.addEventListener('pointerdown', (e) => {

    isDragging = true;
    moved = false;

    startX = e.clientX;
    startPosition = position;

    worksSlider.setPointerCapture(e.pointerId);

  });


  // --------------------
  // ドラッグ中
  // --------------------

  worksSlider.addEventListener('pointermove', (e) => {

    if (!isDragging) return;

    const moveX = e.clientX - startX;

    if (Math.abs(moveX) > 5) {
      moved = true;
    }

    position = startPosition + moveX;

    updatePosition();

  });


  // --------------------
  // 指・マウスを離す
  // --------------------

  worksSlider.addEventListener('pointerup', (e) => {

    isDragging = false;

    if (worksSlider.hasPointerCapture(e.pointerId)) {
      worksSlider.releasePointerCapture(e.pointerId);
    }

  });


  worksSlider.addEventListener('pointercancel', () => {

    isDragging = false;

  });


  // --------------------
  // ドラッグした時はリンクを開かない
  // --------------------

  worksSlider.addEventListener('click', (e) => {

    if (moved) {
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    }

  }, true);


  // --------------------
  // 画面サイズ変更対応
  // --------------------

  window.addEventListener('resize', () => {

    setWidth = worksSet.getBoundingClientRect().width;

  });

}
