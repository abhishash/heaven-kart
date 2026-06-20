"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { useSaveToRecentlyViewMutation } from "@/redux/services/recentlyViewApi";
import RecentlyViewedProducts from "./RecentView/RecentViewProduct";

interface Props {
  id: number;
}

const SaveRecentlyViewProduct = ({ id }: Props) => {
  const [saveToRecentlyView] = useSaveToRecentlyViewMutation();
  const { status, data: session } = useSession();

  const hasSaved = useRef(false);

  const saveProduct = useCallback(async () => {
    const token = session?.user?.accessToken;

    if (!id || !token || hasSaved.current) {
      return;
    }

    try {
      hasSaved.current = true;

      await saveToRecentlyView({
        id,
      }).unwrap();
    } catch (error) {
      hasSaved.current = false;
      console.error("Failed to save recently viewed product:", error);
    }
  }, [id, saveToRecentlyView, session?.user?.accessToken]);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    void saveProduct();
  }, [status, saveProduct]);

  if (status !== "authenticated") {
    return null;
  }

  return <RecentlyViewedProducts />;
};

export default SaveRecentlyViewProduct;