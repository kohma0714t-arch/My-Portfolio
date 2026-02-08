'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollObserver();
});

/**
 * ダークモード切り替え機能
 * OS設定の検知と手動切り替えを管理
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const PREFers_DARK = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 現在のテーマ状態を判定 (HTMLタグのdata-theme属性またはOS設定)
    const getCurrentTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        return PREFers_DARK.matches ? 'dark' : 'light';
    };

    // テーマ適用処理
    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        const ariaLabel = theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え';
        toggleBtn.setAttribute('aria-label', ariaLabel);
    };

    // 初期化実行
    applyTheme(getCurrentTheme());

    // ボタンクリック時の挙動
    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // OSの設定変更をリアルタイム監視（ユーザー設定が保存されていない場合のみ反映）
    PREFers_DARK.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * スクロール連動アニメーション
 * Intersection Observer APIを使用し、パフォーマンスを最適化
 */
function initScrollObserver() {
    // 監視対象の要素を取得
    const targets = document.querySelectorAll('.js-observe');
    
    // オプション設定: 画面の15%が入った時点で発火
    const options = {
        root: null, // ビューポート
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            // 要素が画面内に入ったら
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示したら監視を解除（メモリ負荷軽減）
                obs.unobserve(entry.target);
            }
        });
    }, options);

    targets.forEach(target => {
        observer.observe(target);
    });
}