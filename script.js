

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
