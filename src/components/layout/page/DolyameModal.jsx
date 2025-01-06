import { useEffect } from "react";

function DolyameModal({ product }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://secure.dolyame.ru/sdk/v1/dolyame.js";
    script.async = true;

    // Скрипт успешно загружен
    script.onload = () => {
      console.log("Dolyame SDK загружен!");
      if (window.Dolyame && typeof window.Dolyame.init === "function") {
        try {
          window.Dolyame.init({
            productId: product.id,
            price: product.price,
            name: product.shortDescription || "Без названия",
            currency: "RUB",
          });
          console.log("Dolyame успешно инициализирован.");
        } catch (error) {
          console.error("Ошибка при инициализации Dolyame:", error);
        }
      } else {
        console.error("Dolyame SDK недоступен!");
      }
    };

    // Ошибка при загрузке скрипта
    script.onerror = () => {
      console.error("Не удалось загрузить Dolyame SDK!");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [product]);

  const openDolyameModal = () => {
    if (window.Dolyame && typeof window.Dolyame.openModal === "function") {
      window.Dolyame.openModal();
    } else {
      alert("Dolyame временно недоступен. Попробуйте позже.");
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
