import Button from "@/app/components/Button";
import Navbar from "@/app/components/Navbar";
import Post from "@/app/components/Post";
import DeletePost from "@/app/components/DeletePost";
// import { User  } from "@phosphor-icons/react";


export default function Home() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="flex flex-col bg-white p-4 my-10 w-[1200px] mx-auto rounded-2xl border border-gray-200 wrap-break-word ">
        
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row gap-2">
            <h6 className="font-bold">1USM Newsfeed</h6>
            <Button
              type="button"
              title="Class:"
              icon='/caret-down.svg'

            />
          </div>
          <div>
            <Button
              type="button"
              title="Date"
              icon='/caret-down.svg'
            />
          </div>
        </div>
        
        {/* BREAK HERE, COMPONENT STARTS BELOW*/}

        <div className="flex flex-col items-center p-4 gap-7">
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>

          {/* test with alot of post and only 1 post */}
          
        </div>
        <div>
          <a>smtg</a>
        </div>

        </div>
      </main>
    </div>
    </>
  );
}
