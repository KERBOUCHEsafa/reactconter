import { useEffect, useState } from 'react';
import api from './api/axios';
import './admin-page.css';

const formatPrice = (price) => `${Number(price || 0).toLocaleString('fr-FR')} DZD`;

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Connectez-vous en tant qu’administrateur pour accéder à cette page.');
      setLoading(false);
      return;
    }

    Promise.all([
      api.get('/products'),
      api.get('/orders')
    ])
      .then(([productsResponse, ordersResponse]) => {
        setProducts(productsResponse.data || []);
        setOrders(ordersResponse.data || []);
      })
      .catch(() => {
        setError('Accès refusé. Vous devez avoir le rôle administrateur.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className='admin-page'>
        <div className='admin-header'>
          <div>
            <p className='admin-eyebrow'>Espace administration</p>
            <h1>Chargement…</h1>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='admin-page'>
        <div className='admin-header'>
          <div>
            <p className='admin-eyebrow'>Espace administration</p>
            <h1>Accès administrateur</h1>
            <p className='admin-intro'>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const totalStock = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
  const lowStockCount = products.filter((product) => Number(product.stock || 0) < 10).length;
  const monthlyRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  return (
    <section className='admin-page'>
      <div className='admin-header'>
        <div>
          <p className='admin-eyebrow'>Espace administration</p>
          <h1>Tableau de bord</h1>
          <p className='admin-intro'>Suivez rapidement l’activité de votre boutique.</p>
        </div>
        <span className='admin-status'>Boutique en ligne</span>
      </div>

      <div className='admin-stats' aria-label='Résumé de la boutique'>
        <article className='admin-stat'>
          <span className='admin-stat-label'>Produits actifs</span>
          <strong>{products.length}</strong>
          <span className='admin-stat-note'>Références au catalogue</span>
        </article>
        <article className='admin-stat'>
          <span className='admin-stat-label'>Stock disponible</span>
          <strong>{totalStock}</strong>
          <span className='admin-stat-note'>Articles en inventaire</span>
        </article>
        <article className='admin-stat'>
          <span className='admin-stat-label'>Revenu total</span>
          <strong>{formatPrice(monthlyRevenue)}</strong>
          <span className='admin-stat-note'>À partir des commandes validées</span>
        </article>
      </div>

      <div className='admin-section-heading'>
        <div>
          <p className='admin-eyebrow'>Inventaire</p>
          <h2>Produits du catalogue</h2>
        </div>
        <span className='admin-count'>{products.length} produits</span>
      </div>

      <div className='admin-table-wrapper'>
        <table className='admin-table'>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Évaluation</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isLowStock = Number(product.stock || 0) < 10;
              return (
                <tr key={product._id || product.id}>
                  <td>
                    <div className='admin-product'>
                      <img src={product.image || 'https://placehold.co/42x42/edf3f7/263746?text=IMG'} alt='' />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{Number(product.stock || 0)} unités</td>
                  <td>{Number(product.rating || 0)} / 5</td>
                  <td>
                    <span className={`admin-stock ${isLowStock ? 'admin-stock-low' : ''}`}>
                      {isLowStock ? 'Stock faible' : 'Disponible'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {orders.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <div className='admin-section-heading'>
            <div>
              <p className='admin-eyebrow'>Commandes</p>
              <h2>Dernières commandes</h2>
            </div>
            <span className='admin-count'>{orders.length} commandes</span>
          </div>

          <div className='admin-table-wrapper'>
            <table className='admin-table'>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Montant</th>
                  <th>Wilaya</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user?.nom || order.nom || 'Client'}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>{order.wilaya || '—'}</td>
                    <td>
                      <span className='admin-stock'>{order.statut || 'En attente'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminPage;
