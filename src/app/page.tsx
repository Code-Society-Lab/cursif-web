"use client"

export default function Page() {

  return (
    <span className="h-screen flex items-center justify-center">
      <div className="header">
        <h1 className="header-cursif"><a href="/">Cursif</a></h1>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold">Welcome to Cursif</p>
        <p className="text-1xl">Taking notes should be <b>fast</b> and <b>simple</b></p>
        <a href="#">
          <button className="button accent mt-8 float-left">Register</button>
        </a>
        <a href="/login">
          <button className="button accent mt-8 float-right">Login</button>
        </a>
      </div>
    </span>
  );
}
