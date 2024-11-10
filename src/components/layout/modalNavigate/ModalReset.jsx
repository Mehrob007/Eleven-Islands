import { useModalReset } from "../storeState/modalBasket"
import CloasModal from '../../../assets/icon/CloasModal.svg';

export default function ModalReset({ modalStateReset, element }) {
    const { setModalStateReset } = useModalReset()
    return (
        <div className="boxModalBasket" style={{ zIndex: modalStateReset ? '1' : -99999, opacity: modalStateReset ? 1 : 0, position: 'absolute', background: 'transparent', justifyContent: 'end', paddingTop: '125px', paddingRight   : '19px' }}>
            <div className="componentModalReset">
                <div className="componentModalHeaderReset">
                    <div></div>
                    <button onClick={() => setModalStateReset(false)}><img src={CloasModal} alt="CloasModal" /></button>
                </div>
                <div className="ResetBox">
                    {element}
                </div>
            </div>
        </div>
    )
}
