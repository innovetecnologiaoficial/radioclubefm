const urls = [
  "https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/clubes_2026/escudos/CRB/60x60.png",
  "https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/clubes_2026/escudos/CRI/60x60.png"
];
for(const url of urls) {
  fetch(url).then(r => console.log(url, r.status)).catch(e => console.error(url, e.message));
}
