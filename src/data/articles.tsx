// Define the Article type or import it if already defined elsewhere
type Article = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    id: string;
    name: string;
    role: string;
    bio: string;
  };
  category: string;
  image: string;
  slug: string;
  readTime: string;
  views: string;
  content: string;
};

export const articles: Article[] = [
  {
    id: '1',
    title: 'Dívidas, diabetes e distúrbios psicológicos estão relacionados?',
    excerpt: 'Um estudo finlandês de 2016 mostra que o superendividamento está ligado a maior incidência de distúrbios psicológicos e diabetes, reforçando a importância da educação financeira.',
    date: '18 Abr 2019',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Professor e Pesquisador em Finanças Pessoais',
      bio: 'PhD em Finanças, com mais de 20 anos de experiência em educação financeira, cooperativismo e desenvolvimento regional.'
    },
    category: 'Finanças Pessoais',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3',
    slug: 'dividas-diabetes-disturbios-psicologicos',
    readTime: '1 min',
    views: '1.8K',
    content: `
      <h2>Superendividamento faz mal à saúde?</h2>
      <p>Em 2016, o <em>International Journal of Public Health</em> publicou um estudo finlandês com 37 mil pessoas que investigou a relação entre saúde física e níveis de endividamento.</p>
      <p>Os resultados indicaram que mulheres superendividadas apresentaram maior prevalência de doenças crônicas — especialmente distúrbios psicológicos e diabetes — quando comparadas a indivíduos com dívidas sob controle.</p>
    `
  },
  {
    id: '2',
    title: 'Desequilíbrio da empresa',
    excerpt: 'Equilíbrio financeiro é crucial para a sobrevivência de qualquer negócio; conhecer o ponto de equilíbrio mensal evita problemas silenciosos que levam empresas ao fechamento.',
    date: '15 Abr 2019',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Consultor em Gestão Financeira Empresarial',
      bio: 'PhD em Finanças com foco em sustentabilidade corporativa e decisões de investimento.'
    },
    category: 'Gestão Empresarial',
    image: 'https://images.unsplash.com/photo-1591696205602-2cb7c1f0b6a3?ixlib=rb-4.0.3',
    slug: 'desequilibrio-da-empresa',
    readTime: '2 min',
    views: '2.2K',
    content: `
      <h2>Por que calcular o ponto de equilíbrio?</h2>
      <p>Dados do SEBRAE mostram que 39% dos empresários que encerram operações desconheciam o capital de giro necessário, e 42% nunca calcularam o nível mínimo de vendas para cobrir custos.</p>
      <p>O ponto de equilíbrio mensal revela exatamente quanto a empresa deve faturar para pagar despesas fixas e variáveis, garantindo a saúde financeira do negócio.</p>
    `
  },
  {
    id: '3',
    title: 'As finanças da família e a crise econômica',
    excerpt: 'Em tempos de desemprego e renda instável, união familiar e planejamento financeiro tornam-se fundamentais para enfrentar a crise com serenidade.',
    date: '17 Jul 2018',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Especialista em Finanças Familiares',
      bio: 'Professor universitário e palestrante com foco em organização financeira doméstica.'
    },
    category: 'Finanças Familiares',
    image: 'https://images.unsplash.com/photo-1508385082359-f34d5bc3087b?ixlib=rb-4.0.3',
    slug: 'financas-familia-crise-economica',
    readTime: '2 min',
    views: '2.0K',
    content: `
      <h2>Planejamento em tempos de crise</h2>
      <p>Muitas famílias perderam renda nos últimos anos. As dicas vão desde realizar reuniões transparentes para mapear dívidas até redistribuir tarefas domésticas que contribuam para economia e geração de renda extra.</p>
      <p>O segredo está na comunicação clara, na divisão de responsabilidades e em comemorar pequenas vitórias, reforçando o senso de propósito coletivo.</p>
    `
  },
  {
    id: '4',
    title: 'A educação financeira dos seus filhos',
    excerpt: 'Ensinar finanças às crianças transforma valores em hábitos saudáveis e prepara adultos mais conscientes no futuro.',
    date: '16 Nov 2015',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Pesquisador em Educação Financeira',
      bio: 'Autor de estudos sobre alfabetização financeira infantil e comportamento econômico.'
    },
    category: 'Educação Financeira',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3',
    slug: 'educacao-financeira-filhos',
    readTime: '1 min',
    views: '1.6K',
    content: `
      <h2>Por que começar na infância?</h2>
      <p>Ao adaptar o “Método dos Cinco Potes” de Craig Hill, pais criam um ambiente lúdico onde a criança aprende doação, auxílio, investimentos, economias e gastos diários, desenvolvendo disciplina e empatia.</p>
    `
  },
  {
    id: '5',
    title: 'Os Cinco Potes',
    excerpt: 'O Método dos Cinco Potes ensina crianças a distribuir dinheiro em doação, auxílio, investimentos, poupança e gastos diários, fomentando responsabilidade e empreendedorismo.',
    date: '02 Fev 2016',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Especialista em Educação Financeira',
      bio: 'Pesquisador de metodologias lúdicas para formação de hábitos financeiros saudáveis.'
    },
    category: 'Educação Financeira',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3',
    slug: 'os-cinco-potes',
    readTime: '3 min',
    views: '1.4K',
    content: `
      <h2>Como aplicar o método</h2>
      <p>Com cinco recipientes simples (potes ou caixas), a criança participa da rotulagem e entende o propósito de cada categoria, praticando doação e investimento de forma concreta.</p>
    `
  },
  {
    id: '6',
    title: 'O orçamento doméstico da sua família',
    excerpt: 'O orçamento doméstico é a ferramenta-chave para classificar gastos em essenciais, importantes e dispensáveis — passo inicial rumo à saúde financeira.',
    date: '06 Set 2015',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Consultor em Orçamento Doméstico',
      bio: 'PhD em Finanças com foco em gestão de despesas familiares e educação econômica popular.'
    },
    category: 'Orçamento Doméstico',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3',
    slug: 'orcamento-domestico-familia',
    readTime: '1 min',
    views: '1.3K',
    content: `
      <h2>Classificando seus gastos</h2>
      <p>Organize despesas em essenciais (moradia e alimentação), importantes (transporte, saúde) e dispensáveis (lazer, presentes). Isso revela prioridades e facilita ajustes sem comprometer bem-estar.</p>
    `
  }
];
