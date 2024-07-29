"use client"

import React, { useState } from "react";
import { data } from "../app/data";


export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  const showModal = (description) => {
    setModalContent(description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  return (
    <div>
      <div className="container-items">
        {data.map((product) => (
          <div className="item" key={product.id}>
            <figure>
              <img
                src={product.urlImage}
                alt={product.title}
                onClick={() => showModal(product.description)}
              />
            </figure>
            <div className="info-product">
              <h2>{product.title}</h2>
              <p className="price">${product.price}</p>
              <button onClick={() => onAddProduct(product)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

