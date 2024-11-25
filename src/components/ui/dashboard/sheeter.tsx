"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { updateProfile } from "@/lib/action"

const SHEET_SIDES = ["right"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export function SheetSide() {
  const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await updateProfile(data);
      alert('Profile updated successfully');
    } catch (error) {
      console.log('Error updating profile:', error)
      alert('Error updating profile')
    }
  }
  return (
    <form onSubmit={handlesubmit}>
      <div className="text-right">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you are done.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstname" className="text-right">
                    FirstName
                  </Label>
                  <Input id="firstname" type="text" name="firstname" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastname" className="text-right">
                    LastName
                  </Label>
                  <Input id="lastname" type="text" name="lastname" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input id="bio" type="text" name="bio" required className="col-span-3" />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="profileImage" className="text-right">
                    Image
                  </Label>
                  <Image src="/warizz.jpg" width={200} height={200} alt="Profile image" className="rounded-full" />
                  <input type="file" name="" id="profileImage" className="" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleProfileImageUpload(e.target.files[0]);
                    }
                  }} />
                </div> */}
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>

            </SheetContent>
          </Sheet>
        ))}
      </div>
    </form>
  )
}

