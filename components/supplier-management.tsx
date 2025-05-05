"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveSupplier, deleteSupplier } from "@/app/actions/drop-shipping"
import { toast } from "@/components/ui/use-toast"
import { ProductSupplierMapping } from "@/components/product-supplier-mapping"
import type { Supplier } from "@/types/supabase"

interface SupplierManagementProps {
  initialSuppliers: Supplier[]
}

export function SupplierManagement({ initialSuppliers }: SupplierManagementProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [currentSupplier, setCurrentSupplier] = useState<Partial<Supplier>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("suppliers")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentSupplier((prev) => ({ ...prev, [name]: value }))
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

  const handleEdit = (supplier: Supplier) => {
    setCurrentSupplier(supplier)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return

    try {
      const result = await deleteSupplier(id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setSuppliers(suppliers.filter((s) => s.id !== id))
      toast({ title: "Supplier deleted successfully" })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setCurrentSupplier({})
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

                <div>
                  <label htmlFor="api_key" className="block text-sm font-medium mb-1">
                    API Key
                  </label>
                  <Input
                    id="api_key"
                    name="api_key"
                    value={currentSupplier.api_key || ""}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="api_endpoint" className="block text-sm font-medium mb-1">
                    API Endpoint
                  </label>
                  <Input
                    id="api_endpoint"
                    name="api_endpoint"
                    value={currentSupplier.api_endpoint || ""}
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
                  <p className="text-muted-foreground">No suppliers found.</p>
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
                                supplier.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {supplier.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(supplier)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(supplier.id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                      {supplier.api_endpoint && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p>API Integration: Yes</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="product-mapping">
        <ProductSupplierMapping suppliers={suppliers} />
      </TabsContent>
    </Tabs>
  )
}
