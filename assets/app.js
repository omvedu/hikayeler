let tumHikayeler = [];
let gorunenSayi = 0;
const yuklemeAdimi = 4;

async function hikayeleriYukle() {
    try {
        const response = await fetch('hikayeler.json');
        tumHikayeler = await response.json();
        dahaFazlaYukle();
    } catch (e) {
        console.error("Hikayeler yüklenemedi:", e);
    }
}

function dahaFazlaYukle() {
    const liste = document.getElementById('hikayeListesi');
    const limit = Math.min(gorunenSayi + yuklemeAdimi, tumHikayeler.length);
    
    for (let i = gorunenSayi; i < limit; i++) {
        const h = tumHikayeler[i];
        liste.innerHTML += `
            <div class="kart">
                <img src="${h.gorsel}" loading="lazy">
                <h3><a href="${h.link}">${h.baslik}</a></h3>
            </div>`;
    }
    gorunenSayi = limit;
    
    // Eğer tüm hikayeler yüklendiyse "yükleniyor" yazısını kaldır
    if (gorunenSayi >= tumHikayeler.length) {
        document.getElementById('yukleniyor').style.display = 'none';
    }
}

// Arama fonksiyonu
function ara() {
    const input = document.getElementById('aramaKutusu').value.toLowerCase();
    const kartlar = document.querySelectorAll('.kart');
    
    kartlar.forEach(kart => {
        const baslik = kart.querySelector('h3').innerText.toLowerCase();
        if (baslik.includes(input)) {
            kart.style.display = ""; // Göster
        } else {
            kart.style.display = "none"; // Gizle
        }
    });
}

// Sayfa kaydırma ile otomatik yükleme
window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        if (gorunenSayi < tumHikayeler.length) {
            dahaFazlaYukle();
        }
    }
};

// İlk yükleme
hikayeleriYukle();