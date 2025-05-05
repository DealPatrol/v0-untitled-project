import type { Metadata } from "next"
import { getSuppliers } from "@/app/actions/drop-shipping"
import { SupplierManagement } from "@/components/supplier-management"

export const metadata: Metadata = {
  title: "Supplier Management | Memorial QR",
  description: "Manage drop shipping suppliers for Memorial QR products",
}

export default async function SuppliersPage() {
  const { suppliers, error } = await getSuppliers()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Supplier Management</h1>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading suppliers: {error}
        </div>
      ) : (
        <SupplierManagement initialSuppliers={suppliers || []} />
      )}
    </div>
  )
}
