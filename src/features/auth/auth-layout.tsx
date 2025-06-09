import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const AuthLayout = ({ children }: Props) => {
  return (
    <main className="">
      <div className="flex justify-between h-screen">
        <div className="w-3/5 bg-[#2b61ff] sticky h-screen top-0 overflow-y-clip">
          <div className="relative min-h-screen flex justify-center items-center">
            <video autoPlay loop playsInline muted className=" h-fit w-fit">
              <source src="/cosmos.mp4" type="video/mp4" />
            </video>
            <div className="absolute z-10 top-6 left-6 max-w-xl text-left text-white">
              <p className="font-extrabold mb-4 ml-1">Qore.</p>
              <p className="text-6xl font-medium">
                Create surveys that people <i>want</i> to answer.
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex  justify-center">{children}</div>
      </div>
    </main>
  );
};
