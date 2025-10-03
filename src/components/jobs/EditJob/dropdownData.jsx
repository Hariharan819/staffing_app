import { Laptop, Heart, CreditCard, GraduationCap, Wrench,FileText,Eye, Calendar, ShoppingBag,EyeOff, HardHat, Package, User, Users, Star, Crown, Briefcase, Clock, Home, Building } from "lucide-react";

export const sectorOptions = [
  { value: "IT", icon: Laptop },
  { value: "Healthcare", icon: Heart },
  { value: "Finance", icon: CreditCard },
  { value: "Education", icon: GraduationCap },
  { value: "Manufacturing", icon: Wrench },
  { value: "Retail", icon: ShoppingBag },
  { value: "Construction", icon: HardHat },
  { value: "Other", icon: Package },
];

export const experienceLevels = [
  { value: "Entry Level", icon: User },
  { value: "Mid Level", icon: Users },
  { value: "Senior Level", icon: Star },
  { value: "Executive Level", icon: Crown },
];

export const jobTypes = [
  { value: "Full-time", icon: Briefcase },
  { value: "Part-time", icon: Clock },
  { value: "Contract", icon: FileText },
  { value: "Temporary", icon: Calendar },
  { value: "Internship", icon: GraduationCap },
];

export const payTypes = [
  { value: "Hourly", icon: Clock },
  { value: "Daily", icon: Calendar },
  { value: "Weekly", icon: Calendar },
  { value: "Monthly", icon: Calendar },
  { value: "Annually", icon: Calendar },
];

export const workModes = [
  { value: "Remote", icon: Home },
  { value: "On-site", icon: Building },
  { value: "Hybrid", icon: Laptop },
];

export const statusOptions = [
  { value: "Draft", icon: FileText },
  { value: "Published", icon: Eye },
  { value: "Closed", icon: EyeOff },
];
