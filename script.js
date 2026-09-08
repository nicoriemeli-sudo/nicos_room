

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
// マウス位置に追従してスクロール
// --------------------
const worksSlider = document.querySelector('.works-slider');
const worksTrack = document.querySelector('.works-track');
const worksSet = document.querySelector('.works-set');

if (worksSlider && worksTrack && worksSet) {

  let position = 0;

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
  // マウス位置
  // --------------------

  let mouseX = window.innerWidth / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
  });

  // --------------------
  // マウス追従スクロール
  // --------------------

  function autoScroll() {

    const screenWidth = window.innerWidth;

    // 画面中央からの距離
    const distanceFromCenter =
      (mouseX - screenWidth / 2) / (screenWidth / 2);

    // 最大速度
    const maxSpeed = 2.5;

    // 中央付近ではほぼ停止
    let speed = distanceFromCenter * maxSpeed;

    // 小さい動きは無視
    if (Math.abs(speed) < 0.08) {
      speed = 0;
    }

    // マウス右 → ギャラリー右
    // マウス左 → ギャラリー左
    position += speed;

    updatePosition();

    requestAnimationFrame(autoScroll);

  }

  autoScroll();

  // --------------------
  // 画面サイズ変更対応
  // --------------------

  window.addEventListener('resize', () => {

    setWidth = worksSet.getBoundingClientRect().width;

  });

}
