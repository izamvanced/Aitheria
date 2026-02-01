
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { usePageData } from '../hooks/usePageData';
import { useMockData } from '../hooks/useMockData';
import { usePageManagement } from '../context/PageContext';
import type { Product, PageData, FeatureItem, FAQItem, PricingTier, CustomPage } from '../types';

type AdminView = 'homepage' | 'products' | 'pages';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const AdminPage: React.FC = () => {
  const { pageData: initialPageData, updatePageData } = usePageData();
  const { products: initialProducts, saveProducts } = useMockData();
  const { pages: initialPages, savePages } = usePageManagement();

  const [view, setView] = useState<AdminView>('homepage');
  
  // Homepage State
  const [editablePageData, setEditablePageData] = useState<PageData | null>(null);
  
  // Products State
  const [editableProducts, setEditableProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({ name: '', description: '', imageUrl: '' });
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null);

  // Pages State
  const [editablePages, setEditablePages] = useState<CustomPage[]>([]);
  const [currentPage, setCurrentPage] = useState<Partial<CustomPage>>({ title: '', slug: '', content: ''});
  const [isEditingPage, setIsEditingPage] = useState<string | null>(null);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);


  useEffect(() => {
    if (initialPageData) {
      setEditablePageData(JSON.parse(JSON.stringify(initialPageData)));
    }
  }, [initialPageData]);

  useEffect(() => {
    setEditableProducts(JSON.parse(JSON.stringify(initialProducts)));
  }, [initialProducts]);
  
  useEffect(() => {
    setEditablePages(JSON.parse(JSON.stringify(initialPages)));
  }, [initialPages]);

  // Generic Handlers
  const handleSaveChanges = () => {
      if (editablePageData) {
          updatePageData(editablePageData);
      }
      saveProducts(editableProducts);
      savePages(editablePages);
      alert('All changes have been saved!');
  };

  const handlePreview = () => {
    const dataToPreview = { pageData: editablePageData, products: editableProducts };
    sessionStorage.setItem('aetheria_preview', JSON.stringify(dataToPreview));
    window.open('/#/preview', '_blank');
  };

  // Page Data Handlers
  const handlePageDataChange = (section: keyof PageData, field: string, value: any, index?: number, subfield?: string | keyof FeatureItem | keyof FAQItem | keyof PricingTier) => {
    setEditablePageData(prev => {
        if (!prev) return null;
        const newData = JSON.parse(JSON.stringify(prev));
        if (index !== undefined && subfield) {
            if ('items' in newData[section]) (newData[section] as any).items[index][subfield] = value;
            else if ('tiers' in newData[section]) (newData[section] as any).tiers[index][subfield] = value;
        } else {
            (newData[section] as any)[field] = value;
        }
        return newData;
    });
  };

  // Product Handlers
  const handleProductChange = (field: keyof Product, value: string) => {
    setCurrentProduct(prev => ({ ...prev, [field]: value }));
  };
  
  const resetCurrentProduct = () => {
    setCurrentProduct({ name: '', description: '', imageUrl: '' });
    setIsEditingProduct(null);
  }

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingProduct) {
      setEditableProducts(editableProducts.map(p => p.id === isEditingProduct ? { ...currentProduct, id: isEditingProduct } as Product : p));
    } else {
      setEditableProducts([...editableProducts, { ...currentProduct, id: `prod_${Date.now()}` } as Product]);
    }
    resetCurrentProduct();
  };

  const handleEditProduct = (product: Product) => {
    setIsEditingProduct(product.id);
    setCurrentProduct(product);
  };
  
  const handleDeleteProduct = (productId: string) => {
    setEditableProducts(editableProducts.filter(p => p.id !== productId));
  }

  // Page Management Handlers
  const handlePageTitleChange = (title: string) => {
    setCurrentPage(prev => {
        const newSlug = isSlugManuallyEdited ? prev.slug : slugify(title);
        return { ...prev, title, slug: newSlug };
    });
  };

  const handlePageSlugChange = (slug: string) => {
      setIsSlugManuallyEdited(true);
      setCurrentPage(prev => ({...prev, slug: slugify(slug)}));
  };

  const handlePageContentChange = (content: string) => {
      setCurrentPage(prev => ({ ...prev, content }));
  };
  
  const resetCurrentPage = () => {
    setCurrentPage({ title: '', slug: '', content: '' });
    setIsEditingPage(null);
    setIsSlugManuallyEdited(false);
  }

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingPage) {
      setEditablePages(editablePages.map(p => p.id === isEditingPage ? { ...currentPage, id: isEditingPage } as CustomPage : p));
    } else {
      setEditablePages([...editablePages, { ...currentPage, id: `page_${Date.now()}` } as CustomPage]);
    }
    resetCurrentPage();
  };

  const handleEditPage = (page: CustomPage) => {
    setIsEditingPage(page.id);
    setCurrentPage(page);
    setIsSlugManuallyEdited(true); // When editing, assume slug is final
  };
  
  const handleDeletePage = (pageId: string) => {
    setEditablePages(editablePages.filter(p => p.id !== pageId));
  }
  

  if (!editablePageData) return <div>Loading Admin Panel...</div>;

  const editorModules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formInputClass = "w-full p-2 bg-[var(--subtle-bg)] border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--accent)] transition-shadow";
  const formLabelClass = "block text-sm font-medium text-[var(--subtext)] mb-1";
  const formTextareaClass = `${formInputClass} min-h-[80px]`;
  const sectionHeaderClass = "text-xl font-semibold mt-6 mb-4 border-t border-[var(--border)] pt-4";

  const renderHomepageView = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Homepage Content</h2>
        {/* Hero Section */}
        <h3 className={sectionHeaderClass}>Hero Section</h3>
        <div>
          <label className={formLabelClass}>Title</label>
          <input type="text" value={editablePageData.hero.title} onChange={e => handlePageDataChange('hero', 'title', e.target.value)} className={formInputClass} />
        </div>
        <div>
          <label className={formLabelClass}>Subtitle</label>
           <ReactQuill theme="snow" value={editablePageData.hero.subtitle} onChange={value => handlePageDataChange('hero', 'subtitle', value)} />
        </div>
         <div>
          <label className={formLabelClass}>CTA Button Text</label>
          <input type="text" value={editablePageData.hero.cta} onChange={e => handlePageDataChange('hero', 'cta', e.target.value)} className={formInputClass} />
        </div>
        
        {/* Features Section */}
        <h3 className={sectionHeaderClass}>Features Section</h3>
        <div>
          <label className={formLabelClass}>Title</label>
          <input type="text" value={editablePageData.features.title} onChange={e => handlePageDataChange('features', 'title', e.target.value)} className={formInputClass} />
        </div>
        <div>
          <label className={formLabelClass}>Subtitle</label>
          <ReactQuill theme="snow" value={editablePageData.features.subtitle} onChange={value => handlePageDataChange('features', 'subtitle', value)} />
        </div>
        {editablePageData.features.items.map((item, index) => (
            <div key={index} className="p-4 border border-[var(--border)] rounded-md space-y-2 bg-[var(--subtle-bg)]">
                <label className={formLabelClass}>Feature Item #{index + 1}</label>
                <input type="text" placeholder="Icon (e.g., 🚀)" value={item.icon} onChange={e => handlePageDataChange('features', 'items', e.target.value, index, 'icon')} className={formInputClass} />
                <input type="text" placeholder="Title" value={item.title} onChange={e => handlePageDataChange('features', 'items', e.target.value, index, 'title')} className={formInputClass} />
                <textarea placeholder="Description" value={item.description} onChange={e => handlePageDataChange('features', 'items', e.target.value, index, 'description')} className={formTextareaClass} />
            </div>
        ))}

        {/* Products Section */}
        <h3 className={sectionHeaderClass}>Products Section (on Homepage)</h3>
        <div>
          <label className={formLabelClass}>Title</label>
          <input type="text" value={editablePageData.products.title} onChange={e => handlePageDataChange('products', 'title', e.target.value)} className={formInputClass} />
        </div>
        <div>
          <label className={formLabelClass}>Subtitle</label>
          <ReactQuill theme="snow" value={editablePageData.products.subtitle} onChange={value => handlePageDataChange('products', 'subtitle', value)} />
        </div>

        {/* Pricing Section */}
        <h3 className={sectionHeaderClass}>Pricing Section</h3>
        <div>
            <label className={formLabelClass}>Title</label>
            <input type="text" value={editablePageData.pricing.title} onChange={e => handlePageDataChange('pricing', 'title', e.target.value)} className={formInputClass} />
        </div>
        <div>
            <label className={formLabelClass}>Subtitle</label>
            <ReactQuill theme="snow" value={editablePageData.pricing.subtitle} onChange={value => handlePageDataChange('pricing', 'subtitle', value)} />
        </div>
        {editablePageData.pricing.tiers.map((tier, index) => (
            <div key={index} className="p-4 border border-[var(--border)] rounded-md space-y-2 bg-[var(--subtle-bg)]">
                 <label className={formLabelClass}>Pricing Tier #{index + 1}</label>
                 <input type="text" placeholder="Tier Name" value={tier.name} onChange={e => handlePageDataChange('pricing', 'tiers', e.target.value, index, 'name')} className={formInputClass} />
                 <input type="text" placeholder="Price" value={tier.price} onChange={e => handlePageDataChange('pricing', 'tiers', e.target.value, index, 'price')} className={formInputClass} />
                 <textarea placeholder="Features (comma-separated)" value={tier.features.join(', ')} onChange={e => handlePageDataChange('pricing', 'tiers', e.target.value.split(',').map(s=>s.trim()), index, 'features')} className={formTextareaClass} />
                 <div className="flex items-center gap-2">
                    <input type="checkbox" checked={tier.isFeatured} onChange={e => handlePageDataChange('pricing', 'tiers', e.target.checked, index, 'isFeatured')} id={`featured-${index}`} />
                    <label htmlFor={`featured-${index}`} className="cursor-pointer">Is Featured?</label>
                 </div>
            </div>
        ))}

        {/* FAQ Section */}
        <h3 className={sectionHeaderClass}>FAQ Section</h3>
        <div>
            <label className={formLabelClass}>Title</label>
            <input type="text" value={editablePageData.faq.title} onChange={e => handlePageDataChange('faq', 'title', e.target.value)} className={formInputClass} />
        </div>
        {editablePageData.faq.items.map((item, index) => (
            <div key={index} className="p-4 border border-[var(--border)] rounded-md space-y-2 bg-[var(--subtle-bg)]">
                <label className={formLabelClass}>FAQ Item #{index + 1}</label>
                <input type="text" placeholder="Question" value={item.question} onChange={e => handlePageDataChange('faq', 'items', e.target.value, index, 'question')} className={formInputClass} />
                <textarea placeholder="Answer" value={item.answer} onChange={e => handlePageDataChange('faq', 'items', e.target.value, index, 'answer')} className={formTextareaClass} />
            </div>
        ))}

        {/* CTA Section */}
        <h3 className={sectionHeaderClass}>Call to Action Section</h3>
        <div>
            <label className={formLabelClass}>Title</label>
            <input type="text" value={editablePageData.cta.title} onChange={e => handlePageDataChange('cta', 'title', e.target.value)} className={formInputClass} />
        </div>
        <div>
            <label className={formLabelClass}>Subtitle</label>
            <ReactQuill theme="snow" value={editablePageData.cta.subtitle} onChange={value => handlePageDataChange('cta', 'subtitle', value)} />
        </div>
        <div>
            <label className={formLabelClass}>Button Text</label>
            <input type="text" value={editablePageData.cta.buttonText} onChange={e => handlePageDataChange('cta', 'buttonText', e.target.value)} className={formInputClass} />
        </div>
    </div>
  );

  const renderProductsView = () => (
     <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] mb-8">
            <h3 className="text-xl font-semibold mb-4">{isEditingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className={formLabelClass}>Product Name</label>
                <input type="text" value={currentProduct.name || ''} onChange={e => handleProductChange('name', e.target.value)} className={formInputClass} required />
              </div>
              <div>
                <label className={formLabelClass}>Image URL</label>
                <input type="text" value={currentProduct.imageUrl || ''} onChange={e => handleProductChange('imageUrl', e.target.value)} className={formInputClass} required />
              </div>
              <div>
                <label className={formLabelClass}>Description</label>
                <ReactQuill 
                  theme="snow" 
                  value={currentProduct.description || ''} 
                  onChange={value => handleProductChange('description', value)}
                  modules={editorModules}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">{isEditingProduct ? 'Update' : 'Add'} Product</button>
                {isEditingProduct && <button type="button" onClick={resetCurrentProduct} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Cancel Edit</button>}
              </div>
            </form>
        </div>

        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Existing Products</h3>
            <ul className="space-y-2">
                {editableProducts.map(p => (
                    <li key={p.id} className="flex justify-between items-center p-3 bg-[var(--subtle-bg)] rounded-md flex-wrap gap-2">
                        <span className="font-medium">{p.name}</span>
                        <div className="space-x-4">
                            <button onClick={() => handleEditProduct(p)} className="text-blue-500 hover:underline">Edit</button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );

  const renderPagesView = () => (
     <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Pages</h2>
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] mb-8">
            <h3 className="text-xl font-semibold mb-4">{isEditingPage ? 'Edit Page' : 'Add New Page'}</h3>
            <form onSubmit={handlePageSubmit} className="space-y-4">
              <div>
                <label className={formLabelClass}>Page Title</label>
                <input type="text" value={currentPage.title || ''} onChange={e => handlePageTitleChange(e.target.value)} className={formInputClass} required />
              </div>
              <div>
                <label className={formLabelClass}>Page Slug (URL)</label>
                <div className="flex items-center">
                    <span className="p-2 bg-gray-200 text-gray-600 border border-r-0 border-[var(--border)] rounded-l-md">/pages/</span>
                    <input type="text" value={currentPage.slug || ''} onChange={e => handlePageSlugChange(e.target.value)} className={`${formInputClass} rounded-l-none`} required />
                </div>
              </div>
              <div>
                <label className={formLabelClass}>Content</label>
                <ReactQuill 
                  theme="snow" 
                  value={currentPage.content || ''} 
                  onChange={handlePageContentChange}
                  modules={editorModules}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">{isEditingPage ? 'Update' : 'Add'} Page</button>
                {isEditingPage && <button type="button" onClick={resetCurrentPage} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Cancel Edit</button>}
              </div>
            </form>
        </div>

        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Existing Pages</h3>
            <ul className="space-y-2">
                {editablePages.map(p => (
                    <li key={p.id} className="flex justify-between items-center p-3 bg-[var(--subtle-bg)] rounded-md flex-wrap gap-2">
                        <div>
                            <span className="font-medium">{p.title}</span>
                            <span className="text-sm text-[var(--subtext)] ml-2">/pages/{p.slug}</span>
                        </div>
                        <div className="space-x-4">
                            <button onClick={() => handleEditPage(p)} className="text-blue-500 hover:underline">Edit</button>
                            <button onClick={() => handleDeletePage(p.id)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );

  const renderView = () => {
      switch(view) {
          case 'homepage': return renderHomepageView();
          case 'products': return renderProductsView();
          case 'pages': return renderPagesView();
          default: return null;
      }
  }

  const NavButton: React.FC<{ targetView: AdminView; children: React.ReactNode }> = ({ targetView, children }) => (
    <button onClick={() => setView(targetView)} className={`w-full text-left p-3 rounded-md transition-colors ${view === targetView ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--subtle-bg)]'}`}>
        {children}
    </button>
  );

  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="sticky top-16 z-40 bg-[var(--bg)]/80 backdrop-blur-sm py-4 mb-8 border-b border-[var(--border)]">
            <div className="flex justify-between items-center flex-wrap gap-2">
                 <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
                 <div className="flex gap-2">
                     <button onClick={handlePreview} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Preview Site</button>
                     <button onClick={handleSaveChanges} className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors">Save All Changes</button>
                 </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-1/4 lg:w-1/5">
                <nav className="space-y-2">
                    <NavButton targetView="homepage">Homepage Content</NavButton>
                    <NavButton targetView="products">Products</NavButton>
                    <NavButton targetView="pages">Pages</NavButton>
                </nav>
            </aside>
            <main className="flex-1 bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
                {renderView()}
            </main>
        </div>
    </div>
  );
};

export default AdminPage;
