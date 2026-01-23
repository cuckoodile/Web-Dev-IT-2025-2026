import React, { useState } from "react";
import { useGetProducts } from "../../api/products/useGetProducts";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const productColumns = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail;
      return thumbnail ? (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100">
          <img
            src={thumbnail}
            alt={row.original.name || "Product image"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/48?text=No+Image";
            }}
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">
          No img
        </div>
      );
    },
    enableSorting: false,
    size: 80,
  },

  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name") || "—"}</div>
    ),
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-75 truncate">
        {row.getValue("description") || "—"}
      </div>
    ),
    enableSorting: false,
  },

  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const cat = row.original.category_details;
      if (!cat) return <div className="text-muted-foreground">—</div>;

      return (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{cat.name || "—"}</span>
          {cat.description && (
            <span className="text-xs text-muted-foreground line-clamp-1">
              {cat.description}
            </span>
          )}
        </div>
      );
    },
    accessorKey: "category_details.name",
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const raw = row.getValue("price");
      const price = Number(raw);
      return (
        <div className="font-medium tabular-nums">
          {isNaN(price)
            ? "—"
            : `₱${price.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground font-mono">
        {row.getValue("id")}
      </div>
    ),
    size: 80,
  },

];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);

  // Build ordering parameter from sorting state
  let orderingParam = "";
  if (sorting.length > 0) {
    const sortConfig = sorting[0];
    const fieldName = sortConfig.id;
    const prefix = sortConfig.desc ? "-" : "";
    orderingParam = `${prefix}${fieldName}`;
  }

  const { data = {}, isLoading } = useGetProducts({
    search: searchQuery,
    page: currentPage,
    ordering: orderingParam,
    category: categoryFilter,
  });

  const products = Array.isArray(data) ? data : data.results || [];
  const totalCount = data.count || 0;
  const pageSize = 5;
  const totalPages = Math.ceil(totalCount / pageSize);

  const table = useReactTable({
    data: products,
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Input
          placeholder="Search products by name, description, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white max-w-sm"
        />
      </div>

      <div className="rounded-md border">
      <Table className="bg-yellow-200 border-zinc-500 border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className="text-center"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <span className="text-xs">
                        {isSorted === "desc"
                          ? " ↓"
                          : isSorted === "asc"
                          ? " ↑"
                          : ""}
                      </span>
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={productColumns.length}
                className="h-24 text-center text-muted-foreground"
              >
                Loading products...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={productColumns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing page {totalPages === 0 ? 0 : currentPage} of {totalPages} ({totalCount} total items)
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || totalPages === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}