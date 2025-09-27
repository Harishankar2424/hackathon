"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { regions } from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";


export function UserSettings() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // Here you would typically handle form submission,
    // like calling an API to update user data.
    toast({
        title: "Success!",
        description: "Your profile has been updated successfully."
    })
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Settings
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <Camera className="h-6 w-6" />
                        <span className="sr-only">Change profile picture</span>
                    </label>
                    <input type="file" id="profile-picture" className="hidden" accept="image/*" />
                </div>
                <div className="grid gap-2 flex-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue="John" />
                        </div>
                        <div>
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue="Doe" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 234 567 890" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="region">Region</Label>
                 <Select defaultValue="north-america">
                    <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions.map((region) => (
                        <SelectItem key={region} value={region.toLowerCase().replace(" ", "-")}>
                            {region}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" placeholder="Enter new password (optional)" />
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
