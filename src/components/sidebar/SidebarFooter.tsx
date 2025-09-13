import { SidebarFooter } from '@/components/ui/sidebar'

export function AppSidebarFooter() {
  return (
    <SidebarFooter className="p-4">
      {/* Copyright */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} NoteManager
      </p>
    </SidebarFooter>
  )
}
