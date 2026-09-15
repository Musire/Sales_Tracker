'use client';

import { useToast } from "@/context";
import { SaleStatus } from "@/generated/prisma/enums";
import { useState, useTransition } from "react";
import { updateSaleStatus } from "../sale.actions";

type Props = {
  saleId: string;
  status: SaleStatus;
  onSuccess: () => void;
};

export default function UpdateButtons({ saleId, status, onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const [pendingStatus, setPendingStatus] = useState<SaleStatus | null>(null);
  const { createSuccess, createError } = useToast();

  const handleStatusChange = (newStatus: SaleStatus) => {
    setPendingStatus(newStatus);
    startTransition(async () => {
      const res = await updateSaleStatus({ id: saleId, newStatus });
      if (!res.success && res.error) {
        createError(res.error);
      }
      if (res.success) {
        onSuccess();
        createSuccess('Successfully updated sale status');
      }
      setPendingStatus(null);
    });
  };

  const isDraft = status === "DRAFT";
  const isPublished = status === "PUBLISHED";
  const isClosed = status === "CLOSED";

  return (
    <>
      {isDraft && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleStatusChange("PUBLISHED")}
          className="mr-4 normal-space bg-whitesmoke/87 self-end rounded-md text-background w-fit cursor-pointer disabled:opacity-50"
        >
          {pendingStatus === "PUBLISHED" ? "Publishing..." : "Publish Sale"}
        </button>
      )}

      {isPublished && (
        <div className="self-end flex space-x-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleStatusChange("CLOSED")}
            className="mr-4 normal-space bg-whitesmoke/87 rounded-md text-background w-fit cursor-pointer disabled:opacity-50"
          >
            {pendingStatus === "CLOSED" ? "Closing..." : "Close Sale"}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleStatusChange("DRAFT")}
            className="mr-4 normal-space bg-whitesmoke/87 rounded-md text-background w-fit cursor-pointer disabled:opacity-50"
          >
            {pendingStatus === "DRAFT" ? "Unpublishing..." : "Unpublish Sale"}
          </button>
        </div>
      )}

      {isClosed && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleStatusChange("DELIVERED")}
          className="mr-4 normal-space bg-whitesmoke/87 self-end rounded-md text-background w-fit cursor-pointer disabled:opacity-50"
        >
          {pendingStatus === "DELIVERED" ? "Updating..." : "Delivered Sale"}
        </button>
      )}
    </>
  );
}