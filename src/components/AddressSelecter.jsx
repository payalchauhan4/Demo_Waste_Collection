import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionList from "./CollectionList";
import Footer from "./Footer";
import urls from "../urls";

const AddressSelector = () => {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedUPRN, setSelectedUPRN] = useState("");
  const [collection, setCollection] = useState("");

  // Get List of address from postcode
  const fetchAddresses = () => {
    if (!postcode.trim()) {
      setError("Please enter a valid postcode.");
      return;
    }
    setError("");

    const data = new URLSearchParams();
    data.append("P_GUID", "FF93E12280E5471FE053A000A8C08BEB");
    data.append("P_POSTCODE", postcode);

    axios
      .post(urls.addressApi, data)
      .then((response) => {
        setAddresses(response.data.ADDRESS);
      })
      .catch((error) => {
        setError("Error fetching addresses. Please try Correct Postcode.");
      });
  };

  //fetch collection from Uprn and display collection
  const fetchDataForAddress = () => {
    const data = new URLSearchParams();
    data.append("P_GUID", "FF93E12280E5471FE053A000A8C08BEB");
    data.append("P_UPRN", selectedUPRN);
    data.append("P_CLIENT_ID", "130");
    data.append("P_COUNCIL_ID", "260");

    axios
      .post(urls.collectionDayApi, data)
      .then((response) => {
        setCollection(response.data.collectionDay);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // set selected address & uprn
  const handleAddressSelect = (event) => {
    const selectedAddressString = event.target.value;
    setSelectedAddress(selectedAddressString);

    const selectedAddressData = JSON.parse(selectedAddressString);

    if (selectedAddressData) {
      setSelectedUPRN(selectedAddressData.UPRN);
    }
  };

  //remove address
  const clearAddress = () => {
    setSelectedAddress("");
    setSelectedUPRN("");
    setCollection("");
  };

  // Based on UPRN fetch data
  useEffect(() => {
    if (selectedUPRN) {
      fetchDataForAddress();
    }
  }, [selectedUPRN]);

  return (
    <>
      <div className="container">
        <div className="left">
          <h1>Find Out Your Waste Collection Day</h1>
          <p>Check when your waste will be collected</p>
          <div className="detail">
            <div>
              <h2>Enter a Postcode</h2>
              <p>For Example SW1A 2AA</p>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter postcode"
              />
              <button onClick={fetchAddresses}>Search</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div>
              <h2>Select an Address</h2>
              <select
                value={selectedAddress}
                onChange={(e) => handleAddressSelect(e)}
              >
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                  <option key={index} value={JSON.stringify(address)}>
                    {address.FULL_ADDRESS}
                  </option>
                ))}
              </select>
              <br />
              <a href="#" onClick={clearAddress}>
                Clear Address and Start Again
              </a>
            </div>
          </div>
          <div>
            <h2>Your Next Collection</h2>
            <CollectionList collection={collection} />
          </div>
        </div>
        <div className="right">
          <hr />
          <div className="calender">
            <h2>Related Content</h2>
            <a href="#">Add to Your Calender</a>
            <br />
            <a href="#">View and Download Printable schedule</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddressSelector;
