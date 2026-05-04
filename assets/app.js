function ara() {
    let input = document.getElementById('aramaKutusu').value.toLowerCase();
    let kartlar = document.getElementsByClassName('kart');
    for (let i = 0; i < kartlar.length; i++) {
        let baslik = kartlar[i].innerText.toLowerCase();
        kartlar[i].style.display = baslik.includes(input) ? "" : "none";
    }
}