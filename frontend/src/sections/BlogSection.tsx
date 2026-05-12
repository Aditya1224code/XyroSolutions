import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useContent } from '../hooks/useContent';
import { ArrowRight, Clock, X } from 'lucide-react';
import { blogApi } from '../lib/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  readTime: string;
  createdAt: string;
}

export default function BlogSection() {
  const { content } = useContent();
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi.getPosts();
        if (response.success && response.data) {
          setBlogPosts(response.data as BlogPost[]);
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-off-white py-20 md:py-32 relative overflow-hidden dark:bg-[#050608]"
    >
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 
              className={`font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-dark dark:text-[#F8FAFC] mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {content.blog.headline}
            </h2>
            <p 
              className={`text-base md:text-lg text-gray-custom dark:text-slate-300 max-w-md transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {content.blog.body}
            </p>
          </div>
          <button 
            onClick={() => setShowAllArticles(true)}
            className={`inline-flex items-center gap-2 font-medium text-dark dark:text-[#F8FAFC] hover:text-lime transition-all duration-700 group mt-4 md:mt-0 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            View all articles
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(content.blog.posts || []).map((post, index) => (
            <article 
              key={index}
              onClick={() => setSelectedPost({
                _id: `static-${index}`,
                title: post.title,
                slug: post.title.toLowerCase().replace(/\s+/g, '-'),
                excerpt: post.excerpt,
                content: `<p>${post.excerpt}</p><p>This is a sample article. Create real blog posts from the admin dashboard to add full content.</p>`,
                readTime: '5 min read',
                createdAt: new Date().toISOString()
              })}
              className={`bg-white rounded-xl overflow-hidden card-hover cursor-pointer group transition-all duration-700 ${
                
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Thumbnail Placeholder */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0F172A] dark:to-[#111827] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-gray-300 dark:text-slate-600 font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-lime text-dark text-xs font-mono px-3 py-1 rounded-full">
                    Article
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-custom text-sm mb-3">
                  <Clock size={14} />
                  <span>5 min read</span>
                </div>
                <h3 className="font-display font-bold text-lg text-dark dark:text-[#F8FAFC] mb-2 group-hover:text-lime transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-custom dark:text-slate-300 text-sm mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-dark dark:text-[#F8FAFC] group-hover:text-lime transition-colors">
                  Read more
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* All Articles Modal */}
      {showAllArticles && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowAllArticles(false)}
        >
          <div 
            className="bg-off-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto dark:bg-[#0B0F14] dark:border dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-off-white p-6 border-b flex justify-between items-center z-10 dark:bg-[#0B0F14] dark:border-white/10">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-[#F8FAFC]">All Articles</h2>
              <button 
                onClick={() => setShowAllArticles(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <article 
                    key={post._id}
                    onClick={() => {
                      setSelectedPost(post);
                      setShowAllArticles(false);
                    }}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow dark:bg-[#111827] dark:border dark:border-white/10"
                  >
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0F172A] dark:to-[#111827] relative overflow-hidden">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-4xl text-gray-300 dark:text-slate-600 font-bold">📝</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="bg-lime text-dark text-xs font-mono px-2 py-1 rounded-full">Article</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-gray-custom dark:text-slate-300 text-xs mb-2">
                        <Clock size={12} />
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                      <h3 className="font-display font-bold text-dark dark:text-[#F8FAFC] mb-1 group-hover:text-lime transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-custom dark:text-slate-300 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-custom dark:text-slate-300">
                  <p>No articles published yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Single Article Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto dark:bg-[#111827] dark:border dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center z-10 dark:bg-[#111827] dark:border-white/10">
              <div className="flex items-center gap-2 text-gray-custom dark:text-slate-300 text-sm">
                <Clock size={14} />
                <span>{selectedPost.readTime || '5 min read'}</span>
              </div>
              <button 
                onClick={() => setSelectedPost(null)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {selectedPost.image && (
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-6 md:p-8">
              <h1 className="font-display font-bold text-2xl md:text-3xl text-dark dark:text-[#F8FAFC] mb-4">
                {selectedPost.title}
              </h1>
              <p className="text-gray-custom dark:text-slate-300 text-lg mb-6">{selectedPost.excerpt}</p>
              <div 
                className="prose prose-lg max-w-none text-dark dark:prose-invert dark:text-slate-200"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
