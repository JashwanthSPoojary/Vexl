import { SettingsSection } from "@/types/types";

export const PlaceholderSettings = ({ section }: { section: SettingsSection }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">{section.label}</h2>
      <p className="text-muted-foreground">{section.description}</p>
    </div>
    <div className="bg-card p-6 rounded-lg">
      <div className="text-center py-6">
        <section.icon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">{section.label} settings will be available here</p>
      </div>
    </div>
  </div>
)