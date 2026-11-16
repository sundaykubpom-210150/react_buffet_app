import React, { useState } from 'react';

export default function App() {
  const [adultCount, setAdultCount] = useState('');
  const [childCount, setChildCount] = useState('');
  const [drinkType, setDrinkType] = useState('refill');
  const [waterBottle, setWaterBottle] = useState('');
  const [sodaBottle, setSodaBottle] = useState('');
  const [discount, setDiscount] = useState('0');
  
  const [totalPrice, setTotalPrice] = useState(null);
  const [resultDetails, setResultDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    const adults = adultCount === '' ? 0 : Number(adultCount);
    const children = childCount === '' ? 0 : Number(childCount);

    if (!Number.isInteger(adults) || adults < 0 || !Number.isInteger(children) || children < 0) {
      setErrorMessage('กรุณากรอกจำนวนผู้ใหญ่และเด็กให้ถูกต้อง (ตั้งแต่ 0 ขึ้นไป)');
      setTotalPrice(null);
      setResultDetails(null);
      return;
    }

    if (adults + children === 0) {
      setErrorMessage('โปรดกรุณาเลือกจำนวนคนด้วย');
      setTotalPrice(null);
      setResultDetails(null);
      return;
    }

    setErrorMessage('');

    const adultPrice = adults * 299;
    const childPrice = children * 89;
    const totalFood = adultPrice + childPrice;

    let totalDrink = 0;
    const totalPeople = adults + children;

    if (drinkType === 'refill') {
      totalDrink = totalPeople * 29;
    } else {
      const water = parseInt(waterBottle) || 0;
      const soda = parseInt(sodaBottle) || 0;
      totalDrink = (water * 10) + (soda * 25);
    }

    let discountPercent = parseInt(discount);
    let discountAmount = (totalFood * discountPercent) / 100;
    let finalFood = totalFood - discountAmount;

    let grandTotal = finalFood + totalDrink;
    setTotalPrice(grandTotal);
    setResultDetails({
      adults,
      children,
      adultPrice,
      childPrice,
      totalFood,
      drinkType,
      water: drinkType === 'bottle' ? parseInt(waterBottle) || 0 : 0,
      soda: drinkType === 'bottle' ? parseInt(sodaBottle) || 0 : 0,
      totalDrink,
      discountPercent,
      discountAmount,
      grandTotal,
    });
  };

  const handleReset = () => {
    setAdultCount('');
    setChildCount('');
    setDrinkType('refill');
    setWaterBottle('');
    setSodaBottle('');
    setDiscount('0');
    setTotalPrice(null);
    setResultDetails(null);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-sky-50 py-6 sm:py-10 px-3 sm:px-4 flex justify-center items-center font-sans">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-blue-100 p-5 sm:p-8">
        
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900">Buffet Calculator</h1>
          <p className="text-xs sm:text-sm text-gray-500 mb-3">คำนวณค่าอาหารบุฟเฟต์</p>

          {/* โลโก้ร้านของคุณ */}
          <div className="flex justify-center">
            <img
              src="/Unknown.png"
              alt="โลโก้ร้าน"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl shadow-sm border border-gray-100 p-1 bg-white"
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs sm:text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        {totalPrice !== null && resultDetails ? (
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-4">รายการคำนวณ</h2>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm space-y-3">
              <div className="flex justify-between gap-3">
                <span>ผู้ใหญ่ {resultDetails.adults} คน</span>
                <span>{resultDetails.adultPrice.toLocaleString('th-TH')} บาท</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>เด็ก {resultDetails.children} คน</span>
                <span>{resultDetails.childPrice.toLocaleString('th-TH')} บาท</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-blue-100 pt-3">
                <span>ค่าอาหาร</span>
                <span>{resultDetails.totalFood.toLocaleString('th-TH')} บาท</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>
                  {resultDetails.drinkType === 'refill'
                    ? `น้ำรีฟิล (${resultDetails.adults + resultDetails.children} คน)`
                    : `เครื่องดื่มขวด (น้ำเปล่า ${resultDetails.water} ขวด, น้ำอัดลม ${resultDetails.soda} ขวด)`}
                </span>
                <span>{resultDetails.totalDrink.toLocaleString('th-TH')} บาท</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>ส่วนลด {resultDetails.discountPercent}%</span>
                <span>-{resultDetails.discountAmount.toLocaleString('th-TH')} บาท</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-blue-200 pt-3 font-bold text-blue-800">
                <span>ยอดชำระทั้งหมด</span>
                <span>{resultDetails.grandTotal.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setTotalPrice(null)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium py-3 rounded-lg transition duration-200 shadow-md"
              >
                กลับไปแก้ไข
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-[#ff3b30] hover:bg-[#e03228] active:scale-[0.98] text-white font-medium py-3 rounded-lg transition duration-200 shadow-md"
              >
                เริ่มใหม่
              </button>
            </div>
          </div>
        ) : (
          <>
        {/* จำนวนผู้ใหญ่ */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            จำนวนผู้ใหญ่ (คนละ 299 บาท)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={adultCount}
            onChange={(e) => setAdultCount(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* จำนวนเด็ก */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            จำนวนเด็ก (คนละ 89 บาท)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={childCount}
            onChange={(e) => setChildCount(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ส่วนเครื่องดื่ม */}
        <div className="mb-4 border border-blue-200 rounded-xl p-3.5 sm:p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">เครื่องดื่ม</label>
          
          {/* น้ำรีฟิล */}
          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="refill"
              name="drinkType"
              checked={drinkType === 'refill'}
              onChange={() => setDrinkType('refill')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 shrink-0"
            />
            <label htmlFor="refill" className="ml-2 text-sm text-gray-700 cursor-pointer">
              น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)
            </label>
          </div>

          {/* เครื่องดื่มแบบขวด */}
          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="bottle"
              name="drinkType"
              checked={drinkType === 'bottle'}
              onChange={() => setDrinkType('bottle')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 shrink-0"
            />
            <label htmlFor="bottle" className="ml-2 text-sm text-gray-700 cursor-pointer">
              เครื่องดื่มแบบขวด
            </label>
          </div>

          {/* ช่องกรอกน้ำเปล่า/น้ำอัดลม */}
          <div className={`space-y-3 pl-5 sm:pl-6 transition-opacity ${drinkType === 'bottle' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div>
              <label className="block text-xs text-gray-600 mb-1">น้ำเปล่า (ขวดละ 10 บาท)</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={waterBottle}
                onChange={(e) => setWaterBottle(e.target.value)}
                placeholder="0"
                disabled={drinkType !== 'bottle'}
                className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">น้ำอัดลม (ขวดละ 25 บาท)</label>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                value={sodaBottle}
                onChange={(e) => setSodaBottle(e.target.value)}
                placeholder="0"
                disabled={drinkType !== 'bottle'}
                className="w-full px-3 py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* บัตรส่วนลด */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">บัตรส่วนลด</label>
          <select
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full px-3 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="0">ไม่มีส่วนลด</option>
            <option value="10">ส่วนลด 10%</option>
            <option value="15">ส่วนลด 15%</option>
            <option value="20">ส่วนลด 20%</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม</p>
        </div>

        {/* ปุ่มคำนวณและรีเซ็ต */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium py-3 rounded-lg transition duration-200 shadow-md"
          >
            คำนวณ
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-[#ff3b30] hover:bg-[#e03228] active:scale-[0.98] text-white font-medium py-3 rounded-lg transition duration-200 shadow-md"
          >
            รีเซ็ต
          </button>
        </div>

        {/* แสดงผลยอดชำระทั้งหมด */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center flex flex-wrap items-center justify-center gap-1.5">
          <span className="text-sm font-medium text-gray-700">ยอดชำระทั้งหมด:</span>
          <span className="text-xl font-bold text-blue-700">
            {totalPrice !== null ? totalPrice.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
          </span>
          <span className="text-sm font-medium text-gray-700">บาท</span>
        </div>
          </>
        )}

      </div>
    </div>
  );
}