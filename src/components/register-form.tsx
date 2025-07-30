import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React from "react"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng ký</CardTitle>
          <CardDescription>
            Tạo tài khoản mới để bắt đầu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Tài khoản</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="user 123"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Đăng ký
              </Button>
              <Button variant="outline" className="w-full">
                Đăng ký với Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4"
              >
                Đăng nhập
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}