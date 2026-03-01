import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect root to login - auth is handled in (protected) group
  // Build cache clear v2
  redirect('/login')
}
