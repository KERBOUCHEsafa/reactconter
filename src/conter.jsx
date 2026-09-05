import { useState } from 'react';

function Compteur() {
  const [valeur, setValeur] = useState(0);

  // "valeur" = la donnée actuelle (commence à 0)
  // "setValeur" = la fonction qui sert à la CHANGER

  return (
    <div>
      <p>Valeur : {valeur}</p>

      <button onClick={() => setValeur(valeur + 1)}>
        +1
      </button>
    </div>
  );
}