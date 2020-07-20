import React, { useState, useEffect } from "react";

import { TextField } from "@material-ui/core";
import styles from "./PriceEdit.module.css";

const PriceEdit = () => {
  const [prices, setPrices] = useState([]);
  const [input, setInput] = useState({ quantity: "", price: "" });
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await fetch("http://localhost:3004/prices");
      console.log(response);
      const priceInputs = await response.json();
      setPrices(priceInputs);
    };
    fetchPrices();
  }, [prices]);

  const priceDeleteHandler = async (id) => {
    await fetch(`http://localhost:3004/prices/${id}`, {
      method: "DELETE",
    });
    const updatedPrices = prices.filter((input) => input.id !== id);
    setPrices(updatedPrices);
  };

  const inputChangeHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const inputShowToggle = () => {
    setShowInput(!showInput);
  };

  const updatePricesHandler = async () => {
    if(input.quantity === '' || input.price === ''){
      setShowInput(!showInput);
      return;
    }
    await fetch("http://localhost:3004/prices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: +input.quantity, price: +input.price }),
    });
    setShowInput(!showInput);
    setInput({ quantity: "", price: "" });
  };

  return (
    <div className={styles.priceInputsContainer}>
      <h1>Edit Pricing</h1>
      <TextField
        id="filled-read-only-input"
        label="Default Price"
        defaultValue="0.85"
        InputProps={{
          readOnly: true,
        }}
        variant="filled"
        fullWidth
      />
      {prices.map((input) => {
        return (
          <div className={styles.inputContainer} key={input.id}>
            <TextField
              id="filled-read-only-input"
              label="Quantity >="
              value={input.quantity}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              margin="normal"
            />
            <TextField
              id="filled-read-only-input"
              label="Price"
              value={input.price}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              margin="normal"
            />
            <span
              onClick={priceDeleteHandler.bind(null, input.id)}
              className="material-icons"
              style={{
                verticalAlign: "middle",
                padding: "1rem",
                marginTop: "1rem",
                marginLeft: "1rem",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              delete
            </span>
          </div>
        );
      })}
      <div
        className={
          showInput
            ? styles.inputContainer
            : `${styles.inputContainer} ${styles.hidden}`
        }
        style={{ marginTop: "1rem" }}
      >
        <TextField
          required
          id="outlined-required"
          label="Quantity"
          name="quantity"
          defaultValue={input.quantity}
          onChange={inputChangeHandler}
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Price"
          name="price"
          defaultValue={input.price}
          onChange={inputChangeHandler}
          variant="outlined"
        />
      </div>
      <p
        style={{
          marginTop: "1rem",
          marginRight: "2rem",
          padding: ".5rem",
          textAlign: "right",
          textDecoration: "underline",
        }}
      >
        {showInput ? "Hide" : "Add New Pricing Criteria"}
        <span
          onClick={inputShowToggle}
          className="material-icons"
          style={{
            marginLeft: "1rem",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          {showInput ? "remove" : "add"}
        </span>
      </p>
      <button className={styles.updateBtn} onClick={updatePricesHandler}>
        UPDATE
      </button>
    </div>
  );
};

export default PriceEdit;
