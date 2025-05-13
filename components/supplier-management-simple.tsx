"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveSupplier } from "@/app/actions/drop-shipping-simple"
import { toast } from "@/components/ui/use-toast"

// Simple type definitions
type Supplier = {
  id?: string
  name: string
  email: string
  phone?: string
  website?: string
  is_active?: boolean
}

type ProductSupplier = {
  id?: string
  product_type: string
  supplier_id: string
  supplier_name?: string
  cost: number
  processing_time?: string
}

export function SupplierManagementSimple() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [productSuppliers, setProductSuppliers] = useState<ProductSupplier[]>([])
  const [currentSupplier, setCurrentSupplier] = useState<Supplier>({ name: "", email: "" })
  const [currentProductSupplier, setCurrentProductSupplier] = useState<ProductSupplier>({
    product_type: "premium",
    supplier_id: "",
    cost: 0,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("suppliers")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentSupplier((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductSupplierChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentProductSupplier((prev) => ({ ...prev, [name]: name === "cost" ? Number.parseFloat(value) : value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentSupplier((prev) => ({ ...prev, is_active: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await saveSupplier(currentSupplier)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      if (isEditing) {
        setSuppliers(suppliers.map((s) => (s.id === result.supplier?.id ? result.supplier : s)))
        toast({ title: "Supplier updated successfully" })
      } else {
        setSuppliers([...suppliers, result.supplier!])
        toast({ title: "Supplier added successfully" })
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

  const handleProductSupplierSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Find the supplier name
    const supplier = suppliers.find((s) => s.id === currentProductSupplier.supplier_id)

    const newProductSupplier = {
      ...currentProductSupplier,
      id: `local-${Date.now()}`,
      supplier_name: supplier?.name,
    }

    setProductSuppliers([...productSuppliers, newProductSupplier])

    setCurrentProductSupplier({
      product_type: "premium",
      supplier_id: "",
      cost: 0,
    })

    toast({ title: "Product supplier mapping added successfully" })
  }

  const handleEdit = (supplier: Supplier) => {
    setCurrentSupplier(supplier)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return
    setSuppliers(suppliers.filter((s) => s.id !== id))
    toast({ title: "Supplier deleted successfully" })
  }

  const handleDeleteProductSupplier = (id: string) => {
    if (!confirm("Are you sure you want to delete this product supplier mapping?")) return
    setProductSuppliers(productSuppliers.filter((ps) => ps.id !== id))
    toast({ title: "Product supplier mapping deleted successfully" })
  }

  const resetForm = () => {
    setCurrentSupplier({ name: "", email: "" })
    setIsEditing(false)
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        <TabsTrigger value="product-mapping">Product Mapping</TabsTrigger>
      </TabsList>

      <TabsContent value="suppliers">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Supplier" : "Add New Supplier"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={currentSupplier.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={currentSupplier.email || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <Input id="phone" name="phone" value={currentSupplier.phone || ""} onChange={handleInputChange} />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-1">
                    Website
                  </label>
                  <Input
                    id="website"
                    name="website"
                    value={currentSupplier.website || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={currentSupplier.is_active !== false}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label htmlFor="is_active" className="text-sm font-medium">
                    Active
                  </label>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">{isEditing ? "Update Supplier" : "Add Supplier"}</Button>
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
              <CardTitle>Suppliers List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.length === 0 ? (
                  <p className="text-muted-foreground">No suppliers found. Add your first supplier using the form.</p>
                ) : (
                  suppliers.map((supplier) => (
                    <div key={supplier.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.email}</p>
                          {supplier.phone && <p className="text-sm">{supplier.phone}</p>}
                          {supplier.website && (
                            <a
                              href={supplier.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {supplier.website}
                            </a>
                          )}
                          <div className="mt-2">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                supplier.is_active !== false
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {supplier.is_active !== false ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(supplier)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(supplier.id!)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="product-mapping">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Product-Supplier Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSupplierSubmit} className="space-y-4">
                <div>
                  <label htmlFor="product_type" className="block text-sm font-medium mb-1">
                    Product Type
                  </label>
                  <select
                    id="product_type"
                    name="product_type"
                    value={currentProductSupplier.product_type}
                    onChange={handleProductSupplierChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="premium">Premium QR Code</option>
                    <option value="deluxe">Deluxe QR Code</option>
                    <option value="legacy">Legacy QR Code</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="supplier_id" className="block text-sm font-medium mb-1">
                    Supplier
                  </label>
                  <select
                    id="supplier_id"
                    name="supplier_id"
                    value={currentProductSupplier.supplier_id}
                    onChange={handleProductSupplierChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
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
                    min="0"
                    value={currentProductSupplier.cost || ""}
                    onChange={handleProductSupplierChange}
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
                    placeholder="e.g., 2-3 business days"
                    value={currentProductSupplier.processing_time || ""}
                    onChange={handleProductSupplierChange}
                  />
                </div>

                <Button type="submit" disabled={!currentProductSupplier.supplier_id}>
                  Add Mapping
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product-Supplier Mappings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productSuppliers.length === 0 ? (
                  <p className="text-muted-foreground">No product-supplier mappings found.</p>
                ) : (
                  productSuppliers.map((ps) => (
                    <div key={ps.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {ps.product_type.charAt(0).toUpperCase() + ps.product_type.slice(1)} QR Code
                          </h3>
                          <p className="text-sm">Supplier: {ps.supplier_name}</p>
                          <p className="text-sm">Cost: ${ps.cost.toFixed(2)}</p>
                          {ps.processing_time && <p className="text-sm">Processing Time: {ps.processing_time}</p>}
                        </div>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProductSupplier(ps.id!)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
