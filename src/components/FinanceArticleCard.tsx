import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, Clock, Eye } from 'lucide-react';

interface ArticleProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  readTime?: string;
  featured?: boolean;
}

const FinanceArticleCard: React.FC<ArticleProps> = ({
  title,
  excerpt,
  date,
  category,
  image,
  slug,
  readTime,
  featured = false,
}) => {  
  return (
    <motion.div
      className={`group overflow-hidden bg-gradient-to-b from-[#0F1724] to-[#080E18] border border-academic-800/30 rounded-2xl shadow-lg hover:shadow-academic-500/20 transition-all duration-500 ${
        featured ? 'col-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, borderColor: 'rgba(1, 58, 99, 0.5)' }}
    >
      {/* Academic glowing hover effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-academic-500/0 via-sicredi-500/20 to-academic-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-500"></div>
      
      <div className="relative h-full flex flex-col">
        {/* Article Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-80' : 'h-60'}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080E18] via-transparent to-[#080E18]/20 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-academic-600/40 to-sicredi-500/20 opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>
          
          {/* Academic-themed grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxNDI5NGEiIGZpbGwtb3BhY2l0eT0iMC4wMyIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik02MCAwdjYwSDBWMGg2MHpNOS40IDYwSDYwVjkuNEg5LjR2NTAuNnptLS44LTUxLjRoNTAuNlYwSDguNnY4LjZ6IiBmaWxsPSIjMTQyOTRhIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-20 z-5 mix-blend-overlay"></div>
          
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Category badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-academic-600/80 backdrop-blur-sm text-white text-xs font-medium py-1.5 px-3 rounded-full flex items-center gap-1 shadow-lg border border-academic-400/30">
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>
          </div>
          
          {/* Date overlay at bottom */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <div className="bg-[#0F1724]/80 backdrop-blur-sm text-white/90 text-xs py-1.5 px-3 rounded-full flex items-center gap-1 border border-white/10">
              <Calendar className="w-3 h-3 text-sicredi-400" />
              <span>{date}</span>
            </div>
            
            {readTime && (
              <div className="bg-[#0F1724]/80 backdrop-blur-sm text-white/90 text-xs py-1.5 px-3 rounded-full flex items-center gap-1 border border-white/10">
                <Clock className="w-3 h-3 text-academic-400" />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Article Content */}
        <div className="flex flex-col flex-grow p-6 relative z-10">          
          <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-academic-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-white/70 text-sm flex-grow mb-6 line-clamp-3">{excerpt}</p>
          
          {/* Author & Read More */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-academic-700/20">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-academic-600/50 to-sicredi-500/50 p-[2px]">
                <div className="h-full w-full rounded-full overflow-hidden backdrop-blur-sm bg-[#0F1724]">
                  {/* Author icon placeholder */}
                  <div className="flex items-center justify-center h-full w-full">
                    <User className="w-4 h-4 text-academic-300" />
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium text-white/60">
                Prof. Walter
              </div>
            </div>
            
            <Link 
              to={`/blog/${slug}`} 
              className="flex items-center gap-1 text-sm font-medium text-academic-400 hover:text-sicredi-400 transition-colors"
            >
              <span>Ler artigo</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
          
          {/* Academic-styled bottom border */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-academic-600 via-sicredi-500/70 to-academic-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-academic-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-academic-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </motion.div>
  );
};

export default FinanceArticleCard;
