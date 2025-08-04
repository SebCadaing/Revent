export default function EventDetailedChat() {
  return (
    <div className="card bg-base-100">
      <div
        className="card-title rounded-t-lg justify-center bg-gradient-to-r 
    from-primary to-black text-white"
      >
        Chat About this Event
      </div>
      <div className="card-body">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
            </div>
          </div>
          <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
        </div>
      </div>
    </div>
  );
}
