import React, { useEffect, useState } from 'react';
import { Deal, getDeals, seedDealsIfEmpty } from '../utils/firebase';
import { hapticFeedback } from '../utils/haptics';

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
      <div className="p-6 md:p-10 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl md:text-4xl">🏷️</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-main">Exclusive Deals</h2>
      </div>
      <p className="mb-8 text-text-muted text-lg md:text-xl font-medium">
        Hand-picked discounts on products and services for seniors.
      </p>

      {deals.length === 0 ? (
        <p className="text-xl text-text-muted text-center py-10">No deals available at the moment. Check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {deals.map((deal) => (
            <div 
              key={deal.id}
              className="bg-white rounded-2xl border-2 border-border-main overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col"
            >
              <div className="h-48 md:h-64 w-full bg-gray-100 relative flex items-center justify-center">
                {deal.imageUrl ? (
                  <img 
                    src={deal.imageUrl} 
                    alt={deal.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-6xl md:text-8xl">🛍️</div>
                )}
                {deal.storeName && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-md">
                    {deal.storeName}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-text-main mb-3 leading-tight">
                  {deal.title}
                </h3>
                
                {deal.description && (
                  <p className="text-lg text-text-muted mb-6 flex-grow font-medium leading-relaxed">
                    {deal.description}
                  </p>
                )}

                {deal.salePrice != null && deal.originalPrice != null && (
                  <div className="flex items-end gap-4 mb-6">
                    <span className="text-4xl font-black text-emerald-600">
                      ${deal.salePrice.toFixed(2)}
                    </span>
                    <span className="text-2xl font-bold text-gray-400 line-through mb-1">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  </div>
                )}

                <button 
                  onClick={() => handleGetDeal(deal.affiliateLink)}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black text-xl uppercase tracking-widest shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Get Deal <span>↗</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;
