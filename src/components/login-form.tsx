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
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập tài khoản và mật khẩu để đăng nhập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Tài khoản</Label>
                <Input
                  id="text"
                  type="text"
                  placeholder="user 123"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link
                    href="/auth/forget-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Input 
                id="password" 
                type="password"
                placeholder="••••••••"
                required 

                />
              </div>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
              <Button variant="outline" className="w-full">
                Đăng nhập với Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Chưa có tài khoản?{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4"
            >
              Đăng ký
            </Link>            
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
