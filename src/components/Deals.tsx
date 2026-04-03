import React, { useEffect, useState } from 'react';
import { Deal, getDeals, seedDealsIfEmpty } from '../utils/firebase';
import { hapticFeedback } from '../utils/haptics';
import { 
  Tag, 
  ExternalLink, 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  Loader2,
  ArrowRight
} from 'lucide-react';

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        await seedDealsIfEmpty();
        const fetchedDeals = await getDeals();
        setDeals(fetchedDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleGetDeal = (url: string) => {
    hapticFeedback.medium();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-text-muted font-medium animate-pulse">Finding the best deals for you...</p>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main flex items-center gap-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-sm border border-border-main">
              <Tag className="text-primary" size={24} />
            </div>
            Exclusive Deals
          </h2>
          <p className="text-text-muted text-sm md:text-base font-medium">
            Hand-picked discounts on products and services for seniors.
          </p>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="card-premium p-12 text-center bg-white border border-border-main">
          <ShoppingBag className="mx-auto text-text-muted mb-4 opacity-20" size={64} />
          <p className="text-xl text-text-muted font-medium">No deals available at the moment. Check back later!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {deals.map((deal) => (
            <div 
              key={deal.id}
              onClick={() => handleGetDeal(deal.affiliateLink)}
              className="card-premium bg-white border border-border-main overflow-hidden shadow-sm hover:shadow-md transition-all flex items-center p-3 gap-4 cursor-pointer group active:scale-[0.99]"
            >
              {/* Thumbnail */}
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-bg-main rounded-xl overflow-hidden relative border border-border-main/50">
                {deal.imageUrl ? (
                  <img 
                    src={deal.imageUrl} 
                    alt={deal.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted opacity-20">
                    <ShoppingBag size={32} />
                  </div>
                )}
                {deal.salePrice != null && deal.originalPrice != null && (
                  <div className="absolute top-1.5 left-1.5 bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-lg uppercase shadow-sm">
                    -{Math.round((1 - deal.salePrice / deal.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5 h-24 md:h-32">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {deal.storeName && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary/70 truncate max-w-[120px]">
                        {deal.storeName}
                      </span>
                    )}
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-tighter">
                      <Sparkles size={8} />
                      Verified
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-bold text-text-main leading-tight truncate group-hover:text-primary transition-colors">
                    {deal.title}
                  </h3>
                  {deal.description && (
                    <p className="text-[11px] md:text-sm text-text-muted line-clamp-1 md:line-clamp-2 font-medium leading-snug">
                      {deal.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-2">
                    {deal.salePrice != null ? (
                      <>
                        <span className="text-xl md:text-2xl font-black text-emerald-600">
                          ${deal.salePrice.toFixed(2)}
                        </span>
                        {deal.originalPrice != null && (
                          <span className="text-xs md:text-sm font-bold text-text-muted line-through opacity-40">
                            ${deal.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-sm md:text-base font-bold text-emerald-600 flex items-center gap-1">
                        <Tag size={14} />
                        Special Offer
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-primary font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform bg-primary/5 px-3 py-1.5 rounded-xl">
                    View
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card-premium p-6 bg-primary/5 border-primary/10 flex flex-col md:flex-row items-center gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <CheckCircle2 size={80} />
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl text-primary relative z-10">
          <CheckCircle2 size={32} />
        </div>
        <div className="text-center md:text-left relative z-10">
          <h4 className="text-lg font-bold mb-1 text-text-main">Safe Shopping Guarantee</h4>
          <p className="text-sm text-text-muted leading-relaxed font-medium">
            Every deal is manually verified. We only partner with trusted retailers to ensure your shopping experience is safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Deals;
