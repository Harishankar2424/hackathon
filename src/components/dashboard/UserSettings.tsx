
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
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";


export function UserSettings() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleSaveChanges = () => {
    toast({
        title: "Settings Saved!",
        description: "Your changes have been updated successfully."
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline">Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings, preferences, and notifications.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-6">
            <div className="grid gap-6 py-4">
                
                <div className="space-y-4">
                    <h4 className="font-medium">Display</h4>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                         <div>
                            <Label htmlFor="theme-switcher">Theme</Label>
                            <p className="text-xs text-muted-foreground">Select your preferred interface theme.</p>
                        </div>
                         <Select onValueChange={(value) => setTheme(value)} defaultValue={theme}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                     <h4 className="font-medium">Notifications</h4>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="notification-offers">New Contract Offers</Label>
                            <p className="text-xs text-muted-foreground">Receive alerts when new contracts are published.</p>
                        </div>
                        <Switch id="notification-offers" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <Label htmlFor="notification-status">Application Status</Label>
                             <p className="text-xs text-muted-foreground">Get notified about updates to your applications.</p>
                        </div>
                        <Switch id="notification-status" defaultChecked />
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h4 className="font-medium">Legal</h4>
                    <div className="text-sm text-muted-foreground rounded-lg border p-4">
                       <p>For more information about your rights and responsibilities, please review our legal documents.</p>
                       <div className="mt-2">
                         <Link href="#" className="text-primary underline underline-offset-4">Terms of Service</Link>
                         <span className="mx-2 text-border">|</span>
                         <Link href="#" className="text-primary underline underline-offset-4">Privacy Policy</Link>
                       </div>
                    </div>
                </div>
                
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
