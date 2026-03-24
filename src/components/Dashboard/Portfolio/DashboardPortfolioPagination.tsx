import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

type DashboardPortfolioPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function buildPageHref(page: number) {
  const searchParams = new URLSearchParams();

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  return query ? `/dashboard/portfolio?${query}` : "/dashboard/portfolio";
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4];
  }

  if (currentPage >= totalPages - 2) {
    return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
}

export default function DashboardPortfolioPagination({
  currentPage,
  totalPages,
}: DashboardPortfolioPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const showLeadingEllipsis = visiblePages[0] > 1;
  const showTrailingEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            asChild
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none gap-1 pl-2.5 opacity-50" : "gap-1 pl-2.5"
            }
          >
            <Link href={buildPageHref(Math.max(1, currentPage - 1))} scroll={false}>
              <ChevronLeft className="size-4" />
              <span>Previous</span>
            </Link>
          </PaginationLink>
        </PaginationItem>

        {showLeadingEllipsis ? (
          <>
            <PaginationItem>
              <PaginationLink asChild isActive={currentPage === 1}>
                <Link href={buildPageHref(1)} scroll={false}>
                  1
                </Link>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : null}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink asChild isActive={currentPage === page}>
              <Link href={buildPageHref(page)} scroll={false}>
                {page}
              </Link>
            </PaginationLink>
          </PaginationItem>
        ))}

        {showTrailingEllipsis ? (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink asChild isActive={currentPage === totalPages}>
                <Link href={buildPageHref(totalPages)} scroll={false}>
                  {totalPages}
                </Link>
              </PaginationLink>
            </PaginationItem>
          </>
        ) : null}

        <PaginationItem>
          <PaginationLink
            asChild
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? "pointer-events-none gap-1 pr-2.5 opacity-50" : "gap-1 pr-2.5"
            }
          >
            <Link href={buildPageHref(Math.min(totalPages, currentPage + 1))} scroll={false}>
              <span>Next</span>
              <ChevronRight className="size-4" />
            </Link>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
