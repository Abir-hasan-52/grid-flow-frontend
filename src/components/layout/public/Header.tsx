import Link from "next/link";

 

export default function Header() {
  const routes=[
    {name:'Home',url:'/'},
    {name:'About',url:'/about-us'},
  ]
  return (
    <header className= "w-full h-16 border-b-2  ">
      <div className="flex items-center justify-center gap-4 h-full px-4"> 
       {
        routes.map((route)=>(
           <Link key={route.name} href={route.url}>{route.name}</Link>
        ))
       }
       </div>
    </header>
  )
}
