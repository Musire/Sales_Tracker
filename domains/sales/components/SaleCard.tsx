'use client'

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { SaleStatus } from "@/generated/prisma/client";
import { SaleOverride } from "./AdminSales";

// Extended type in case you include relations in your query
type ExtendedSale = SaleOverride & {
  createdBy?: {
    name?: string | null;
    avatarUrl?: string | null;
  };
};

type Props = {
  sale: ExtendedSale;
};

const STATUS_STYLES: Record<SaleStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  PUBLISHED: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  CLOSED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  DELIVERED: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

export default function SaleCard({ sale }: Props) {
  const { loadModal } = useBottomDrawer();

  // Format amount safely converting Decimal/number/string
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(sale.amount));

  // Format date
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(sale.createdAt));

  return (
    <article
      onClick={() => loadModal("sale-details", sale)}
      className="bg-surface-1 hover:bg-surface-2/50 border-border transition-colors border  p-4 w-full cursor-pointer flex items-center justify-between gap-4"
    >
      {/* Left: Avatar & Primary Info */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="bg-surface-2 rounded-full size-12 shrink-0 flex items-center justify-center overflow-hidden border border-border">
          {sale.createdBy?.avatarUrl ? (
            <img
              src={sale.createdBy.avatarUrl}
              alt={sale.createdBy.name ?? "User"}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-main uppercase">
              {sale.customerName?.slice(0, 2) ?? "SL"}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-1 min-w-0">
          <p className="text-sm font-semibold text-main truncate">
            {sale.customerName || "Unnamed Customer"}
          </p>
          <p className="text-xs text-else truncate">
            {sale.createdBy?.name ? `By ${sale.createdBy.name} • ` : ""}
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Right: Amount & Status Badge */}
      <div className="flex flex-col items-end shrink-0 gap-1.5">
        <span className="text-base font-bold text-main">
          {formattedAmount}
        </span>
        <span
          className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${
            STATUS_STYLES[sale.status] ?? STATUS_STYLES.DRAFT
          }`}
        >
          {sale.status}
        </span>
      </div>
    </article>
  );
}