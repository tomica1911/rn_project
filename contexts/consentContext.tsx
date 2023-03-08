import React, { useContext, useState } from "react";
import { AdsConsentStatus } from "react-native-google-mobile-ads";

interface ConsentContextProps {
  adsConsentStatus: AdsConsentStatus | null;
}

interface ConsentProviderProps {
  children: JSX.Element | JSX.Element[];
  adsConsentStatusInfo: AdsConsentStatus | null;
}

// ToDo: setup enviroment variables for this to work with production
const ConsentContext = React.createContext<ConsentContextProps>({
  adsConsentStatus: null,
});

export function useConsentInfo() {
  return useContext(ConsentContext);
}

export function ConsentProvider({
  children,
  adsConsentStatusInfo,
}: ConsentProviderProps) {
  const [adsConsentStatus, setAdsConsentStatus] =
    useState<AdsConsentStatus | null>(adsConsentStatusInfo);

  const values = {
    adsConsentStatus,
    setAdsConsentStatus,
  };

  return (
    <ConsentContext.Provider value={values}>{children}</ConsentContext.Provider>
  );
}
