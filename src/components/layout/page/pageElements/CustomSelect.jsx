import { useEffect, useState } from "react";
import StrelkaBottom from "../../../../assets/iconCustomElement/StrelkaBottom.svg";
import CheckTrue from "../../../../assets/iconCustomElement/CheckTrue.svg";

export default function CustomSelect({
  resetValue = false,
  title = "",
  value = [],
  colors = false,
  phone = false,
  open,
  toggle,
  onClick = () => {},
}) {
  const [vlaueSelect, setValueSelect] = useState(
    title === "Размер"
      ? {
          label: "Размер",
          value: "*",
          // ['XS', 'S', 'M', 'L', 'XL']
        }
      : {
          value: value?.[0]?.value || "",
          label: value?.[0]?.label || "",
        },
  );
  useEffect(() => {
    if (resetValue) {
      setValueSelect({
        value: value?.[0]?.value || "",
        label: value?.[0]?.label || "",
      });
    }
  }, [resetValue]);
  useEffect(() => {
    if (vlaueSelect) {
      if (vlaueSelect.value === "*") {
        onClick(null);
      } else {
        onClick(vlaueSelect.value);
      }
    }
  }, [vlaueSelect]);

  console.log("vlaueSelect", vlaueSelect);

  if (!phone) {
    return (
      <div className="custom-select">
        <button onClick={toggle} className="flex items-center gap-[7px]">
          {vlaueSelect.value ? vlaueSelect.label : title}{" "}
          <img src={StrelkaBottom} alt="StrelkaBottom" />
        </button>
        {open && (
          <ul
            className={`${
              title == "Сортировать по" && "right-0"
            } customUl p-[20px] bg-white text-black w-[250px] flex flex-col gap-[15px]`}
          >
            {value &&
              value?.map((el) => (
                <li
                  onClick={() => {
                    setValueSelect(el);
                    toggle();
                  }}
                  className="cursor-pointer flex gap-[10px] items-center"
                  key={el.value}
                >
                  <div className="check-box-custom">
                    {vlaueSelect.value == el.value ? (
                      <img src={CheckTrue} alt="CheckTrue" />
                    ) : (
                      ""
                    )}
                  </div>
                  {el.label}
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
  if (phone) {
    return (
      <div className="phone-select-filter">
        <h2>{title}</h2>
        <ul
          className={`${
            title == "Размер" ? "phone-size-filter-ul" : "flex-col"
          }  pt-[15px] bg-white text-black w-[250px] flex  gap-[15px]`}
        >
          {value &&
            value?.map((el) => (
              <li
                onClick={() => {
                  setValueSelect(el);
                }}
                className="cursor-pointer flex gap-[10px] items-center"
                key={el.value}
              >
                <div className="check-box-custom">
                  {vlaueSelect.value == el.value ? (
                    <img src={CheckTrue} alt="CheckTrue" />
                  ) : (
                    ""
                  )}
                </div>
                {colors
                  ? colors.map((colorItem) => (
                      <div
                        key={colorItem}
                        style={{
                          width: "15px",
                          borderRadius: "50%",
                          background: colorItem,
                        }}
                      ></div>
                    ))
                  : el.label}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
