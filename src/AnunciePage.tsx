import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Megaphone,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  Phone,
  BarChart3,
  MonitorSmartphone,
} from "lucide-react";

export default function AnunciePage() {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#ff3e5e]/20 text-slate-800">
      {/* Navbar Minimalista */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-[#ff3e5e] font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a Rádio
          </Link>
          <div className="flex items-center">
            <img src="https://radioclubecriciuma.com/imagens/logoclubepng.png" alt="Clube FM" className="h-12 w-auto drop-shadow-md hover:scale-105 transition-transform duration-300" />
          </div>
          <button
            onClick={scrollToContact}
            className="hidden sm:flex items-center gap-2 bg-[#ff3e5e] hover:bg-[#e62e4d] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md shadow-[#ff3e5e]/20"
          >
            Falar com Comercial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5c337c] via-[#3d1a5a] to-[#250d3a] py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://radioclubecriciuma.com/imagens/estudio.jpeg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-[#fce315] font-bold text-sm mb-8 backdrop-blur-sm border border-white/10">
            <Megaphone className="w-4 h-4" />
            Soluções para o seu Negócio
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tight">
            Coloque sua Marca na <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce315] to-[#ff3e5e]">
              Rádio que Todo Mundo Ouve!
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Conecte seu negócio a milhares de ouvintes diariamente com a programação mais animada e confiável da região. Credibilidade e alcance que geram resultados de verdade.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-[#fce315] hover:bg-yellow-400 text-[#5c337c] px-8 py-4 rounded-full font-black text-lg transition-all shadow-xl shadow-[#fce315]/20 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Impulsionar Minhas Vendas
            </button>
          </div>
        </div>
      </section>

      {/* Numbers Banner / Estatísticas Rápidas */}
      <section className="bg-[#ff3e5e] text-white py-8 border-y-4 border-[#e62e4d]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black drop-shadow-md text-[#fce315]">+150 Mil</span>
            <span className="text-sm md:text-base font-bold uppercase tracking-wider mt-1 opacity-90">Habitantes Alcançados</span>
          </div>
          <div className="hidden sm:block w-px bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black drop-shadow-md text-[#fce315]">24h</span>
            <span className="text-sm md:text-base font-bold uppercase tracking-wider mt-1 opacity-90">No Ar Todos os Dias</span>
          </div>
          <div className="hidden sm:block w-px bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black drop-shadow-md text-[#fce315]">100%</span>
            <span className="text-sm md:text-base font-bold uppercase tracking-wider mt-1 opacity-90">Comprometimento</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#5c337c] mb-4">
            Por que anunciar na Clube FM?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Ao anunciar conosco, você não compra apenas espaço publicitário. Você se associa a uma marca amada por toda a cidade e região.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#5c337c]/10 rounded-2xl flex items-center justify-center text-[#5c337c] mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#5c337c] mb-4">Público Fiel e Engajado</h3>
            <p className="text-slate-600 leading-relaxed">
              Programação feita sob medida para quem consome localmente. Nossos locutores conhecem as pessoas e falam a língua da cidade.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#ff3e5e]/10 rounded-2xl flex items-center justify-center text-[#ff3e5e] mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#5c337c] mb-4">Comunicação Direta</h3>
            <p className="text-slate-600 leading-relaxed">
              Diferente de panfletos que vão pro lixo ou redes sociais que são ignoradas, o rádio entra na casa, no carro e no trabalho das pessoas.
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-[#fce315]/20 rounded-2xl flex items-center justify-center text-yellow-600 mb-6">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#5c337c] mb-4">Formatos que Vendem</h3>
            <p className="text-slate-600 leading-relaxed">
              Do spot comercial de 15 segundos ao patrocínio de programas líderes de audiência. Temos o formato perfeito para o seu orçamento.
            </p>
          </div>
        </div>
      </section>

      {/* Formatos Exclusivos e Cobertura */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-[#5c337c] mb-4">
            Formatos Exclusivos & Cobertura
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Além dos spots tradicionais, oferecemos projetos especiais de alto impacto e amplo alcance na região carbonífera.
          </p>
        </div>

        <div className="space-y-24">
          {/* Cobertura */}
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://radioclubecriciuma.com/imagens/estudioclubefm.png')] bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40"></div>
            <div className="w-full relative z-10">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fce315] text-[#5c337c] font-black text-sm mb-6 drop-shadow-md shadow-lg">
                <Users className="w-4 h-4" />
                +150 Mil Habitantes
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-md">Nossas Ondas Chegam Até Você!</h3>
              <p className="text-lg text-slate-200 mb-8 leading-relaxed max-w-3xl drop-shadow">Cobertura ampla e qualificada englobando áreas residenciais e comerciais estratégicas. Conectando pessoas e histórias nos principais bairros de Criciúma e Içara.</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 max-w-3xl">
                {['Próspera', 'Centro', 'Demboski', 'Liri', 'Raichaski', 'Pres. Vargas', 'Cristo Rei', 'Nª Sra da Salete', 'Jardim Silvana', 'Tereza Cristina', 'Jaqueline', '1º de Maio'].map((bairro) => (
                  <span key={bairro} className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full font-bold border border-white/20 shadow-sm hover:bg-white/20 transition-colors cursor-default">
                    {bairro}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Boletim da Copa */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 bg-gradient-to-br from-[#0c4e1a] to-[#062c0e] rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://diariodonoroeste.com.br/wp-content/uploads/2023/07/20221205-foto-getty-neymar-jr-jogo-brasil-x-coreia-copa-do-mundo-209.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="lg:w-1/2 w-full relative z-10">
               <div className="aspect-video lg:aspect-[4/3] bg-white/5 rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group">
                 <h4 className="text-2xl sm:text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase transform -skew-x-6">Patrocínio Master</h4>
                 <div className="text-6xl my-6 drop-shadow-[0_0_15px_rgba(252,227,21,0.5)] transform group-hover:scale-110 transition-transform duration-500">⚽</div>
                 <p className="text-green-400 font-black uppercase text-sm sm:text-base tracking-[0.2em] shrink-0">A Emoção do Futebol</p>
               </div>
            </div>
            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fce315]/20 text-[#fce315] font-bold text-sm mb-6 border border-[#fce315]/30">
                <Target className="w-4 h-4" />
                Venda de Quotas
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 uppercase italic">Boletim da Copa</h3>
              <p className="text-lg text-green-50 mb-8 leading-relaxed">Associe a sua marca à emoção do futebol. Tenha sua empresa divulgada nos boletins esportivos da Clube FM e conecte-se com um público altamente engajado e fiel!</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-white font-medium text-lg">
                  <CheckCircle2 className="w-6 h-6 text-[#fce315] shrink-0 drop-shadow-md" />
                  Sua marca citada nos boletins
                </li>
                <li className="flex items-center gap-3 text-white font-medium text-lg">
                  <CheckCircle2 className="w-6 h-6 text-[#fce315] shrink-0 drop-shadow-md" />
                  Maior visibilidade para sua empresa
                </li>
              </ul>
              <button
                  onClick={scrollToContact}
                  className="bg-[#fce315] hover:bg-yellow-400 text-[#0c4e1a] px-8 py-4 rounded-full font-black transition-all shadow-[0_0_20px_rgba(252,227,21,0.3)] hover:shadow-[0_0_30px_rgba(252,227,21,0.5)] flex items-center justify-center gap-3 w-full sm:w-auto text-lg hover:scale-105"
                >
                  <Megaphone className="w-5 h-5" />
                  Garantir Minha Quota
                </button>
            </div>
          </div>

          {/* Playlist Musical */}
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-br from-[#990d12] to-[#5a0509] rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
             {/* Background Image */}
             <div className="absolute inset-0 bg-[url('https://s2-oglobo.glbimg.com/B3xJs4qw5amMANyq9EmYmAUFhQw=/0x0:1500x843/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/s/x/sDG4g5SbeOIUdVyWGmAg/assets-fotos-1032-luisa-sonza-fabio-jr-ana-castela-jao-mumuzinho-e-paulo-vieira-falam-sobre-a-emocao-de-cantar-com-o-rei-1c4682345084-1-.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

             <div className="lg:w-1/2 relative z-10">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-bold text-sm mb-6 border border-white/20 backdrop-blur-md">
                <Users className="w-4 h-4" />
                Projeto Especial Exclusivo
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fce315] to-yellow-200 mb-2 uppercase">Playlist Musical</h3>
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-6 uppercase tracking-wider">Oferecimento da sua Empresa</h4>
              <p className="text-lg text-rose-100/90 mb-8 leading-relaxed font-medium">
                Sua marca patrocina 1 hora de música sem parar! Resultados que ficam, garantindo presença no dia a dia do seu cliente e gerando conexão, confiança e lembrança na hora da compra.
              </p>
               <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-white font-bold text-lg">
                  <div className="w-8 h-8 rounded-full bg-[#fce315]/20 flex items-center justify-center shrink-0 border border-[#fce315]/30">
                    <CheckCircle2 className="w-5 h-5 text-[#fce315]" />
                  </div>
                  Música sem interrupções
                </li>
                <li className="flex items-center gap-3 text-white font-bold text-lg">
                   <div className="w-8 h-8 rounded-full bg-[#fce315]/20 flex items-center justify-center shrink-0 border border-[#fce315]/30">
                    <CheckCircle2 className="w-5 h-5 text-[#fce315]" />
                  </div>
                  Sua marca em destaque isolado
                </li>
                 <li className="flex items-center gap-3 text-white font-bold text-lg">
                   <div className="w-8 h-8 rounded-full bg-[#fce315]/20 flex items-center justify-center shrink-0 border border-[#fce315]/30">
                    <CheckCircle2 className="w-5 h-5 text-[#fce315]" />
                  </div>
                  Mais próxima do cliente
                </li>
              </ul>
               <button
                  onClick={scrollToContact}
                  className="bg-white hover:bg-slate-100 text-[#990d12] px-8 py-4 rounded-full font-black transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2 w-full sm:w-auto text-lg hover:scale-105"
                >
                  Patrocinar uma Playlist
                </button>
            </div>
             <div className="lg:w-1/2 w-full relative z-10">
               <div className="aspect-video lg:aspect-[4/3] bg-gradient-to-tr from-[#df1e25] to-[#ff474d] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/10 hover:border-white/30 transition-colors duration-500">
                 <div className="w-28 h-28 bg-[#fce315] rounded-full flex items-center justify-center mb-8 shadow-2xl relative animate-bounce-slow">
                   <div className="text-5xl">🎵</div>
                   <div className="absolute -top-3 -right-3 bg-slate-900 border-2 border-[#fce315] text-[#fce315] text-sm font-black px-3 py-1.5 rounded-full transform rotate-12">1 HORA</div>
                 </div>
                 <h4 className="text-2xl sm:text-3xl font-black text-white px-2 leading-tight uppercase tracking-wide">60 Minutos de <br/> Grandes Sucessos</h4>
                 <p className="text-[#fce315] font-bold mt-4 tracking-widest text-sm uppercase">Fez Assim. E Deu Certo!</p>
               </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Cross-media: Portal Vitrine do Sul */}
      <section className="bg-slate-900 py-20 lg:py-28 px-4 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-bold text-sm mb-6 border border-blue-500/20">
              <MonitorSmartphone className="w-4 h-4" />
              Pacote Cross-Media Exclusivo
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Sua marca nos Portais <span className="text-blue-400">Vitrine do Sul</span> e <span className="text-green-400">Cocal do Sul!</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-xl mb-8 leading-relaxed">
              Os portais de notícias mais acessados do sul catarinense com mais de <span className="text-white font-bold">100 MIL acessos diários</span> e <span className="text-white font-bold">4 MILHÕES de acessos mensais</span>. Conecte sua marca no rádio e na internet!
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-slate-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                Destaque na capa do portal
              </li>
              <li className="flex items-center gap-3 text-slate-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                Matérias publieditoriais (Publipost)
              </li>
              <li className="flex items-center gap-3 text-slate-300 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                Cobertura jornalística nas redes
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 relative w-full h-full min-h-[300px] flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto bg-slate-800/50 rounded-[2rem] p-8 border border-slate-700/50 shadow-2xl gap-8">
             <img src="https://www.vitrinedosul.com.br/img/f23f14e98b1633ae33c6df8188840cb21436602a.png" alt="Portal Vitrine do Sul" className="w-full max-w-[150px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500" />
             <div className="hidden sm:block w-px h-1/2 bg-white/10"></div>
             <img src="https://radioclubecriciuma.com/imagens/logoportalcocal.png" alt="Portal Cocal do Sul" className="w-full max-w-[150px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 lg:py-28 bg-white" id="planos">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#5c337c] mb-4">
              Tabela de Preços Promocionais
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Nossa tabela referencial para spots e chamadas. Valores super atrativos praticados no interior para fortalecer pequenos e médios negócios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { time: "15 Segundos", price: "R$ 10", desc: "Perfeito para recados rápidos, flashes ou ofertas do dia.", popular: false },
              { time: "30 Segundos", price: "R$ 20", desc: "O padrão comercial. Ideal para fixar o nome e o produto.", popular: true },
              { time: "45 Segundos", price: "R$ 30", desc: "Mais tempo para explicações, serviços detalhados.", popular: false },
              { time: "60 Segundos", price: "R$ 40", desc: "Spot premium. Destaque total para grandes lançamentos.", popular: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 border relative flex flex-col transition-all duration-300 ${plan.popular ? 'bg-[#ff3e5e] border-[#ff3e5e] text-white shadow-2xl scale-105 z-10' : 'bg-slate-50 border-slate-200 hover:border-[#5c337c]/30 hover:bg-white hover:shadow-xl text-slate-700'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fce315] text-[#5c337c] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider drop-shadow-md">
                    Mais Pedido
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-700'}`}>{plan.time}</h3>
                <p className={`text-sm mb-6 flex-grow ${plan.popular ? 'text-rose-100' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className={`text-4xl font-black mb-6 flex items-end gap-1 ${plan.popular ? 'text-white' : 'text-[#5c337c]'}`}>
                  {plan.price} <span className={`text-base font-medium ${plan.popular ? 'text-rose-200' : 'text-slate-400'}`}>/ inserção</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-rose-50' : 'text-slate-600'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${plan.popular ? 'text-[#fce315]' : 'text-[#00c853]'}`} /> Roteiro otimizado
                  </li>
                  <li className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-rose-50' : 'text-slate-600'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${plan.popular ? 'text-[#fce315]' : 'text-[#00c853]'}`} /> Inserção no bloco
                  </li>
                </ul>
                <button
                  onClick={scrollToContact}
                  className={`mt-auto w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-[#fce315] text-[#5c337c] hover:bg-yellow-400' : 'bg-[#5c337c] text-white hover:bg-[#3d1a5a]'}`}
                >
                  Quero este formato
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-200 text-center max-w-4xl mx-auto">
            <h4 className="font-bold text-lg text-[#5c337c] mb-4">Práticas Comerciais Comuns 🤝</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">Descontos de 10% a 30% p/ contratos mensais</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">Valores diferenciados em horário nobre</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">Bônus de rede social em pacotes</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contato" className="py-24 md:py-32 bg-gray-900 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cdn.esbrasil.com.br/wp-content/uploads/2024/10/Zeze-di-Camargo-Foto-Lana-Pinho.png')] bg-cover bg-top opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff3e5e]/90 to-[#ff3e5e]/60"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md">
            Pronto para ver sua marca crescer?
          </h2>
          <p className="text-xl text-white/90 mb-10 font-medium">
            Fale agora mesmo com nossa equipe comercial e receba uma proposta personalizada que cabe no seu bolso.
          </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
             <a
              href="https://wa.me/554896867091?text=Ol%C3%A1%! Gostaria de saber mais sobre os planos para anunciar na rádio e no Vitrine do Sul."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-[#ff3e5e] hover:bg-slate-100 px-8 py-4 rounded-full font-black text-lg transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Chamar no WhatsApp Comercial
            </a>
          </div>
          <p className="mt-6 text-white/80 font-medium">
            Ou ligue para: +55 48 9686-7091
          </p>
        </div>
      </section>
      
      {/* Footer minimalista */}
      <footer className="bg-slate-900 py-8 text-center text-slate-400 text-sm pb-24 sm:pb-8">
        <p>&copy; 2026 Clube FM 87.9. Departamento Comercial.</p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/554896867091?text=Ol%C3%A1%! Gostaria de saber mais sobre os planos para anunciar na rádio e no Vitrine do Sul."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.5)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all group flex items-center gap-0 hover:gap-3 overflow-hidden"
      >
        <Phone className="w-8 h-8 fill-current" />
        <span className="max-w-0 overflow-hidden font-bold whitespace-nowrap group-hover:max-w-xs transition-all duration-300 opacity-0 group-hover:opacity-100 hidden sm:block">
          Fale Conosco
        </span>
      </a>
    </div>
  );
}
