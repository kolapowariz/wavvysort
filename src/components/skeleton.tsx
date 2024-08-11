import { Skeleton } from "./ui/skeleton";

export function DashboardSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="p-4 w-full h-58 mt-2 mb-4 border-b-2 md:w-[50%]" >
          <div className="flex flex-col space-y-2 px-2">
            <Skeleton className=" h-4 w-[240px] bg-white dark:bg-current" />
            <Skeleton className=" h-4 w-[200px] bg-white dark:bg-current" />
            <Skeleton className=" h-24 w-full bg-white dark:bg-current" />
            <Skeleton className=" h-2 w-[200px] bg-white dark:bg-current" />
            <div className="flex justify-center gap-2">
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
            </div>
          </div>
        </Skeleton>
      </div>
      <div>
        <Skeleton className="p-4 w-full h-58 mt-2 mb-4 border-b-2 md:w-[50%]" >
          <div className="flex flex-col space-y-2 px-2">
            <Skeleton className=" h-4 w-[240px] bg-white" />
            <Skeleton className=" h-4 w-[200px] bg-white" />
            <Skeleton className=" h-24 w-full bg-white" />
            <Skeleton className=" h-2 w-[200px] bg-white" />
            <div className="flex justify-center gap-2">
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
            </div>
          </div>
        </Skeleton>
      </div>
      <div>
        <Skeleton className="p-4 w-full h-58 mt-2 mb-4 border-b-2 md:w-[50%]" >
          <div className="flex flex-col space-y-2 px-2">
            <Skeleton className=" h-4 w-[240px] bg-white" />
            <Skeleton className=" h-4 w-[200px] bg-white" />
            <Skeleton className=" h-24 w-full bg-white" />
            <Skeleton className=" h-2 w-[200px] bg-white" />
            <div className="flex justify-center gap-2">
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
            </div>
          </div>
        </Skeleton>
      </div>
      <div>
        <Skeleton className="p-4 w-full h-58 mt-2 mb-4 border-b-2 md:w-[50%]" >
          <div className="flex flex-col space-y-2 px-2">
            <Skeleton className=" h-4 w-[240px] bg-white" />
            <Skeleton className=" h-4 w-[200px] bg-white" />
            <Skeleton className=" h-24 w-full bg-white" />
            <Skeleton className=" h-2 w-[200px] bg-white" />
            <div className="flex justify-center gap-2">
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
              <Skeleton className=" h-8 w-10 bg-white" />
            </div>
          </div>
        </Skeleton>
      </div>

    </>
  )
}

export function PostSkeleton() {
  return (
    <div className="mx-auto">
      <Skeleton className="mx-auto p-4 w-full h-full mb-4 border-b-2 md:w-[50%]" >
        <div className="flex flex-col space-y-2 px-2">
          <div className="flex justify-center items-center md:gap-2 gap-4">
            <Skeleton className=" h-10 w-[80px] bg-white dark:bg-current" />
            <Skeleton className=" h-10 w-[80px] bg-white" />
            <Skeleton className=" h-10 w-[80px] bg-white" />
            <Skeleton className=" h-10 w-[80px] bg-white" />
          </div>

          <Skeleton className=" h-4 w-[240px] bg-white" />
          <Skeleton className="h-[60vh] w-full bg-white" />
          <Skeleton className=" h-2 w-[200px] bg-white" />
          <div className="flex justify-center gap-2">
            <Skeleton className=" h-8 w-10 bg-white" />
            <Skeleton className=" h-8 w-10 bg-white" />
            <Skeleton className=" h-8 w-10 bg-white" />
            <Skeleton className=" h-8 w-10 bg-white" />
          </div>
        </div>
      </Skeleton>
    </div>
  )
}