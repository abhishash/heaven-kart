"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

type NetworkContextType = {
    isOnline: boolean;
    isSlowConnection: boolean;
    effectiveType?: string;
};

const NetworkContext = createContext<NetworkContextType>({
    isOnline: true,
    isSlowConnection: false,
});

export function NetworkProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOnline, setIsOnline] = useState(true);
    const [effectiveType, setEffectiveType] = useState<string>();
    const [isSlowConnection, setIsSlowConnection] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        setIsOnline(navigator.onLine);

        const connection =
            (navigator as any).connection ||
            (navigator as any).mozConnection ||
            (navigator as any).webkitConnection;

        const updateConnection = () => {
            if (!connection) return;

            setEffectiveType(connection.effectiveType);

            setIsSlowConnection(
                connection.effectiveType === "slow-2g" ||
                connection.effectiveType === "2g"
            );
        };

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        updateConnection();

        connection?.addEventListener?.("change", updateConnection);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);

            connection?.removeEventListener?.("change", updateConnection);
        };
    }, []);

    const value = useMemo(
        () => ({
            isOnline,
            isSlowConnection,
            effectiveType,
        }),
        [isOnline, isSlowConnection, effectiveType]
    );

    return (
        <NetworkContext.Provider value={value}>
            {children}
        </NetworkContext.Provider>
    );
}

export const useNetwork = () => useContext(NetworkContext);