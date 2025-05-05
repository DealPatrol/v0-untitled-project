"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { createOrder, type CheckoutItem, type ShippingInfo } from "@/app/actions/payment"

type CheckoutFormProps = {
  items: CheckoutItem[]
  onCancel: () => void
}

export function CheckoutForm({ items, onCancel }: CheckoutFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "bank_transfer">("stripe")

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
      country: "US",
    },
  })

  const handleShippingInfoChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setShippingInfo({
        ...shippingInfo,
        [parent]: {
          ...(shippingInfo[parent as keyof typeof shippingInfo] as Record<string, any>),
          [child]: value,
        },
      })
    } else {
      setShippingInfo({
        ...shippingInfo,
        [field]: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate subtotal
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

      // Add metadata for drop shipping
      const metadata = {
        plan: items[0]?.product_type || "premium",
        quantity: items.reduce((acc, item) => acc + item.quantity, 0).toString(),
      }

      const result = await createOrder(items, shippingInfo, paymentMethod, metadata)

      if (result.redirectUrl) {
        router.push(result.redirectUrl)
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
          <CardDescription>Enter your shipping details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={shippingInfo.name}
              onChange={(e) => handleShippingInfoChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="line1">Address</Label>
            <Input
              id="line1"
              value={shippingInfo.address.line1}
              onChange={(e) => handleShippingInfoChange("address.line1", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={shippingInfo.address.city}
                onChange={(e) => handleShippingInfoChange("address.city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={shippingInfo.address.state}
                onChange={(e) => handleShippingInfoChange("address.state", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                id="postal_code"
                value={shippingInfo.address.postal_code}
                onChange={(e) => handleShippingInfoChange("address.postal_code", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                className="w-full border rounded-md px-3 py-2"
                value={shippingInfo.address.country}
                onChange={(e) => handleShippingInfoChange("address.country", e.target.value)}
                required
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose how you want to pay</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value as "stripe" | "bank_transfer")}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="stripe" id="stripe" />
              <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                <div className="font-medium">Credit Card</div>
                <div className="text-sm text-gray-500">Pay securely with your credit card</div>
              </Label>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                  VISA
                </div>
                <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                  MC
                </div>
                <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center text-xs font-medium">
                  AMEX
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-4">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                <div className="font-medium">Bank Transfer</div>
                <div className="text-sm text-gray-500">Pay via bank transfer (instructions will be provided)</div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your order before checkout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>${shipping.toFixed(2)}</p>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Complete Order"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
