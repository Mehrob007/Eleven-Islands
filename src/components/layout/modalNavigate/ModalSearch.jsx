import { useModalSeatch } from "../storeState/modalBasket";
import CloasModal from "../../../assets/icon/CloasModal.svg";
import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import apiClient from "../../../utils/api";
import { Link } from "react-router-dom";

export default function ModalBasket() {
  const { setModalStateSeatch } = useModalSeatch();
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const token = localStorage.getItem("token");

  const sendSearch = async () => {
    try {
      setLoadingSearch(true);
      const res = await apiClient.post(
        `/Product/search-products?name=${search}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDataSearch(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSearch(false);
    }
  };

  console.log("dataSearch", dataSearch);

  useEffect(() => {
    if (search.length) {
      sendSearch();
    }
  }, [search]);

  return (
    <div className="boxModalBasket">
      <div className="componentModal">
        <div className="componentModalHeaderSearch">
          <div style={{ maxWidth: "100%" }}>
            <div>Поиск</div>
            <button onClick={() => setModalStateSeatch(false)}>
              <img src={CloasModal} alt="CloasModal" />
            </button>
          </div>
        </div>
        <div className="searchBox">
          <div className="iconImgSearch">
            <LuSearch />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Найти"
          />
        </div>
        <div className="divParsingSearchData">
          {loadingSearch
            ? "Загрузка..."
            : dataSearch?.map((e, i) => <Link to={`/product/${e.id}`} onClick={() => setModalStateSeatch(false)} key={i}>
              <h1>{e.shortDescription}</h1>
            </Link>)}
        </div>
      </div>
    </div>
  );
}
