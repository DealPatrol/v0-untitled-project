"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { saveProductSupplier, deleteProductSupplier, getProductSuppliers } from "@/app/actions/drop-shipping"
import { toast } from "@/components/ui/use-toast"
import type { Supplier, ProductSupplier } from "@/types/supabase"

interface ProductSupplierMappingProps {
  suppliers: Supplier[]
}

const PRODUCT_TYPES = [
  { value: "premium", label: "Premium QR Code" },
  { value: "deluxe", label: "Deluxe QR Code" },
  { value: "legacy", label: "Legacy QR Code" },
]

export function ProductSupplierMapping({ suppliers }: ProductSupplierMappingProps) {
  const [productType, setProductType] = useState<string>("premium")
  const [productSuppliers, setProductSuppliers] = useState<ProductSupplier[]>([])
  const [currentMapping, setCurrentMapping] = useState<Partial<ProductSupplier>>({
    product_type: "premium",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadProductSuppliers(productType)
  }, [productType])

  const loadProductSuppliers = async (type: string) => {
    setIsLoading(true)
    try {
      const result = await getProductSuppliers(type)
      if (result.productSuppliers) {
        setProductSuppliers(result.productSuppliers)
      }
    } catch (error) {
      console.error("Error loading product suppliers:", error)
      toast({
        title: "Error",
        description: "Failed to load product suppliers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentMapping((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCurrentMapping((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await saveProductSupplier(currentMapping)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (isEditing) {
        setProductSuppliers(
          productSuppliers.map((ps) => (ps.id === result.productSupplier?.id ? result.productSupplier : ps)),
        )
        toast({ title: "Product supplier mapping updated successfully" })
      } else {
        setProductSuppliers([...productSuppliers, result.productSupplier!])
        toast({ title: "Product supplier mapping added successfully" })
      }

      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (productSupplier: ProductSupplier) => {
    setCurrentMapping(productSupplier)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this mapping?")) return

    try {
      const result = await deleteProductSupplier(id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setProductSuppliers(productSuppliers.filter((ps) => ps.id !== id))
      toast({ title: "Product supplier mapping deleted successfully" })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setCurrentMapping({ product_type: productType })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <label htmlFor="product-type-filter" className="font-medium">
          Product Type:
        </label>
        <Select value={productType} onValueChange={setProductType}>
          <SelectTrigger className="w-[200px]" id="product-type-filter">
            <SelectValue placeholder="Select product type" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Mapping" : "Add New Mapping"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="product_type" className="block text-sm font-medium mb-1">
                  Product Type
                </label>
                <Select
                  value={currentMapping.product_type || ""}
                  onValueChange={(value) => handleSelectChange("product_type", value)}
                  disabled={isEditing}
                >
                  <SelectTrigger id="product_type">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="supplier_id" className="block text-sm font-medium mb-1">
                  Supplier
                </label>
                <Select
                  value={currentMapping.supplier_id || ""}
                  onValueChange={(value) => handleSelectChange("supplier_id", value)}
                  required
                >
                  <SelectTrigger id="supplier_id">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers
                      .filter((s) => s.is_active !== false)
                      .map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="supplier_product_id" className="block text-sm font-medium mb-1">
                  Supplier Product ID
                </label>
                <Input
                  id="supplier_product_id"
                  name="supplier_product_id"
                  value={currentMapping.supplier_product_id || ""}
                  onChange={handleInputChange}
                  placeholder="Optional"
                />
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-medium mb-1">
                  Cost ($)
                </label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  step="0.01"
                  value={currentMapping.cost || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="processing_time" className="block text-sm font-medium mb-1">
                  Processing Time
                </label>
                <Input
                  id="processing_time"
                  name="processing_time"
                  value={currentMapping.processing_time || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 3-5 business days"
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">{isEditing ? "Update Mapping" : "Add Mapping"}</Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Supplier Mappings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : productSuppliers.length === 0 ? (
              <p className="text-muted-foreground">No mappings found for this product type.</p>
            ) : (
              <div className="space-y-4">
                {productSuppliers.map((ps) => (
                  <div key={ps.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {suppliers.find((s) => s.id === ps.supplier_id)?.name || "Unknown Supplier"}
                        </h3>
                        <p className="text-sm text-muted-foreground">Product ID: {ps.supplier_product_id || "N/A"}</p>
                        <p className="text-sm">Cost: ${Number(ps.cost).toFixed(2)}</p>
                        {ps.processing_time && <p className="text-sm">Processing: {ps.processing_time}</p>}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(ps)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(ps.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
