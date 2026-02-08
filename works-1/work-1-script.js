document.addEventListener('DOMContentLoaded', () => {
    
    // --- 要素の定義 ---
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    // --- ハンバーガーメニューの開閉処理 ---
    hamburger.addEventListener('click', () => {
        // メニューの表示切り替え
        mobileMenu.classList.toggle('active');
        
        // アクセシビリティ対応（aria-labelの切り替え）
        const isOpen = mobileMenu.classList.contains('active');
        hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    // モバイルメニュー内のリンクをクリックしたらメニューを閉じる
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- ヘッダーのスクロール時の背景色変更 ---
    window.addEventListener('scroll', () => {
        // スクロール量が50pxを超えたら 'scrolled' クラスを付与
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- スムーススクロール（ヘッダー考慮版） ---
    // hrefが「#」で始まるアンカーリンクをすべて取得
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // デフォルトの「瞬時に移動」する動作を無効化

            const targetId = this.getAttribute('href'); // リンク先のID（例: #services）を取得
            if (targetId === '#') return; // リンク先がない場合は終了

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // ヘッダーの高さを動的に取得（CSSで変更があっても自動対応）
                const headerHeight = header.offsetHeight;
                
                // ターゲット要素の画面上端からの絶対位置を取得
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                // 計算した位置へ滑らかにスクロール実行
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});