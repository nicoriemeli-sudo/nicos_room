// script.js 内にはこれだけでOK
window.addEventListener("load", () => {
  const doorContainer = document.getElementById("door-container");
  const home = document.getElementById("home-content");
  const backToTop = document.getElementById('back-to-top');

  backToTop.style.display = 'none';

  let doorOpened = false;

  // 3秒後にドアをフェードアウト
  setTimeout(() => {
    doorContainer.classList.add("fade-out"); // CSSでopacityを0にする

    // 1秒後に完全に非表示にしてホームを表示
    setTimeout(() => {
      doorContainer.style.display = "none";
      home.classList.add("show");  // CSSでフェードイン
      backToTop.style.display = 'block';
      doorOpened = true;           // ドアが開いたフラグ
    }, 1000);
  }, 3000);

  backToTop.addEventListener('click', function(e){
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (!doorOpened) return; // ドアが開くまでは無視
    if (window.scrollY > 100) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
});
