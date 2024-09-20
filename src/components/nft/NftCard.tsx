export default function NftCard() {
    return (
      <div className=" bg-jacarta-700 h-fit w-[300px] rounded-xl p-10 flex flex-col gap-10">
        <div className="rounded-xl  bg-blue h-[200px] w-[220px] block">
        <img className="rounded-xl" src="https://themesflat.co/html/axiesv/assets/images/box-item/images-item-details.jpg"></img>
        </div>

        <div id="card-content" className="flex flex-col">
            <div className="flex flex-row gap-5 justify-between">
                <h1 className="text-white py-1 justify-start">Memora NFT</h1>
                <p className=" rounded-xl bg-blue text-white px-2 py-1 text-center">TAG</p>
            </div>

            <div className="flex flex-row gap-3 pt-5">
                <div className="rounded-xl  bg-blue h-[60px] w-[60px] block">
                <img className="rounded-xl" src="https://themesflat.co/html/axiesv/assets/images/avatar/avt-2.jpg"></img>
                </div>

                <div className="flex flex-col gap-1">
                <h1 className="">Owned By</h1>
                <h1 className="text-white">Zexoverz</h1>
                </div>
            </div>

            {/* <div>
              <button></button>
            </div> */}

          
        </div>
      </div>
    );
  }