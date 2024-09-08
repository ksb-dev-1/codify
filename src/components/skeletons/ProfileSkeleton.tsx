const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p className="font-bold mb-4 text-xl text-transparent w-fit rounded-xl skeleton">
          Profile
        </p>
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center p-8 rounded-xl border border-slate-300">
            <div className="h-[100px] w-[100px] rounded-full skeleton"></div>

            <div className="mt-4 sm:mt-0 sm:ml-4">
              <p className="w-[100px] font-bold text-transparent rounded-xl skeleton">
                Name
              </p>

              <p className="w-[200px] text-transparent rounded-xl mt-2 skeleton">
                Email
              </p>
            </div>
          </div>
          <div className="w-full mt-4 border border-slate-300 p-4 rounded-[7.5px]">
            <div className="mb-2">
              <p className="w-fit mb-2 font-semibold rounded-[7.5px] text-transparent skeleton">
                Total - 0
              </p>
              <div className="w-full bg-black h-8 rounded-[7.5px] skeleton"></div>
            </div>
            <div className="mb-2">
              <p className="w-fit mb-2 font-semibold rounded-[7.5px] text-transparent skeleton">
                Easy - 0
              </p>
              <div className="w-full bg-black h-8 rounded-[7.5px] skeleton"></div>
            </div>
            <div className="mb-2">
              <p className="w-fit mb-2 font-semibold rounded-[7.5px] text-transparent skeleton">
                Medium - 0
              </p>
              <div className="w-full bg-black h-8 rounded-[7.5px] skeleton"></div>
            </div>
            <div className="">
              <p className="w-fit mb-2 font-semibold rounded-[7.5px] text-transparent skeleton">
                Hard - 0
              </p>
              <div className="w-full bg-black h-8 rounded-[7.5px] skeleton"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
