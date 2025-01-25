import { PropsWithChildren } from "react";

const BackDrop = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
      <div
        className="bg-white p-5 rounded-md shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default BackDrop;
