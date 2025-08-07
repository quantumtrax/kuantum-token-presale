'use client'

export default function Footer() {
  return (
    <footer className="py-12 w-full">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full px-8">
          <div className="text-center text-gray-500 text-lg">
            <p>
              <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                &copy; 2025 KUANTUM. All rights reserved. Built for the future of DeFi.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}