import React, { useContext, useEffect, useState } from "react";
import { AdsConsentStatus } from "react-native-google-mobile-ads";

interface ConsentContextProps {
  adsConsentStatus: AdsConsentStatus | null;
}

interface ConsentProviderProps {
  children: JSX.Element | JSX.Element[];
  adsConsentStatusInfo: AdsConsentStatus | null;
}

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

  useEffect(() => {
    setAdsConsentStatus(adsConsentStatusInfo);
  }, [adsConsentStatusInfo]);

  const values = {
    adsConsentStatus,
    setAdsConsentStatus,
  };

  return (
    <ConsentContext.Provider value={values}>{children}</ConsentContext.Provider>
  );
}
