import { SettingsSection } from "@/types/types";
import { CreditCard, Globe, Settings, Shield, Users } from "lucide-react";

export const settingsSections: SettingsSection[] = [
  {
    id: "domain",
    label: "Domain",
    icon: Globe,
    description: "Manage your project domain and subdomain settings",
  },
  {
    id: "general",
    label: "General",
    icon: Settings,
    description: "Basic project configuration and preferences",
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    description: "Manage team members and permissions",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    description: "Security settings and access controls",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    description: "Subscription and billing information",
  },
]