
import React, { useState, useEffect } from 'react';
import { Deal, getDeals, addDeal, updateDeal, deleteDeal, auth } from '../utils/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { toast } from 'sonner';
import { 
  Lock, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Save, 
  X, 
  ShoppingBag, 
  Tag, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  LogOut,
  Mail
} from 'lucide-react';

const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    storeName: '',
    description: '',
    originalPrice: '',
    salePrice: '',
    imageUrl: '',
    affiliateLink: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchDeals();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || 'Incorrect email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Error logging out');
    }
  };

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const fetchedDeals = await getDeals();
      setDeals(fetchedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
      toast.error('Error fetching deals');
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
        storeName: formData.storeName || null,
        description: formData.description || null,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        imageUrl: formData.imageUrl || null,
        affiliateLink: formData.affiliateLink,
        createdAt: editingDeal ? editingDeal.createdAt : Date.now()
      };

      if (editingDeal && editingDeal.id) {
        await updateDeal(editingDeal.id, dealData);
        toast.success('Deal updated successfully');
      } else {
        await addDeal(dealData);
        toast.success('Deal published successfully');
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
      toast.error('Error saving deal');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteDeal(id);
      toast.success('Deal deleted successfully');
      await fetchDeals();
    } catch (error) {
      console.error("Error deleting deal:", error);
      toast.error('Error deleting deal');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
        <div className="card-premium p-10 bg-white border border-border-main max-w-md w-full shadow-2xl space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Lock size={40} />
            </div>
            <h2 className="text-3xl font-bold text-text-main">Admin Login</h2>
            <p className="text-text-muted font-medium">Please sign in to manage deals.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1 flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1 flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg font-mono"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-tactile btn-primary w-full py-4 text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-text-main">Manage Deals</h1>
            <p className="text-text-muted text-lg font-medium">Add, edit, or remove exclusive offers for seniors.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="btn-tactile bg-rose-50 border border-rose-100 text-rose-600 px-6 py-3 rounded-2xl flex items-center gap-3 font-bold hover:bg-rose-100 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="btn-tactile bg-white border border-border-main text-text-main px-6 py-3 rounded-2xl flex items-center gap-3 font-bold hover:shadow-md transition-all"
            >
              <ArrowLeft size={20} />
              Back to App
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-premium p-8 bg-white border border-border-main shadow-lg sticky top-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  {editingDeal ? <Edit2 size={24} /> : <Plus size={24} />}
                </div>
                <h2 className="text-2xl font-bold text-text-main">{editingDeal ? 'Edit Deal' : 'Add New Deal'}</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1 flex items-center gap-2">
                    <Tag size={14} /> Title <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="e.g., 20% Off Senior Discount" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1 flex items-center gap-2">
                    <ShoppingBag size={14} /> Store/Brand Name
                  </label>
                  <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="e.g., CVS Pharmacy" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" rows={3} placeholder="Tell us more about this deal..." />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main ml-1">Original Price ($)</label>
                    <input type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main ml-1">Sale Price ($)</label>
                    <input type="number" step="0.01" name="salePrice" value={formData.salePrice} onChange={handleInputChange} className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1 flex items-center gap-2">
                    <ImageIcon size={14} /> Image URL
                  </label>
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1 flex items-center gap-2">
                    <LinkIcon size={14} /> Affiliate Link <span className="text-rose-500">*</span>
                  </label>
                  <input type="url" name="affiliateLink" value={formData.affiliateLink} onChange={handleInputChange} required className="w-full p-4 bg-bg-main border border-border-main rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://..." />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button type="submit" disabled={loading} className="btn-tactile btn-primary flex-1 py-4 text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {editingDeal ? 'Update Deal' : 'Publish Deal'}
                  </button>
                  {editingDeal && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingDeal(null);
                        setFormData({ title: '', storeName: '', description: '', originalPrice: '', salePrice: '', imageUrl: '', affiliateLink: '' });
                      }}
                      className="btn-tactile bg-bg-main text-text-main px-6 py-4 rounded-2xl font-bold border border-border-main hover:bg-white transition-all"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-main">Current Deals ({deals.length})</h2>
              <button onClick={fetchDeals} className="p-2 text-primary hover:bg-primary/5 rounded-xl transition-all">
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>

            {loading && deals.length === 0 ? (
              <div className="card-premium p-20 bg-white border border-border-main flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-text-muted font-medium">Loading your deals...</p>
              </div>
            ) : deals.length === 0 ? (
              <div className="card-premium p-20 bg-white border border-border-main flex flex-col items-center justify-center space-y-6 text-center">
                <div className="w-20 h-20 bg-bg-main text-text-muted rounded-full flex items-center justify-center">
                  <ShoppingBag size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-main">No deals found</h3>
                  <p className="text-text-muted font-medium max-w-xs">Start by adding your first exclusive offer using the form on the left.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deals.map(deal => (
                  <div key={deal.id} className="card-premium bg-white border border-border-main overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-bg-main overflow-hidden">
                      {deal.imageUrl ? (
                        <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted/20">
                          <ShoppingBag size={60} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                          {deal.storeName || 'Exclusive'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="space-y-1">
                        <h3 className="font-bold text-text-main text-lg leading-tight line-clamp-2">{deal.title}</h3>
                        <div className="flex items-center gap-3">
                          {deal.salePrice != null && (
                            <span className="text-primary font-black text-xl">${deal.salePrice}</span>
                          )}
                          {deal.originalPrice != null && (
                            <span className="text-text-muted line-through text-sm font-medium">${deal.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border-main flex gap-3 mt-auto">
                        <button 
                          onClick={() => handleEdit(deal)} 
                          className="flex-1 bg-bg-main text-text-main py-3 rounded-xl font-bold border border-border-main hover:bg-white hover:shadow-sm transition-all flex items-center justify-center gap-2"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button 
                          onClick={() => deal.id && setShowDeleteConfirm(deal.id)} 
                          className="flex-1 bg-rose-50 text-rose-600 py-3 rounded-xl font-bold border border-rose-100 hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="card-premium p-8 bg-white border border-border-main max-w-sm w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-text-main">Delete this deal?</h3>
              <p className="text-text-muted font-medium">This action cannot be undone. Are you sure you want to proceed?</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-4 bg-bg-main text-text-main rounded-2xl font-bold border border-border-main hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={loading}
                className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
