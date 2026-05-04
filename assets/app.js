let tumHikayeler = [];
let gorunenSayi = 0;
const yuklemeAdimi = 4; // Her kaydırmada 4 tane yüklensin

async function hikayeleriYukle() {
    const response = await fetch('hikayeler.json');
    tumHikayeler = await response.json();
    dahaFazlaYukle();
}

function dahaFazlaYukle() {
    const liste = document.getElementById('hikayeListesi');
    const limit = Math.min(gorunenSayi + yuklemeAdimi, tumHikayeler.length);
    
    for (let i = gorunenSayi; i < limit; i++) {
        const h = tumHikayeler[i];
        liste.innerHTML += `
            <div class="kart fade-in">
                <img src="${h.gorsel}" loading="lazy">
                <h3><a href="${h.link}">${h.baslik}</a></h3>
            </div>`;
    }
    gorunenSayi = limit;
}

// Scroll dinleyicisi: Sayfanın sonuna gelince otomatik yükle
window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        dahaFazlaYukle();
    }
};

hikayeleriYukle();