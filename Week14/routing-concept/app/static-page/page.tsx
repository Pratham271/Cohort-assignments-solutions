import React from 'react'

const page = () => {
  return (
    <div className="flex justify-center max-w-screen-3xl">
    <div className="flex flex-col mt-36">
     <div className='flex justify-start max-w-screen-sm'>
     <div className="text-2xl font-bold">
        Welcome to Static Page
      </div>
     </div>
      <div className="mt-8 flex justify-center max-w-screen-sm">
            <div >
            This para right here is rendered statically using Next.js By 
          generating the content on the server at the build time, Next.js ensures
          the content on the server at the build the time, Next.js ensures that search
          engines can easily crawl and index this page, boosting its SEO. Plus, serving 
          static content leads to faster load times and a smoother user experience. And if
          I need interactivity, Next.js allows me to use the "use client" directive for specific
          components
          <br /> <br />
          Pretty cool right?Now navigate to the "Client Page" to check how interactivity
          is added in Next.js
            </div> 
      </div>
      
    </div>
    
</div>
  )
}

export default page
