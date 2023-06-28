import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressForm() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: "e4cec3d07804ee5fb5e9be38ae552a69", // Ganti dengan API key Anda
          },
        }
      );

      const provinces = response.data.rajaongkir.results;
      setProvinces(provinces);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fungsi untuk mengambil data kota berdasarkan provinsi dari API RajaOngkir
  const fetchCities = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=${provinceId}`,
        {
          headers: {
            key: "e4cec3d07804ee5fb5e9be38ae552a69", // Ganti dengan API key Anda
          },
        }
      );

      const cities = response.data.rajaongkir.results;
      setCities(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Fungsi untuk mengambil data kecamatan berdasarkan kota dari API RajaOngkir
  const fetchDistricts = async (cityId) => {
    try {
      const response = await axios.get(
        `https://api.rajaongkir.com/starter/subdistrict?city=${cityId}`,
        {
          headers: {
            key: "e4cec3d07804ee5fb5e9be38ae552a69", // Ganti dengan API key Anda
          },
        }
      );

      const districts = response.data.rajaongkir.results;
      setDistricts(districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    fetchCities(selectedProvinceId);
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    fetchDistricts(selectedCityId);
  };

  return (
    <div className="flex flex-col items-center my-24">
      <div className="border border-gray-300 rounded-md p-8 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <input
              id="full-name"
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="name"
              maxLength="30"
            />
          </div>
          <div className="w-1/2 ml-2">
            <input
              id="phone-number"
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 p-2 rounded-md w-full"
              autoComplete="user-address-phone"
            />
          </div>
        </div>
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="province" className="text-lg font-bold mb-2">
            Provinsi
          </label>
          <select
            id="province"
            className="border border-gray-300 p-2 rounded-md w-full"
            onChange={handleProvinceChange}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((province) => (
              <option key={province.province_id} value={province.province_id}>
                {province.province}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="city" className="text-lg font-bold mb-2">
            Kota
          </label>
          <select
            id="city"
            className="border border-gray-300 p-2 rounded-md w-full"
            onChange={handleCityChange}
          >
            <option value="">Pilih Kota</option>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="district" className="text-lg font-bold mb-2">
            Kecamatan
          </label>
          <select
            id="district"
            className="border border-gray-300 p-2 rounded-md w-full"
          >
            <option value="">Pilih Kecamatan</option>
            {districts.map((district) => (
              <option
                key={district.subdistrict_id}
                value={district.subdistrict_id}
              >
                {district.subdistrict_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full">
          <textarea
            id="street-address"
            rows="2"
            placeholder="Street Name, Building, House Number"
            className="border border-gray-300 p-2 rounded-md w-full"
            autoComplete="user-street-address"
            maxLength="160"
          />
        </div>
        <div className="mb-4 w-full">
          <input
            id="additional-details"
            type="text"
            placeholder="Other Details (e.g., Block/Unit No., Landmark)"
            className="border border-gray-300 p-2 rounded-md w-full"
            maxLength="20"
          />
        </div>

        <div className="mb-4 w-full">
          <input type="checkbox" id="private-address" className="mr-2" />
          <label htmlFor="private-address">Set as main address</label>
        </div>
        <div className="flex justify-end w-full">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-sm mr-2 transition duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-900">
            Cancel
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-sm transition duration-300 ease-in-out hover:bg-yellow-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
