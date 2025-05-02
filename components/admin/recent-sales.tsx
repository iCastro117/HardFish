import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Juan Pérez</p>
          <p className="text-sm text-muted-foreground">juan.perez@ejemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+$1,250.99</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>ML</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">María López</p>
          <p className="text-sm text-muted-foreground">maria.lopez@ejemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+$890.50</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos Rodríguez</p>
          <p className="text-sm text-muted-foreground">carlos.rodriguez@ejemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+$2,340.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Martínez</p>
          <p className="text-sm text-muted-foreground">ana.martinez@ejemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+$450.75</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pedro González</p>
          <p className="text-sm text-muted-foreground">pedro.gonzalez@ejemplo.com</p>
        </div>
        <div className="ml-auto font-medium">+$1,875.25</div>
      </div>
    </div>
  )
}
