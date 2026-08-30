async function run() {
    const teams = ["CRB", "Criciúma", "Flamengo", "Botafogo", "Corinthians", "Bahia", "Fluminense", "Vasco da Gama", "Palmeiras", "São Paulo FC", "Santos FC", "Atlético Mineiro", "Cruzeiro", "Grêmio", "Internacional", "Juventude", "Vitória", "Goiás", "Paysandu", "Sport Recife", "Athletico Paranaense", "Coritiba", "Chapecoense", "Avaí"];
    const map = {};
    for (const team of teams) {
        const searchTerm = team.length < 5 ? `${team} clube futebol` : team;
        try {
            const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=500&origin=*`);
            const data = await res.json();
            const pages = Object.values(data.query?.pages || {});
            if (pages.length > 0 && pages[0].thumbnail) {
                map[team.toLowerCase().split(' ')[0]] = pages[0].thumbnail.source;
            }
        } catch(e) {}
    }
    console.log(JSON.stringify(map, null, 2));
}
run();
