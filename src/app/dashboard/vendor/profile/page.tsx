
'use client';

import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';

export default function VendorProfilePage() {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-40 w-full" />
        </div>
    )
  }

  if (!user || !userData) {
    return <div>Could not load profile data. Please try logging in again.</div>;
  }

  return (
    <div className="grid gap-6">
       <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">My Profile</h1>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>
                    <User className="h-10 w-10" />
                </AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-2xl font-headline">{userData.companyName}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div>
                    <h3 className="font-semibold">Company Name</h3>
                    <p className="text-muted-foreground">{userData.companyName}</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <p className="text-muted-foreground">{userData.email}</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
