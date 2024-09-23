import { useModalReset } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';
import CustomSelect from "../page/pageElements/CustomSelect";
const arrSort = [
    { label: 'Сортировать по', value: 'all' },
    { label: 'По убыванию цены', value: '1' },
    { label: 'По возрастанию цены', value: '2' }
];



export default function ModalReset() {
    const { setModalStateReset } = useModalReset()
    return (
        <div className="boxModalBasket" style={{ justifyContent: 'center', paddingTop: '214px', }}>
            <div className="componentModalReset">
                <div className="componentModalHeaderReset">
                    <div></div>
                    <button onClick={() => setModalStateReset(false)}><img src={CloasModal} alt="CloasModal" /></button>
                </div>
                <div className="ResetBox">
                    <CustomSelect phone={true} value={arrSort} />
                </div>
            </div>
        </div>
    )
}
