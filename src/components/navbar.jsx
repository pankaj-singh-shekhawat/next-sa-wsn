"use client"
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import LogoutButton from "@/components/logoutbtn";

function Navbarlink(props){
  return(
    <li>
      <Link href={props.href} className="block py-1 px-2 hover:text-indigo-500 rounded-sm" aria-current="page">{props.name}</Link>
    </li>
  )
}
export default function Navbar(){
    const isLoggedIn = useAuthStore((state)=>state.isLoggedIn);
    const profile    = useAuthStore((state)=>state.profile);
    const logout     = useAuthStore((state)=>state.logout);
    return (
      <nav className="sticky top-0 bg-white border border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-600">SA-Workspacenet</span>
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-row items-center gap-2">
              <Navbarlink name='About' href='about' />
              <Navbarlink name='Contact' href='contact'/>
              <Navbarlink name='Team' href='team'/>
              <Navbarlink name='Services' href='services'/>
              {profile && 
                <div>
                  <div class="px-4 py-1 bg-gray-500 text-white rounded-md cursor-pointer">{profile.name}</div>
                </div>
              }
              {!isLoggedIn && <Navbarlink name='Login' href='login'/>}
              {!isLoggedIn && <Navbarlink name='Register' href='register'/>}
              {isLoggedIn && <LogoutButton />}
            </ul>
          </div>
        </div>
      </nav>
   );
} 