import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProvinces, fetchCities, fetchGeolocation } from "./fetchLocation";
import AddressForm from "./updateForm";

function UpdateAddress({ editAddressData }) {
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [geolocation, setGeolocation] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const addressResponse = await Axios.get(
          `http://localhost:8000/address/fetchAddressById?idAddress=${id}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const address = addressResponse.data;
        setAddress(address[0]);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };

    fetchAddressData();
  }, [id]);

  useEffect(() => {
    if (editAddressData) {
      const {
        name,
        phoneNumber,
        address,
        additionalDetails,
        postalCode,
        selectedProvinceId,
        selectedCityId,
      } = editAddressData;

      setFullName(name);
      setPhoneNumber(phoneNumber);
      setStreetAddress(address);
      setAdditionalDetails(additionalDetails);
      setPostalCode(postalCode);
      setSelectedProvinceId(selectedProvinceId);
      setSelectedCityId(selectedCityId);
    }
  }, [editAddressData]);

  const handleEditAddress = async () => {
    const selectedProvince = provinces.find(
      (province) => province.province_id === selectedProvinceId
    );
    const selectedCity = cities.find((city) => city.city_id === selectedCityId);

    const data = {
      name: fullName || (address && address.name) || "",
      phoneNumber: phoneNumber || (address && address.phone_number) || "",
      address: streetAddress || (address && address.address) || "",
      additionalDetails:
        additionalDetails || (address && address.additional_details) || "",
      postalCode: postalCode || (address && address.postal_code) || "",
      longitude: geolocation?.longitude || (address && address.longitude) || "",
      latitude: geolocation?.latitude || (address && address.latitude) || "",
      province:
        selectedProvince && selectedProvince.province
          ? selectedProvince.province
          : address.province,
      city:
        selectedCity && selectedCity.city_name
          ? selectedCity.city_name
          : address.city,
    };

    if (geolocation) {
      data.longitude = geolocation?.longitude;
      data.latitude = geolocation?.latitude;
    }

    try {
      const response = await Axios.patch(
        `http://localhost:8000/address/editAddress?id_address=${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (!response.data.success) {
        Swal.fire(response.data.message);
        navigate("/user/profile");
      } else {
        Swal.fire("success", response.data.message, "success");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provincesData = await fetchProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvinceId(provinceId);
    try {
      const citiesData = await fetchCities(provinceId);
      setCities(citiesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCityId(cityId);
    const selectedCity = cities.find((city) => city.city_id === cityId);
    if (selectedCity) {
      const { province, city_name } = selectedCity;
      try {
        const geolocationData = await fetchGeolocation(province, city_name);
        setGeolocation(geolocationData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditAddress();
  };

  return (
    <AddressForm
      fullName={fullName || (address && address.name) || ""}
      setFullName={setFullName}
      phoneNumber={phoneNumber || (address && address.phone_number) || ""}
      setPhoneNumber={setPhoneNumber}
      streetAddress={streetAddress || (address && address.address) || ""}
      setStreetAddress={setStreetAddress}
      additionalDetails={
        additionalDetails || (address && address.additional_details) || ""
      }
      setAdditionalDetails={setAdditionalDetails}
      postalCode={postalCode || (address && address.postal_code) || ""}
      setPostalCode={setPostalCode}
      selectedProvinceId={
        selectedProvinceId || (address && address.province) || ""
      }
      setSelectedProvinceId={setSelectedProvinceId}
      selectedCityId={selectedCityId || (address && address.city) || ""}
      setSelectedCityId={setSelectedCityId}
      provinces={provinces}
      cities={cities}
      geolocation={geolocation}
      handleProvinceChange={handleProvinceChange}
      handleCityChange={handleCityChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default UpdateAddress;
