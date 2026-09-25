/**
 * =====================================================================
 * CLUBE 87,9 FM - ARQUIVO DE CONFIGURAÇÃO CENTRAL
 * =====================================================================
 * Edite os campos abaixo para personalizar facilmente todos os dados
 * da rádio, links de streaming, redes sociais, aplicativos e locutores.
 */

export const RADIO_CONFIG = {
  // 1. DADOS PRINCIPAIS DA EMISSORA
  stationName: "Clube 87,9 FM",
  frequency: "87,9 FM",
  city: "Criciúma",
  state: "SC",
  locationText: "Criciúma – Santa Catarina",
  slogan: "A Rádio do Coração",
  subSlogan: "Música, informação e entretenimento sempre com você!",

  // 2. STREAMING DE ÁUDIO AO VIVO
  // Altere para a URL oficial do streaming Shoutcast / Icecast da emissora
  streamUrl: "https://stream2.svrdedicado.org/8258/stream",

  // 3. CONTATOS E WHATSAPP
  // Formato internacional: código do país (55) + DDD (48) + número
  whatsappNumber: "5548991950093",
  whatsappFormatted: "(48) 99195-0093",
  whatsappMessageSong: "Olá Clube FM! Estou ouvindo pelo site e quero pedir uma música e mandar um alô!",
  whatsappMessageCommercial: "Olá! Gostaria de informações para anunciar minha empresa na Clube 87,9 FM Criciúma.",
  emailCommercial: "comercial@innovetecnologia.com.br",

  // 4. LINKS DAS REDES SOCIAIS OFICIAIS
  socialLinks: {
    instagram: "https://www.instagram.com/clubefmcriciuma/",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },

  // 5. LINKS DOS APLICATIVOS MÓVEIS & ALEXA
  appLinks: {
    googlePlay: "https://play.google.com/store/apps/details?id=br.com.radioclubecriciuma",
    appStore: "https://apps.apple.com/us/app/r%C3%A1dio-clube-crici%C3%BAma/id6777545744",
    alexaCommand: "Alexa, tocar Clube 87,9 FM",
  },

  // 6. FEED DE NOTÍCIAS (Portal Vitrine do Sul RSS)
  newsRssUrl: "https://www.vitrinedosul.com.br/rss.xml",

  // 7. LOCUTORES E APRESENTADORES
  // Para trocar fotos, insira a URL da imagem ou importe um arquivo local
  locutores: [
    {
      id: "lucas-andrade",
      name: "Lucas Andrade",
      show: "Manhã Clube",
      time: "08:00 às 12:00",
      days: "Segunda a Sexta",
      instagram: "@lucasclube87",
      instagramUrl: "https://www.instagram.com/clubefmcriciuma/",
      bio: "A voz mais animada da manhã no Sul de SC! Alto-astral, prêmios, notícias e a participação dos ouvintes ao vivo.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      isLiveNow: false,
    },
    {
      id: "camila-rocha",
      name: "Camila Rocha",
      show: "Tarde Show",
      time: "13:00 às 17:00",
      days: "Segunda a Sexta",
      instagram: "@camilasomclube",
      instagramUrl: "https://www.instagram.com/clubefmcriciuma/",
      bio: "Sua melhor companhia na tarde com os maiores hits pop, sertanejo universitário, fofocas e prêmios na Clube!",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      isLiveNow: true, // Marcado como ao vivo no horário da tarde
    },
    {
      id: "marco-silva",
      name: "Marco Silva",
      show: "Clube Esporte",
      time: "17:00 às 19:00",
      days: "Segunda a Sexta",
      instagram: "@marcosilvaclube",
      instagramUrl: "https://www.instagram.com/clubefmcriciuma/",
      bio: "Jornalista apaixonado pelo Tigre (Criciúma E.C.), com debates quentes, bastidores e cobertura do Brasileirão.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      isLiveNow: false,
    },
    {
      id: "ze-da-viola",
      name: "Zé da Viola",
      show: "Amanhecer no Sertão",
      time: "05:00 às 08:00",
      days: "Segunda a Sexta",
      instagram: "@zedaviolaclube",
      instagramUrl: "https://www.instagram.com/clubefmcriciuma/",
      bio: "Mais de 25 anos de tradição acordando os trabalhadores com café quente, moda de viola e fé.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      isLiveNow: false,
    },
    {
      id: "beto-gaucho",
      name: "Beto Gaúcho",
      show: "Rancho da Clube",
      time: "06:00 às 09:00",
      days: "Sábados e Domingos",
      instagram: "@betogauchoclube",
      instagramUrl: "https://www.instagram.com/clubefmcriciuma/",
      bio: "Tradição gaúcha, vanerão, chimarrão e prosa boa para abrir o fim de semana em família.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      isLiveNow: false,
    },
    {
      id: "dj-rick",
      name: "DJ Rick",
      show: "Balada Clube FM",
      time: "20:00 às 00:00",
      days: "Sexta e Sábado",
      instagram: "@djrickclube",
      instagramUrl: "https://www.instagram.com/clubefmcriciuma/",
      bio: "O esquenta oficial do fim de semana com sets exclusivos de funk, pop internacional e música eletrônica.",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
      isLiveNow: false,
    },
  ],

  // 8. GRADE COMPLETA DE PROGRAMAÇÃO
  programacao: {
    segunda: [
      { time: "05:00 - 08:00", name: "Amanhecer no Sertão", host: "Zé da Viola", desc: "Clássicos do sertanejo raiz, oração da manhã e notícias do homem do campo.", tag: "Sertanejo" },
      { time: "08:00 - 12:00", name: "Manhã Clube", host: "Lucas Andrade", desc: "Música, notícias em tempo real, prêmios e a participação do ouvinte no WhatsApp.", tag: "Variedades" },
      { time: "12:00 - 13:00", name: "Jornal da Clube & Vitrine", host: "Equipe de Jornalismo", desc: "O resumo dos principais acontecimentos de Criciúma e do Sul de SC.", tag: "Jornalismo" },
      { time: "13:00 - 17:00", name: "Tarde Show", host: "Camila Rocha", desc: "Os maiores sucessos pop, sertanejo universitário e fofocas dos famosos.", tag: "Pop & Hits" },
      { time: "17:00 - 19:00", name: "Clube Esporte", host: "Marco Silva", desc: "Tudo sobre o Tigre (Criciúma E.C.), Brasileirão e bastidores do esporte.", tag: "Esportes" },
      { time: "19:00 - 22:00", name: "As Mais Pedidas", host: "DJ Rick", desc: "A parada de sucessos votada pelos ouvintes através do WhatsApp oficial.", tag: "Hits" },
      { time: "22:00 - 05:00", name: "Clube Love & Madrugada", host: "Programação Musical", desc: "Músicas românticas e tranquilas para embalar a sua noite.", tag: "Romântico" },
    ],
    terca: [
      { time: "05:00 - 08:00", name: "Amanhecer no Sertão", host: "Zé da Viola", desc: "Clássicos do sertanejo raiz, oração da manhã e notícias do campo.", tag: "Sertanejo" },
      { time: "08:00 - 12:00", name: "Manhã Clube", host: "Lucas Andrade", desc: "Música, notícias em tempo real, prêmios e a voz do ouvinte.", tag: "Variedades" },
      { time: "12:00 - 13:00", name: "Jornal da Clube & Vitrine", host: "Equipe de Jornalismo", desc: "Informação com credibilidade em Criciúma e região.", tag: "Jornalismo" },
      { time: "13:00 - 17:00", name: "Tarde Show", host: "Camila Rocha", desc: "Hits nacionais, internacionais e muita interatividade.", tag: "Pop & Hits" },
      { time: "17:00 - 19:00", name: "Clube Esporte", host: "Marco Silva", desc: "Debate esportivo, tabela e preparação do Criciúma E.C.", tag: "Esportes" },
      { time: "19:00 - 22:00", name: "As Mais Pedidas", host: "DJ Rick", desc: "Os maiores sucessos escolhidos pelos ouvintes.", tag: "Hits" },
      { time: "22:00 - 05:00", name: "Clube Love", host: "Programação Musical", desc: "Trilha sonora especial para sua noite.", tag: "Romântico" },
    ],
    quarta: [
      { time: "05:00 - 08:00", name: "Amanhecer no Sertão", host: "Zé da Viola", desc: "A melhor moda sertaneja para começar o dia com energia.", tag: "Sertanejo" },
      { time: "08:00 - 12:00", name: "Manhã Clube", host: "Lucas Andrade", desc: "Super Manhã Clube com sorteios e novidades de Criciúma.", tag: "Variedades" },
      { time: "12:00 - 13:00", name: "Jornal da Clube", host: "Equipe de Jornalismo", desc: "Noticiário completo do Sul de Santa Catarina.", tag: "Jornalismo" },
      { time: "13:00 - 17:00", name: "Tarde Show", host: "Camila Rocha", desc: "Músicas que tocam o coração e muita diversão.", tag: "Pop & Hits" },
      { time: "17:00 - 19:00", name: "Clube Esporte", host: "Marco Silva", desc: "Pré-jogo e análises completas do futebol.", tag: "Esportes" },
      { time: "19:00 - 23:00", name: "Jornada Esportiva Quarta", host: "Equipe de Esportes", desc: "Transmissão ao vivo dos jogos do Criciúma E.C. e Brasileirão.", tag: "Ao Vivo" },
      { time: "23:00 - 05:00", name: "Madrugada Clube", host: "Programação Musical", desc: "A melhor seleção musical para a sua noite.", tag: "Música" },
    ],
    quinta: [
      { time: "05:00 - 08:00", name: "Amanhecer no Sertão", host: "Zé da Viola", desc: "Moda de viola e prosa boa no amanhecer.", tag: "Sertanejo" },
      { time: "08:00 - 12:00", name: "Manhã Clube", host: "Lucas Andrade", desc: "O programa líder de audiência na manhã de Criciúma.", tag: "Variedades" },
      { time: "12:00 - 13:00", name: "Jornal da Clube", host: "Equipe de Jornalismo", desc: "Atualização das manchetes da região carbonífera.", tag: "Jornalismo" },
      { time: "13:00 - 17:00", name: "Tarde Show", host: "Camila Rocha", desc: "Tarde com mais energia, prêmios e grandes músicas.", tag: "Pop & Hits" },
      { time: "17:00 - 19:00", name: "Clube Esporte", host: "Marco Silva", desc: "Entrevistas exclusivas e cobertura do esporte regional.", tag: "Esportes" },
      { time: "19:00 - 22:00", name: "As Mais Pedidas", host: "DJ Rick", desc: "O ranking semanal das mais tocadas.", tag: "Hits" },
      { time: "22:00 - 05:00", name: "Clube Love", host: "Programação Musical", desc: "Clássicos românticos que marcaram época.", tag: "Romântico" },
    ],
    sexta: [
      { time: "05:00 - 08:00", name: "Amanhecer no Sertão", host: "Zé da Viola", desc: "Sextou com café quentinho e muita música boa!", tag: "Sertanejo" },
      { time: "08:00 - 12:00", name: "Manhã Clube", host: "Lucas Andrade", desc: "Sorteios especiais de fim de semana e ingressos de shows.", tag: "Variedades" },
      { time: "12:00 - 13:00", name: "Jornal da Clube", host: "Equipe de Jornalismo", desc: "O que é notícia em Santa Catarina.", tag: "Jornalismo" },
      { time: "13:00 - 17:00", name: "Tarde Show", host: "Camila Rocha", desc: "Entrando no clima do fim de semana com alto-astral.", tag: "Pop & Hits" },
      { time: "17:00 - 19:00", name: "Clube Esporte", host: "Marco Silva", desc: "Tudo pronto para os jogos da rodada no final de semana.", tag: "Esportes" },
      { time: "19:00 - 21:00", name: "Sextou Clube FM", host: "Lucas Andrade", desc: "Acelerando a sexta-feira com os melhores ritmos.", tag: "Especial" },
      { time: "21:00 - 02:00", name: "Balada Clube FM", host: "DJ Rick", desc: "A maior balada do rádio com funk, eletrônica e remixes.", tag: "Balada" },
    ],
    sabado: [
      { time: "06:00 - 09:00", name: "Rancho da Clube", host: "Beto Gaúcho", desc: "Tradição gaúcha, vanerão e muita alegria no fim de semana.", tag: "Tradicional" },
      { time: "09:00 - 13:00", name: "Sabadão Premiado", host: "Lucas Andrade", desc: "Sorteios ao vivo, prêmios exclusivos e hits dançantes.", tag: "Prêmios" },
      { time: "13:00 - 18:00", name: "Conexão Criciúma", host: "Camila Rocha", desc: "O melhor da música jovem e flashes dos eventos da cidade.", tag: "Jovem" },
      { time: "18:00 - 00:00", name: "Balada Clube FM", host: "DJs Convidados", desc: "As melhores tracks para animar o seu sábado à noite.", tag: "Balada" },
    ],
    domingo: [
      { time: "07:00 - 11:00", name: "Domingo Especial", host: "Música e Fé", desc: "Mensagens de paz, esperança e boa música para toda a família.", tag: "Família" },
      { time: "11:00 - 15:00", name: "Churrascão da Clube", host: "Carlinhos Show", desc: "Pagode, sertanejo e samba para o melhor churrasco em família.", tag: "Churrasco" },
      { time: "15:00 - 19:00", name: "Jornada Esportiva", host: "Marco Silva & Equipe", desc: "Transmissão completa das partidas do Criciúma E.C. ao vivo.", tag: "Ao Vivo" },
      { time: "19:00 - 00:00", name: "Noite Retrô", host: "Flashback Clube", desc: "As músicas inesquecíveis dos anos 80, 90 e 2000.", tag: "Flashback" },
    ],
  },

  // 9. DADOS COMERCIAIS & PUBLICIDADE
  commercial: {
    title: "ANUNCIE NA CLUBE 87,9 FM",
    subtitle: "Conecte sua marca com Criciúma e região.",
    description: "A Clube 87,9 FM é a líder em engajamento e carinho do público no Sul Catarinense. Com spots criativos, ações promocionais exclusivas e ampla presença digital com o Portal Vitrine do Sul, colocamos o seu negócio no coração do consumidor.",
    stats: [
      { number: "100.000+", label: "Ouvintes mensais" },
      { number: "15", label: "Municípios cobertos no Sul de SC" },
      { number: "#1", label: "Rádio do coração do ouvinte" },
      { number: "24h", label: "No ar sem parar" },
    ],
    formats: [
      { title: "Spot Comercial de 15s e 30s", desc: "Divulgação estratégica nos horários de pico e programas mais ouvidos." },
      { title: "Patrocínio Exclusivo de Programas", desc: "Associe sua marca aos maiores sucessos: Manhã Clube, Clube Esporte e Tarde Show." },
      { title: "Ações de Rua & Blitz Clube", desc: "Equipe ao vivo na sua loja distribuindo brindes e atraindo clientes na hora." },
      { title: "Combo Rádio + Portal Vitrine", desc: "Mídia digital no portal de notícias mais acessado da região com banner e matérias." },
    ],
  },
};
