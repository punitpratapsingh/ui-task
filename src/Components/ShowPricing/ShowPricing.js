import React, { useState, useEffect } from 'react';

import styles from "./ShowPricing.module.css";

const ShowPricing = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch("http://localhost:3004/prices");
            const prices = await response.json();
            setPrices(prices);
        }
        fetchPrices();
    }, [prices]);

    return (
        <div className={styles.showPricingContainer}>
            <h1>Pricing</h1>
            <div className={styles.priceTable}>
                <div className={styles.row}>
                    <p className={styles.quantity}>Default Price</p>
                    <p className={styles.price}>$0.85</p>
                </div>
                {prices.map(pricing => {
                    return (
                        <div className={styles.row}>
                            <p className={styles.quantity}>>={pricing.quantity}</p>
                            <p className={styles.price}>${pricing.price}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShowPricing;
