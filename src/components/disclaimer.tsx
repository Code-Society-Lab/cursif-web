import Config from "../config";

export default function DisclaimerBanner() {
  return (
    <>
      {
        Config.production() || Config.development() ? (
          <div className="flex justify-center w-full bg-yellow-400 p-4">
            <p className="text-sm text-gray-800 text-center">
              {
                Config.production() ? (
                  <>
                    Cursif is currently under heavy <b>development</b>.
                    Data loss could occur.
                    Please use at your own risk. <a href="https://github.com/Code-Society-Lab/cursif" className="underline text-blue-600"><b>Read more</b></a>
                  </>) : <>You are currently in <b>developement!</b></>
              }
            </p>
          </div>) : null
      }
    </>
  );
}
