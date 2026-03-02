import React, { useState, useEffect } from 'react';
import { Deal, getDeals, addDeal, updateDeal, deleteDeal } from '../utils/firebase';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    storeName: '',
    description: '',
    originalPrice: '',
    salePrice: '',
    imageUrl: '',
    affiliateLink: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || (typeof process !== 'undefined' ? process.env.VITE_ADMIN_PASSWORD : '') || 'admin';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      fetchDeals();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const fetchedDeals = await getDeals();
      setDeals(fetchedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dealData: Omit<Deal, 'id'> = {
        title: formData.title,
        storeName: formData.storeName || undefined,
        description: formData.description || undefined,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        imageUrl: formData.imageUrl || undefined,
        affiliateLink: formData.affiliateLink,
        createdAt: editingDeal ? editingDeal.createdAt : Date.now()
      };

      if (editingDeal && editingDeal.id) {
        await updateDeal(editingDeal.id, dealData);
      } else {
        await addDeal(dealData);
      }
      
      setFormData({
        title: '',
        storeName: '',
        description: '',
        originalPrice: '',
        salePrice: '',
        imageUrl: '',
        affiliateLink: ''
      });
      setEditingDeal(null);
      await fetchDeals();
    } catch (error) {
      console.error("Error saving deal:", error);
      alert('Error saving deal');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title,
      storeName: deal.storeName || '',
      description: deal.description || '',
      originalPrice: deal.originalPrice?.toString() || '',
      salePrice: deal.salePrice?.toString() || '',
      imageUrl: deal.imageUrl || '',
      affiliateLink: deal.affiliateLink
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setLoading(true);
      try {
        await deleteDeal(id);
        await fetchDeals();
      } catch (error) {
        console.error("Error deleting deal:", error);
        alert('Error deleting deal');
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg font-bold">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Deals</h1>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-primary font-bold hover:underline"
          >
            Back to App
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">{editingDeal ? 'Edit Deal' : 'Add New Deal'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store/Brand Name</label>
                <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
                  <input type="number" step="0.01" name="salePrice" value={formData.salePrice} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affiliate Link <span className="text-red-500">*</span>
                </label>
                <input type="url" name="affiliateLink" value={formData.affiliateLink} onChange={handleInputChange} required className="w-full p-2 border rounded" />
              </div>
              
              <div className="flex gap-2 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-primary text-white p-2 rounded font-bold hover:bg-primary/90 disabled:opacity-50">
                  {loading ? 'Saving...' : (editingDeal ? 'Update Deal' : 'Add Deal')}
                </button>
                {editingDeal && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingDeal(null);
                      setFormData({ title: '', storeName: '', description: '', originalPrice: '', salePrice: '', imageUrl: '', affiliateLink: '' });
                    }}
                    className="bg-gray-200 text-gray-800 p-2 rounded font-bold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Current Deals ({deals.length})</h2>
            {loading && deals.length === 0 ? (
              <p>Loading deals...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deals.map(deal => (
                  <div key={deal.id} className="bg-white p-4 rounded-xl shadow-sm border flex flex-col">
                    <div className="flex gap-4 mb-3">
                      {deal.imageUrl ? (
                        <img src={deal.imageUrl} alt={deal.title} className="w-20 h-20 object-cover rounded" />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-2xl">🛍️</div>
                      )}
                      <div>
                        <h3 className="font-bold line-clamp-1">{deal.title}</h3>
                        <p className="text-sm text-gray-500">{deal.storeName || 'No Store'}</p>
                        <div className="mt-1">
                          {deal.salePrice !== undefined && (
                            <span className="text-emerald-600 font-bold">${deal.salePrice}</span>
                          )}
                          {deal.originalPrice !== undefined && (
                            <span className="text-gray-400 line-through text-sm ml-2">${deal.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto flex gap-2 pt-3 border-t">
                      <button onClick={() => handleEdit(deal)} className="flex-1 bg-blue-50 text-blue-600 py-1 rounded font-medium hover:bg-blue-100">Edit</button>
                      <button onClick={() => deal.id && handleDelete(deal.id)} className="flex-1 bg-red-50 text-red-600 py-1 rounded font-medium hover:bg-red-100">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
