import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context/productcontext";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
// import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/userContext";


const root = ReactDOM.createRoot(document.getElementById("root"));

// const domain = process.env.REACT_APP_DOMAIN;
// const clientId = process.env.REACT_APP_CLIENT_ID;


root.render(
  // <Auth0Provider
  //   domain={domain}
  //   clientId={clientId}
  //   redirectUri={window.location.origin}
  // >
<UserProvider>
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
        
            <App />
          
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
    </UserProvider>    
  // </Auth0Provider>
);
















// const reportWebVitals = onPerfEntry => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     });
//   }
// };

// export default reportWebVitals;





// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
