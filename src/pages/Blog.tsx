import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  User, 
  Tag, 
  Search, 
  Filter, 
  X, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  GraduationCap,
} from 'lucide-react';

// Import the articles from data/articles.tsx
import { articles as academicArticles } from '../data/articles.tsx';

// Artigos do Blog - Walter Eclache
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
    title: 'A cooperativa de crédito não cobra juros de seus associados',
    excerpt: 'As cooperativas de crédito, embora cobrem juros menores que bancos tradicionais, precisam sustentar operações e gerar sobras que retornam aos associados como diferencial cooperativo.',
    date: '12 Abr 2019',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Especialista em Sistemas Cooperativos',
      bio: 'PhD em Finanças com extensa pesquisa em cooperativismo de crédito e impacto socioeconômico de cooperativas.'
    },
    category: 'Cooperativismo',
    image: 'https://images.unsplash.com/photo-1542222024-c39e2281f121?ixlib=rb-4.0.3',
    slug: 'cooperativa-credito-juros',
    readTime: '3 min',
    views: '3.5K',
    content: `
      <h2>Mito ou verdade: cooperativas não cobram juros?</h2>
      <p>Em cooperativas, diferente dos bancos, o associado não é apenas cliente, mas também dono do negócio. Isso significa que participa dos resultados proporcionalmente à sua movimentação financeira.</p>
      <p>No entanto, para manter a estrutura operacional e gerar resultados positivos, as cooperativas precisam cobrar juros nas operações de crédito, porém tipicamente com taxas mais atraentes que as praticadas por bancos comerciais.</p>
    `
  },
  {
    id: '4',
    title: 'Matemática e finanças: descobrindo o segredo dos juros compostos',
    excerpt: 'Einstein teria chamado os juros compostos de "a maior invenção matemática da humanidade" devido ao poder de crescimento exponencial que tanto pode enriquecer quanto endividar.',
    date: '10 Abr 2019',
    author: {
      id: 'walter-eclache',
      name: 'Walter Eclache',
      role: 'Professor de Educação Financeira',
      bio: 'Doutor em Finanças com especialização em matemática financeira e educação financeira para jovens e adultos.'
    },
    category: 'Educação Financeira',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3',
    slug: 'matematica-juros-compostos',
    readTime: '4 min',
    views: '5.2K',
    content: `
      <h2>O poder matemático dos juros compostos</h2>
      <p>Uma frase frequentemente atribuída a Albert Einstein (embora sem comprovação histórica) afirma que "os juros compostos são a maior invenção matemática de todos os tempos" ou "a oitava maravilha do mundo".</p>
      <p>Independentemente da autoria, a frase ilustra bem o impacto dos juros compostos na vida financeira. Para investidores, eles representam a multiplicação do patrimônio. Para quem está endividado, significam o crescimento acelerado das dívidas.</p>
    `
  },
];

// Types
interface Article {
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
}



const BlogPage: React.FC = () => {
  // State variables
  const [filter, setFilter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Removed unused cursorPosition state and its associated logic

  // Get all unique categories from articles
  const categories = Array.from(new Set([
    ...articles.map(article => article.category),
    ...academicArticles.map(article => article.category)
  ]));
  
  // Years for filtering
  const years = ['2025', '2024', '2023', '2022', '2019', '2018', '2016', '2015'];

  // Filter articles based on search term and active category
  const filteredArticles = [...articles, ...academicArticles].filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !activeCategory || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle filter clearing
  const clearFilters = () => {
    setFilter(null);
    setActiveCategory(null);
    setSearchTerm('');
  };

  // Featured article is the first one
  const featuredArticle = filteredArticles[0];
  const standardArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-academic-900 to-academic-800 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        
        {/* Academic pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-academic-600/30 to-sicredi-600/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm mb-4">
                ARTIGOS E PUBLICAÇÕES
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              O Blog de <span className="text-sicredi-400">Walter Eclache</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/80 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Compartilhando conhecimento sobre cooperativismo, finanças e economia
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar por artigo, tema ou palavra-chave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-4 pr-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-academic-400/50 focus:border-transparent"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-white/60" />
                </div>
              </div>
              
              {searchTerm && (
                <motion.div 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Author Profile - Desktop */}
      <div className="bg-white py-12 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-academic-100 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                alt="Prof. Walter Eclache" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">Prof. Walter Eclache</h2>
              <p className="text-academic-700 font-medium mb-3">PhD em Finanças e Cooperativismo</p>
              <p className="text-gray-600 max-w-2xl mb-6">
                Professor e pesquisador com mais de 20 anos dedicados ao estudo de finanças cooperativas,
                educação financeira e desenvolvimento econômico regional. Autor de diversos artigos e publicações
                acadêmicas sobre o impacto do cooperativismo na sociedade.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-academic-100 text-academic-800 rounded-lg font-medium hover:bg-academic-200 transition-colors"
              >
                <span>Ver perfil completo</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Enhanced Filter Controls with modern design */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 flex items-center">
                {filter || activeCategory ? 
                  <span className="flex items-center gap-2">
                    <Link to="/blog" className="text-academic-700 hover:text-academic-900 transition-colors">Publicações</Link>
                    <ChevronRight size={20} className="text-gray-400" />
                    <span className="text-gray-900">{activeCategory || 'Filtrado'}</span>
                  </span>
                : 
                  <span className="relative inline-block">
                    Todas as Publicações
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-academic-500/30 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </span>
                }
              </h2>
              
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="md:hidden px-5 py-2.5 bg-white border border-gray-200 rounded-xl flex items-center gap-2.5 text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <Filter size={16} className={filter || activeCategory ? "text-academic-700" : ""} />
                  <span>Filtros</span>
                  {(filter || activeCategory) && (
                    <span className="bg-academic-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">1</span>
                  )}
                </motion.button>
                
                {/* Desktop filter dropdown */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="relative">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setFilter(filter === 'category' ? null : 'category')}
                      className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium ${filter === 'category' ? 'bg-academic-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'} transition-all shadow-sm`}
                    >
                      <Tag size={16} className={filter === 'category' ? "text-white" : "text-gray-400"} />
                      <span>Categorias</span>
                      {filter === 'category' ? <X size={16} /> : <ChevronRight size={16} className="transform rotate-90" />}
                    </motion.button>
                  </div>
                  
                  {(filter || activeCategory) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={clearFilters}
                      className="px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Mobile Filter Panel */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-8 md:hidden"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Categorias</h3>
                        {activeCategory && (
                          <button 
                            onClick={() => setActiveCategory(null)}
                            className="text-sm text-academic-700 hover:text-academic-900"
                          >
                            Limpar
                          </button>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category, index) => (
                          <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium ${
                              activeCategory === category 
                                ? 'bg-academic-600 text-white' 
                                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                            } transition-all`}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Ano</h3>
                      <div className="flex flex-wrap gap-2">
                        {years.map((type, index) => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all"
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Desktop Category Drawer */}
            <AnimatePresence>
              {filter === 'category' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-8 hidden md:block"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-medium text-gray-900">Selecione uma categoria</h3>
                      {activeCategory && (
                        <button 
                          onClick={() => setActiveCategory(null)}
                          className="text-sm text-academic-700 hover:text-academic-900"
                        >
                          Limpar seleção
                        </button>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          onClick={() => {
                            setActiveCategory(activeCategory === category ? null : category);
                            setFilter(null);
                          }}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                            activeCategory === category 
                              ? 'bg-academic-600 text-white' 
                              : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                          } transition-all`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Featured Article */}
          {featuredArticle && !activeCategory && !searchTerm && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
                <div className="h-64 lg:h-auto lg:min-h-[400px] relative overflow-hidden">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-academic-700 text-xs font-medium py-1.5 px-3 rounded-full shadow-md border border-academic-100">
                      EM DESTAQUE
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-academic-50 text-academic-700 text-xs font-medium rounded-full">
                        {featuredArticle.category}
                      </span>
                      <span className="text-gray-500 text-sm">{featuredArticle.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-academic-100 flex items-center justify-center overflow-hidden">
                        <User className="w-5 h-5 text-academic-600" />
                      </div>
                      <span className="font-medium text-gray-900">{featuredArticle.author.name}</span>
                    </div>
                    <Link 
                      to={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 text-academic-600 hover:text-academic-800 font-medium transition-colors"
                    >
                      <span>Ler artigo</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              standardArticles.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <motion.div
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm text-academic-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center gap-1 shadow-md border border-gray-100">
                          <Tag className="w-3 h-3" />
                          <span>{article.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="text-academic-500" />
                        <span>{article.date}</span>
                        {article.readTime && (
                          <>
                            <span className="mx-1">•</span>
                            <Clock size={14} className="text-academic-500" />
                            <span>{article.readTime}</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-academic-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-6">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-academic-50 flex items-center justify-center overflow-hidden">
                            <User className="w-4 h-4 text-academic-600" />
                          </div>
                          <span className="text-xs text-gray-600">Prof. Walter</span>
                        </div>
                        <div className="inline-flex items-center text-academic-600 font-medium text-sm group-hover:text-academic-800 transition-colors">
                          <span>Ler mais</span>
                          <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <motion.div 
                className="col-span-full py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-academic-50 mb-6">
                    <Search size={24} className="text-academic-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">Nenhum resultado encontrado</h3>
                  <p className="text-gray-600 mb-6">
                    Não encontramos resultados para sua busca. Tente mudar os termos ou filtros utilizados.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-academic-600 text-white font-medium rounded-lg hover:bg-academic-700 transition-colors shadow-md"
                  >
                    Limpar filtros
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Premium Newsletter Section */}
          <motion.div 
            className="mt-32 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-academic-800 to-academic-900 rounded-3xl p-12 md:p-20">
              {/* Academic background elements */}
              <div className="absolute inset-0">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
                
                {/* Gradient accent */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-sicredi-500 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute -bottom-20 -left-16 w-72 h-72 bg-academic-500 rounded-full filter blur-3xl opacity-20"></div>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm border border-white/10 mb-6">
                    NEWSLETTER EXCLUSIVA
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                    Receba artigos e análises direto no seu e-mail
                  </h3>
                  <p className="text-white/80 mb-8">
                    Assine nossa newsletter e tenha acesso a conteúdos exclusivos sobre cooperativismo, 
                    finanças pessoais e empresariais, além de dicas práticas para melhorar sua relação com o dinheiro.
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-white/80">
                      <GraduationCap className="text-sicredi-400" />
                      <span>Conteúdo acadêmico</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <BookOpen className="text-sicredi-400" />
                      <span>Artigos exclusivos</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-6">Inscreva-se gratuitamente</h4>
                    <form className="space-y-4">
                      <div>
                        <label className="text-white/80 text-sm mb-1.5 block">Nome completo</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sicredi-400/30 focus:border-transparent"
                          placeholder="Digite seu nome"
                        />
                      </div>
                      <div>
                        <label className="text-white/80 text-sm mb-1.5 block">E-mail</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sicredi-400/30 focus:border-transparent"
                          placeholder="Digite seu melhor e-mail"
                        />
                      </div>
                      <motion.button 
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-academic-500 to-sicredi-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Inscrever-se agora
                      </motion.button>
                      <p className="text-white/60 text-xs text-center mt-3">
                        Você pode cancelar sua inscrição a qualquer momento
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
