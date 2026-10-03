import { produits } from './produits-data.js';
import './admin-page.css';

const formatPrice = (price) => `${price.toLocaleString('fr-FR')} DZD`;

function AdminPage() {
  const totalStock = produits.reduce((sum, product) => sum + product.stock, 0);
  const lowStockCount = produits.filter((product) => product.stock < 10).length;

  return (
    <section className='admin-page'>
      <div className='admin-header'>
        <div>
          <p className='admin-eyebrow'>Espace administration</p>
          <h1>Tableau de bord</h1>
          <p className='admin-intro'>Suivez rapidement l&apos;activité de votre boutique.</p>
        </div>
        <span className='admin-status'>Boutique en ligne</span>
      </div>

      <div className='admin-stats' aria-label='Résumé de la boutique'>
        <article className='admin-stat'>
          <span className='admin-stat-label'>Produits actifs</span>
          <strong>{produits.length}</strong>
          <span className='admin-stat-note'>Références au catalogue</span>
        </article>
        <article className='admin-stat'>
          <span className='admin-stat-label'>Stock disponible</span>
          <strong>{totalStock}</strong>
          <span className='admin-stat-note'>Articles en inventaire</span>
        </article>
        <article className='admin-stat'>
          <span className='admin-stat-label'>Stock à surveiller</span>
          <strong>{lowStockCount}</strong>
          <span className='admin-stat-note'>Références sous 10 unités</span>
        </article>
      </div>

      <div className='admin-section-heading'>
        <div>
          <p className='admin-eyebrow'>Inventaire</p>
          <h2>Produits du catalogue</h2>
        </div>
        <span className='admin-count'>{produits.length} produits</span>
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
            {produits.map((product) => {
              const isLowStock = product.stock < 10;

              return (
                <tr key={product.id}>
                  <td>
                    <div className='admin-product'>
                      <img src={product.image} alt='' />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.stock} unités</td>
                  <td>{product.rating} / 5</td>
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
    </section>
  );
}

export default AdminPage;
