import { useEffect } from "react";

function DolyameIntegration() {
  useEffect(() => {
    // Подключение внешнего скрипта
    const script = document.createElement("script");
    script.src = "https://secure.dolyame.ru/sdk/v1/dolyame.js";
    script.async = true;
    document.body.appendChild(script);

    // Удаление скрипта при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Этот компонент рендерится как пустой
}

export default DolyameIntegration;
