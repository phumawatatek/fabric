import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect root to login - auth is handled in (protected) group
  redirect('/login')
}
