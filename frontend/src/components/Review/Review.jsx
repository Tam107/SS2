import { Button } from "antd";
import React from "react";

const Review = () => {
  return (
    <>
      <div className=" w-screen py-4  bg-[#F6F5F2]">
        <h2 class="text-2xl font-bold text-center mb-4">Scoring Essay</h2>
        <div className="max-w-[84%] mx-auto bg-white shadow-md text-card-foreground border border-slate-300 dark:border-slate-700  rounded-xl px-4 py-2">
          <div className="p-6">
            <form className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label
                    for="overview"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Overview Review <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="overview"
                    class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                  ></textarea>
                </div>
                <div>
                  <label
                    for="tr"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Task Response Review{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="tr"
                    class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                  ></textarea>
                </div>
                <div>
                  <label
                    for="lr"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Lexical Resource Review{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="lr"
                    class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                  ></textarea>
                </div>
                <div>
                  <label
                    for="gra"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Grammatical Range & Accuracy Review{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="gra"
                    class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                  ></textarea>
                </div>
                <div>
                  <label
                    for="cc"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-1"
                  >
                    Enter Coherence & Cohesion Review{" "}
                    <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="cc"
                    class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] font-sans"
                    placeholder="Review..."
                    data-listener-added_03f3dd6a="true"
                  ></textarea>
                </div>
              </div>
              <div class="flex justify-end space-x-2">
               
               <Button type="primary">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
