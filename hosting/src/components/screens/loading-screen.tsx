export default function LoadingScreen() {
  return (
    <div className="AppLoading">
      <div className="AppLoading__Container">
        <div className="AppLoading__Icon">
          <svg width="80px" height="80px" viewBox="0 0 50 50">
            <path
              fill="#000"
              d="M43.935,25.145c0-10.318-8.364-18.682-18.682-18.682c-10.318,0-18.682,8.364-18.682,18.682h4.068
    c0-8.072,6.542-14.614,14.614-14.614s14.614,6.542,14.614,14.614H43.935z">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
}
