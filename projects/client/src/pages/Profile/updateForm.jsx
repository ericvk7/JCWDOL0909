import React from "react";

function AddressForm({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  streetAddress,
  setStreetAddress,
  additionalDetails,
  setAdditionalDetails,
  postalCode,
  setPostalCode,
  selectedProvinceId,
  setSelectedProvinceId,
  selectedCityId,
  setSelectedCityId,
  provinces,
  cities,
  geolocation,
  handleProvinceChange,
  handleCityChange,
  handleSubmit,
}) {
  return (
    <div className="flex flex-col items-center my-24">
      <div className="border border-gray-300 rounded-md p-8 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="name"
              maxLength="30"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="w-1/2 ml-2">
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="user-address-phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 w-full max-w-md">
          <select
            id="province"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedProvinceId}
            onChange={handleProvinceChange}
          >
            <option value="">{selectedProvinceId}</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full max-w-md">
          <select
            id="city"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedCityId}
            onChange={handleCityChange}
          >
            <option value="">{selectedCityId}</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        {JSON.stringify(geolocation) && (
          <div>
            <p>Latitude: {geolocation?.latitude || ""}</p>
            <p>Longitude: {geolocation?.longitude || ""}</p>
          </div>
        )}
        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Postal Code"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="postal-code"
            maxLength="10"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <textarea
            rows="2"
            placeholder="Street Name, Building, House Number"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="user-street-address"
            maxLength="160"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <textarea
            rows="2"
            placeholder="Additional Details (Optional)"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="user-address-additional-details"
            maxLength="160"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

export default AddressForm;
