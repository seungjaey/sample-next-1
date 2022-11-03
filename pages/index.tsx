import { useEffect, useRef } from 'react'

export default function Home() {
  const countRef = useRef(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const handleMessage = (event: MessageEvent) => {
    console.log(event)
  }

  const handleClickButton = () => {
    const iframe = iframeRef.current
    if (!iframe) {
      return;
    }
    const { contentWindow } = iframe
    if (!contentWindow) {
      return;
    }
    contentWindow.postMessage(`from-parent : count = ${countRef.current}`, '*')
    countRef.current += 1
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage);
    }
  }, [])

  return (
    <div>
      <button type="button" onClick={handleClickButton}>
        trigger
      </button>
      <iframe
        ref={iframeRef}
        key="event-iframe"
        width={500}
        height={500}
        src="http://localhost:3001/events/some-kind-of-event"
      />
    </div>
  )
}
