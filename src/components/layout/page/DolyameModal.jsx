import { useEffect } from "react";

function DolyameModal({ product }) {
  // Загружаем SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://secure.dolyame.ru/sdk/v1/dolyame.js";
    script.async = true;
    script.onload = () => {
      if (window.Dolyame) {
        window.Dolyame.init({
          productId: product.id,
          price: product.price,
          name: product.shortDescription,
          currency: "RUB",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [product]);

  // Функция для открытия модального окна
  const openDolyameModal = () => {
    if (window.Dolyame && window.Dolyame.openModal) {
      window.Dolyame.openModal(); // Вызываем метод открытия модалки
    } else {
      console.error("Dolyame не загрузился корректно!");
    }
  };

  return (
    <div>
      <h1>{product.shortDescription}</h1>
      <p>Цена: {product.price} ₽</p>
      <button onClick={openDolyameModal}>Купить в рассрочку</button>
    </div>
  );
}

export default DolyameModal;
