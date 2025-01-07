import PropTypes from "prop-types";
import { TextInput } from "../TextInput/index.jsx";
import "./styles.css";
import { useState } from "react";
import apiClient from "../../../../../utils/api.js";

export const AddressForm = ({ onChange }) => {
  const [query, setQuery] = useState(""); // Поле ввода
  const [suggestions, setSuggestions] = useState([]); // Подсказки

  const handleChange = (e) => onChange(e.target.name, e.target.value);

  const fetchSuggestions = async (input) => {
    if (input.length < 3) return; // Минимум 3 символа для подсказок
    try {
      const response = await apiClient.post(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        { query: input },
        {
          headers: {
            Authorization: "Token aeccc75f700bc0cd3f62392ba5a7ceebe42c7751", // Укажите ваш API-ключ
          },
        },
      );
      setSuggestions(response.data.suggestions); // Сохранение подсказок
    } catch (error) {
      console.error("Ошибка получения подсказок: ", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.value); // Установить выбранный адрес
    setSuggestions([]); // Очистить подсказки
  };

//   console.log("====================================");
//   console.log("query", query);
//   console.log("suggestions", suggestions);
//   console.log("====================================");

  return (
    <div className="address-form">
      <div style={{ position: 'relative' }}>
        <TextInput
          htmlFor="street"
          label="Улица, дом"
          name="street"
          className="input"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Начните вводить улицу и дом"
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              border: "1px solid #ccc",
              maxHeight: "200px",
              width: "100%",
              overflowY: "auto",
              position: "absolute",
              backgroundColor: "#fff",
            }}
          >
            {suggestions.map((item, index) => (
              <li
                key={index}
                style={{ padding: "5px", cursor: "pointer" }}
                onClick={() => handleSuggestionClick(item)}
              >
                {item.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="address-form__inputs">
        <div className="address-form__input">
          <TextInput
            htmlFor="apartment"
            label="Квартира или офис"
            type="text"
            name="apartment"
            onChange={handleChange}
          />
        </div>
        <div className="address-form__input">
          <TextInput
            htmlFor="floor"
            label="Этаж"
            type="text"
            name="floor"
            onChange={handleChange}
          />
        </div>
        <div className="address-form__input">
          <TextInput
            htmlFor="intercom"
            label="Домофон"
            type="text"
            name="intercom"
            onChange={handleChange}
          />
        </div>
        <div className="address-form__input">
          <TextInput
            htmlFor="entrance"
            label="Подъезд"
            type="text"
            name="entrance"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

AddressForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};
