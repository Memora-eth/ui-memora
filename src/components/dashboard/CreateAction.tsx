import React, { useEffect, useState } from 'react'
import NftAction from '../nft/NftAction';

const actionTypes = [
    {
      id: 0,
      alt: "MANAGE_ACCOUNT",
      text: "Manage Account",
    },
    {
      id: 1,
      alt: "CLOSE_ACCOUNT",
      text: "Close Account",
    },
];

export default function CreateAction() {
    const [actionForm, setActionForm] = useState({
        'prompt': '',
        'action': actionTypes[0],
        'claimer': ''
    })
    const [showDropdown, setShowDropdown] = useState(false)
    const [showIconDropdown, setShowIconDropdown] = useState(false)
    
    return (
    <>
    <h1 className="mb-6 font-display text-5xl text-white lg:text-6xl text-center mt-10">
          Mint NFT Actions
      </h1>
      <section className="flex justify-center h-[500px] rounded-lg mt-10">

        <div className="flex flex-row gap-10">
          <div className="w-[350px]">
            <NftAction />
          </div>

          <div className="flex flex-col h-fit gap-5 w-[600px] mt-10">
            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                What action trigger
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="I want give managing access "
                value={actionForm.prompt}
                onChange={(e) => setActionForm({...actionForm, prompt: e.target.value})}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Whats gonna do 
              </label>

              <div className="dropdown relative mb-4 cursor-pointer">
                <div
                  className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3.5 px-3 text-base dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white"
                  role="button"
                  id="item-blockchain"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="flex items-center">
                    {actionForm.action.text}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                  </svg>
                </div>

                <div
                  className={`dropdown-menu z-50 ${!showDropdown ? 'hidden' : ''} absolute w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800`}
                  aria-labelledby="item-blockchain"
                >
                  {actionTypes.map((elm, i) => (
                    <button
                      onClick={() => {
                        setActionForm({...actionForm, action: elm})
                        setShowDropdown(!showDropdown)
                      }}
                      key={i}
                      className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-base text-jacarta-700 transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                    >
                      <span className="flex items-center">
                        {elm.text}
                      </span>
                    </button>
                  ))}
                </div>
            </div>

            </div>


            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Who is claimer ? (wallet address)
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="0x..."
                onChange={(e) => setActionForm({...actionForm, claimer: e.target.value})}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="action-trigger"
                className="mb-2 block font-display text-jacarta-700 dark:text-white"
              >
                Select Icon Image
              </label>

              <input
                type="text"
                id="action-trigger"
                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                // placeholder="1"
              />
            </div>
          </div>
        </div>  
      </section>
    </>
  )
}
