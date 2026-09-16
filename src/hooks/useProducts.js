import { useState, useEffect, useCallback } from 'react';
import { initialProducts } from '../data/products';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const DATA_VERSION = 'v2_luxury';

export const useProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [isUsingSupabase, setIsUsingSupabase] = useState(isSupabaseConfigured);

  // Fallback to local storage
  const loadFromLocalStorage = useCallback(() => {
    const savedVersion = localStorage.getItem('veloraDataVersion');
    const savedProducts = localStorage.getItem('veloraProducts');
    
    if (savedProducts && savedVersion === DATA_VERSION) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
      } catch (e) {
        setProducts(initialProducts);
        localStorage.setItem('veloraProducts', JSON.stringify(initialProducts));
        localStorage.setItem('veloraDataVersion', DATA_VERSION);
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('veloraProducts', JSON.stringify(initialProducts));
      localStorage.setItem('veloraDataVersion', DATA_VERSION);
    }
    setLoading(false);
  }, []);

  // Fetch products from Supabase
  const fetchSupabaseProducts = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      loadFromLocalStorage();
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('Supabase fetch error, falling back to local data:', error.message);
        setIsUsingSupabase(false);
        loadFromLocalStorage();
        return;
      }

      // If Supabase table is empty on first setup, automatically seed the initial products
      if (!data || data.length === 0) {
        console.log('Seeding initial products to Supabase...');
        const seedData = initialProducts.map(({ id, ...rest }) => rest);
        const { data: inserted, error: insertError } = await supabase
          .from('products')
          .insert(seedData)
          .select();

        if (!insertError && inserted) {
          setProducts(inserted);
        } else {
          setProducts(initialProducts);
        }
      } else {
        setProducts(data);
      }
      setIsUsingSupabase(true);
    } catch (err) {
      console.warn('Supabase connection failed, using local storage:', err);
      setIsUsingSupabase(false);
      loadFromLocalStorage();
    } finally {
      setLoading(false);
    }
  }, [loadFromLocalStorage]);

  // Initial load and real-time subscription
  useEffect(() => {
    fetchSupabaseProducts();

    // Setup Supabase real-time updates if configured
    let subscription = null;
    if (isSupabaseConfigured && supabase) {
      subscription = supabase
        .channel('public:products')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          () => {
            fetchSupabaseProducts();
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [fetchSupabaseProducts]);

  // Update product
  const updateProduct = async (id, updatedData) => {
    // Optimistic local update
    const updated = products.map(p => 
      p.id === id ? { ...p, ...updatedData } : p
    );
    setProducts(updated);
    localStorage.setItem('veloraProducts', JSON.stringify(updated));

    if (isUsingSupabase && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .update(updatedData)
          .eq('id', id);

        if (error) {
          console.error('Failed to update product in Supabase:', error);
        }
      } catch (err) {
        console.error('Supabase update exception:', err);
      }
    }
  };

  // Add product
  const addProduct = async (newProduct) => {
    if (isUsingSupabase && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();

        if (!error && data) {
          const updated = [...products, data];
          setProducts(updated);
          localStorage.setItem('veloraProducts', JSON.stringify(updated));
          return data;
        }
      } catch (err) {
        console.error('Supabase insert exception:', err);
      }
    }

    // Local fallback
    const product = {
      ...newProduct,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem('veloraProducts', JSON.stringify(updated));
    return product;
  };

  // Delete product
  const deleteProduct = async (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('veloraProducts', JSON.stringify(updated));

    if (isUsingSupabase && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Failed to delete product from Supabase:', error);
        }
      } catch (err) {
        console.error('Supabase delete exception:', err);
      }
    }
  };

  // Toggle availability
  const toggleAvailability = (id) => {
    const target = products.find(p => p.id === id);
    if (target) {
      updateProduct(id, { available: !target.available });
    }
  };

  return { 
    products, 
    loading, 
    isUsingSupabase, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    toggleAvailability,
    refreshProducts: fetchSupabaseProducts
  };
};
