import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./styles.css";

export const YandexDeliveryMap = ({ city, onAddressChange }) => {
    const iframeRef = useRef(null);

    const handleAddressChange = useCallback(
        (address) => onAddressChange(address),
        [onAddressChange]
    );

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const parentWidth = document.documentElement.clientWidth;
        const parentHeight = document.documentElement.clientHeight;

        iframeDocument.open();
        iframeDocument.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=${parentWidth}, height=${parentHeight}, initial-scale=1.0">
          <script src="https://ndd-widget.landpro.site/widget.js"></script>
          <style>
          .widget__header {
          display: none;
          }
</style>
        </head>
        <body>
          <div id="delivery-widget"></div>
          <script>
            function startWidget() {
              window.YaDelivery.createWidget({
                containerId: 'delivery-widget',
                params: {
                  city: '${city}',
                  size: {
                    height: '450px',
                    width: '100%',
                  },
                  delivery_price: "",
                  delivery_term: "",
                  show_select_button: true,
                  filter: {
                    type: ["pickup_point", "terminal"],
                    is_yandex_branded: false,
                    payment_methods: ["already_paid"],
                    payment_methods_filter: "or",
                  },
                },
              });
            }

            window.YaDelivery
              ? startWidget()
              : document.addEventListener('YaNddWidgetLoad', startWidget);

            document.addEventListener('YaNddWidgetPointSelected', function (data) {
              const address = data.detail.id;
              window.parent.postMessage({ type: 'addressChange', address }, '*');
            });
          </script>
        </body>
      </html>
    `);
        iframeDocument.close();
    }, []);

    useEffect(() => {
        // Обработка сообщения из iFrame
        const handleMessage = (event) => {
            if (event.data && event.data.type === "addressChange") {
                handleAddressChange(event.data.address);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => window.removeEventListener("message", handleMessage);
    }, [handleAddressChange]);

    return (
        <iframe
            ref={iframeRef}
            style={{ border: 0, width: "100%", height: "450px" }}
            title="Yandex Delivery Widget"
        ></iframe>
    );
};

YandexDeliveryMap.propTypes = {
    city: PropTypes.string.isRequired,
    onAddressChange: PropTypes.func.isRequired,
};
