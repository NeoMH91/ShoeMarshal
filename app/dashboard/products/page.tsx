import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, UserIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import prisma from "@/app/lib/db";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function ProductsRoute() {
  noStore();
  const data = await getData();
  return (
    <>
      <div className="flex items-center justify-end">
        <Button className="flex items-center gap-x-2" asChild>
          <Link href="/dashboard/products/create">
            <PlusCircle className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      className="rounded-md object-cover"
                      height={64}
                      width={64}
                      alt="productImage"
                      src={item.images[0]}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-SG").format(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${item.id}`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/products/${item.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
