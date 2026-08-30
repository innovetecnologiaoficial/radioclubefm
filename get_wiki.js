import fs from 'fs';
async function run() {
    const teams = [
      "CRB", "Criciúma", "Flamengo", "Botafogo", "Corinthians", "Bahia", "Fluminense", "Vasco da Gama", "Palmeiras",
      "São Paulo", "Santos", "Portuguesa", "Guarani", "Atlético Mineiro", "Cruzeiro", "Grêmio", "Internacional", "Juventude",
      "Vitória", "Goiás", "Paysandu", "Sport Recife", "Athletico Paranaense", "Coritiba", "Botafogo-SP", "Ponte Preta",
      "Santo André", "São Bento", "Brasil de Pelotas", "Avaí", "Chapecoense", "Figueirense", "Joinville", "Londrina",
      "Operário-PR", "América-MG", "Confiança", "CSA", "ASA", "Náutico", "Santa Cruz", "Treze", "Botafogo-PB", "Campinense",
      "ABC", "América-RN", "Ceará", "Fortaleza", "Moto Club", "Sampaio Corrêa", "Remo", "Atlético-GO", "Vila Nova", "Cuiabá", "Bragantino"
    ];
    const map = {};
    for (const team of teams) {
        const searchTerm = team.length < 5 ? `${team} clube futebol` : team;
        try {
            const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=500&origin=*`);
            const data = await res.json();
            const pages = Object.values(data.query?.pages || {});
            if (pages.length > 0 && pages[0].thumbnail) {
                map[team.toLowerCase()] = pages[0].thumbnail.source;
            } else {
                map[team.toLowerCase()] = "";
            }
        } catch(e) {}
    }
    fs.writeFileSync('wiki_logos.json', JSON.stringify(map, null, 2));
}
run();
