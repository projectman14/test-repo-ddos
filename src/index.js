import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { wallets } from '@cosmos-kit/keplr-extension';
import { ChainProvider } from '@cosmos-kit/react';
import "@interchain-ui/react/styles";
import { assets, chains } from "chain-registry";
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mantra from './chainconfig';
import {  AuxtionProvider } from './Context/Auctioncontext';
window.Buffer = window.Buffer || require("buffer").Buffer;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChainProvider
      chains={[...chains, mantra]}
      assetLists={assets}
      wallets={wallets}
    >
      <AuxtionProvider>
        <App />
      </AuxtionProvider>
    </ChainProvider>
  </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
