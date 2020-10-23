import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import Locally from "./Locally"


const App = () => {
  const countryCode = window.digitalData?.websiteSettings?.defaultCulture;
  const [upc, setUpc] = useState(false);
  
  const handleSizeClick = () => {
    const sku = document.querySelector("#size-thumbnails .selected")?.getAttribute("data-sku");
    const productData = window.structuredData.find(item => item.sku === sku) || false;
    const upc = productData && parseInt(productData.gtin12);
    setUpc(upc);
  }

  useEffect(() => {
    window.addEventListener('click', handleSizeClick);

    return () => {
      window.removeEventListener("click", handleSizeClick);
    }
  });

  return upc && (
    <Locally upc={upc} countryCode={countryCode} />
  )
}

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
