import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function PopOver({ details }) {
  return (
    <div className="w-full max-w-sm px-4 sm:px-0">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-md bg-orange-700 px-2 py-2 text-base font-medium hover:text-white sm:text-sm md:text-base lg:text-lg`}
            >
              <span>Details</span>
              <svg
                className={`
                  ${open ? 'text-white' : 'text-white/90'}
                  ml-2 h-5 w-5 group-hover:text-white/90 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6`}
                x-description="Heroicon name: solid/chevron-down"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 12.586L4.707 7.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414z"
                />
              </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute  mdmax:left-52 z-10 mt-3  -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-8 bg-white p-7 ">
                      <div className='flex gap-10'>
                      <p>Entry:
                      {
                        details?.paid_event ? ' Paid' : 'Free'
                      }
                    </p>
                    <p>
                      Approval: {
                        details?.allowed ? ' Approved' : ' Not Approved'
                      }
                    </p>
                      </div>
                      <div className=' flex gap-10'>
                        <p>Team Size: {details?.team_size}</p>
                        <p>Team Code: {details?.team_code}</p>
                      </div>
                  </div>
                  <div className="bg-gray-50 p-4">

                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}