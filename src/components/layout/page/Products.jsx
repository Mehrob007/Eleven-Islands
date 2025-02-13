import { useEffect, useState } from "react";
import Box2 from "./pageElements/Box2";
import SendEmail from "./pageElements/SendEmail";
import { usePhotoStore } from "../storeState/store";
import CustomSelect from "./pageElements/CustomSelect";
import iconFilter from "../../../assets/icon/iconFilter.svg";
import { useModalFilter, useModalReset } from "../storeState/modalBasket";
import ModalFilter from "../modalNavigate/ModalFilter";
import ModalReset from "../modalNavigate/ModalReset";
import apiClient from "../../../utils/api";
import { useParams } from "react-router-dom";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
export default function Products() {
  const { id } = useParams();
  const { photos, fetchPhotos } = usePhotoStore();
  const [selectedSizes, setSelectedSizes] = useState(0);
  const { modalStateFilter, setModalStateFilter } = useModalFilter();
  const { setModalStateReset, modalStateReset } = useModalReset();
  const [openSelect, setOpenSelect] = useState(null);
  const [typeSelect, setTypeSelect] = useState([]);
  const [count, setCount] = useState(0);
  const [dataGetSearsh, setdataGetSearsh] = useState([]);
  const [dateSearch, setDateSearch] = useState({ reset: true });
  const [stemsSort, setItemsSort] = useState();
  // const sizes = [
  //   {
  //     label: "Все размеры",
  //     value: "*",
  //     // ['XS', 'S', 'M', 'L', 'XL']
  //   },
  //   { label: "XXS", value: "XXS" },
  //   { label: "XS", value: "XS" },
  //   { label: "S", value: "S" },
  //   { label: "M", value: "M" },
  //   { label: "L", value: "L" },
  //   { label: "XL", value: "XL" },
  //   { label: "XXL", value: "XXL" },
  // ];
  const [sizes, setSizes] = useState([]);

  // const handleSizeChange = (size) => {

  // };
  const [isFetching, setIsFetching] = useState(false);

  const getDataStaffs = async () => {
    const res = await fetchPhotos({
      page: count || 0,
      limit: 20,
      categoryId: dateSearch?.categoryId,
      sizeId: selectedSizes || 0,
      filter: stemsSort || 0,
    });
    if (!res) {
      setdataGetSearsh([]);
    }
  };

  const arrSort = [
    { label: "По убыванию цены", value: "2" },
    { label: "По возрастанию цены", value: "1" },
  ];

  const getTypeElement = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await apiClient.get(`/categories?page=0&limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newPhotos = response.data.data.categories;
      console.log("newPhotos", newPhotos);

      setTypeSelect([
        { label: "Все типы", value: "" },
        ...newPhotos.map((e) => ({
          label: e?.name,
          value: e?.id,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };
  const getSizeElement = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await apiClient.get(`/sizes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newPhotos = response.data.data.sizes;
      console.log("newPhotos", newPhotos);
      setSizes([
        {
          label: "Все размеры",
          value: "*",
        },
        ...newPhotos.map((e) => ({
          label: e?.name,
          value: e?.id,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    getTypeElement();
    getSizeElement();
  }, []);

  // const typeSelect = [
  //     { label: 'Все типы', value: 'all' },
  //     { label: 'Топы', value: 'tops' },
  //     { label: 'Футболки', value: 't-shirts' },
  //     { label: 'Леггинсы', value: 'leggings' },
  //     { label: 'Толстовки', value: 'hoodies' },
  //     { label: 'Спортивные брюки', value: 'sweatpants' },
  //     { label: 'Аксессуары', value: 'accessories' },
  // ];
  const widthLap = "1020px";
  const isLargeScreen = useMediaQuery(`(min-width: ${widthLap})`);
  const toggleSelect = (selectName) => {
    setOpenSelect(openSelect === selectName ? null : selectName);
  };
  useEffect(() => {
    getDataStaffs();
  }, [count, selectedSizes, dateSearch, stemsSort]);

  useEffect(() => {
    if (photos.length > 0) {
      setdataGetSearsh((prevData) => [
        ...prevData,
        ...photos
          .filter((el) => !prevData.some((prevEl) => prevEl.id === el.id))
          .map((el) => ({
            ...el,
            jobpositions: el.jobpositions
              ?.filter((prev) => prev.end_date)
              ?.sort((a, b) => {
                const dateA = parseInt(a.end_date.replace(/-/g, ""), 10);
                const dateB = parseInt(b.end_date.replace(/-/g, ""), 10);
                return dateB - dateA;
              }),
          })),
      ]);
    }
  }, [photos]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.offsetHeight - 100;
      if (scrollPosition >= threshold && !isFetching) {
        setIsFetching(true);
        setCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPhotos({
        categoryId: dateSearch?.categoryId,
        limit: 20,
        page: count,
        sizeId: selectedSizes,
      });
      setIsFetching(false);
    };

    if (isFetching) {
      fetchData();
    }
  }, [count, isFetching]);

  useEffect(() => {
    setCount(0);
    setdataGetSearsh([]);
    setDateSearch({ ...dateSearch, categoryId: id });
  }, []);

  // useEffect(() => {
  // if (selectedSizes === "*" || !selectedSizes) {
  //   setdataGetSearsh(photos);
  // } else {
  //   setdataGetSearsh((prevState) =>
  //     prevState.filter((el) =>
  //       el?.sizes?.some(
  //         (attrValue) =>
  //           // Array.isArray(selectedSizes)
  //           // ? selectedSizes.includes(attrValue.name)
  //           // : attrValue.name === selectedSizes,
  //           true,
  //       ),
  //     ),
  //   );
  // }
  // setdataGetSearsh(photos);
  // }, [selectedSizes, photos]);

  // useEffect(() => {
  //   if (dataGetSearsh && dataGetSearsh.length > 0) {
  //     const sortedData = [...dataGetSearsh];

  //     // if (stemsSort == "1") {
  //     //   sortedData.sort((a, b) => b.price - a.price);
  //     // } else if (stemsSort == "2") {
  //     //   sortedData.sort((a, b) => a.price - b.price);
  //     // }

  //     setdataGetSearsh(sortedData);
  //   }
  // }, [stemsSort]);

  // const resFilterType = typeSelect.filter((item, index, self) => index === self.findIndex(other => other.value === item.value))
  console.log("====================================");
  console.log("selectedSizes", selectedSizes);
  console.log("dateSearch", dateSearch);
  console.log("typeSelect", typeSelect);
  console.log("id", id);
  console.log("====================================");
  return (
    <>
      <div className="filterBar">
        <h2>Каталог</h2>
        <div>
          {" "}
          {isLargeScreen ? (
            typeSelect?.length > 0 && (
              <div className="filterProbucts">
                <CustomSelect
                  onClick={(id) => {
                    setCount(0);
                    setdataGetSearsh([]);
                    setDateSearch({ ...dateSearch, categoryId: id });
                  }}
                  title="Тип продукции"
                  open={openSelect === "type"}
                  toggle={() => toggleSelect("type")}
                  value={typeSelect}
                />
                {/* <CustomSelect title='Цвет' value={''} open={openSelect === "color"} toggle={() => toggleSelect("color")} /> */}
                <CustomSelect
                  onClick={(id) => {
                    setSelectedSizes(id);
                    setCount(0);
                    setdataGetSearsh([]);
                    setDateSearch({ ...dateSearch, reset: !dateSearch.reset });
                  }}
                  title="Размер"
                  value={sizes}
                  open={openSelect === "size"}
                  toggle={() => toggleSelect("size")}
                />
              </div>
            )
          ) : (
            <button
              onClick={() => setModalStateFilter(true)}
              className="btn-filter-phone"
            >
              <img src={iconFilter} alt="iconFilter" />
              Фильтр
            </button>
          )}
          {isLargeScreen ? (
            <div className="max-w-auto">
              <CustomSelect
                onClick={(id) => {
                  setCount(0);
                  setItemsSort(id);
                  setdataGetSearsh([]);
                }}
                title="Сортировать по"
                value={arrSort}
                open={openSelect === "sort"}
                toggle={() => toggleSelect("sort")}
              />
            </div>
          ) : (
            <>
              <button
                onClick={() => setModalStateReset(true)}
                className="btn-filter-phone"
              >
                Сортировать по
              </button>
              <ModalReset
                element={
                  <CustomSelect
                    onClick={(id) => {
                      setCount(0);
                      setItemsSort(id);
                      setdataGetSearsh([]);
                    }}
                    title="Сортировать по"
                    value={arrSort}
                    phone={true}
                  />
                }
                modalStateReset={modalStateReset}
              />
            </>
          )}
        </div>
      </div>
      <div className="contentProducts">
        {/* {fetching && <h2 style={{ margin: '0 auto', textAlign: 'center' }}>Loading...</h2>}  */}
        <Box2 arrDataImg={dataGetSearsh?.filter((_, i) => i < 8)} />
        <SendEmail />
        <Box2 arrDataImg={dataGetSearsh?.filter((_, i) => i > 8)} />
      </div>
      <ModalFilter
        modalStateFilter={modalStateFilter}
        setModalStateFilter={setModalStateFilter}
        componentDiv={(resetValue) => {
          return (
            <>
              <CustomSelect
                onClick={(id) => {
                  setCount(0);
                  setDateSearch({ ...dateSearch, categoryId: id });
                  setdataGetSearsh([]);
                }}
                resetValue={resetValue}
                title="Тип продукции"
                phone={true}
                value={typeSelect}
                id={id}
              />
              {/* <CustomSelect title='Цвет' value={''} open={openSelect === "color"} toggle={() => toggleSelect("color")} /> */}
              <CustomSelect
                onClick={(id) => {
                  setSelectedSizes(id);
                  setCount(0);
                  setdataGetSearsh([]);
                  setDateSearch({ ...dateSearch, reset: !dateSearch.reset });
                }}
                resetValue={resetValue}
                title="Размер"
                value={sizes}
                phone={true}
              />
            </>
          );
        }}
      />
    </>
  );
}
