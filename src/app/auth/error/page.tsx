import Link from 'next/link';

const AuthErrorPage = () => {
  return <div>
    <h1>Error auth</h1>
    <Link href={'/auth/login'}>Login</Link>
  </div>
}
export default AuthErrorPage;