const cards = document.querySelectorAll('.card');

cards.forEach(card => card.addEventListener('click', (e) => {
    if (e.target.matches('.show')) {
        const card = e.target.closest('.card');
        const content = card.querySelector('.content');
        toggleState(e.target, content);
    }
}));
function toggleState(btn, content) {
    if (btn.innerHTML === "Show") {
        btn.innerHTML = "Hide";
        content.classList.remove('hide');
    } else {
        btn.innerHTML = "Show";
        content.classList.add('hide');
    }
    
}