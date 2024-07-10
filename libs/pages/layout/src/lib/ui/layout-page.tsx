import { PropsWithChildren } from 'react'
import { Navigation } from './navigation'
import TopBar from './top-bar'

export default function LayoutPage({ children }: PropsWithChildren) {
  return (
    <div>
      <main className='dark:bg-neutral-900 dark:h-full h-screen bg-neutral-200 overflow-hidden'>
        <div className="flex h-full">
          <div className="h-full sticky top-0">
            {/* Navigation */}
            <Navigation />
          </div>

          <div className="w-full h-full flex flex-col">
            <div>
              <TopBar />
            </div>

            <div className="h-full pt-2 px-2">
              {children}
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}