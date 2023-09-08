import React, { useState } from "react";
import './index.css';

const AgeGroupSelect = ({ onChange ,isOverlap}) => {
    const [ageStart, setAgeStart] = useState(0);
    const [ageEnd, setAgeEnd] = useState(20);

    const handleInput = (e) => {
        if (e.target.id === 'ageStart') {
            setAgeStart(parseInt(e.target.value));
            // 調用 onChange 屬性，將新的年齡區間傳遞給父組件
            onChange([parseInt(e.target.value), ageEnd]);
        } else if (e.target.id === 'ageEnd') {
            setAgeEnd(parseInt(e.target.value));
            // 調用 onChange 屬性，將新的年齡區間傳遞給父組件
            onChange([ageStart, parseInt(e.target.value)]);
        }
    }
    return (
        <div className="ageGroupSelect">
            <label htmlFor="ageSelect" className="form-label priceInputLabel">年齡</label>
            <div className="input-group ageInput" id="ageSelect">
                <select
                    className="form-select"
                    id="ageStart"
                    value={ageStart}
                    onChange={(e) => handleInput(e)}
                    style={isOverlap?{border:'1px solid red'}:null}
                >
                    {Array.from({ length: 21 }, (_, index) => {
                        const age = index;
                        const isDisabled = age > ageEnd;
                        return (
                            <option key={age} value={age} disabled={isDisabled}>
                                {index}
                            </option>
                        );
                    })}
                </select>
                <span className="input-group-text" id="basic-addon1">~</span>
                <select
                    className="form-select"
                    id="ageEnd"
                    value={ageEnd}
                    onChange={(e) => handleInput(e)}
                    style={isOverlap?{border:'1px solid red'}:null}
                >
                    {Array.from({ length: 21 }, (_, index) => {
                        const age = index;
                        const isDisabled = age < ageStart;
                        return (
                            <option key={age} value={age} disabled={isDisabled}>
                                {index}
                            </option>
                        );
                    })}
                </select>
                {isOverlap ? ((<div className="alert alert-danger inputAlert" role="alert">
                年齡區間不可重疊
            </div>)) : null}
            </div>
        </div>
    );
}

export default AgeGroupSelect;
