import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Memorial QR</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            Create Memorial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
