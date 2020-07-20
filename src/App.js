import React from 'react';
import styles from "./App.module.css";
import ShowPricing from './Components/ShowPricing/ShowPricing';
import PriceEdit from './Components/PriceEdit/PriceEdit';

function App() {
  return (
    <div className={styles.container}>
      <PriceEdit/>
      <ShowPricing/>
    </div>
  );
}

export default App;
