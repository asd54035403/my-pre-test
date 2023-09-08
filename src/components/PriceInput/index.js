import React, { useState } from "react";
import './index.css';

const PriceInput = ({ onChange }) => {
    const [inputValue, setInputValue] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    const handleInput = (e) => {
        const newValue = e.target.value;
        if (newValue !== null || newValue !== "") {
            setInputValue(addComma(newValue));
            setIsEmpty(false);
            // 調用 onChange 屬性，將新的價格值傳遞給父組件
            onChange(addComma(newValue));
        } else {
            setIsEmpty(true);
        }
    }
    const handleBlur = () => {
        if (inputValue === "") {
            setIsEmpty(true);
        }
    }
    const addComma = (numberStr)=> {
        const numberWithoutCommas = numberStr.replace(/,/g, '');
        // 拆分整數部分和小數部分
        const parts = numberWithoutCommas.split('.');
        // 使用正規表達式在整數部分插入千分位逗號
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // 重新組合整數和小數部分
        const formattedNumber = parts.join('.');
        return formattedNumber;
    }
    return (
        <div className="priceInput">
            <label htmlFor="controlInput" className="form-label priceInputLabel">入住費用(每人每晚)</label>
            <div className="input-group">
                <span className="input-group-text" id="basic-addon1">TWD</span>
                <input
                    id="controlInput"
                    type="text"
                    className="form-control"
                    value={inputValue}
                    onChange={(e) => handleInput(e)}
                    onBlur={() => handleBlur()}
                    placeholder="請輸入費用"
                    aria-label="priceInput"
                    aria-describedby="basic-addon1"
                    required
                    style={isEmpty?{border:'1px solid red'}:null}
                />
            </div>
            {isEmpty ? ((<div className="alert alert-danger inputAlert" role="alert">
                不可以為空白
            </div>)) : <div className="alert  alertNull" role="alert"></div>}
            <div className="hint">
                輸入0表示免費
            </div>
        </div>
    );
}

export default PriceInput;
