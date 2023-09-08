import React, { useState,useEffect } from "react";
import './index.css'

import PriceInput from '../../components/PriceInput'
import AgeGroupSelect from '../../components/AgeGroupSelect'

const AgeGroupPriceList = ({ onChange }) => {
    const [priceSets, setPriceSets] = useState([{ id: 1 }]);
    const [nextId, setNextId] = useState(2);
    const [priceData, setPriceData] = useState([]); // 新增價格設定數據狀態
    const [isOverlap, setIsOverlap] = useState(false);//年齡區間是否重疊

    useEffect(()=>{
        onChange(priceData.map((data) => ({
            ageGroup: data.ageGroup,
            price: data.price
        })))
        setIsOverlap(checkOverlap(priceData.map((data) => data.ageGroup)))
    },[priceData])

    const addPriceSet = () => {
        setPriceSets([...priceSets, { id: nextId }]);
        setNextId(nextId + 1);
    }

    const removePriceSet = (id) => {
        const updatedPriceSets = priceSets.filter((priceSet) => priceSet.id !== id);
        setPriceSets(updatedPriceSets);
        // 當價格設定被刪除時，更新價格設定數據狀態
        const updatedPriceData = priceData.filter((data) => data.id !== id);
        setPriceData(updatedPriceData);
    }

    const handlePriceChange = (id, newPrice) => {
        // 首先檢查 priceData 是否包含特定 ID 的資料
        const isIdExists = priceData.some((data) => data.id === id);
        let updatedPriceData = [];
        if (isIdExists) {
            // 如果存在，則更新對應 ID 的價格
            updatedPriceData = priceData.map((data) => {
                if (data.id === id) {
                    return { ...data, price: newPrice };
                }
                return data;
            });
        } else {
            // 如果不存在，則新增一筆資料
            updatedPriceData = [...priceData, { id, price: newPrice, ageGroup: [0, 0] }];
        }
        setPriceData(updatedPriceData);
    }
    
    const handleAgeGroupChange = (id, newAgeGroup) => {
        // 首先檢查 priceData 是否包含特定 ID 的資料
        const isIdExists = priceData.some((data) => data.id === id);
        let updatedPriceData = [];
        if (isIdExists) {
            // 如果存在，則更新對應 ID 的價格
            updatedPriceData = priceData.map((data) => {
                if (data.id === id) {
                    return { ...data, ageGroup: newAgeGroup  };
                }
                return data;
            });
        } else {
            // 如果不存在，則新增一筆資料
            updatedPriceData = [...priceData, { id, price: 0, ageGroup: newAgeGroup  }];
        }
        setPriceData(updatedPriceData);
    }

    return (
        <div className="AgeGroupPriceList">
            <div className="container">
                {priceSets.map((priceSet) => (
                    <div className="priceSet" key={priceSet.id}>
                        <div className="priceSetHeader">
                            <span>價格設定 - {priceSet.id}</span>
                            <button
                                type="button"
                                className="btn removeBtn"
                                onClick={() => removePriceSet(priceSet.id)}
                            >
                                X 移除
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <AgeGroupSelect
                                    onChange={(newAgeGroup) => handleAgeGroupChange(priceSet.id, newAgeGroup)}
                                    isOverlap={isOverlap}
                                ></AgeGroupSelect>
                            </div>
                            <div className="col-6">
                                <PriceInput
                                    onChange={(newPrice) => handlePriceChange(priceSet.id, newPrice)}
                                ></PriceInput>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn addBtn" onClick={addPriceSet}>
                <span className="plus">+</span> 新增價格設定
            </button>
        </div>
    );
}

export default AgeGroupPriceList


function checkOverlap(intervals) {
    // 建立一個 21 長度的陣列，初始化為 0
    const range = Array.from({ length: 21 }, () => 0);
    const overlapInput = Array.from({ length: 21 }, () => 0);
    // 將傳入的區間設為 1，表示這些區間有數字存在
    for (const interval of intervals) {
      for (let i = interval[0]; i <= interval[1]; i++) {
            range[i] = 1
            overlapInput[i] += 1;
        }
    }
    //尋找重疊的區間
    const overlap = [];
    let start = -1;
    for (let i = 0; i < overlapInput.length; i++) {
        if (overlapInput[i] > 1) {
            if (start === -1) {
            start = i;
            }
        } else {
            if (start !== -1) {
            overlap.push([start, i - 1]);
            start = -1;
            }
        }
    }
    // 檢查最後一個範圍是否仍然在進行中
    if (start !== -1) {
        overlap.push([start, overlapInput.length - 1]);
    }
    if(overlap.length > 0){
        return true;
    }else{
        return false;
    }
}
