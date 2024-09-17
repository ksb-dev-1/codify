import { useSearchParams } from "next/navigation";

const ProfileSkeleton = () => {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "light";

  return (
    <div
      className={`${
        theme === "light" ? "lightBg2 darkColor2" : "darkBg2 lightColor1"
      } min-h-screen flex justify-center`}
    >
      <div className="relative max-w-[1280px] w-full px-4 my-[6.5rem]">
        <p
          className={`${
            theme === "light" ? "skeleton-light" : "skeleton-dark"
          } w-fit font-bold mb-4 text-xl text-transparent rounded-xl`}
        >
          Profile
        </p>
        <div className="flex flex-col md:flex-row md:items-start">
          <div
            className={`${
              theme === "light" ? "lightBg1" : "darkBg1"
            } md:max-w-[350px] w-full flex flex-col p-4 md:p-8 rounded-custom`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } h-[100px] w-[100px] rounded-full`}
              ></div>

              <div className="flex flex-col items-center mt-4">
                <p
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-[100px] font-bold text-transparent rounded-xl`}
                >
                  Name
                </p>

                <p
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-[200px] text-transparent rounded-xl mt-2`}
                >
                  Email
                </p>
              </div>
            </div>
            <div
              className={`${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              } mt-4 px-4 py-2 text-transparent rounded-custom text-center`}
            >
              Add Question
            </div>
            <button
              className={`${
                theme === "light" ? "skeleton-light" : "skeleton-dark"
              } mt-4 text-transparent px-4 py-2 rounded-custom`}
            >
              Delete Account
            </button>
          </div>
          <div className="w-full flex flex-col">
            <div
              className={`${
                theme === "light" ? "lightBg1" : "darkBg1"
              } mt-4 md:mt-0 md:ml-4 p-4 md:p-8 rounded-custom`}
            >
              <div className="mb-4">
                <p
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-fit mb-2 font-semibold rounded-xl text-transparent`}
                >
                  Total - 0
                </p>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full bg-black h-12 rounded-custom skeleton`}
                ></div>
              </div>
              <div className="mb-4">
                <p
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-fit mb-2 font-semibold rounded-xl text-transparent`}
                >
                  Easy - 0
                </p>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full bg-black h-12 rounded-custom skeleton`}
                ></div>
              </div>
              <div className="mb-4">
                <p
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-fit mb-2 font-semibold rounded-xl text-transparent`}
                >
                  Medium - 0
                </p>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full bg-black h-12 rounded-custom skeleton`}
                ></div>
              </div>
              <div className="">
                <p
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-fit mb-2 font-semibold rounded-xl text-transparent`}
                >
                  Hard - 0
                </p>
                <div
                  className={`${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  } w-full bg-black h-12 rounded-custom skeleton`}
                ></div>
              </div>
            </div>
            <div className="mt-8 md:ml-4">
              <p
                className={`${
                  theme === "light" ? "skeleton-light" : "skeleton-dark"
                } font-semibold mb-4 text-transparent rounded-xl w-fit`}
              >
                Your Questions
              </p>

              <div className="mb-4">
                <div
                  className={`px-4 h-[59.2px] text-transparent rounded-tl-custom rounded-tr-custom ${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  }`}
                >
                  Question 1
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className={`w-[100px] flex justify-center py-2 rounded-bl-custom rounded-br-custom font-semibold text-transparent ${
                      theme === "light" ? "skeleton-light" : "skeleton-dark"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <div
                  className={`px-4 h-[59.2px] text-transparent rounded-tl-custom rounded-tr-custom ${
                    theme === "light" ? "skeleton-light" : "skeleton-dark"
                  }`}
                >
                  Question 1
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className={`w-[100px] flex justify-center py-2 rounded-bl-custom rounded-br-custom font-semibold text-transparent ${
                      theme === "light" ? "skeleton-light" : "skeleton-dark"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
