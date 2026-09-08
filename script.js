

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
// マウス・指でドラッグ
// --------------------

const worksSlider = document.querySelector('.works-slider');
const worksTrack = document.querySelector('.works-track');

if (worksSlider && worksTrack) {

  let isDragging = false;
  let startX = 0;
  let startPosition = 0;

  // ドラッグ開始
  worksSlider.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;

    const matrix = new DOMMatrix(
      getComputedStyle(worksTrack).transform
    );

    startPosition = matrix.m41;

    worksTrack.style.animationPlayState = 'paused';

    worksSlider.setPointerCapture(e.pointerId);
  });


  // ドラッグ中
  worksSlider.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const moveX = e.clientX - startX;
    const newPosition = startPosition + moveX;

    worksTrack.style.transform =
      `translateX(${newPosition}px)`;
  });


  // ドラッグ終了
  worksSlider.addEventListener('pointerup', () => {
    if (!isDragging) return;

    isDragging = false;

    worksTrack.style.animation = 'none';

    // 少し待ってから自動スクロール再開
    setTimeout(() => {
      worksTrack.style.animation = '';
    }, 100);
  });


  // キャンセルされた場合
  worksSlider.addEventListener('pointercancel', () => {
    isDragging = false;

    worksTrack.style.animation = 'none';

    setTimeout(() => {
      worksTrack.style.animation = '';
    }, 100);
  });

}
