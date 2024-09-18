import { useState } from "react"
import StrelkaBottom from '../../../../assets/iconCustomElement/StrelkaBottom.svg'
import CheckTrue from '../../../../assets/iconCustomElement/CheckTrue.svg'

export default function CustomSelect({ title, value }) {
    const [selectState, setSelectState] = useState(false)
    const [vlaueSelect, setValueSelect] = useState({
        value: value[0]?.value == 'all' && value[0]?.value || '',
        label: value[0]?.value == 'all' && value[0]?.label || ''
    })
    return (
        <div className="custom-select">
            <button onClick={() => setSelectState(!selectState)} className="flex items-center gap-[7px]">
                {vlaueSelect.value ? vlaueSelect.label : title} <img src={StrelkaBottom} alt="StrelkaBottom" />
            </button>
            {selectState &&
                <ul className="customUl p-[20px] bg-white text-black w-[250px] flex flex-col gap-[15px]">
                    {value && value?.map((el) => (
                        <li onClick={() => {
                            setValueSelect(el)
                            setSelectState(false)
                        }} className="cursor-pointer flex gap-[10px] items-center" key={el.value}>
                            <div className="check-box-custom">
                                {vlaueSelect.value == el.value ? <img src={CheckTrue} alt="CheckTrue" /> : ''}
                            </div>
                            {el.label}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
